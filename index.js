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

	// Welcome the user
	res.say("Welcome to King's Cup. How many players are there?");
	res.shouldEndSession(false);
});

kingsCup.sessionEnded(function(req, res) {
	res.say("Thanks for playing!");
});

// Create an intent.
kingsCup.intent(
	"StartIntent",
	{
		slots: { numPlayers: "NUMPLAYERS" },
		utterances: ["{there |}{are|is|} {-|numPlayers}"]
	},
	function(req, res) {
		res.say(`Okay there are ${req.slot("numPlayers")} is that correct?`);
		res.shouldEndSession(false);
	}
);

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
			res.say(`You drew a ${randCard} and its ${response}`);
			res.shouldEndSession(false);
			delete card[randCard];
			res.session("cards", card);
		} else if (randCard === "king" && card[randCard].numCards === 0) {
			res.say(`You drew a ${randCard} and its the last King! DRINK THE CUP!`);
			delete card[randCard];
			res.session("cards", card);
		} else {
			res.say(`You drew a ${randCard} and its ${response}`);
			res.session("cards", card);
			res.shouldEndSession(false);
		}
	}
);

module.exports = kingsCup;
