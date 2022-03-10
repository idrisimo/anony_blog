function getAllArticles() {
    return fetch('http://localhost:3000/articles').then((response) => response.json()).catch(console.warn)
    
}


function buildDeck() {
    console.log('building deck')
    // fetch('http://localhost:3000/articles')
    //     .then((response) => response.json())
    const response = getAllArticles()
        response.then((data) => {
           try { // Get Card wrapper
            const wrapper = document.getElementById('cards')

            // Loop for building cards
            for (index in data) {

                let cardId = parseInt(index)
                cardId += 1

                // Constructs new deck to be place in html
                const card = cardTemplate(data[index], cardId)

                // Removes old deck on html page
                removeStaleDeck(cardId)

                // Feeds new deck to html page
                wrapper.insertAdjacentHTML('afterbegin', card)

            }
            return true
        } catch {
            return false
        }
            // initialises event controller after cards added to deck
            //  eventListernerController()
        })
}

const removeStaleDeck = (cardId) => {

    const cardNum = document.getElementById(`cardNum${cardId}`)
    if (cardNum) {
        cardNum.remove()
    }

}

function sendComments(comment) {
    commentData = {
        id: parseInt(comment.target[1].value),
        comments: comment.target[0].value
    }
    console.log(comment)

    const options = {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch('http://localhost:3000/updatearticlecomment', options).then(() => buildDeck())
}

function showComments() {
    let commBoxes = document.querySelectorAll(`[id^="commnum"]`)
    commBoxes = Array.from(commBoxes)
    for (let i = 0; i < commBoxes.length; i++) {

        commBoxes[i].addEventListener('submit', (e) => {
            e.preventDefault()
            sendComments(e)
        })

    }
}

function constructReactionData(event) {
    let valueArray = event.target['value'].split(" ")
    const reactionData = {
        id: parseInt(valueArray[1]),
        reactions: valueArray[0]
    }
    console.log(reactionData)
            const options = {
                method: 'POST',
                body: JSON.stringify(reactionData),
                headers: {
                    "Content-Type": "application/json",
                }
            }
            fetch('http://localhost:3000/updatearticlereaction', options).then(() => buildDeck())
}

function submitReaction(){
    const reactionForm = document.querySelectorAll(`[id*="reactionForm"]`)

    for (let i = 0; i < reactionForm.length; i++) {
        reactionForm[i].addEventListener('click', (event) => {
            constructReactionData(event)
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
            reactionTemplate += `<span>${keyClean}: ${value}</span>`
        }
    }
    return reactionTemplate
}

function cardTemplate(data, index) {
    console.log('adding data to card template')
    function commentLoop() {
        let commentList = ''
        let count = 0
        for (i in data.comments) {
            if (data.comments[i] !== null) {
                const newComment = `<li class="list-group-item">${data.comments[i]}</li>`
                commentList += newComment
                count += 1
            }
        }
        return [commentList, count]
    }
    const reactionsSummary = reactionsHandler(data['reactions'])
    const template = `<div id="cardNum${index}"class="col">
    <div class="card shadow">
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
                <a class="comment-icon-format me-3" data-bs-toggle="collapse" href="#commentCollapse${index}" role="button" aria-expanded="false" aria-controls="commentCollapse${index}">

                    <i class="fa-solid fa-comment">
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger comment-pill">
                            ${commentLoop()[1]}
                            <span class="visually-hidden">Comments</span>
                    </i>
                </a>
                <form id="reactionForm${index}">
                    <button type="button" value="U+1F642 ${index}" class="emoji-btn-format">&#x1F642</button>
                    <button type="button" value="U+1F610 ${index}" class="emoji-btn-format">&#x1F610</button>
                    <button type="button" value="U+1F602 ${index}" class="emoji-btn-format">&#x1F602</button>
                    <button type="button" value="U+2639 ${index}" class="emoji-btn-format">&#x2639</button>
                    <button type="button" value="U+1F621 ${index}" class="emoji-btn-format">&#x1F621</button>
                    <button type="button" value="U+1F600 ${index}" class="emoji-btn-format">&#x1F600</button>
                </form>
                
            </div>
            <small class="text-muted text-end">${data['createdAt']}</small>
            <div class="collapse" id="commentCollapse${index}">
                <div class="card card-body">
                    <div>
                        <form class="text-center" id="commnum${index}">
                            <input type="text" placeholder="Type comment">
                            <button type="submit" class="btn" value="${index}">Submit</button>
                        </form>

                        <div>
                            <ul class="list-group list-group-flush">
                                ${commentLoop()[0]}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
    return template
}


module.exports = { buildDeck, submitReaction, showComments, getAllArticles, removeStaleDeck, sendComments, constructReactionData }

