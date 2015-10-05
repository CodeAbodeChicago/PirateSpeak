/*
	Pirate Translation API: The Client

	Client-Side Cheatsheet
	======================
	document.getElementById("id")
	form.elements["name"]
	form.onsumbit = ...
	event.preventDefault()
	inputElement.value
*/


// _____________________________________________________________________________
// Setting up API requests

var pirateEndpoint = "/piratespeak"
var pirateParameters = {
	text: ""
}


// _____________________________________________________________________________
// Getting elements from the DOM

var wrapDiv = document.getElementById("wrap");
var form = document.getElementById("translate-form");
var englishInput = form.elements["english-text"];
var pirateText = document.getElementById("pirate-text");


// _____________________________________________________________________________
// Setting up the events so that the APIs are called when a query is entered 
// into the form

form.onsubmit = function (event) {
	event.preventDefault();

	// Validate
	if (englishInput.value === "") return;

	clearTranslation();

	// Call the API
	pirateParameters.text = englishInput.value;
	var pirateApiCaller = new ApiCaller(pirateEndpoint, pirateParameters);
	pirateApiCaller.getJson(function (json) {
		for (var i = 0; i < json.translation.length; i += 1) {
			var character = json.translation[i];
			if (character === "\n") pirateText.innerHTML += "<br>";
			else pirateText.innerHTML += character;
		}

	});

}
form.oninput = clearTranslation;
englishInput.focus();

function clearTranslation() {
	pirateText.innerHTML = "";
}