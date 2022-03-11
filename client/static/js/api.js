let but = document.getElementById('giphybut')
but.addEventListener('click', () => {
    sendApiRequest();
})

function sendApiRequest(){
    let userInput = document.getElementById('giphyinput').value;
    let giphyApiKey = "gDaURC9x3fAB3wupn6X2nG7nEhaagMci";
    let giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}&api_key=${giphyApiKey}`

    fetch(giphyApiURL).then((data) => {
        return data.json()
    }).then((json) => {
        const randomNum = Math.floor(Math.random() * 50)
        let imgPath = json.data[randomNum].images.fixed_height.url
        let img = `<img id="GiphyImage" src="${imgPath}" alt="Giphy Image">`
        const imgEl = document.getElementById('GiphyImage')
        if(!imgEl) {
            document.getElementById("userForm").insertAdjacentHTML('beforeend',img)
        } else {
            imgEl.remove()
            document.getElementById("userForm").insertAdjacentHTML('beforeend',img)
        }
        
    })
}

module.exports = sendApiRequest;
