# Tornado Predictions - Machine Learning

## Project Goal

For this project our group decided to analyze the tornado occurrences in the U. S since 1950, and build a machine learning model to predict tornado category (EF scale).

Overall, the number of tornado occurrences has been increasing and presumably will keep increasing, due to the changing weather patterns in the United States and elsewhere.

### Research Question

How have tornadoes changed over the past seven decades and measure their impact in United States?

## Data sources

  * Source: https://www.spc.noaa.gov/wcm/ 
  * File: 1950-2019_all_tornadoes.csv

## Data Dictionary

|Filed Name |Data Type |Description
| ---- | ---- | ---- |
Yr (Year) |	integer	| Year from 1950 - 2019 |
Mo (Month)|	integer	| Month 
date	     | Date	   | Timestamp
st (State)| Varchar	| List of States 
mag (EF Scale) |	float |	Severity of Tornado
inj (Injuries) |	float	| No of Injuries occurred
fat (Fatalities) |	float	| No of fatalities/deaths occurred
loss 	| float	| Estimated Property loss
closs |	integer |	Estimated Crop loss
len |	integer	| Length in miles
wid	| integer	| Width in yards
Slat | 	float	| Starting latitude
Slon | float	 | Starting longitude


## Data Preprocessing

  - Data cleaned and transformed by using Python Jupyter Notebook
 
## Machine Learning Models
  - Several machine learning models were tested like logistic regression, decision tree etc..
  - Feature selection
        - We initally had 29 features in the original data set
        - Based on the various models we tested we took into consideration 5 features - len, wid, Slat, Slon, fat and one predictor - mag(EF)
  - Based on our selected feature we found that the champion model is Decision Tree with a max depth of 5 to prevent overfitting
 
 |Model Name |Training Accuracy |Testing Accuracy
| ---- | ---- | ---- |
Logistic Regression |	66%	| 68% |
Decision Tree |	99%	| 64% |
Decision Tree(max depth =5) |	70%	| 70% |
KNN |	77%	| 69% |
GNB | 66% | 67% |
SVM |	68%	| 69% |

  
## App
- The app contains both a backend and frontend portion:

  - The backend utilizes Flask and the following libraries/modules:
    - flask_cors to handle Cross Origin Resource Sharing
    - pymongo to load data and retrieve data from MongoDB
    - pandas for data manipulation
    - pickle to load the machine learning model
    - sklearn for scaling of user inputs for the classification model
    - geopy to convert user entry of location into latitude and longitude

  - The frontend contains the following:
    - index.html is the main page for the app
      - Includes javascript to fetch user entered data and populate prediction result
      - Links to additional map visualizations based on javascript files using Mapbox
      - Embedded videos using matplotlib and plotly.express
      - Utilizes bootstrap grid system and d3 for data transformations

## Data Analysis and Visualization

Objectives
* How has number of tornadoes changed over the past seven decades in the United States?

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/tornado%20occurrences%20over%20the%20years%20-%20animation.png)

* How has the magnitude affected the loss over the years?

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/Analysis-%20Loss%20(Dollars)%20vs%20Magnitude.png)

* How has the occurrences changed geologically? Which states/cities have been more experiencing the tornadoes?

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/tornado%20frequency-%20animation.png)

* How do the length and the width correlate to the magnitude of the tornado?

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/Analysis-%20Length%20and%20Width.png)

* What months show the higher number of occurrences?

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/Analysis-%20occurrences%20in%20each%20month%20over%20the%20years.png)

* Tornado Fatalities over the years -

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/fatalities-choropleth-%20animation.png)

* Forecast-

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/Forecast-%20tornado%20occurrences%20over%20the%20years.png)

* Dashboard - 

![](https://github.com/tornado-predictions/tornado/blob/poonam/poonam_final_project_ML/images/tornado%20prediction%20dashboard.png)

## Team Members:

* Ajinkya Bhosle
* Sandeep Kolwalkar
* Brie Pfisterer
* Ryan Strong
* Poonam Tashildar
