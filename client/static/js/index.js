const { submitArticle } = require("./handler");
const { buildDeck, submitReaction, showComments } = require("./cardCreation");
const API_URL = require('./url')

console.log(process.env.PORT)

console.log(process.env)
window.onload = () => {

    buildDeck()

    console.log('done')
    const cardDeck = document.getElementById('cards')

    var observer = new MutationObserver(function (mutationRecords) {
        console.log("change detected");
        const reactionForm = document.querySelectorAll(`[id*="reactionForm"]`)
        submitReaction()
        showComments()
    });
    observer.observe(cardDeck, { childList: true })



}


// selectors
const articleForm = document.querySelector('#userForm');
// event listeners

articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
})

// class SubmitClass {
//     submitFunction() {
//         // selectors
//         const articleForm = document.querySelector('#userForm');

//         // event listeners

//         articleForm.addEventListener('submit', (event) => {
//             event.preventDefault()
//             submitArticle(event);
//             this.submitEvent.bind(this)
//         })
//     }
//     submitEvent() {

//     }
// }

// const submitArticleForm = new SubmitClass();
// submitArticleForm

// module.exports = {SubmitClass}

module
