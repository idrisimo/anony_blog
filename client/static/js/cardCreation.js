

function buildDeck() {

    fetch('http://localhost:3000/articles')
        .then((response) => response.json())
        .then((data) => {
            const wrapper = document.getElementById('cards')
            
            for (index in data) {
                const card = cardTemplate(data[index])
                console.log(card)
                // wrapper.append(card)
                wrapper.insertAdjacentHTML('afterbegin', card)
            }
        })
}

function cardTemplate(data) {
    const template = `<div id="cardNum${data['id']}"class="col">
    <div class="card">
        <div class="card-header">
            <i class="fa-solid fa-face-smile-beam "></i>
            <i class="fa-solid fa-face-smile-beam "></i>
            <i class="fa-solid fa-face-smile-beam "></i>
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
                            <span class="visually-hidden">unread messages</span>
                    </i>
                </a>
                <a href="">
                    <i class="fa-solid fa-face-smile"></i>
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
