
function buildDeck() {
    console.log('building deck')
    fetch('http://localhost:3000/articles')
        .then((response) => response.json())
        .then((data) => {
            const wrapper = document.getElementById('cards')
            for (index in data) {
                let cardId = parseInt(index)
                cardId += 1
                const card = cardTemplate(data[index], cardId)
                const cardNum = document.getElementById(`cardNum${cardId}`)
                if (cardNum) {
                    cardNum.remove()
                }

                wrapper.insertAdjacentHTML('afterbegin', card)
            }

            submitReaction()

        })
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
        // } else {
        //     reactionTemplate += `<span>${value}</span>`
        // }
    }
    return reactionTemplate
}


function cardTemplate(data, index) {

    const reactionsSummary = reactionsHandler(data['reactions'])
    const template = `<div id="cardNum${index}"class="col">
    <div class="card">
        <div class="card-header">
        <text>Reactions  </text>
            ${reactionsSummary}
        </div>
        <div class="card-body">
            <h5 class="card-title">${data['title']}</h5>
            <p class="card-text">${data['description']}</p>
        </div>
        <div class="card-footer">
            <div>
                <a href="#" class="comment-icon-format me-3">

                    <i class="fa-solid fa-comment" id="comm${data['id']}">
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger comment-pill">
                            99+
                            <span class="visually-hidden">Comments</span>
                    </i>
                </a>
                <form id="reactionForm${index}">
                    <button value="U+1F642 ${index}" class="emoji-btn-format">&#x1F642</button>
                    <button value="U+1F610 ${index}" class="emoji-btn-format">&#x1F610</button>
                    <button value="U+1F602 ${index}" class="emoji-btn-format">&#x1F602</button>
                    <button value="U+2639 ${index}" class="emoji-btn-format">&#x2639</button>
                    <button value="U+1F621 ${index}" class="emoji-btn-format">&#x1F621</button>
                    <button value="U+1F600 ${index}" class="emoji-btn-format">&#x1F600</button>
                </form>
            </div>
            <small class="text-muted text-end">${data['createdAt']}</small>
        </div>
    </div>
</div>`
    return template
}

function showComments(data, id) {
    let commBoxes = document.querySelectorAll('#comm*')
    for (let i = 0; i < commBoxes.length; i++) {
        if (id == commBoxes[i]) {
            // console.log(data[id])
        }
    }
    let commentTemplate = `<p>${data['comments']}</p><br>`
    let template = `
    <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Comments</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>${commentTemplate}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>`
}

function removeCards(data) {

    const numOfCards = document.querySelectorAll(`[id*="cardNum"]`)
    console.log(numOfCards.length, data.length)
    if (numOfCards.length > data.length) {
        for (let i = data.length; i < numOfCards.length; i++) {
            console.log(document.getElementById(`cardNum${i}`))
        }
    }
    console.log(numOfCards.length, data.length)
    // Skywalker in the jedi temple.
    // console.log('removing cards')
    // const wrapper = document.getElementById('cards');
    // console.log()
    // let child = wrapper.lastElementChild; 
    // while (child) {
    //     wrapper.removeChild(child)
    //     child = wrapper.lastElementChild;
    // }
}

function submitReaction() {
    const reactionForm = document.querySelectorAll(`[id*="reactionForm"]`)
    for (let i=0; i< reactionForm.length; i++) {
        reactionForm[i].addEventListener('click', (event) => {
            event.preventDefault()
            valueArray = event.target['value'].split(" ")

            reactionData = {
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
            fetch('http://localhost:3000/update', options)

            buildDeck()

        })
    }
}

module.exports = { buildDeck, removeCards, submitReaction }
