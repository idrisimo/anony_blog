let url = "";
let searchQuery = "hi";
let but = document.getElementById("giphybut")
// console.log(but)
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
        console.log(randomNum)
        console.log(json.data[randomNum].images.fixed_height.url)
        let imgPath = json.data[randomNum].images.fixed_height.url

        // let img = document.createElement("img")
        let img = `<img src="${imgPath}">`
        //img.setAttribute("src", imgPath)
        document.getElementById("userForm").insertAdjacentHTML('beforeend',img)
        // document.getElementById("articleText").appendChild(img)
        // document.getElementById("articleText").value += img
        // document.getElementById("articleText").innerHTML += img
    })
}