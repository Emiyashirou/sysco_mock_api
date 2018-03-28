'use strict';

var fs = require("fs");

exports.handler = (event, context, callback) => {

  let id = (event.pathParameters || {}).id || false;

  if(id){
    switch (event.httpMethod) {
      case "GET":
        var locations_json = JSON.parse(fs.readFileSync("mock_data/locations.json"));
        var spe_location = {};
        locations_json.data.map(location => {
          if(location.Id.toString() === id){
            spe_location = location;
          }
        });
        callback(null, {body: JSON.stringify({data: spe_location}), statusCode: 200});
        break;
      case "POST":
        callback(null, {statusCode: 200});
        break;
      default:
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, {statusCode: 501});
    }
  } else {
      switch (event.httpMethod) {
        case "GET":
          var locations_json = JSON.parse(fs.readFileSync("mock_data/locations.json"));
          callback(null, {body: JSON.stringify(locations_json), statusCode: 200});
          break;
        case "PUT":
          callback(null, {statusCode: 200});
          break;
      }
  }
}
