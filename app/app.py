#################################################
# Tornado Predictions - Final Project
#################################################

import numpy as np
from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle
from sklearn.preprocessing import MinMaxScaler

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Data Setup
#################################################

# From jupyter notebook file
model = pickle.load(open('data/model.pkl', 'rb'))

# From jupyter notebook file
tornado_df = pd.read_csv('data/cleaned.csv')

#################################################
# Flask Routes
#################################################

# Render html template
@app.route("/")
def home():
    print(model)
    print(tornado_df)
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    if request.method == "POST":
        len = float(request.form["len"])
        wid = float(request.form["wid"])
        fat = float(request.form["fat"])
        slat = float(request.form["slat"])
        slon = float(request.form["slon"])

        data = [[fat, len, wid, slat, slon]]
        df_user = pd.DataFrame(data, columns=["fat", "len", "wid", "slat", "slon"])
        print("User input", df_user)
        features = tornado_df
        print("Data References", features)

        return render_template("results.html", classify="working")

# To run application
if __name__ == '__main__':
    app.run(debug=True)