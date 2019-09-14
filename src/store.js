const uuid = require('uuid/v4');

const bookmarks = [
    {
      id: uuid(),
      title: 'Something One',
      url: 'https://www.somethingone.com',
      description: 'Something that is One',
      rating: 5
    },
    {
      id: uuid(),
      title: 'Something Two',
      url: 'https://www.somethingtwo.com',
      description: 'Something that is Two',
      rating: 3
    },
  ]

  module.exports = {bookmarks}