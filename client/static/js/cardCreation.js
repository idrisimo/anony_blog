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
