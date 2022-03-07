//Used for UI logic and communicating with view
//Acts as a middleman and used for handling client requests
//Where functions go

const express = require('express');
const Article = require('../models/model')
const router = express.Router()

router.get('/articles', (req,res) => {
  const articlesData = Article.all
  res.send(articlesData)
})

module.exports = router
