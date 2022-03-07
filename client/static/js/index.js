const { submitArticle } = require("./handler");
const {buildDeck} = require("./cardCreation")

// selectors
const articleForm = document.querySelector('#userForm');

const submitAlert = document.getElementById('submitAlert')


// event listeners
articleForm.addEventListener('submit', submitArticle)

buildDeck()
