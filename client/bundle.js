(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


function buildDeck() {
    console.log('building deck')
    fetch('http://localhost:3000/articles')
        .then((response) => response.json())
        .then((data) => {
            const wrapper = document.getElementById('cards')
            
            for (index in data) {
                const card = cardTemplate(data[index])
                wrapper.insertAdjacentHTML('afterbegin', card)
            }

            submitReaction()
        })
}

function reactionsHandler(reactionsArray) {
    const summary = {};
    let reactionTemplate = '';
    for (const [index, reaction] of Object.entries(reactionsArray)) {
        if (reaction === null){
            summary[reaction] = 'No reactions'
        } else if (summary[reaction]) {
            summary[reaction] += 1;
        } else {
            summary [reaction] = 1
        }
    }
    
    for (const [key, value] of Object.entries(summary)) {
        const keyClean = `&#x${key.split("+")[1]}`
        if (value != 'No reactions') {
            reactionTemplate += `<span>${keyClean}: ${value}</span>`
        } else {
            reactionTemplate += `<span>${value}</span>`
        }
        
    }
    return reactionTemplate
}


function cardTemplate(data) {
    const reactionsSummary = reactionsHandler(data['reactions'])
    const template = `<div id="cardNum${data['id']}"class="col">
    <div class="card">
        <div class="card-header">
            ${reactionsSummary}
        </div>
        <div class="card-body">
            <h5 class="card-title">${data['title']}</h5>
            <p class="card-text">${data['description']}</p>
        </div>
        <div class="card-footer">
            <div>
                <a href="#" class="comment-icon-format me-3">

                    <i class="fa-solid fa-comment">
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger comment-pill">
                            99+
                            <span class="visually-hidden">Comments</span>
                    </i>
                </a>
                <form id="reactionForm">
                    <button value="&#x1F642" class="emoji-btn-format">&#x1F642</button>
                
                
                    <button value="&#x1F610" class="emoji-btn-format">&#x1F610</button>
                
                
                    <button value="&#x1F602" class="emoji-btn-format">&#x1F602</button>
                
                
                    <button value="&#x2639" class="emoji-btn-format">&#x2639</button>
                
                
                    <button value="&#x1F621" class="emoji-btn-format">&#x1F621</button>
                
                
                    <button value="&#x1F600" class="emoji-btn-format">&#x1F600</button>
                </form>
            </div>
            <small class="text-muted text-end">${data['createdAt']}</small>
        </div>
    </div>
</div>`
return template
}

function removeCards() {
    // Skywalker in the jedi temple.
    console.log('removing cards')
    const wrapper = document.getElementById('cards');
    let child = wrapper.lastElementChild; 
    while (child) {
        wrapper.removeChild(child)
        child = wrapper.lastElementChild;
    }
}

function submitReaction() {
    const reactionForm = document.querySelector('#reactionForm')
    reactionForm.addEventListener('click', (event) => {
        event.preventDefault()
        console.log(event)
        reactionData = {
            id: 4,
            reactions: 'U+1F624'
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(reactionData),
            headers: {
                "Content-Type": "application/json",
            }
        }
  
        fetch('http://localhost:3000/update',options)
        removeCards()
        buildDeck()
    })
}

module.exports = { buildDeck, removeCards, submitReaction }

},{}],2:[function(require,module,exports){

function submitArticle(event) {
    event.preventDefault()
    console.log('form submitted')
    try {
        const articleData = {
            title: event.target['articleTitle'].value,
            description: event.target['articleText'].value,
            createdAt: new Date(),
            comments: [null],
            reactions: [null]
        };
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

buildDeck()

// selectors
const articleForm = document.querySelector('#userForm');
document.onload = () => {
    const reactionForm = document.querySelector('#reactionForm')
    console.log(document.querySelector('#reactionForm'))
}

// event listeners
articleForm.addEventListener('submit', (event) => {
    submitArticle();
    removeCards();
    buildDeck()
})



// reactionForm.addEventListener('click', () => {console.log('cliclclc')})



},{"./cardCreation":1,"./handler":2}]},{},[3]);
