
let f = document.getElementById("commentForm")
f.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("hi")
})
function buildDeck() {

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

function sendComments(comment){
    console.log(comment.target.value)
    const options = {
        method: 'POST',
        body: JSON.stringify("test"),
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch('http://localhost:8080/comment/', options)
    .then((response) => response.json())
    .then()
}
function addCommentToModal(comment){
    let template = `<p>${comment}<p><br>`
    return template;

}
function showComments(){
    let commBoxes = document.querySelectorAll(`[id*="comm"]`)
    for(let i = 0;i<commBoxes.length;i++){
        if(id==commBoxes[i]){
            console.log(data[id])
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

                    <i class="fa-solid fa-comment" id="comm${data['id']}">
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

function removeCards(event) {
    // Skywalker in the jedi temple.
    event.preventDefault()
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
        reactionData = {
            id: 1,
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
    })
}



module.exports = { buildDeck, removeCards, submitReaction }
