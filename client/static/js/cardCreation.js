

function buildDeck() {

    fetch('http://localhost:3000/articles')
        .then((response) => response.json())
        .then((data) => {
            const wrapper = document.getElementById('cards')
            
            for (index in data) {
                const card = cardTemplate(data[index])
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

                    <i class="fa-solid fa-comment" id="comm${data['id']}">
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger comment-pill">
                            99+
                            <span class="visually-hidden">Comments</span>
                    </i>
                </a>
                <a href="">
                    <i>&#129409</i>
                </a>
            </div>
            <small class="text-muted text-end">${data['createdAt']}</small>
        </div>
    </div>
</div>`
return template
}

function showComments(data,id){
    let commBoxes = document.querySelectorAll('#comm*')
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
