let url = "";
let searchQuery = "hi";
let but = document.getElementById("giphybut")
console.log(but)
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
        console.log(typeof json.data[0].images.fixed_height.url)
        let imgPath = json.data[0].images.fixed_height.url
        let img = document.createElement("img")
        img.setAttribute("src", imgPath)
        console.log(img)
        // document.getElementById("articleText").appendChild(img)
        document.getElementById("articleText").value += img
        // document.getElementById("articleText").innerHTML += img
    })
}
