'use strict';

var fs = require("fs");

exports.handler = (event, context, callback) => {

    let id = (event.pathParameters || {}).id || false;
    if (id) {
        switch (event.httpMethod) {
            case "GET":
                var users_json = JSON.parse(fs.readFileSync("mock_data/users.json"));
                var spe_user = {};
                users_json.data.map(user => {
                    if (user.Id.toString() === id) {
                        spe_user = user;
                    }
                });
                callback(null, {body: JSON.stringify({data: spe_user}), statusCode: 200});
                break;
            case "PUT":
                callback(null, {statusCode: 200});
                break;
            default:
                console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
                callback(null, {statusCode: 501});
        }
    } else {
        switch (event.httpMethod) {
            case "GET":
                var users_json = JSON.parse(fs.readFileSync("mock_data/users.json"));
                callback(null, {body: JSON.stringify(users_json), statusCode: 200});
                break;
            case "POST":
                callback(null, {statusCode: 200});
                break;
            case "OPTIONS":
                callback(null, {statusCode: 200});
                break;
        }
    }
}
