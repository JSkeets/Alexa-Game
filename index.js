var alexa = require("alexa-app");
var chatskills = require("chatskills");
var readlineSync = require("readline-sync");

var kingsCup = new alexa.app("kingscup");

// var cards = [
// 	"ace",
// 	"two",
// 	"three",
// 	"four",
// 	"five",
// 	"six",
// 	"seven",
// 	"eight",
// 	"nine",
// 	"ten",
// 	"jack",
// 	"queen",
// 	"king"
// ];

var cards = {
	// ace: { numCards: 4, response: "Waterfall" },
	// two: { numCards: 4, response: "You" },
	// three: { numCards: 4, response: "Me" },
	// four: { numCards: 4, response: "Floor" },
	// five: { numCards: 4, response: "Jive" },
	// six: { numCards: 4, response: "Chicks" },
	// seven: { numCards: 4, response: "Heaven" },
	// eight: { numCards: 4, response: "Mate" },
	// nine: { numCards: 4, response: "Rhyme" },
	// ten: { numCards: 4, response: "Categories" },
	jack: { numCards: 1, response: "Men" },
	queen: { numCards: 2, response: "Question Master" },
	king: { numCards: 2, response: "Rule Maker" }
};

kingsCup.launch(function(req, res) {
	// Store cards in a session
res.session("cards", cards);
	var Speech = require('ssml-builder');

	var speech = new Speech()
	  .say('Welcome To Kings Cup!. To draw a card say draw')
		.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/yakety.mp3')
	// change 'true' to 'false' if you want to include the surrounding <speak/> tag
	var speechOutput = speech.ssml(true);
	res.say(speechOutput);
	res.shouldEndSession(false);
});

kingsCup.sessionEnded(function(req, res) {
	res.say("Thanks for playing!");
});

kingsCup.intent(
	"NextCardIntent",
	{
		slot: {},
	},
	function(req, res) {
		var card = req.session("cards");

		var cardKeys = Object.keys(card);
		var randCard = cardKeys[Math.floor(Math.random() * cardKeys.length)];
		var response = card[randCard].response;
		card[randCard].numCards -= 1;

		if (card[randCard].numCards === 0 && randCard !== "king") {
			var Speech = require('ssml-builder');

			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.audio('https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			res.say(speechOutput);
			res.shouldEndSession(false);
			delete card[randCard];
			res.session("cards", card);
		} else if (randCard === "king" && card[randCard].numCards === 0) {
			var Speech = require('ssml-builder');

			var speech = new Speech()
			  .say(`You drew a ${randCard} and its the last King! DRINK THE CUP!`)
				.audio('https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			res.say(speechOutput);
			delete card[randCard];
			res.session("cards", card);

		} else {
			var Speech = require('ssml-builder');

			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.audio('https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			res.say(speechOutput);
			res.session("cards", card);
			res.shouldEndSession(false);
		}
	}
);

module.exports = kingsCup;
