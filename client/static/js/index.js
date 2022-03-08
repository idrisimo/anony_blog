const { submitArticle } = require("./handler");
const {buildDeck, removeCards} = require("./cardCreation")

// selectors
const articleForm = document.querySelector('#userForm');

const submitAlert = document.getElementById('submitAlert')


// event listeners
articleForm.addEventListener('submit', (event) => {
    submitArticle(event);
    removeCards(event);
    buildDeck()
})
document.onload = buildDeck()
