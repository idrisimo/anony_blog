const articlesData = require("../data")


class Article{
    constructor(data){
      this.id = data.id
      this.title = data.title
      this.createdAt = data.createdAt
      this.description = data.description
      this.comments = data.comments
      this.reactions = data.reactions
      this.giphys = data.giphy
    }
    static get all(){
      const articles = articlesData.map((article) => new Article(article));
      console.log(articles[3])
      return articles
    }
    static create (article) {
      const newArticleId = articlesData.length +1;
      
      const newArticle = new Article({id:newArticleId, ...article});
      console.log('model ',newArticle)
      articlesData.push(newArticle);
      return  articlesData;
    }
    static updateReactionById (reactionData) {
      const id = reactionData.id - 1;
      const reaction = reactionData.reactions
      // const articleData = articlesData.filter((article) => article.id === id)
      articlesData[id].reactions.push(reaction)
      // console.log(articlesData[id])
      return articlesData;
    }
    static updateCommentById (commentData) {
      const id = commentData.id;
      const comment = commentData.comment
      // const articleData = articlesData.filter((article) => 
      // article.id === id)
      articlesData[id].comments.push(comment)
      console.log(comment)
    }
  }
  module.exports = Article
