const { submitArticle } = require("./handler");
const {buildDeck, removeCards, submitReaction} = require("./cardCreation")
window.onload = () => {
    buildDeck()
}

// selectors
const articleForm = document.querySelector('#userForm');
const toast = document.querySelector('.liveToast')

// event listeners
articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
    buildDeck()
})




// reactionForm.addEventListener('click', () => {console.log('cliclclc')})


