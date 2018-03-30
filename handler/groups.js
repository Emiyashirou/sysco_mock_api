'use strict';

var fs = require("fs");

exports.handler = (event, context, callback) => {

    let id = (event.pathParameters || {}).id || false;

    if (id) {
        switch (event.httpMethod) {
            case "GET":
                var groups_json = JSON.parse(fs.readFileSync("mock_data/groups.json"));
                var spe_group = {};
                groups_json.data.map(group => {
                    if (group.Id.toString() === id) {
                        spe_group = group;
                    }
                });
                callback(null, {body: JSON.stringify({data: spe_group}), statusCode: 200});
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
                var groups_json = JSON.parse(fs.readFileSync("mock_data/groups.json"));
                callback(null, {body: JSON.stringify(groups_json), statusCode: 200});
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
