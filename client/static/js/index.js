const { submitArticle } = require("./handler");

// selectors
const articleForm = document.querySelector('#userForm');

// event listeners
articleForm.addEventListener('submit', submitArticle)

