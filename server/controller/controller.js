//Used for UI logic and communicating with view
//Acts as a middleman and used for handling client requests
//Where functions go

const express = require('express');
const Article = require('../models/model')
const router = express.Router()
const articles = require('../data')
const comments = require('../data')

router.get('/articles', (req,res) => {
  const articlesData = Article.all
  res.send(articlesData)
})

router.post('/create', (req,res) => {
  const data = req.body;
  const newArticle = Article.create(data)
  res.status(201).send(newArticle)
})


module.exports = router
