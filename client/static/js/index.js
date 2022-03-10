const { submitArticle } = require("./handler");
const { buildDeck, eventListernerController } = require("./cardCreation");
const { submitReaction } = require("./reactionController");


window.onload = () => {

    buildDeck()

    console.log('done')
    const cardDeck = document.getElementById('cards')

     var observer = new MutationObserver(function (mutationRecords) {
        console.log("change detected");
        const reactionForm = document.querySelectorAll(`[id*="reactionForm"]`)
        for (let i = 0; i < reactionForm.length; i++) {
            reactionForm[i].addEventListener('click', (event) => {
                // event.preventDefault()
                valueArray = event.target['value'].split(" ")

                const reactionData = {
                    id: parseInt(valueArray[1]),
                    reactions: valueArray[0]
                }
                const options = {
                    method: 'POST',
                    body: JSON.stringify(reactionData),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                fetch('http://localhost:3000/updatearticlereaction', options).then(()=> buildDeck())
                console.log('test')
                
            })
        }
    });
    observer.observe(cardDeck, { childList: true })



}

// selectors
const articleForm = document.querySelector('#userForm');



// event listeners
articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
    setTimeout(buildDeck(), 500)

})



