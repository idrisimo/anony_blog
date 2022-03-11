const express = require('express');
const Article = require('../models/model')
const router = express.Router()
const articles = require('../data.js')

router.get('/articles', (req,res) => {
  // console.log('request ',req)
  console.log('articles ',articles)
  const articlesData = Article.all
  console.log('controller ',articlesData)
  res.json(articlesData)
})

router.post('/create', (req,res) => {
  const data = req.body;

  const newArticle = Article.create(data)
  res.status(201).send(newArticle)
})

router.post('/updatearticlereaction', (req, res) => {
  const data = req.body;
  const articleToUpdate = Article.updateReactionById(data)
  res.status(201).send(articleToUpdate)
})


router.post('/updatearticlecomment', (req,res) => {
  const data = req.body
  const commentToUpdate = Article.updateCommentById(data)
  res.status(201).send(commentToUpdate)

})

module.exports = router
