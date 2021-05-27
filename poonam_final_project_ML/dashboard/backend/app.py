#################################################
# Tornadoes - Project 2
#################################################

# Dependencies

from flask import Flask, render_template, request, jsonify
from http.server import BaseHTTPRequestHandler, HTTPServer
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd

# From data_cleaning file
import data_cleaning

# Imports for predictions
import numpy as np
import pickle
from sklearn.preprocessing import MinMaxScaler

# For geocoding to get lat long from a city/town
from geopy.geocoders import Nominatim

#################################################
# Flask Setup
#################################################

app = Flask(__name__)
CORS(app)

#################################################
# Database and Data Setup
#################################################

conn = "mongodb://localhost:27017"
client = MongoClient(conn)

# From jupyter notebook file
model = pickle.load(open('data/model.pkl', 'rb'))

# From jupyter notebook file
tornado_df = pd.read_csv('data/cleaned.csv')


#################################################
# Flask Routes
#################################################
# class MyHandler(http.server.BaseHTTPRequestHandler):
    # From jupyter notebook file
    # tornado_df = pd.read_csv('data/cleaned.csv')

# loads data from file into mongo db and returns geojson
@app.route("/api/mongo")
def mongo_data():
    db = client.geoDB 
    collection = db.geojson

    features = pd.read_json('data/data.json')["features"].to_list()

    for feature in features:
        collection.insert_one(feature)

    data = db.geojson.find()
    geo = {
    "type":"FeatureCollection",
        "features": []
    }
    for d in data:
        geo["features"].append({
            "type": d["type"],
            "geometry": d["geometry"],
            "properties": d["properties"]
        })
    return geo

    # reads data from csv and returns top 10 states by causalty
@app.route("/api/top10")
def top10():
    top10 = {}
    top10 = data_cleaning.top10()
    return top10

    # reads data from csv and returns month_year totals for financial loss
@app.route("/api/date_loss")
def date_loss():
    date_loss = {}
    date_loss = data_cleaning.date_loss()
    return date_loss

    # Render html template
    # @app.route("/")
    # def home():
    #     print(model)
    #     print(tornado_df)
    #     return render_template("index.html")

    # Get user input and predict tornado category
@app.route("/predict", methods=["POST"])
def predict():

    # convert user input from template.html to float and save as variables
    if request.method == "POST":
        leng = float(request.form["leng"])
        wid = float(request.form["wid"])
        fat = float(request.form["fat"])
        place = request.form["place"]

        # convert place to lat and long
        locator = Nominatim(user_agent="myGeocoder")
        location = locator.geocode(place)

        slat = location.latitude
        slon = location.longitude

        print("Latitude", slat)
        print("Longitude", slon)

        # slat = float(request.form["slat"])
        # slon = float(request.form["slon"])

        # store user inputs as dataframe user_df
        data = [[fat, leng, wid, slat, slon]]
        user_df = pd.DataFrame(data, columns=["fat", "len", "wid", "slat", "slon"])
        # store dataframe used for model as features
        features = tornado_df
        # append user data to tornado data
        complete = features.append(user_df)
        # set up scaler and apply scaling
        scaler = MinMaxScaler()
        scaled_df = scaler.fit_transform(complete)
        # Category prediction of user input from model
        output = model.predict([list(scaled_df[len(scaled_df)-1])])

        # Rename output to user friendly text
        category = ""
        if(output[0] == 0):
            category = "EF 0 - Damage Light"
        elif(output[0] == 1):
            category = "EF 1 - Damage Moderate"
        elif(output[0] == 2):
            category = "EF 2 - Damage Considerable"
        elif(output[0] == 3):
            category = "EF 3 - Damage Severe"
        elif(output[0] == 4):
            category = "EF 4 - Damage Devastating"
        elif(output[0] == 5):
            category = "EF 5 - Damage Incredible"

        print(category)
        
        return { "classify": category }
        #render_template("results.html", classify=category)


# To run applicaton
# PORT = 8080
# Handler = MyHandler#http.server.SimpleHTTPRequestHandler

# with socketserver.TCPServer(("", PORT), Handler) as httpd:
#     print("serving at port", PORT)
#     httpd.serve_forever()

if __name__ == "__main__":
    # app.run(port = 8000)
    app.run(debug=False)