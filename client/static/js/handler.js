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
            giphys: [null]
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

module.exports = { submitArticle }
