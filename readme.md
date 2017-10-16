# Alexa Kings Cup

Alexa Kings Cup is a social hydration game based on the popular party game King's Cup.
You can view our demo page [here!](http://alexakingscup.com/)

<img src="docs/amazon-echo.jpg" />

## Features

* Initiate skill with wake word.
* Users can verbally ask for a card.
* Alexa will respond with card rules and associated sound effect or music.
* Players can ask for help if clarification is needed.

## Technology

This skill was created using the AWS platform.

* [Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit) was implemented to create the skill.

```{
  "intents": [
    {
      "name": "AMAZON.CancelIntent",
      "samples": []
    },
    {
      "name": "AMAZON.HelpIntent",
      "samples": []
    },
    {
      "name": "AMAZON.StartOverIntent",
      "samples": []
    },
    {
      "name": "AMAZON.StopIntent",
      "samples": []
    },
    {
      "name": "NextCardIntent",
      "samples": [
        "draw",
        "next",
        "draw card",
        "next card"
      ],
      "slots": []
    }
  ]
}
```

* [AWS Lambda](https://aws.amazon.com/lambda/?sc_channel=PS&sc_campaign=pac_ps_q4&sc_publisher=google&sc_medium=lambda_b_pac_q42017&sc_content=lambda_e&sc_detail=aws%20lambda&sc_category=lambda&sc_segment=webp&sc_matchtype=e&sc_county=US&sc_geo=namer&sc_outcome=pac&s_kwcid=AL!4422!3!224596727998!e!!g!!aws%20lambda&ef_id=VkJSCQAABCdrUXCk:20171015223725:s) was used to host our code.

```
kingsCup.launch(function(req, res) {
  res.session("cards", cards);
  var Speech = require("ssml-builder");
  var choices = [
    "https://s3.us-east-2.amazonaws.com/alexakingscup/Alexa20thCenturyFlute.mp3",
    "https://s3.us-east-2.amazonaws.com/alexakingscup/yakety.mp3",
    "https://s3.us-east-2.amazonaws.com/alexakingscup/AlexaJurassicParkFlute.mp3"
  ];
  var randSound = choices[Math.floor(Math.random() * choices.length)];
  var speech = new Speech()
    .say("Welcome To Kings Cup!. To draw a card say next or draw")
    .audio(`${randSound}`);
  var speechOutput = speech.ssml(true);
  res.say(speechOutput);
  res.shouldEndSession(false);
});
```

* [Node.js](https://nodejs.org/en/) was the language that we chose to write our code in, which allowed for seamless integration with AWS lambda. 

* The [alexa-app](https://github.com/alexa-js/alexa-app) node package was also used.
