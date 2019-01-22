require('dotenv').config();

const server = require("./app");
const mongoose = require('mongoose');
const chalk = require('chalk');
const emoji = require('node-emoji');


const port = process.env.PORT || 3001;
const db_port = process.env.DB_PORT || 27018;
const db_name = process.env.DB_NAME || 'flinderdb';
const db_url = process.env.DB_URL || 'localhost';


server.listen(port, () => {
    mongoose.connect(`mongodb://${db_url}:${db_port}/${db_name}`, err => {
       if (err) { 
           throw err;
       }

       console.info(chalk.black.bgMagenta(`${emoji.get('heart')}   WELLCOME TO FLINDER! ${emoji.get('heart')}  
 running at ${port}    
 Good luck! and remember: ${emoji.get('coffee')}   + ${emoji.get('smoking')}  = ${emoji.get('poop')}  `))
    });
});