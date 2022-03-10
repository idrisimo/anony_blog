
function sendComments(comment){
    commentData = {
        id: parseInt(comment.target[1].value),
        comments: comment.target[0].value
    }
    console.log(commentData)
    

    const options = {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        }
    }

    fetch('http://localhost:3000/updatearticlecomment', options)
}

function showComments(){
    let commBoxes = document.querySelectorAll(`[id^="commnum"]`)
    commBoxes = Array.from(commBoxes)
    for(let i = 0;i<commBoxes.length;i++){

        commBoxes[i].addEventListener('submit', (e) => {
            e.preventDefault()
            sendComments(e)            
        })

    }
}

module.exports = {sendComments, showComments}
