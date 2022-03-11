/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
global.fetch = require('jest-fetch-mock');
let app
describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    // describe('head', () => {
    //     test('it has a title', () => {
    //         const title = document.querySelector('.hero-text');
    //         expect(title).toBeTruthy();
    //         expect(title.textContent).toBe("Welcome to Anonyblog  share own your thoughts.")
    //     })
    // })

    describe('body', () => {
        describe('button', () => {
            let button;

            beforeEach(() => {
                button = document.querySelector('#newArticle')
            })

            test('it exists', () => {
                expect(button).toBeTruthy();
            })

            test('it has a call to action', () => {
                expect(button.textContent.toLowerCase()).toContain('new article')
            })

        })

        describe('form', () => {
            let form;
            let articleTitle, articleText, submitBtn, articleGiphy;
            beforeEach(() => {
                form = document.querySelector('form')
                articleTitle = form.querySelector('#articleTitle');
                articleText = form.querySelector('#articleText')
                submitBtn = document.querySelector('[type="submit"]');
            })

            test('it exists', () => {
                expect(form).toBeTruthy();
            });

            describe('title input', () => {
                test('it has an id of "articleTitle"', () => {
                    expect(articleTitle).toBeTruthy();
                })

                test('it is a text input"', () => {
                    expect(articleTitle.getAttribute('type')).toBe('text')
                })

            })

            describe('articleText input', () => {
                test('it has an id of "articleText"', () => {
                    expect(articleText).toBeTruthy();
                })
            })

            describe('submit button', () => {
                test('it says "submit"', () => {
                    expect(submitBtn.value).toBe('Submit');
                })
            })

        })

        test('it has a section to display articles', () => {
            expect(document.querySelector('section#articles')).toBeTruthy();
        })
    })
    describe("Check if Modal exists", () => {
        let modal;
        beforeEach(() => {
            modal = document.getElementById('articleModal')
        })

        test('it exists', () => {
            expect(modal).toBeTruthy();
        })
    })

    describe("Check if Success element exists", () => {
        let succesAlert;
        beforeEach(() => {
            succesAlert = document.getElementById('submitAlert')
        })

        test('it exists', () => {
            expect(succesAlert).toBeTruthy();
        })
    })

})


describe('Check JS files', () => {
    describe('checking api.js', () => {

    })
    describe('checking cardCreation.js', () => {
        beforeEach(() => {
            app = require('../js/cardCreation.js')
            document.documentElement.innerHTML = html.toString();
        })
        afterEach(() => {
            fetch.resetMocks();
        })

        test('it gets a request to /articles', () => {
            app.getAllArticles()
            expect(fetch.mock.calls[0][0]).toMatch(/articles$/)
        })

        test('checks "removeStaleDeck" function removes card', () => {
            app.removeStaleDeck(1)
            let card1 = document.getElementById('cardNum1')
            expect(card1).toBeFalsy()
        })
        test('it makes a post request to /updatearticlecomment', () => {

            const fakeSubmitEvent = {
                preventDefault: jest.fn(),
                target: [{ value: 'test comment' }, { value: '1' }]
            }
            app.sendComments(fakeSubmitEvent)

            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST')
            expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({
                id: 1,
                comments: 'test comment'
            })
            )
        })
        test('it makes a post request to /updatearticlereaction', () => {

            const fakeSubmitEvent = {
                preventDefault: jest.fn(),
                target: { value: 'U+1F642 1' }
            }
            app.constructReactionData(fakeSubmitEvent)
            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST')
            expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({
                id: 1,
                reactions: 'U+1F642'
            })
            )
        })
    })
    describe('checking handler.js', () => {
        beforeEach(() => {
            app = require('../js/handler.js')
            document.documentElement.innerHTML = html.toString();
        })
        afterEach(() => {
            fetch.resetMocks();
        })
        test('it makes a post request to /create', () => {
            const fakeSubmitEvent = {
                preventDefault: jest.fn(),
                target: {
                    articleTitle: { value: 'test title' },
                    articleText: { value: 'this description' },
                    createdAt: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
                    comments: [null],
                    reactions: [null],
                    giphys: [null],
                }
            }
            app.submitArticle(fakeSubmitEvent)
            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST')
            expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({
                title: 'test title',
                description: 'this description',
                createdAt: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
                comments: [null],
                reactions: [null],
                giphys: [null],
            })
            )

        })

    })

//     describe('checking index.js', () => {
//         let app
//         let articleForm;
//         let events ={};
//         beforeEach(()=>{
//             app = require('../js/index.js');
//             articleForm = app.SubmitClass()
//             events = {}
//             document.addEventListener = jest.fn((event, callback)=>{
//                 events[event] = callback;
//             })
//             document.removeEventListener = jest.fn((event, callback)=>{
//                delete events[event];
//             })
//         })
//         test('it should detect the submit event from "#userForm"', ()=>{
//             jest.spyOn(articleForm, 'submit')
//             articleForm.submitFunction()
//             expect(articleForm.submitEvent).toHaveBeenCalled();
//         })
//     })
})
