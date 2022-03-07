const { submitArticle } = require("./handler");

// selectors
const articleSubmit = document.getElementById('submitArticle');

// event listeners
articleSubmit.addEventListener('click', submitArticle)

