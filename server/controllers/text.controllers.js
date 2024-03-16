// Controllers for sms routes

const { MessagingResponse } = require("twilio").twiml;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const post = async (req, res) => {
  const twiml = new MessagingResponse();
  const userRequest = req.body.Body || "";

  if (userRequest.trim().length === 0) {
    twiml.message("Please enter a valid prompt.");
    res.type("text/xml").send(twiml.toString());
  } else {
    try {
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        max_tokens:3000, 
        temperature:0.7, 
        top_p:1,
        prompt: userRequest,
        frequency_penalty:0.5, 
        presence_penalty:0.5,
      });
      twiml.message(response.data.choices[0].text);
      console.log(userRequest);
      console.log(response.data.choices[0].text);
      res.type("text/xml").send(twiml.toString());
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
        twiml.message(error.response.status + error.response.data);
        res.type("text/xml").send(twiml.toString());
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        twiml.message("An error occurred during your request.");
        res.type("text/xml").send(twiml.toString());
      }
    }
  }
};

module.exports = {
  post,
};
