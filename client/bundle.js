(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
            showComments()
        })
}

function sendComments(comment){
    commentData = {
        id: parseInt(comment.target[1].value),
        comments: comment.target[0].value
    }
    console.log(comment)
    console.log(comment.target[0].value)
    

    const options = {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch('http://localhost:3000/updatearticlecomment', options)
    // .then((commentData) => {
    //     console.log(commentData)
    // })
 
    
}
function addCommentToModal(comment){
    let template = `<p>${comment}<p><br>`
    return template;

}
function showComments(id){
    let commBoxes = document.querySelectorAll(`[id^="commnum"]`)
    commBoxes = Array.from(commBoxes)
    for(let i = 0;i<commBoxes.length;i++){
        commBoxes[i].addEventListener('submit', (e) => {
            e.preventDefault()
            sendComments(e)            
        })
    }


    // let commentTemplate = `<p>${data['comments']}</p><br>`
    // let template = `
    // <div class="modal" tabindex="-1" role="dialog">
    // <div class="modal-dialog" role="document">
    //     <div class="modal-content">
    //     <div class="modal-header">
    //         <h5 class="modal-title">Comments</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //         <span aria-hidden="true">&times;</span>
    //         </button>
    //     </div>
    //     <div class="modal-body">
    //         <p>${commentTemplate}</p>
    //     </div>
    //     <div class="modal-footer">
    //         <button type="button" class="btn btn-primary">Save changes</button>
    //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //     </div>
    //     </div>
    // </div>
    // </div>`
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
                    <button value="U+1F642 ${index}" class="emoji-btn-format">&#x1F642</button>
                    <button value="U+1F610 ${index}" class="emoji-btn-format">&#x1F610</button>
                    <button value="U+1F602 ${index}" class="emoji-btn-format">&#x1F602</button>
                    <button value="U+2639 ${index}" class="emoji-btn-format">&#x2639</button>
                    <button value="U+1F621 ${index}" class="emoji-btn-format">&#x1F621</button>
                    <button value="U+1F600 ${index}" class="emoji-btn-format">&#x1F600</button>
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
                                <li class="list-group-item">
                                    
                                </li>
                                <li class="list-group-item">
                                    
                                </li>
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


function removeCards(event) {
    // Skywalker in the jedi temple.
    event.preventDefault()
    const wrapper = document.getElementById('cards');
    let child = wrapper.lastElementChild; 
    while (child) {
        wrapper.removeChild(child)
        child = wrapper.lastElementChild;
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
            fetch('http://localhost:3000/updatearticlereaction', options)

            buildDeck()

        })
    }
}

module.exports = { buildDeck, removeCards, submitReaction }

},{}],2:[function(require,module,exports){

function submitArticle(event) {
    console.log('form submitted')
    try {
        const articleData = {
            title: event.target['articleTitle'].value,
            description: event.target['articleText'].value,
            createdAt: new Date(),
            comments: [null],
            reactions: [null],
            giphys: event.target['articleGiphy'].value
        };
        console.log('submitarticle', articleData)
        const options = {
            method: 'POST',
            body: JSON.stringify(articleData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        // TODO this fetch will most likely need to change before production
        fetch('http://localhost:3000/create', options)
        closeModalOnSuccess()
        successAlert('Journal entry submitted', 'success')
    } catch {

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

},{}],3:[function(require,module,exports){
const { submitArticle } = require("./handler");
const {buildDeck, removeCards, submitReaction} = require("./cardCreation")
window.onload = () => {
    buildDeck()
}


// selectors
const articleForm = document.querySelector('#userForm');


// event listeners
articleForm.addEventListener('submit', (event) => {
    event.preventDefault()
    submitArticle(event);
    buildDeck()
})



// reactionForm.addEventListener('click', () => {console.log('cliclclc')})



},{"./cardCreation":1,"./handler":2}]},{},[3]);
