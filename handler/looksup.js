'use strict';

var fs = require("fs");

exports.handler = (event, context, callback) => {

    let category = (event.pathParameters || {}).category || false;

    if (category) {
        switch (event.httpMethod) {
            case "GET":
                if (category.toLowerCase() === "roles") {
                    var looksup_roles = JSON.parse(fs.readFileSync("mock_data/looksup/roles.json"));
                    callback(null, {body: JSON.stringify(looksup_roles), statusCode: 200});
                } else {
                    //Empty for now
                    callback(null, {statusCode: 200});
                }
                break;
            case "OPTIONS":
                callback(null, {statusCode: 200});
                break;
            default:
                // Send HTTP 501: Not Implemented
                console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
                callback(null, {statusCode: 501});
        }
    } else {
        // Empty for now
        callback(null, {statusCode: 200});
    }

}
