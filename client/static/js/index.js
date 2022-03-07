const { submitArticle } = require("./handler");

// selectors
const articleForm = document.querySelector('#userForm');

const submitAlert = document.getElementById('submitAlert')


// event listeners
articleForm.addEventListener('submit', submitArticle)

