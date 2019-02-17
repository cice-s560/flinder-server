require('dotenv').config();

const server = require("./app");
const mongoose = require('mongoose');
const chalk = require('chalk');
const emoji = require('node-emoji');

<<<<<<< HEAD

const port = process.env.PORT || 3001;
const db_port = process.env.DB_PORT || 27018;
const db_name = process.env.DB_NAME || 'flinderdb';
const db_url = process.env.DB_URL || 'localhost';


server.listen(port, () => {
    mongoose.connect(`mongodb://${db_url}:${db_port}/${db_name}`, { useNewUrlParser: true }, err => {
       if (err) { 
           throw err;
       }

       console.info(chalk.black.bgMagenta(`${emoji.get('heart')}   WELLCOME TO FLINDER! ${emoji.get('heart')}  
 running at ${port}    
 Good luck! and remember: ${emoji.get('coffee')}   + ${emoji.get('smoking')}  = ${emoji.get('poop')}  `))
=======
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
>>>>>>> d76d084300729185a092b9bcdc82cae7ba022965
    });
});