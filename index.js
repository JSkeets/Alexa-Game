var alexa = require("alexa-app");
var kingsCup = new alexa.app("kingscup");

var cards = {
  ace: {
    numCards: 4,
    response: "Waterfall",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaTheBadTouchTechno.mp3"
  },
  two: {
    numCards: 4,
    response: "You",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaSadTrombone.mp3"
  },
  three: {
    numCards: 4,
    response: "Me",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaExtendedAirhorn.mp3"
  },
  four: {
    numCards: 4,
    response: "Floor",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaTurnDownForWhat.mp3"
  },
  five: {
    numCards: 4,
    response: "Jive",
    audio: "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaSandstorm.mp3"
  },
  six: {
    numCards: 4,
    response: "Chicks",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaAquaBarbieGirlBootlegCut.mp3"
  },
  seven: {
    numCards: 4,
    response: "Heaven",
    audio: "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaRooster.mp3"
  },
  eight: {
    numCards: 4,
    response: "Mate",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaPriceIsRightFail.mp3"
  },
  nine: {
    numCards: 4,
    response: "Rhyme",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaYeahShittyFlute.mp3"
  },
  ten: {
    numCards: 4,
    response: "Categories",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaBakerStreet.mp3"
  },
  jack: {
    numCards: 4,
    response: "Men",
    audio: "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaBruh.mp3"
  },
  queen: {
    numCards: 4,
    response: "Question Master",
    audio: "https://s3.us-east-2.amazonaws.com/alexakingscup/yakety.mp3"
  },
  king: {
    numCards: 5,
    response: "Rule Maker",
    audio:
      "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaLilJonYeah.mp3"
  }
};

kingsCup.launch(function(req, res) {
  // Store cards in a session
  res.session("cards", cards);
  var Speech = require("ssml-builder");
  var choices = [
    "https://s3.us-east-2.amazonaws.com/alexakingscup/Alexa20thCenturyFlute.mp3",
    "https://s3.us-east-2.amazonaws.com/alexakingscup/yakety.mp3",
    "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaJurassicParkFlute.mp3"
  ];
  var randSound = choices[Math.floor(Math.random() * choices.length)];
  var speech = new Speech()
    .say("Welcome To Kings Cup!. To draw a card say next")
    .audio(`${randSound}`);
  // change 'true' to 'false' if you want to include the surrounding <speak/> tag
  var speechOutput = speech.ssml(true);
  res.say(speechOutput);
  res.shouldEndSession(false);
});

kingsCup.intent(
  "AMAZON.StopIntent",
  {
    slots: {},
    utterances: []
  },
  function(request, response) {
    var stopOutput = "Don't You Worry. I'll be back.";
    response.say(stopOutput);
  }
);

kingsCup.intent(
  "AMAZON.CancelIntent",
  {
    slots: {},
    utterances: []
  },
  function(request, response) {
    var cancelOutput = "No problem. Request cancelled.";
    response.say(cancelOutput);
  }
);

kingsCup.sessionEnded(function(req, res) {
  res.say("Thanks for playing!");
});

kingsCup.intent(
  "AMAZON.HelpIntent",
  {
    slots: {},
    utterances: []
  },
  function(request, response) {
    var helpOutput =
      "You can say 'next' or ask 'draw'. You can also say stop or exit to quit.";
    var reprompt = "What would you like to do?";
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response
      .say(helpOutput)
      .reprompt(reprompt)
      .shouldEndSession(false);
  }
);
kingsCup.intent(
  "NextCardIntent",
  {
    slot: {}
  },
  function(req, res) {
    var card = req.session("cards");

    var cardKeys = Object.keys(card);
    var randCard = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    if (card[randCard].numCards === 0 || card[randCard].numCards < 0) {
      delete card[randCard];
      res.session("cards", card);
      card = req.session("cards");
      cardKeys = Object.keys(card);
      randCard = cardKeys[Math.floor(Math.random() * cardKeys.length)];
      card[randCard].numCards -= 1;
    } else {
      card[randCard].numCards -= 1;
      if (card[randCard].numCards === 0) {
        delete card[randCard];
        res.session("cards", card);
      }
    }
    var response = card[randCard].response;
    var audioClip = card[randCard].audio;
    if (randCard === "king" && card[randCard].numCards === 1) {
      response = `the last King! DRINK THE CUP!`;
      audioClip =
        "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaSadTrombone.mp3";
    }
    var Speech = require("ssml-builder");
    var speech = new Speech()
      .say(`You drew a ${randCard} and its ${response}`)
      .pause("500ms")
      .audio(`${audioClip}`);
    // change 'true' to 'false' if you want to include the surrounding <speak/> tag
    var speechOutput = speech.ssml(true);
    var reprompt = "What would you like to do?";
    res.say(speechOutput);
    res.reprompt("HELLO");
    res.shouldEndSession(false);

    res.session("cards", card);
  }
);

module.exports = kingsCup;
