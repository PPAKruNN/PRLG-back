import { Errors } from "../Errors/errors";
import httpStatus from "http-status";
import { Configuration, OpenAIApi } from "openai";
import { answers, questions } from "../database/db";
import { Questions } from "protocols/protocols";

async function postMessage({ questions, previousPrompt, isFirstChat }) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  let text = ""
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: Boolean(isFirstChat) ? concatenate(text, questions) : concatenatePrevious(previousPrompt, questions),
    temperature: 0.6,
  });

  const returnedQuestion = completion.data.choices[0].text.replace("\n", '');

  return returnedQuestion.split('?')[0];
}

function concatenatePrevious(previousPrompt: string, questions: Questions[]){
  questions.forEach(element => {
    previousPrompt += element.question + ": " + element.answer + " \n "
  });
  return previousPrompt
}

function concatenate(text: string, questions: Questions[]){
  questions.forEach(element => {
    text += element.question + ": " + element.answer + " \n "
  });
  const prompt = `Sempre faça apenas uma pergunta e RETORNE APENAS A STRING, sem texto explicativo. Retorne essa pergunta (apenas a pergunta) em formato STRING "SUA PERGUNTA". Nunca repita uma pergunta já feita. NÃO RESPONDA A PERGUNTA FEITA. O intuito dessa pergunta é construir uma descrição melhor detalhada do anuncio do produto. Segue as perguntas e respostas: `
  return prompt + text
}

export const chatService = {
  postMessage,

};
