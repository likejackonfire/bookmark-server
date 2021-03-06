const knex = require('knex');
const app = require('../src/app');
const {makeBookmarksArray} = require('./bookmarks.fixtures')

describe('Bookmarks Endpoints', () => {
    let db;
  
    before('make Knex Instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL
      });
      app.set('db', db);
    });
});

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('bookmarks').truncate());

  afterEach('cleanup', () => db('bookmarks').truncate());

describe('GET /api/bookmarks', () => {
    context('Given there are no bookmarks', () => {
      it('GET /api/bookmarks responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/bookmarks')
          .set(auth)
          .expect(200, []);
      });
    });

    context('Given there are bookmarks in the database', () => {
        const testBookmarks = makeBookmarksArray();
  
        beforeEach('insert bookmarks', () => {
          return db('bookmarks').insert(testBookmarks);
        });
  
        it('GET /api/bookmarks responds with 200 and all of the bookmarks', () => {
          return supertest(app)
            .get('/api/bookmarks')
            .set(auth)
            .expect(200, testBookmarks);
        });
      });
    });
    
describe('GET /api/bookmarks/:bookmark_id', () => {
    const testId = 3;
    
        context('Given there are no bookmarks in the database', () => {
          it('GET /api/bookmarks/:bookmark_id responds with 404', () => {
            return supertest(app)
              .get(`/api/bookmarks/${testId}`)
              .set(auth)
              .expect(404, { error: { message: 'Bookmark does not exist' } });
          });
        });
    
        context('Given there are bookmarks in the database', () => {
          const testBookmarks = makeBookmarksArray();
    
          beforeEach('insert bookmarks', () => {
            return db('bookmarks').insert(testBookmarks);
          });
    
          it('GET /api/bookmarks/:bookmark_id', () => {
            const expectedBookmark = testBookmarks[testId - 1];
    
            return supertest(app)
              .get(`/api/bookmarks/${testId}`)
              .set(auth)
              .expect(200, expectedBookmark);
          });
        });
});