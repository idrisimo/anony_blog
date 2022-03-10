const articlesData = require('../data')
const Article = require('../models/model')

describe('Article model', () => {
  const testArticle = {
    title: 'article 1',
    createdAt: '',
    description:'Very good article 1',
    comments: ["Good post", "I like this post"],
    reactions: "U+1F600",
  };

  it('should make and instance of article',() => {
    const article = new Article({id:10, ...testArticle});

    expect(article.id).toBe(10);
    expect(article.title).toBe('article 1');
    expect(article.createdAt).toBe('');
    expect(article.description).toBe('Very good article 1');
    expect(article.comments).toStrictEqual(["Good post", "I like this post"]);
    expect(article.reactions).toBe('U+1F600');
  });


  it('should return all articles', () => {
    const articles = Article.all;

    expect(articles).toEqual(articlesData);
  });


  it('should throw an error if no article found', () => {
    function testError() {
      Article.findById(1);
    }

    expect(testError).toThrowError('')
  })

  it('should contain reactions', () => {
  expect(testArticle.reactions).toContain('U+1F600');
});

 it('should have article contain keys', () => {

  expect(testArticle).toHaveProperty('title');
  expect(testArticle).toHaveProperty('createdAt');
  expect(testArticle).toHaveProperty('description');
  expect(testArticle).toHaveProperty('comments');
  expect(testArticle).toHaveProperty('reactions');

  });

//   it('should create article', () => {
//      const newArticleId = articlesData.length + 1;
//     const newArticle = Article.create(testArticle)

//     expect(newArticle).toBe({id:newArticleId})
// })


  // it('should update the article', () => {
  //   // const articleToUpdate = Article.updateById(data);
  //   const articleToUpdate = Article.updateById(testArticle)

  //    expect(articleToUpdate).toEqual( { id:1, title: "article 1", createdAt:"", description:"Very good article 1",comments: ["Good post", "I like this post"],reactions: ["U+1F600", "U+1F600"]})
  // })



})
