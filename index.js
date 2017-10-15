var alexa = require("alexa-app");
var chatskills = require("chatskills");
var readlineSync = require("readline-sync");

var kingsCup = new alexa.app("kingscup");

var cards = {
	ace: { numCards: 4, response: "Waterfall. Keep drinking until the person to right of you stops drinking." },
	two: { numCards: 4, response: "You. Choose a person to take a drink!" },
	three: { numCards: 4, response: "Me. Bummer you drew the card. You have to take a drink!" },
	four: { numCards: 4, response: "Floor. QUICK GET ON THE FLOOR! LAST ONE ON THE FLOOR DRINKS!" },
	five: { numCards: 4, response: "Jive. Show me your dance moves. Create one dance move, and the person to right must add on top of that until someone forgets" },
	six: { numCards: 4, response: "Chicks. LADIES!!!!" },
	seven: { numCards: 4, response: "Heaven. QUICK POINT UP. Last person to point up drinks!" },
	eight: { numCards: 4, response: "Mate. Choose your drinking partner for the rest of the game." },
	nine: { numCards: 4, response: "Rhyme. Okay rappers. Lets get our latest song going. Choose a word and next person rhymes with it until someone can't" },
	ten: { numCards: 4, response: "Categories. Choose a category and each person must name an item in that category. First person to not name an item drinks" },
	jack: { numCards: 4, response: "Men. GET DRINKING DUDES" },
	queen: { numCards: 4, response: "Question Master. You are now the question master, until a new one is knighted. If someone answers your question they drink, if they call you out you drink." },
	king: { numCards: 5, response: "Rule Maker. Make a rule everyone must follow for the rest of the game! Unless its the last king you drink the cup!" }
};

kingsCup.launch(function(req, res) {
	// Store cards in a session
res.session("cards", cards);
	var Speech = require('ssml-builder');
	var choices = [ "https://s3.us-east-2.amazonaws.com/alexakingscup/Alexa20thCenturyFlute.mp3",
									"https://s3.us-east-2.amazonaws.com/alexakingscup/yakety.mp3",
									"https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaJurassicParkFlute.mp3"];
	var randSound = choices[Math.floor(Math.random()*choices.length)];
	var speech = new Speech()
	  .say('Welcome To Kings Cup!. To draw a card say next')
		.audio(`${randSound}`)
	// change 'true' to 'false' if you want to include the surrounding <speak/> tag
	var speechOutput = speech.ssml(true);
	res.say(speechOutput);
	res.shouldEndSession(false);
});

kingsCup.intent("AMAZON.StopIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var stopOutput = "Don't You Worry. I'll be back.";
    response.say(stopOutput);
  }
);

kingsCup.intent("AMAZON.CancelIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var cancelOutput = "No problem. Request cancelled.";
    response.say(cancelOutput);
  }
);

kingsCup.sessionEnded(function(req, res) {
	res.say("Thanks for playing!");
});

kingsCup.intent ("AMAZON.HelpIntent", {
    "slots": {},
    "utterances": []
  },
  function(request, response) {
    var helpOutput = "You can say 'next' or ask 'draw'. You can also say stop or exit to quit.";
    var reprompt = "What would you like to do?";
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
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
		if (card[randCard].numCards === 0 ||card[randCard].numCards < 0 ) {
			delete card[randCard]
			res.session("cards", card);
			card = req.session("cards");
			cardKeys = Object.keys(card);
			randCard = cardKeys[Math.floor(Math.random() * cardKeys.length)];
			var response = card[randCard].response;
			card[randCard].numCards -= 1;
		} else {
			response = card[randCard].response;
			card[randCard].numCards -= 1;
			if (card[randCard].numCards === 0) {
				delete card[randCard]
				res.session("cards", card);
			}
	}
		// if (card[randCard].numCards === 0) {
		// 	delete card[randCard]
		// }
		if (randCard === "ace") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaTheBadTouchTechno.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt("HELLO");
			res.shouldEndSession(false);

			res.session("cards", card);

		} else if (randCard === "two" ){
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaSadTrombone.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);
		} else if (randCard === "three"){
			var Speech = require('ssml-builder');
			var speech = new Speech()
				.say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaExtendedAirhorn.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);

		}else if (randCard === "four"){
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaTurnDownForWhat.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);


		} else if (randCard === "five"){
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaSandstorm.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);

		}else if (randCard === "six") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaAquaBarbieGirlBootlegCut.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);


		}else if (randCard === "seven") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaRooster.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);


		} else if (randCard === "eight") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaPriceIsRightFail.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);

		} else if (randCard === "nine") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaYeahShittyFlute.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);

		} else if (randCard === "ten") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaBakerStreet.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);

		} else if (randCard === "jack") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaBruh.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);


		} else if (randCard === "queen") {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('500ms')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/yakety.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput).
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);


		}else if (randCard === "king" && card[randCard].numCards === 1) {
			var Speech = require('ssml-builder');
			var speech = new Speech()
			.say(`You drew a ${randCard} and its the last King! DRINK THE CUP!`)
			.pause('500ms')
			.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaSadTrombone.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);


			res.session("cards", card);




		} else if (randCard === "king" && card[randCard].numCards > 1) {
			var Speech = require('ssml-builder');

			var speech = new Speech()
			.say(`You drew a ${randCard} and its ${response}`)
			.pause('500ms')
			.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaLilJonYeah.mp3')

			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.shouldEndSession(false);

			res.session("cards", card);

		} else {
			var Speech = require('ssml-builder');

			var speech = new Speech()
			  .say(`You drew a ${randCard} and its ${response}`)
				.pause('2s')
				.audio('https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaPerfectFart.mp3')
			// change 'true' to 'false' if you want to include the surrounding <speak/> tag
			var speechOutput = speech.ssml(true);
			var reprompt = "What would you like to do?";
			res.say(speechOutput)
			res.reprompt(reprompt);
			res.session("cards", card);
			res.shouldEndSession(false);
		}
	}
);

module.exports = kingsCup;
