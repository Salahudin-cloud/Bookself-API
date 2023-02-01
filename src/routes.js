// import handler
const {
  addBook, getAllNote, getDetailBook, requestUpdateBook, deleteBook,
} = require('./handler');

const routes = [
  // created new book
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  // get book ( all books / by name / reading or not / finished or not  )
  {
    method: 'GET',
    path: '/books',
    handler: getAllNote,
  },
  // get detail book
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getDetailBook,
  },
  // update book
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: requestUpdateBook,
  },
  // delete book
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;
