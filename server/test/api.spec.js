const request = require('supertest');
const server =require('../server')

describe('API server', () => {
  let api;
   let testArticle = {
     title:"article 1",
     createdAt:'',
     description: 'Very good article 1',
   };

   beforeAll(() => {
     api = server.listen(5000 , () =>
       console.log('Test server running on port 3000')
     );
   })

   afterAll((done) => {
     console.log('Now closing the server');
     api.close(done);
   });

   it('responds to get / with status 200', (done) => {
     request(api).get('/').expect(200, done);
   });

   it('responds to get /articles with status 200', (done) => {
     request(api).get('/articles').expect(200, done);
   });

   it('responds to post /articles with status 201', (done) => {
     request(api)
     .post('/articles'
     .send(testArticle))
     .set('Accept', /application\/json/)
     .expect(201)
     .expect({id:12, ...testArticle}, done);
   })

   it('retrieves article by id', (done) => {
     request(api)
     .get('/articles/1')
     .expect(200)
     .expect({id:3, title:' article 1', createdAt:"", description: "this is a good article"}, done)

   })





})
