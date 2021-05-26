// bar chart of top 10 states by casualties
d3.json("http://localhost:5000/api/top10").then(function(top10){
 
    // console.log(top10)

    var layout = {
        title: "States with Highest Tornado Casualties",
        xaxis: {title: "States"},
        yaxis: {title: "Number of Casualties"},
        autosize: false,
        width: 600,
        height: 320,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        },
    };

    Plotly.newPlot('bar', top10, layout);
});

// line chart of date by financial loss
d3.json("http://localhost:5000/api/date_loss").then(function(date_loss){
 
   // console.log(date_loss)

    var layout = {
        title: "Financial Loss (Monthly Totals)",
        xaxis: {title: "Year"},
        yaxis: {title: "Financial Loss"},
        autosize: false,
        width: 600,
        height: 320,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        },
    };

    Plotly.newPlot('lines', date_loss, layout);
});

// Promise Pending
const dataPromise = d3.json("http://localhost:5000/api/date_loss");
// console.log("Data Promise: ", dataPromise);

