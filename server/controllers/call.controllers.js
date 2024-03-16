// Controllers for voice routes
const { VoiceResponse } = require("twilio").twiml;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const post = async (req, res) => {
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    speechTimeout: "auto",
    speechModel: "phone_call",
    input: "speech",
    action: `/voice/respond`,
  });

  gather.say("Hello! Welcome to Saathi! Please ask your question?");
  console.log("VOICE BOT SAYS: " + gather.toString() + "\n");
  res.send(twiml.toString());
};

const respond = async (req, res) => {
  const twiml = new VoiceResponse();
  const prompt = req.body["SpeechResult"];
  console.log("USER ASKED: " + prompt + "\n");
  try {
    const response = await generateResponse(prompt);
    twiml.say(response);
    console.log(response);
    twiml.pause();
    twiml.say("Thank you for using Saathi. We hope you have a good day!");
    twiml.hangup();
    res.type("text/xml").send(twiml.toString());
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.type("text/xml").send(twiml.toString());
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.type("text/xml").send(twiml.toString());
    }
  }
};

async function generateResponse(prompt) {
  const apiResponse = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    max_tokens:3000, 
    temperature:0.7, 
    top_p:1,
    prompt: prompt,
    frequency_penalty:0.5, 
    presence_penalty:0.5,
  });
  return apiResponse.data.choices[0].text;
}

module.exports = {
  post,
  respond,
};
