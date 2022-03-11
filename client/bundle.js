(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
const { API_URL } = require("./url")


function getAllArticles() {
    return fetch(`${API_URL}/articles`).then((response) => response.json()).catch(console.warn)
}


function buildDeck() {
    console.log('building deck')

    const response = getAllArticles()
    response.then((data) => {
        try {
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

    fetch(`${API_URL}/updatearticlecomment`, options).then(() => buildDeck())
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
    fetch(`${API_URL}/updatearticlereaction`, options).then(() => buildDeck())
}

function submitReaction() {
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
            <img src="${data['giphys']}" class="card-img-top" alt="">
        </div>
        <div class="card-footer">
        
            <div>
                <a class="comment-icon-format me-3" data-bs-toggle="collapse" href="#commentCollapse${index}" role="button" aria-expanded="false" aria-controls="commentCollapse${index}">

                    <i class="fa-solid fa-comment">
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger comment-pill">
                            ${commentLoop()[1]}
                        </span>
                            <span class="visually-hidden">Comments</span>
                            
                    </i>
                </a>
                <form id="reactionForm${index}">
                    <button type="button" value="U+1F642 ${index}" class="emoji-btn-format">&#x1F642</button>
                    <button type="button" value="U+1F610 ${index}" class="emoji-btn-format">&#x1F610</button>
                    <button type="button" value="U+1F602 ${index}" class="emoji-btn-format">&#x1F602</button>
                    <button type="button" value="U+1F641 ${index}" class="emoji-btn-format">&#x1F641</button>
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


},{"./url":5}],3:[function(require,module,exports){
const { buildDeck } = require("./cardCreation");
const { API_URL } = require("./url");


function submitArticle(event) {
    event.preventDefault()
    console.log('form submitted')
    try {
        const articleData = {
            title: event.target['articleTitle'].value,
            description: event.target['articleText'].value,
            createdAt: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
            comments: [null],
            reactions: [null],
            giphys: event.target['GiphyImage'].src
        };
        console.log(articleData)
        const options = {
            method: 'POST',
            body: JSON.stringify(articleData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        // TODO this fetch will most likely need to change before production
        
        fetch(`${API_URL}/create`, options).then(()=>buildDeck())
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

// function successAlert(message, type) {
//     const alertWrapper = document.createElement('div')
//     alertWrapper.setAttribute('class', `alert alert-${type} alert-dismissible`)
//     alertWrapper.setAttribute('role', 'alert')

//     const btn = document.createElement('button')
//     btn.setAttribute('type', 'button')
//     btn.setAttribute('class', 'btn-close')
//     btn.setAttribute('data-bs-dismiss', 'alert')
//     btn.setAttribute('aria-label', 'Close')

//     alertWrapper.textContent = message

//     alertWrapper.append(btn)
//     const submitAlert = document.getElementById('submitAlert')
//     submitAlert.append(alertWrapper)
// }

module.exports = { submitArticle }

},{"./cardCreation":2,"./url":5}],4:[function(require,module,exports){
(function (process){(function (){
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

}).call(this)}).call(this,require('_process'))
},{"./cardCreation":2,"./handler":3,"./url":5,"_process":1}],5:[function(require,module,exports){

// development
const API_URL = 'http://localhost:3000'

// production
// const API_URL = 'https://api-anonyblogfp.herokuapp.com'



module.exports = {API_URL};

},{}]},{},[4]);
