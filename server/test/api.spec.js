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

    request(api)



    it('responds to a unknown cat id with a 404', (done) => {
        request(api).get('/articles/345').expect(404).expect({}, done);
    });

     it('responds to non existing paths with 404', (done) => {
        request(api).get('/no').expect(404, done);
    });

   

})
