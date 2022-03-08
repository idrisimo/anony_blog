const express = require('express');
const Article = require('../models/model')
const router = express.Router()
const articles = require('../data')

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
