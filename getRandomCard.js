const fs = require('fs');
const { randomInt } = require('crypto');
const path = require('path');

const predict = path.join(__dirname,'./predictions.json');
const predictions = JSON.parse(fs.readFileSync(predict));

const getRandomCard = (category) => {
    const cardNumber = randomInt(1, 32); // случайное число от 1 до 78 включительно
    const cardImage = `./cards/card${cardNumber}.jpg`;
    const predictionText = predictions[category][`card${cardNumber}`];
    return { cardImage, predictionText };
};
module.exports = { getRandomCard };