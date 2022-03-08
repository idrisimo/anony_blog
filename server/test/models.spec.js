const articlesData = require('../data')
const Article = require('../models/model')

describe('article model', () => {
  const testArticle = {
    title: 'article 1',
    createdAt: '',
    description:'Very good article 1',
  };

  it('should make and instance of article',() => {
    const article = new Article({id:10, ...testArticle});

    expect(article.id).toBe(10);
    expect(article.title).toBe('article 1');
    expect(article.createdAt).toBe('');
    expect(article.description).toBe('Very good article 1');
  });

  it('should return all articles', () => {
    const articles = Article.all;

    expect(articles).toEqual(articlesData);
  });

  // it('should return an article', () => {
  //   const article = Article.findById(1);

  //   expect(article).toEqual(articlesData[0]);
  // })

  it('should throw an error if no article found', () => {
    function testError() {
      Article.findById(1);
    }

    expect(testError).toThrowError('')
  })

  it('should create article', () => {
    const newArticleId = articlesData.length + 1;
    const newArticle = Article.create(testArticle)

    expect(newArticle).toEqual({id:newArticleId, ...testArticle})
  });

})
