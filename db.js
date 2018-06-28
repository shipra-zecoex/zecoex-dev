'use strict';

// Module dependencies
var mysql = require('mysql');
var config = require('./config/config.json');

var connection = mysql.createConnection({
    url     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database,
    connectTimeout: 30000
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database" +err);
    }
});

module.exports = connection;