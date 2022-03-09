const { submitArticle } = require("./handler");
const { buildDeck, reBuildDeck, eventListernerController } = require("./cardCreation")


console.log('***********************************************************')
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



// event listeners
articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
    buildDeck()
    // reBuildDeck()
})




