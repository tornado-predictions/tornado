var myMap = L.map("mapid", {
    center: [40.00, -73.00],
    zoom: 4
  });
  
  
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  
  // Grab the data with d3
  
  d3.csv("static/data/df.csv").then(function(response) {
    // console.log(response)
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
    console.log(response)
    // Loop through data
    for (var i = 0; i < response.length; i++) {
  
      // Set the data location property to a variable
      var location = response[i];
      // Check for location property
      if (location) {
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location.slat, location.slon])
          .bindPopup(location.yr));
      }
  
    }
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });