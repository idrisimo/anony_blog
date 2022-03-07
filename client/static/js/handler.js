
function submitArticle(event) {
    event.preventDefault()
    console.log('form submitted')
    const articleData = {
        title: event.target['articleTitle'].valuele,
        description: event.target['articleText'].value,
        createdAt: new Date()
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
    fetch('http://localhost:3000/')
}

module.exports = {submitArticle}
