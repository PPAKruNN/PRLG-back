"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
var openai_1 = require("openai");
var db_1 = require("../database/db");
function getResponseDescription() {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, returnedQuestion, completion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = "".concat(db_1.allResponses.map(function (element) { return "{question:".concat(element.question, ", answer: ").concat(element.answer, "}"); }).join("\n"), "\n  Com base nas respostas das perguntas acima, faca uma breve descricao (de no minimo 100 \n  caracteres) do anuncio deste produto. LEMBRE DE Sempre fa\u00E7a apenas um JSON, sem texto \n  explicativo e SEM CRIAR INFORMA\u00C7\u00D5ES QUE N\u00C3O FORAM FORNECIDAS NAS RESPOSTAS, no formato:\n  {\n    \"description\": \"DESCRICAO SUGERIDA POR VOCE\",\n  }\n  ");
                    returnedQuestion = "";
                    _a.label = 1;
                case 1:
                    if (!(returnedQuestion.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleGPT(prompt)];
                case 2:
                    completion = _a.sent();
                    if (!completion.data.choices[0].text.includes("description")) {
                        returnedQuestion = "";
                    }
                    else {
                        returnedQuestion = JSON.parse(completion.data.choices[0].text);
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, returnedQuestion];
            }
        });
    });
}
function getForm(description) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, returnedQuestion, completion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = "\n  \"".concat(db_1.allResponses.map(function (element) { return "{question:".concat(element.question, ", answer: ").concat(element.answer, "}"); }).join("\n"), "\n\n  Com base nas informa\u00E7\u00F5es acima, responda as perguntas abaixos. LEMBRE DE Sempre \n  fazer apenas 1 ARRAY de objetos no formato JSON, sem texto explicativo, como no modelo:\n  [\n    {\n      \"id\": \"ID DA PERGUNTA\",\n      \"question\": \"CADA PERGUNTA\",\n      \"answer\": \"SUA RESPOSTA DE CADA PERGUNTA\"\n    },\n  ]\n\n  NAS RESPOSTAS APENAS FORNE\u00C7A INFORMA\u00C7\u00D5ES CONTIDAS NO CONTEXTO FORNECIDO, N\u00C3O CRIE INFORMA\u00C7\u00D5ES.\n  Caso n\u00E3o consiga responder alguma pergunta deixe a resposta como uma string vazia. Segue as perguntas:\n\n  {\n      id: 1,\n      question: \"Qual o modelo do seu celular?\",\n  },\n  {\n      id: 2,\n      question: \"Qual a marca do seu celular?\",\n  },\n  {\n      id: 3,\n      question: \"Qual a condi\u00E7\u00E3o do seu celular?\",\n  },\n  {\n      id: 4,\n      question: \"Qual a mem\u00F3ria interna do seu celular?\",\n  },\n  {\n      id: 5,\n      question: \"Qual a cor do seu celular?\",\n  },\n  {\n      id: 6,\n      question: \"Qual a sa\u00FAde da bateria do seu celular?\",\n  },\n  {\n      id: 7,\n      question: \"Qual o pre\u00E7o que voc\u00EA deseja anunciar?\",\n  }\n  ");
                    returnedQuestion = "";
                    _a.label = 1;
                case 1:
                    if (!(returnedQuestion.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleGPT(prompt)];
                case 2:
                    completion = _a.sent();
                    console.log(completion.data.choices[0].text);
                    if (!completion.data.choices[0].text.includes("id")) {
                        returnedQuestion = "";
                    }
                    else {
                        returnedQuestion = JSON.parse(completion.data.choices[0].text);
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, returnedQuestion];
            }
        });
    });
}
function postMessage(_a) {
    var questions = _a.questions;
    return __awaiter(this, void 0, void 0, function () {
        var firstQuestions, returnedQuestion, response, prompt_1, completion;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    firstQuestions = [
                        {
                            question: "Qual é o produto que você está querendo vender?",
                        },
                        {
                            question: "Qual o título do seu anúncio?",
                        },
                        {
                            question: "Qual é a marca do produto?",
                        }
                    ];
                    returnedQuestion = { createdQuestion: "", suggestedAnswers: [] };
                    if (!(db_1.allResponses.length < 3)) return [3 /*break*/, 1];
                    response = firstQuestions[db_1.allResponses.length];
                    db_1.allResponses.push(firstQuestions[db_1.allResponses.length]);
                    return [2 /*return*/, response];
                case 1:
                    prompt_1 = concatenate(questions);
                    _b.label = 2;
                case 2:
                    if (!(returnedQuestion.createdQuestion.length === 0 || db_1.allResponses.some(function (element) { return element.question === returnedQuestion.createdQuestion; }))) return [3 /*break*/, 4];
                    return [4 /*yield*/, handleGPT(prompt_1)];
                case 3:
                    completion = _b.sent();
                    if (!completion.data.choices[0].text.includes("createdQuestion")) {
                        returnedQuestion = "";
                    }
                    else {
                        returnedQuestion = JSON.parse(completion.data.choices[0].text);
                    }
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/, returnedQuestion];
            }
        });
    });
}
function postCustomerQuestion(question) {
    return __awaiter(this, void 0, void 0, function () {
        var promptCostumer, returnedAnswer, completion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promptCostumer = "Tente responder \u00E0 pergunta do cliente de forma sucinta. \n                  PERGUNTA DO CLIENTE: ".concat(question, ";\n\n                  Responda SEMPRE COM APENAS 1 OBJETO COM APENAS A PROPRIEDADE answer, como no formato: \n                  {\n                    \"answer\": \"Sim, o produto \u00E9 novo.\"\n                  }\n                  \n                  ou ent\u00E3o:\n\n                  {\n                    \"answer\": \"N\u00E3o, o produto \u00E9 branco.\"\n                  }\n\n                  Responda apenas baseado nas informa\u00E7\u00F5es do contexto, se n\u00E3o encontrar a resposta\n                  no contexto SEMPRE RESPONDA: \"N\u00E3o sei responder.\". Segue o contexto: ").concat(getProductData());
                    returnedAnswer = "";
                    _a.label = 1;
                case 1:
                    if (!(returnedAnswer.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleGPT(promptCostumer)];
                case 2:
                    completion = _a.sent();
                    if (!completion.data.choices[0].text.includes("answer")) {
                        returnedAnswer = "";
                    }
                    else {
                        returnedAnswer = JSON.parse(completion.data.choices[0].text).answer;
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, returnedAnswer];
            }
        });
    });
}
function handleGPT(prompt, temperature) {
    if (temperature === void 0) { temperature = 0.4; }
    return __awaiter(this, void 0, void 0, function () {
        var configuration, openai, completion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configuration = new openai_1.Configuration({
                        apiKey: process.env.OPENAI_API_KEY,
                    });
                    openai = new openai_1.OpenAIApi(configuration);
                    return [4 /*yield*/, openai.createCompletion({
                            model: "gpt-3.5-turbo-instruct",
                            prompt: prompt,
                            temperature: temperature,
                            max_tokens: 800,
                        })];
                case 1:
                    completion = _a.sent();
                    return [2 /*return*/, completion];
            }
        });
    });
}
function concatenate(questions) {
    db_1.allResponses.push(questions);
    var prompt = "Sempre fa\u00E7a apenas 1 JSON, sem texto explicativo, SEMPRE no formato:\n                  {\n                    \"createdQuestion\": \"SUA PERGUNTA\",\n                    \"suggestedAnswers\": [\"RESPOSTA 1\", \"RESPOSTA 2\", \"RESPOSTA 3\"]\n                  } \n                  A pergunda em createdQuestion deve ser espec\u00EDfica sobre uma \u00FAnica caracter\u00EDstica do produto\n                  sobre o qual fornecerei o contexto abaixo. N\u00E3o fa\u00E7a uma pergunta sobre qualquer produto.\n                  Nunca repita uma pergunta j\u00E1 feita. N\u00C3O RESPONDA A PERGUNTA FEITA NA STRING DA PERGUNTA. \n                  O intuito dessa pergunta \u00E9 construir uma descri\u00E7\u00E3o melhor detalhada do anuncio do \n                  produto. Segue as perguntas e respostas: ";
    return prompt + db_1.allResponses.map(function (element) { return "{ question: ".concat(element.question, ", answer: ").concat(element.answer, " }"); }).join("\n");
}
function getProductData() {
    return db_1.allResponses.map(function (element) { return "{ question: ".concat(element.question, ", answer: ").concat(element.answer, " }"); }).join("\n");
}
exports.chatService = {
    postMessage: postMessage,
    postCustomerQuestion: postCustomerQuestion,
    getResponseDescription: getResponseDescription,
    getForm: getForm,
};
