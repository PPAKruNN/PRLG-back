"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allResponses = exports.celphoneQuestions = exports.questions = exports.categories = void 0;
exports.categories = [
    {
        name: "Imóveis",
        id: 1,
        subCategories: [
            { name: "Apartamentos", id: 1 },
            { name: "Casas", id: 2 },
            { name: "Aluguel de quartos", id: 3 },
            { name: "Temporada", id: 4 },
            { name: "Terrenos, sítios e fazendas", id: 5 },
            { name: "Comércio e indústria", id: 6 },
        ]
    },
    { name: "Autos e peças", id: 2 },
    { name: "Para a sua casa", id: 3 },
    {
        name: "Eletrônicos e celulares", id: 4, subCategories: [
            { name: "Videogames", id: 1 },
            { name: "Celulares e telefonia", id: 2 },
            { name: "Computadores e acessórios", id: 3 },
            { name: "Áudio, TV, vídeo e fotografia", id: 4 },
        ]
    },
    { name: "Música e hobbies", id: 5 },
    { name: "Esportes e lazer", id: 6 },
    { name: "Artigos infantis", id: 7 },
    { name: "Animais de estimação", id: 8 },
    { name: "Moda e beleza", id: 9 },
    { name: "Agro e indústria", id: 10 },
    { name: "Comércio e escritório", id: 11 },
    { name: "Serviços", id: 12 },
    { name: "Vagas de emprego", id: 13 }
];
exports.questions = [
    {
        id: 1,
        question: "Qual é o produto que você está querendo vender?",
    },
    {
        id: 2,
        question: "Qual o título do seu anúncio?",
    },
    {
        id: 3,
        question: "Qual o preço que deseja colocar?",
    },
];
exports.celphoneQuestions = [
    {
        id: 1,
        question: "Qual o modelo do seu celular?",
    },
    {
        id: 2,
        question: "Qual a marca do seu celular?",
    },
    {
        id: 3,
        question: "Qual a condição do seu celular?",
    },
    {
        id: 4,
        question: "Qual a memória interna do seu celular?",
    },
    {
        id: 5,
        question: "Qual a cor do seu celular?",
    },
    {
        id: 6,
        question: "Qual a saúde da bateria do seu celular?",
    },
    {
        id: 7,
        question: "Qual o preço que você deseja anunciar?",
    }
];
exports.allResponses = [];
