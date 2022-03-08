const articlesData = require("../data")


class Article{
    constructor(data){
      this.id = data.id
      this.title = data.title
      this.createdAt = data.createdAt
      this.description = data.description
      this.comments = data.comments
      this.reactions = data.reactions
    }
    static get all(){
      const articles = articlesData.map((article) => new Article(article));
      console.log(articles)
      return articles
    }
    static create (article){
      const newArticleId = articlesData.length +1;
      const newArticle = new Article({id:newArticleId, ...article });
      articlesData.push(newArticle); 
      return  newArticle;
    }
  }
  module.exports = Article
