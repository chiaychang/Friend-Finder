// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//  (DATA)
// =============================================================
var users = [{
    "name": "Hello Kitty",
    "photo": "http://static.tvtropes.org/pmwiki/pub/images/Hello_Kitty_Pink_2981.jpg",
    "scores": ["2", "2", "2", "3", "2", "4", "2", "2", "2", "2"]
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});


//Current friends- when requested, provides JSON
app.get("/api/friends", function(req, res) {
    return res.json(users);
});


// Create new friend object- take survey data in JSON input
app.post("/api/friends", function(req, res) {
    var userData = req.body;
    console.log(userData);

    var currentUserScore = userData.scores;
    console.log(currentUserScore);
    var smallestDiff = 100;

    for (var i = 0; i < users.length; i++) {

        var totalDifference = 0;
        var bestMatch;
        var existingUserScore = users[i].scores;
        console.log(existingUserScore);

        for (j = 0; j < 10; j++) {

            var difference = parseInt(existingUserScore[j]) - parseInt(currentUserScore[j]);

            if (difference < 0) {
                difference = -(difference);
            }
            console.log(difference);
            totalDifference += difference;
        }
        console.log(totalDifference);
        if (totalDifference < smallestDiff) {
            smallestDiff = totalDifference;
            bestMatch = users[i];
        }
    }

    console.log(bestMatch);
    users.push(userData);

    return res.json(bestMatch);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
