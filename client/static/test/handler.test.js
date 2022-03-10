/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const path = require('path');
 const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
 
 //  global.fetch = require('jest-fetch-mock');
 let handler;
 
 describe("handler", () => {
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString();
         handler = require('../js/handler')
     })
 
     // afterEach(() => {
     //     fetch.resetMocks();
     // })
 
     // describe('submitArticle', () => {
     //     test('it makes a post request to /articles with the article data', (event) => {
 
     //         const fakeSubmitEvent = {
     //             target: {
     //                 title: { value: "title"},
     //                 description: { value: "test description" },
     //                 createdAt: { value: new Date()},
     //                 comments:{value: [null]},
     //                 reactions:{value: [null]},
     //                 giphys:{value: [null]},
     //             }
     //         }
 
     //         handler.submitArticle(fakeSubmitEvent);
     //         expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
     //         expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ title: "title", description: "test description", createdAt: new Date(), comments: [null], reactions: [null], giphys: [null]}));
     //     })
     // })
 
     describe("closeModalOnSuccess", () => {
         let modal;
         beforeEach(() => {
             modal = document.getElementById('articleModal')
         })
 
         test('it exists', () => {
             expect(modal).toBeTruthy();
         })
     })
 
     describe("successAlert", () => {
         let succesAlert;
         beforeEach(() => {
             succesAlert = document.getElementById('submitAlert')
         })
 
         test('it exists', () => {
             expect(succesAlert).toBeTruthy();
         })
     })
 
 })
 