// const { buildDeck } = require("./cardCreation");


function submitReaction() {
    const reactionForm = document.querySelectorAll(`[id*="reactionForm"]`)

    for (let i=0; i< reactionForm.length; i++) {
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
            const responsePromise = fetch('http://localhost:3000/updatearticlereaction', options)
            
            console.log('test')
            return responsePromise
        })
    }
}

function reactionsHandler(reactionsArray) {
    const summary = {};
    let reactionTemplate = '';
    for (const [index, reaction] of Object.entries(reactionsArray)) {
        if (reaction === null) {
            summary[reaction] = 'No reactions'
        } else if (summary[reaction]) {
            summary[reaction] += 1;
        } else {
            summary[reaction] = 1
        }
    }
    for (const [key, value] of Object.entries(summary)) {

        const keyClean = `&#x${key.split("+")[1]}`
        if (value != 'No reactions') {
            reactionTemplate += `<span>${keyClean}: ${value}</span>`}
    }
    return reactionTemplate
}

module.exports = {submitReaction, reactionsHandler}
