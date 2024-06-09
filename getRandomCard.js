const fs = require('fs');
const { randomInt } = require('crypto');

const predictions = JSON.parse(fs.readFileSync("./predictions.json", 'utf-8'));

const getRandomCard = (category) => {
    const cardNumber = randomInt(1, 32); // случайное число от 1 до 78 включительно
    const cardImage = `./cards/card${cardNumber}.jpg`;
    const predictionText = predictions[category][`card${cardNumber}`];
    return { cardImage, predictionText };
};
module.exports = { getRandomCard };