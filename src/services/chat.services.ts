import axios from "axios";
import { Errors } from "../Errors/errors";
import httpStatus from "http-status";

async function postMessage(text: string) {
  // const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
  //   prompt,
  //   max_tokens: 50 //response length
  // }, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.apiKey}`
  //   }
  // });

  // const completion = response.data.choices[0].text;


  return "oi, meu chapa!"
}

export const chatService = {
  postMessage,

};
