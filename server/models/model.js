const articles = require("../data")
const articlesData = require("../data")


class Article{
    constructor(data){
      this.id = data.id
      this.title = data.title
      this.createdAt = data.createdAt
      this.description = data.description
      this.comments = data.comments
      this.reactions = data.reactions
      this.giphys = data.giphys
    }
    static get all(){
      console.log('data.js ', articlesData)
      const articles = articlesData.map((article) => new Article(article));
      console.log('articlesData ', articlesData)
      console.log('models ', articles)
      return articles
    }
    static create (article) {
      const newArticleId = articlesData.length +1;
      
      const newArticle = new Article({id:newArticleId, ...article});
      articlesData.push(newArticle);
      return  articlesData;
    }
    static updateReactionById (reactionData) {
      const id = reactionData.id - 1;
      const reaction = reactionData.reactions
  
      articlesData[id].reactions.push(reaction)
      console.log(articlesData[id])
      return articlesData;
    }
    static updateCommentById (commentData) {
      const id = commentData.id -= 1;
      const comment = commentData.comments

      articlesData[id].comments.push(comment)
    }
  }
  module.exports = Article
