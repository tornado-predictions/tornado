console.log("working")



// We create  a tile that will be the background of our map
let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map Data",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    })

// create the second outdoor tile layer that will be the background of our map
let outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map Data",
      maxZoom: 18,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    })

// We create third gray tile that will be the background of our map
let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map Data",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    })

let map = L.map("mapid", {
    center: [40.73, -94.0059],
    zoom: 5, 
    layers:[outdoors]
    })

let baseMaps = {
    "Satellite": satelliteStreets,
    "Outdoors" : outdoors,
    "Grayscale": light
}

let allTornadoes = new L.LayerGroup()
//let largeEarthquakes = new L.LayerGroup()
// let tectonicplates = new L.LayerGroup()

let overlays = {
    // "Tectonic Plates": tectonicplates,
    "Tornadoes": allTornadoes
}

L.control.layers(baseMaps, overlays).addTo(map)

//Retrieve the earthquakes geoJSON data
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
// d3.json("https://github.com/sandykolu/project2/blob/main/Tornadoes_SPC_1950to2015_small.geojson").then(function(data) {
d3.json("https://raw.githubusercontent.com/sandykolu/project2/main/Tornadoes_SPC_1950to2015_small.geojson").then(function(data) {
// d3.json("http://localhost:5000/api/mongo").then(function(data) {

// https://raw.githubusercontent.com/sandykolu/project2/main/Tornadoes_SPC_1950to2015_small.geojson
// d3.json("https://github.com/sandykolu/project2/blob/main/Tornadoes_SPC_1950to2015_small.geojson").then(function(data) {
  
// https://github.com/sandykolu/project2/Tornadoes_SPC_1950to2015_small.geojson
//function return style for each earthquake we plot on the map
    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            stroke: true,
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }

    function getColor(magnitude){
        if(magnitude >5) {
            return "#ea2c2c";
        }
        if(magnitude >4) {
            return "#ea822c";
        }
        if(magnitude >3) {
            return "#ee9c00";
        }
        if(magnitude >2) {
            return "#eecc00";
        }
        if(magnitude >1) {
            return "#d4ee00";
        }
        return "#98eee0";
    }

    function getRadius(magnitude){
        if(magnitude === 0) {
            return 1
        }
        return magnitude * 4;
    }

    L.geoJson(data, {
        pointToLayer: function(feature,latlng) {
            console.log(data);
            return L.circleMarker(latlng)
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(allTornadoes)

    allTornadoes.addTo(map)

    let legend = L.control({
        position: "bottomright"
    })

    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'info legend');
        const magnitudes = [0,1,2,3,4,5]
        const ef = ['EF0', 'EF1', 'EF2', 'EF3', 'EF4', 'EF5']
        const speed = ['65-85 MPH', '86-110 MPH', '111-135 MPH', '136-165 MPH', '166-200 MPH', '>200 MPH']
        
        const colors = [
            "#98eee0",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ]
        for(var i = 0; i <magnitudes.length; i++){
            console.log(colors[i])
            // div.innerHTML += `<i style='background:${colors[i]}'></i>` + magnitudes[i] + (magnitudes[i + 1] ? "&dash;" + magnitudes[i + 1] + "<br>": "+")
            div.innerHTML += `<i style='background:${colors[i]}'></i>` + ef[i] + (ef[i] ? "&nbsp; &nbsp;" + speed[i] + "<br>": "+")
        
            // div.innerHTML += `<i style='background:${colors[i]}'></i>` + (magnitudes[i] + magnitudes[i + 1] ? ef[i] + ef[i+1] + "&dash;" + "<br>" + speed[i] + "<br>": "+")
        }
        return div;

    }
    legend.addTo(map)

    // d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {
    // // d3.json("https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {
   
    // L.geoJson(plateData, {
    //         color: "#ff6500",
    //         weight: 2
    //     }).addTo(tectonicplates)

    //     tectonicplates.addTo(map)
    //})
})
