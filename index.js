require('dotenv').config()

const server = require("./app");
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;
const dbURL = process.env.DB_URL || "localhost";
const dbPort = process.env.DB_PORT || 27018;
const dbName = process.env.DB_NAME || "basic_auth";

server.listen(port, () => {
    mongoose.connect(`mongodb://${dbURL}:${dbPort}/${dbName}`, {useNewUrlParser: true}, err => {
       if (err) {
           throw err;
       }

       console.log(`API running at port ${port}`);
    });
});