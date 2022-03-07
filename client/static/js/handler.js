
function submitArticle(event) {
    event.preventDefault()
    console.log('form submitted')
    const title = event.target['articleTitle'].value
    const text = event.target['articleText'].value
    console.log(`title: ${title}, text: ${text}, time: ${new Date()}`)
    
}

module.exports = {submitArticle}
