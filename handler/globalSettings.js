'use strict';

var fs = require("fs");

exports.handler = (event, context, callback) => {

  let id = (event.pathParameters || {}).id || false;

  if(id){
    switch (event.httpMethod) {
      case "GET":
        // Load mock data in mock_data/globalSettings.json and return
        var global_settings_json = JSON.parse(fs.readFileSync("mock_data/globalSettings.json"));
        callback(null, {body: JSON.stringify(global_settings_json), statusCode: 200});
        break;
      case "POST":
        // Send HTTP 200: OK, mock a successful POST
        callback(null, {statusCode: 200});
        break;
      case "PUT":
        // Send HTTP 200: OK, mock a successful PUT
        callback(null, {statusCode: 200});
        break;
      default:
        // Send HTTP 501: Not Implemented
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, {statusCode: 501});
    }
  } else {
      console.log("Error: unknown url");
      callback(null, {statusCode: 400});
  }
}
