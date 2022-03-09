const express = require('express');
const Article = require('../models/model')
const router = express.Router()
const articles = require('../data.js')

router.get('/articles', (req,res) => {
  const articlesData = Article.all
  res.send(articlesData)
})

router.post('/create', (req,res) => {
  const data = req.body;
  const newArticle = Article.create(data)
  res.status(201).send(newArticle)
})

router.post('/update', (req, res) => {
  const data = req.body
  const articleToUpdate = Article.updateReactionById(data)
  console.log(articleToUpdate)
  res.status(201).send(articleToUpdate)
})

router.post('/comment/', (req,res) => {
  let data = req.body
  let commentID = req.params.id
  let commentData = Article.updateCommentById(data)
  console.log("hi")
  
})

// router.get('/comments/', (req,res) => {
//   let data = req.body
//   let articleID = req.params.id
//   let comments = data[articleID]
//   console.log(comments)
//   res.send(data)
// })

module.exports = router
