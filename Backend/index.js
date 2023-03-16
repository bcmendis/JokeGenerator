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
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(bodyParser.json());

app.options("/joke", cors());
// Set up the ChatGPT endpoint
app.post("/joke", cors(), async (req, res) => {
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
