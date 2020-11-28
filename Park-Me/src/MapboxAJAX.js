/* function updateRoute() {
    // Set the searchtem
    var searchtem = "driving";
    // Get the coordinates that were drawn on the map
    var data = draw.getAll();
    var lastFeature = data.features.length - 1;
    var coords = data.features[lastFeature].geometry.coordinates;
    // Format the coordinates
    var newCoords = coords.join(';')
    // Set the radius for each coordinate pair to 25 meters
    
   // getMatch(newCoords, radius, searchtem);
  } */
// Make a Map Matching request
import "./Mapbox";
var querydata;
var coordinates;
function getResults(long, lat) {
  // Create the query
  var query =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/parking.json?limit=10&proximity=" +
    long +
    "," +
    lat +
    "&types=poi&&access_token=pk.eyJ1IjoicmFmYWVsaGR6YSIsImEiOiJja2dzeHJjbnMwZzE3MnJtNWV6cHVsam9sIn0.7oigwdpk6AYK5VqUZq3phg";
  var $ = require("jquery");
  $.ajax({
    method: "GET",
    url: query,
  }).done(function (data) {
    // Get the data from the response
    querydata = JSON.stringify(data);
    coordinates = data.features[0].geometry.coordinates;
    // Set  markers of locations on the map
    //console.log("The coordinates: " + coordinates)
    //console.log("The data "+ querydata);
    //addQuery(coordinates)
  });
}

/* function addQuery(coordinates) {

  map.addLayer({
      "id": "locations",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": coordinates
        }
      },
      "layout": {
        "icon-image": "parking-15",
          "icon-allow-overlap": true,
      },
    });
  };  */
export default getResults;
export { querydata };
