/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('it has a title', () => {
            const title = document.querySelector('.hero-text');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("Welcome to Anonyblog  share your own thoughts.")
        })
    })

    describe('body', () => {
        describe('button', () => {
            let button;

            beforeEach(() => {
                button = document.querySelector('button')
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
            let articleTitle, articleText, submitBtn;
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


})
