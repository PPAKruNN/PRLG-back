import { Errors } from "../Errors/errors";
import httpStatus from "http-status";
import { Configuration, OpenAIApi } from "openai";
import { questions, allResponses, celphoneQuestions } from "../database/db";
import { Questions } from "protocols/protocols";

async function getResponseDescription() {
  const prompt = `${allResponses.map((element) => `{question:${element.question}, answer: ${element.answer}}`).join("\n")}
  Com base nas respostas das perguntas acima, faca uma breve descricao (de no minimo 200 caracteres) do anuncio deste produto. LEMBRE DE Sempre faça apenas um JSON, sem texto explicativo, no formato:
  {
    "descricao": "DESCRICAO SUGERIDA POR VOCE",
  }
  `
  let returnedQuestion = ""
  while (returnedQuestion.length === 0) {
    let completion = await handleGPT(prompt)
    returnedQuestion = completion.data.choices[0].text;
  }

  return JSON.parse(returnedQuestion)
}

async function getForm(description: string){
  const prompt = `
  "${description}

  Com base na descricao de um anuncio acima, responda as perguntas abaixos. LEMBRE DE Sempre fazer apenas um ARRAY de JSON, sem texto explicativo, no formato:
  [
    {
      "id": "ID DA PERGUNTA",
      "question": "CADA PERGUNTA",
      "answer": "SUA RESPOSTA DE CADA PERGUNTA"
    },
  ]
  `
  let returnedQuestion = ""
  while (returnedQuestion.length === 0) {
    let completion = await handleGPT(prompt)
    returnedQuestion = completion.data.choices[0].text;
  }

  return JSON.parse(returnedQuestion)
}

async function postMessage({ questions }) {
  const firstQuestions = [
    {
      question: "Qual é o produto que você está querendo vender?",
    },
    {
      question: "Qual o título do seu anúncio?",
    },
    {
      question: "Qual é a marca do produto?",
    }
  ]
  let prompt = concatenate(questions);
  let returnedQuestion: any = { createdQuestion: "", suggestedAnswers: [] };
  if (allResponses.length < 3){
    const response = firstQuestions[allResponses.length]
    allResponses.push(firstQuestions[allResponses.length])
    return response
  }else{
    while (returnedQuestion.createdQuestion.length === 0 || allResponses.some((element) => element.question === returnedQuestion.createdQuestion)) {
      let completion = await handleGPT(prompt)
      returnedQuestion = JSON.parse(completion.data.choices[0].text);
    }
    return returnedQuestion
  }
}

async function postCustomerQuestion(question: string) {
  const promptCostumer = `Tente responder à pergunta do cliente de forma sucinta. 
                  PERGUNTA DO CLIENTE: ${question};

                  Responda SEMPRE COM APENAS 1 OBJETO COM APENAS A PROPRIEDADE answer, como no formato: 
                  {
                    "answer": "Sim, o produto é novo."
                  }
                  
                  ou então:

                  {
                    "answer": "Não, o produto é branco."
                  }

                  Responda apenas baseado nas informações do contexto, se não encontrar a resposta
                  no contexto SEMPRE RESPONDA: "Não sei responder.". Segue o contexto: ${getProductData()}`;

  let returnedAnswer = "";
  while (returnedAnswer.length === 0) {
    let completion = await handleGPT(promptCostumer)
    console.log(completion.data.choices[0].text)
    if (!JSON.parse(completion.data.choices[0].text) || !JSON.parse(completion.data.choices[0].text).answer) {
      returnedAnswer = "";
    } else {
      returnedAnswer = JSON.parse(completion.data.choices[0].text).answer;
    }
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
    max_tokens: 800,
  });

  return completion
}

function concatenate(questions: Questions[]) {
  questions.forEach(element => {
    allResponses.push({ question: element.question, answer: element.answer })
  });
  const prompt = `Sempre faça apenas 1 JSON, sem texto explicativo, SEMPRE no formato:
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
  postCustomerQuestion,
  getResponseDescription,
  getForm,
};
