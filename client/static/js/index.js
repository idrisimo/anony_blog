const { submitArticle } = require("./handler");
const { buildDeck, eventListernerController } = require("./cardCreation");
const { submitReaction } = require("./reactionController");


window.onload = () => {

    buildDeck()
    
    console.log('done')
    const cardDeck = document.getElementById('cards')

    var observer = new MutationObserver(function (mutationRecords) {
        console.log("change detected");
        eventListernerController()
    });
    observer.observe(cardDeck, { childList: true })
    


}

// selectors
const articleForm = document.querySelector('#userForm');



// event listeners
articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
    setTimeout(buildDeck(),500)
    
})



