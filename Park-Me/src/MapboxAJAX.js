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
function getResults(long, lat) {
  // Separate the radiuses with semicolons
  // Create the query
  //https://api.mapbox.com/geocoding/v5/mapbox.places/parking.json?limit=10&proximity=33.751291&types=poi&access_token=pk.eyJ1IjoicmFmYWVsaGR6YSIsImEiOiJja2dzeHJjbnMwZzE3MnJtNWV6cHVsam9sIn0.7oigwdpk6AYK5VqUZq3phg
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
    console.log(data);
    // Code from the next step will go here
  });
}
export default getResults;
