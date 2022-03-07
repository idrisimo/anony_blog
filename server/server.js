const express = require('express');
//const cors = require('cors'); // TODO install cors npm package
const app = express();


app.use(express.json())
//app.use(cors());


const searchRoutes = require('./controller/controller.js')
app.use('/', searchRoutes)

app.get('/', (req, res) => {
    res.send('Hello there test!');
});



module.exports = app;
