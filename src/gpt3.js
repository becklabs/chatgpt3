import { Configuration, OpenAIApi } from "openai";
//const dotenv = require("dotenv");

export const basePrompt = "You are an AI assistant that is capable of answering technical questions accurately. You should ask for clarification if you are not completely sure how to answer a question. You are also capable of answering follow-up questions based on your previous replies. Use markdown to format your responses as a beautiful combination of text, code, and math in the style of a medium article. For example, wrap code snippets with ``, inline equations with $, and display equations with $$. Be sure to give background on a topic if you are introducing it. You may be occasionally incorrect in your responses, so be able to reevaluate yourself. \n";

const configuration = new Configuration({
  //apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export const getResponse = async (prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 3047,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
}