const express = require('express');
//const cors = require('cors'); // TODO install cors npm package
const app = express();
const port = 3000;

app.use(express.json())
//app.use(cors());


// const searchRoutes = require('./controller')
// app.use('/search', searchRoutes)

app.get('/', (req, res) => {
    res.send('Hello there!');
});

app.listen(port, `Server listening on port ${port}!`)

module.exports = app;
