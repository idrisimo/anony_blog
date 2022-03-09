const { submitArticle } = require("./handler");
const {buildDeck, removeCards, submitReaction} = require("./cardCreation")

buildDeck()

// selectors
const articleForm = document.querySelector('#userForm');
document.onload = () => {
    const reactionForm = document.querySelector('#reactionForm')
    console.log(document.querySelector('#reactionForm'))
}

// event listeners
articleForm.addEventListener('submit', (event) => {
    submitArticle(event);
    removeCards(event);
    buildDeck()
})

let f = document.getElementById("commentForm")
f.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("hi")
})


// reactionForm.addEventListener('click', () => {console.log('cliclclc')})


