const { submitArticle } = require("./handler");
const {buildDeck, removeCards, submitReaction} = require("./cardCreation")
window.onload = () => {
    buildDeck()
}


// selectors
const articleForm = document.querySelector('#userForm');


// event listeners
articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
    buildDeck()
})

let f = document.getElementById("commentForm")
f.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("hi")
})


// reactionForm.addEventListener('click', () => {console.log('cliclclc')})


