var settings = require('../settings');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(settings.db);

module.exports = db;