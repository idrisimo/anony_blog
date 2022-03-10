(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {reactionsHandler, submitReaction} = require('./reactionController')
const {showComments} = require('./commentController')

function buildDeck() {
    console.log('building deck')
    fetch('http://localhost:3000/articles')
        .then((response) => response.json())
        .then((data) => {
            // Get Card wrapper
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

function eventListernerController(){
    submitReaction()
    showComments()
}







function cardTemplate(data, index) {
    console.log('adding data to card template')
    function commentLoop() {
        let commentList = ''
        for (i in data.comments){
            const newComment = `<li class="list-group-item">${data.comments[i]}</li>`
            commentList += newComment
        }
        return commentList
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
                            ${data['comments'].length}
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
                                ${commentLoop()}
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


module.exports = { buildDeck, eventListernerController}

},{"./commentController":2,"./reactionController":5}],2:[function(require,module,exports){

function sendComments(comment){
    commentData = {
        id: parseInt(comment.target[1].value),
        comments: comment.target[0].value
    }
    console.log(commentData)
    

    const options = {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch('http://localhost:3000/updatearticlecomment', options)
}

function showComments(){
    let commBoxes = document.querySelectorAll(`[id^="commnum"]`)
    commBoxes = Array.from(commBoxes)
    for(let i = 0;i<commBoxes.length;i++){

        commBoxes[i].addEventListener('submit', (e) => {
            e.preventDefault()
            sendComments(e)            
        })

    }
}

module.exports = {sendComments, showComments}

},{}],3:[function(require,module,exports){

function submitArticle(event) {
    console.log('form submitted')
    try {
        const articleData = {
            title: event.target['articleTitle'].value,
            description: event.target['articleText'].value,
            createdAt: new Date(),
            comments: [null],
            reactions: [null],
            giphys: [null]
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(articleData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        // TODO this fetch will most likely need to change before production
        // event.preventDefault()
        fetch('http://localhost:3000/create', options)
        closeModalOnSuccess()
        successAlert('Journal entry submitted', 'success')
    } catch {
        console.log()
    }
}

function closeModalOnSuccess() {
    const modalElement = document.getElementById('articleModal')
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
}

function successAlert(message, type) {
    const alertWrapper = document.createElement('div')
    alertWrapper.setAttribute('class', `alert alert-${type} alert-dismissible`)
    alertWrapper.setAttribute('role', 'alert')

    const btn = document.createElement('button')
    btn.setAttribute('type', 'button')
    btn.setAttribute('class', 'btn-close')
    btn.setAttribute('data-bs-dismiss', 'alert')
    btn.setAttribute('aria-label', 'Close')

    alertWrapper.textContent = message

    alertWrapper.append(btn)
    const submitAlert = document.getElementById('submitAlert')
    submitAlert.append(alertWrapper)
}

module.exports = { submitArticle }

},{}],4:[function(require,module,exports){
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




},{"./cardCreation":1,"./handler":3,"./reactionController":5}],5:[function(require,module,exports){
const { buildDeck } = require("./cardCreation")

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
            fetch('http://localhost:3000/updatearticlereaction', options)
            console.log('test')
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

},{"./cardCreation":1}]},{},[4]);
