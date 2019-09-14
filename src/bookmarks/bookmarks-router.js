const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const bookmarkRouter = express.Router()
const bodyParser = express.json()
const {bookmarks} = require('../store')

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        for(const text of ['title', 'url', 'rating']) {
            if (!req.body[text]) {
                const textError = `${text} is required.`
                logger.error(textError)
                return res
                    .status(400)
                    .send(textError)
            }
        }
        const {title, url, description, rating} = req.body

        const bookmark = {id: uuid(), title, url, description, rating}

        bookmarks.push(bookmark)

        logger.info(`Bookmark ${bookmark} created`)
        res 
            .status(201)
            .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
            .json(bookmark)
    })

    

bookmarkRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const {bookmark_id} = req.params;
        const bookmark = bookmarks.find(bookmark => bookmark.id === bookmark_id)

        if (!bookmark) {
            logger.error(`Bookmark id:${bookmark_id} not found`)
            return res.status(404)
            .send('Bookmark Not Found');
          }
        res.json(bookmark);
    })

    .delete((req, res) => {
        const {bookmark_id} = req.params;
        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id === bookmark_id)
    
        if (bookmarkIndex === -1) {
            logger.error(`Bookmark id: ${bookmark_id} Not Found`)
            return res
                .status(404)
                .send('Bookmark not found');
        }
        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${bookmark_id} deleted.`);
        res
            .status(204)
            .end();
    });

    module.exports = bookmarkRouter;