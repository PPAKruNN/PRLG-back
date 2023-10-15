import { Errors } from "../Errors/errors";
import httpStatus from "http-status";
import { Configuration, OpenAIApi } from "openai";
import { questions, allResponses } from "../database/db";
import { Questions } from "protocols/protocols";

type ReturnedQuestion = {
  createdQuestion: string;
  suggestedAnswers: string[];
}

async function postMessage({ questions }) {
  let prompt = concatenate(questions);
  let returnedQuestion: any = { createdQuestion: "", suggestedAnswers: [] };
  while (returnedQuestion.createdQuestion.length === 0 || allResponses.some((element) => element.question === returnedQuestion.createdQuestion)) {
    let completion = await handleGPT(prompt)
    returnedQuestion = JSON.parse(completion.data.choices[0].text);
  }

  return returnedQuestion
}

async function postCostumerQuestion(question: string) {
  const promptCostumer = `Tente responder à pergunta do cliente de forma sucinta. 
                  PERGUNTA DO CLIENTE: ${question};

                  Responda no formato: 

                  {
                    "answer": "SUA RESPOSTA"
                  }

                  Responda apenas baseado nas informações do contexto, se não encontrar a resposta
                  no contexto RESPONDA: "Não sei responder.". Segue o contexto: ${getProductData()}`;

  let returnedAnswer = "";
  while (returnedAnswer.length === 0) {
    let completion = await handleGPT(promptCostumer)
    returnedAnswer = JSON.parse(completion.data.choices[0].text).answer;
  }

  return returnedAnswer
}

async function handleGPT(prompt: string, temperature = 0.4) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    temperature,
    max_tokens: 100,
  });

  return completion
}

function concatenate(questions: Questions[]) {
  questions.forEach(element => {
    allResponses.push({ question: element.question, answer: element.answer })
  });
  const prompt = `Sempre faça apenas um JSON, sem texto explicativo, no formato:
                  {
                    "createdQuestion": "SUA PERGUNTA",
                    "suggestedAnswers": ["RESPOSTA 1", "RESPOSTA 2", "RESPOSTA 3"]
                  } 
                  A pergunda em createdQuestion deve ser específica sobre uma única característica do produto
                  sobre o qual fornecerei o contexto abaixo. Não faça uma pergunta sobre qualquer produto.
                  Nunca repita uma pergunta já feita. NÃO RESPONDA A PERGUNTA FEITA NA STRING DA PERGUNTA. 
                  O intuito dessa pergunta é construir uma descrição melhor detalhada do anuncio do 
                  produto. Segue as perguntas e respostas: `

  return prompt + allResponses.map((element) => `{ question: ${element.question}, answer: ${element.answer} }`).join("\n")
}

function getProductData() {
  return allResponses.map((element) => `{ question: ${element.question}, answer: ${element.answer} }`).join("\n")
}

export const chatService = {
  postMessage,
  postCostumerQuestion,

};
