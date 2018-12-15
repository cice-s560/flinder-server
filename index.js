require('dotenv').config()

const server = require("./app");
const mongoose = require('mongoose');

server.listen(process.env.PORT, () => {
    mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/my_database`, err => {
       if (err) {
           throw err;
       }

       console.log("API running");
    });
});