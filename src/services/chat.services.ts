import { Errors } from "../Errors/errors";
import httpStatus from "http-status";
import { Configuration, OpenAIApi } from "openai";
import { questions, allResponses } from "../database/db";
import { Questions } from "protocols/protocols";

async function postMessage({ questions, isFirstChat, previousPrompt  }) {
  let text = ""
  let prompt = Boolean(isFirstChat) ? concatenate(text, questions) : concatenatePrevious(previousPrompt, questions)
  console.log(prompt)
  let returnedQuestion = ""
  while (returnedQuestion.length === 0) {
    let completion = await handleGPT(prompt)
    // console.log(completion.data.choices[0])
    returnedQuestion = completion.data.choices[0].text.replace("\n", '');
  }

  return {
    createdQuestion: returnedQuestion.split('?')[0].replace(/[^a-zA-ZÀ-ú\s]/g, ""),
    prompt,
  }
}

async function handleGPT (prompt: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    temperature: 0.6,
  });
  return completion
}

function concatenatePrevious(previousPrompt: string, questions: Questions[]){
  questions.forEach(element => {
    previousPrompt += " | " + element.question + ": " + element.answer + " \n "
    allResponses.push({question: element.question, awns: element.answer})
  });
  return previousPrompt
}

function concatenate(text: string, questions: Questions[]){
  questions.forEach(element => {
    text += " | " + element.question + ": " + element.answer + " \n "
    allResponses.push({question: element.question, awns: element.answer})
  });
  const prompt = `Sempre faça apenas uma pergunta e RETORNE APENAS A STRING, sem texto explicativo. Retorne essa pergunta (apenas a pergunta) em formato STRING "SUA PERGUNTA". Nunca repita uma pergunta já feita. NÃO RESPONDA A PERGUNTA FEITA. O intuito dessa pergunta é construir uma descrição melhor detalhada do anuncio do produto. Segue as perguntas e respostas: `
  return prompt + text
}

export const chatService = {
  postMessage,
};
