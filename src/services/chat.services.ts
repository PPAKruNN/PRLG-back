import { Errors } from "../Errors/errors";
import httpStatus from "http-status";
import { Configuration, OpenAIApi } from "openai";
import { answers, questions } from "../database/db";

async function postMessage(text: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: generatePrompt(text),
    temperature: 0.6,
  });
  // Se a resposta for aceitável fazer outra requisição para pegar os 
  // autocompletes para pŕoxima pergunta ou já pedi-los antes

  console.log(completion.data);

  return completion.data.choices[0].text;
}

function generatePrompt(text: string) {
  const capitalizedAnimal =
    text[0].toUpperCase() + text.slice(1).toLowerCase();
  return `
    Answer only yes or no. Is the following answer acceptable for the question: ${questions[0].questions[answers.length]}?

    ${text}
  `;
}

export const chatService = {
  postMessage,

};
