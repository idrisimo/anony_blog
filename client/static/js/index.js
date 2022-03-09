const { submitArticle } = require("./handler");
const {buildDeck, removeCards, submitReaction} = require("./cardCreation")
window.onload = () => {
    buildDeck()
    // eventListernerController()
    // if (buildDeck()){
    //     eventListernerController()
    // }
}
console.log('***********************************************************')
// selectors
const articleForm = document.querySelector('#userForm');
const toast = document.querySelector('.liveToast')

// event listeners
articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
    buildDeck()
    // reBuildDeck()
})




