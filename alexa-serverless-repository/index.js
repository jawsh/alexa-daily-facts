/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Daily Facts';
const GET_FACT_MESSAGE = 'Here\'s your daily fact: ';
const HELP_MESSAGE = 'You can say tell me a daily fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
'There are more Barbie dolls in Italy than there are Canadians in Canada.',
'It is physically impossible for pigs to look up into the sky.',
'If you fart consistently for 6 years and 9 months, enough gas is produced to create explosion that is equal to an atomic bomb.',
'To escape the grip of a crocodile\'s jaws, push your thumbs into its eyeballs - it will let you go instantly.',
'In England, the Speaker of the House is not allowed to speak.',
'Every continent begins and ends in the same letter.',
'Every continent has a city called Rome.',
'Two thirds of the world\'s eggplant is grown in New Jersey.',
'The electric chair was invented by a dentist.',
'Right handed people live on average nine years longer than left handed people do.',
'The sentence ‘the quick brown fox jumps over the lazy dog’ uses every letter in the English language.',
'No president of the United States was an only child.',
'TYPEWRITER is one of the longest words that can be made using the letters on only one row of the keyboard.',
'If the population of China walked past you in single file, the line would never end because of the rate of reproduction.',
'The word racecar and kayak are the same whether they are read left to right or right to left.',
'A snail can sleep for 3 years.',
'American Airlines saved $40,000 in 1987 by eliminating one olive from each salad served in first-class.',
'China has more English speakers than the United States.',
'An average chocolate bar has 8 insects\' legs in it.',
'An average human eats 8 spiders in their lifetime at night.',
'A cockroach can live nine days without its head before it starves to death.',
'Donald Duck comics were banned in Finland because Donald Duck does not wear pants.',
'STEWARDESSE is one of the longest words typed with only the left hand.',
'Shakespeare invented the word "assassination" and "bump".',
'Marilyn Monroe had six toes.',
'By the age of 65 an average person will have seen 2,000,000 commercials.'
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
