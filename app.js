/*
	Node Server

	This server dudette sends static files at localhost:8080/ and acts as an API
	at localhost:8080/piratespeak
*/

var pirateDict = require("./pirate-dictionary.js");

var express = require("express");
var app = express();

// Serve the public folder as if it were located at "localhost:8080/"
var path = require('path');
var publicPath = path.join(__dirname, "public"); 
app.use(express.static(publicPath));

app.get("/piratespeak", function(req, res) {
	var qs = req.query; // Shorthand, since we'll be using this variable often

	// Results to send back
	var results = {
		status: {
			version: 1.0,
			message: "Success"
		},
		translation: ""
	};

	if (qs.text === undefined) {
		results.status.message = "Bad request ye scurvy dog";
		res.status(400).send(results);
		return;
	}

	results.translation = pirateDict.translate(qs.text);

	res.send(results);
}); 

// 404 - catching anything not handled above
app.all("*", function(req, res) {
	res.status(404).send("404. Nothing here, keep moving.");
});

app.listen(8080, function (err) {
	if (err) throw err;
	console.log("Waiting for requests...");
});
