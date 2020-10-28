//Node Native
var https = require("https");

var options = {
  "method": "GET",
  "hostname": "api.parkmobile.io",
  "port": null,
  "path": "/availability/v1/availability?"+
            "provider_id=parking"+
            "&max_lat=33.768017"+
            "&max_long=-84.370436"+
            "&min_lat=33.745468"+
            "&min_long=-84.401037",
  "headers": {
    "x-api-key": "5f444dfa-b2e9-4cd5-b7e1-f70f90471ae2"
  }
};

var req = https.get(options, function (res) {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
