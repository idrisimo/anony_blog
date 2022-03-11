// const app = require('http').createServer((req, res)=> res.send('online'))
// const PORT = process.env.PORT || 8080
// console.log(app)
// app.listen(PORT, ()=> {
//     console.log(`http-server listening on port ${PORT}`)
// })

const { exec } = require('child_process')
const PORT = process.env.PORT || '8080'
console.log(`running on port ${PORT}`)
exec(`http-server -p ${PORT}`, (error, stdout, stderr) => {
    
    if (error) {
        return console.log(`error: ${error.message}`);
    }

    if (stderr) {
        return console.log(`stderr: ${stderr}`);
    }
})
