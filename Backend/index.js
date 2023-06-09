const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.options("/joke", cors());
app.options("/joke", (req, res) => {
  res.sendStatus(200).end();
});
// app.use(
//   cors({
//     origin: "https://joke-gpt-bcmendis.vercel.app",
//     optionsSuccessStatus: 200,
//   })
// );

// Set up the ChatGPT endpoint
app.post("/joke", async (req, res) => {
  // Get the prompt from the request
  const prompt = req.body.prompt;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 1000,
  });
  res.send(completion.data.choices[0].text);
});

app.listen(5000);

module.exports = app;
