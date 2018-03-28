'use strict';

var fs = require("fs");

exports.handler = (event, context, callback) => {

  let id = (event.pathParameters || {}).id || false;
  if(id){
    switch (event.httpMethod) {
      case "GET":
        var opcos = JSON.parse(fs.readFileSync("mock_data/opcos.json"));
        opcos.data = opcos.data.filter(opco => opco.OpCo === id);
        callback(null, {body: JSON.stringify(opcos), statusCode: 200});
        break;
      default:
        // Send HTTP 501: Not Implemented
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, {statusCode: 501});
    }
  } else {
    switch (event.httpMethod) {
      case "GET":
        var opcos = JSON.parse(fs.readFileSync("mock_data/opcos.json"));
        callback(null, {body: JSON.stringify(opcos), statusCode: 200});
        break;
      default:
        // Send HTTP 501: Not Implemented
        console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
        callback(null, {statusCode: 501});
    }
  }
}
