// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var htmlRoutes = require('./app/routing/htmlRoutes.js');
// var apiRoutes = require('./app/routing/apiRoutes.js');

// Sets up the Express App
// =============================================================
var PORT = 5000;
var app = express();
app.set('port', (process.env.PORT || 5000));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "app/public"));

// Starts the server to begin listening
// =============================================================
app.listen((process.env.PORT || 5000), function() {
    console.log("App listening on PORT " + PORT);
});

app.use(require('./app/routing/apiRoutes.js'));
app.use(require('./app/routing/htmlRoutes.js'));
