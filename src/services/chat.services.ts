import { Errors } from "../Errors/errors";
import httpStatus from "http-status";
import { Configuration, OpenAIApi } from "openai";
import { questions, allResponses } from "../database/db";
import { Questions } from "protocols/protocols";

async function postMessage({ questions }) {
  let prompt = concatenate(questions);
  let returnedQuestion = ""
  while (returnedQuestion.length === 0) {
    let completion = await handleGPT(prompt)
    returnedQuestion = completion.data.choices[0].text;
    console.log(returnedQuestion)
  }

  return JSON.parse(returnedQuestion)
}

async function handleGPT (prompt: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    temperature: 0.4,
    max_tokens: 100,
  });

  return completion
}

function concatenate(questions: Questions[]){
  questions.forEach(element => {
    allResponses.push({question: element.question, answer: element.answer})
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

  return prompt + allResponses.map((element) => `{question:${element.question}, answer: ${element.answer}}`).join("\n")
}

export const chatService = {
  postMessage,
};
