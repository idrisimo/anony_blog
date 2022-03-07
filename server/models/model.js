const articlesData = require("../data")


class Article{
    constructor(data){
      this.id = data.id
      this.title = data.title
      this.createdAt = data.createdAt
      this.description = data.description
    }

    static get all(){
      const articles = articlesData.map((article) => new Article(article));
      return articles
    }

  }

  module.exports = Article
