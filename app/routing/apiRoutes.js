var users = require('../data/friends.js');
var express = require('express');
var router = express.Router();


//Current friends- when requested, provides JSON
router.get("/api/friends", function(req, res) {
    return res.json(users);
});


// Create new friend object- take survey data in JSON input
router.post("/api/friends", function(req, res) {
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

 module.exports = router;
