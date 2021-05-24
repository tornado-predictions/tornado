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

model = pickle.load(open('data/model.pkl', 'rb'))

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

# To run application
if __name__ == '__main__':
    app.run(debug=True)