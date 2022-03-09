const express = require('express');
const Article = require('../models/model')
const router = express.Router()

router.get('/articles', (req,res) => {
  const articlesData = Article.all
  res.send(articlesData)
})

router.post('/create', (req,res) => {
  const data = req.body;
  console.log('controller', data)
  const newArticle = Article.create(data)
  res.status(201).send(newArticle)
})

router.post('/update', (req, res) => {
  const data = req.body;
  const articleToUpdate = Article.updateReactionById(data)
  res.status(201).send(articleToUpdate)
})

module.exports = router
