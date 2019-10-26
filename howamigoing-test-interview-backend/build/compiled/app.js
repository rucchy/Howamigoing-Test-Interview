"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var typeorm_1 = require("typeorm");
// create typeorm connection
typeorm_1.createConnection().then(function (connection) {
    // create and setup express app
    var app = express();
    app.use(bodyParser.json());
    // register routes
    // start express server
    app.listen(3000);
});
//# sourceMappingURL=app.js.map