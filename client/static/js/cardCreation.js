

function buildDeck() {

    fetch('http://localhost:3000/articles')
        .then((response) => response.json())
        .then((data) => {
            const wrapper = document.getElementById('cards')
            
            for (index in data) {
                const card = cardTemplate(data[index])
                wrapper.insertAdjacentHTML('afterbegin', card)
            }
        })
}

function reactionsHandler(reactionsArray) {
    const summary = {};
    let reactionTemplate = '';
    for (const reaction of reactionsArray) {
        if (reaction=== ""){
            summary[reaction] = 'No reactions'
        } else if (summary[reaction]) {
            summary[reaction] += 1;
        } else {
            summary [reaction] = 1
        }
    }
    
    for (const [key, value] of Object.entries(summary)) {
        const keyClean = `&#x${key.split("+")[1]}`
        console.log(keyClean, value)
        if (value != 'no reactions') {
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
                <a class="emoji-pill-format" href="#">
                    <span>&#x1F642</span>
                </a>
                <a class="emoji-pill-format" href="#">
                    <span>&#x1F610</span>
                </a>
                <a class="emoji-pill-format" href="#">
                    <span>&#x1F602</span>
                </a>
                <a class="emoji-pill-format" href="#">
                    <span>&#x2639</span>
                </a>
                <a class="emoji-pill-format" href="#">
                    <span>&#x1F621</span>
                </a>
                <a class="emoji-pill-format" href="#">
                    <span>&#x1F600</span>
                </a>
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

module.exports = { buildDeck, removeCards }
