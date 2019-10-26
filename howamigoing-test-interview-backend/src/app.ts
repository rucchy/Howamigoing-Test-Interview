import * as express from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";

// create typeorm connection
createConnection().then(connection => {

    // create and setup express app
    const app = express();
    app.use(bodyParser.json());

    // register routes

    // start express server
    app.listen(3000);
});