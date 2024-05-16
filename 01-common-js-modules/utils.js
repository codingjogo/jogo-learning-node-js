function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Node js exports a function
module.exports = generateRandomNumber;