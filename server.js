// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var htmlRoutes = require('./app/routing/htmlRoutes.js');
// var apiRoutes = require('./app/routing/apiRoutes.js');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + "app/public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.use(require('./app/routing/apiRoutes.js'));
app.use(require('./app/routing/htmlRoutes.js'));
