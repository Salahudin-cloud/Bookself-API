// import
const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
  const {
    name = null,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading = false,
  } = request.payload;

  // create unique id
  const id = nanoid(16);
  const bookId = id;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // check finished read book
  let finished;
  if (readPage === pageCount) {
    finished = true;
  } else if (readPage > pageCount) {
    const response = h.response({ message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', status: 'fail' });
    response.code(400);
    return response;
  } else {
    finished = false;
  }

  // push data to book
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // cek if user not input book name

  if (newBook.name === null) {
    const response = h.response({ message: 'Gagal menambahkan buku. Mohon isi nama buku', status: 'fail' });
    response.code(400);
    return response;
  }

  books.push(newBook);

  // cek if note successfuly added
  const isSucess = books.filter((book) => book.length === id.length > 0);
  if (isSucess) {
    const response = h.response({
      message: 'Buku berhasil ditambahkan',
      status: 'success',
      data: {
        bookId,
      },
    });
    response.code(201);
    return response;
  }

  // if failed to added
  const response = h.response({ message: 'Buku gagal ditambahkan', status: 'error' });
  response.code(500);
  return response;
};

const getAllNote = (request, h) => {
  const { name, reading, finished } = request.query;
  // filter by name
  if (name !== undefined) {
    const book = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    // eslint-disable-next-line no-shadow
    const data = book.map(({ id, name, publisher }) => ({ id, name, publisher }));
    const response = h.response({
      status: 'success',
      data: {
        books: data,
      },
    });
    response.code(200);
    return response;
  }
  // check book reading or not
  if ( reading === '0') {
    const get = books.filter((book) => book.reading === true);
    // eslint-disable-next-line no-shadow
    const data = get.map(({ id, name, publisher }) => ({ id, name, publisher }));
    const response = h.response({
      status: 'success',
      data: {
        books: data,
      },
    });
    response.code(200);
    return response;
  }
  if ( reading === '1') {
    const get = books.filter((book) => book.reading === false);
    // eslint-disable-next-line no-shadow
    const data = get.map(({ id, name, publisher }) => ({ id, name, publisher }));
    const response = h.response({
      status: 'success',
      data: {
        books: data,
      },
    });
    response.code(200);
    return response;
  }

  // get all books finished or not
  if (finished === '0') {
    const get = books.filter((book) => book.finished === false);
    // eslint-disable-next-line no-shadow
    const data = get.map(({ id, name, publisher }) => ({ id, name, publisher }));
    const response = h.response({
      status: 'success',
      data: {
        books: data,
      },
    });
    response.code(200);
    return response;
  }
  if ( finished === '1') {
    const get = books.filter((book) => book.finished === true);
    // eslint-disable-next-line no-shadow
    const data = get.map(({ id, name, publisher }) => ({ id, name, publisher }));
    const response = h.response({
      status: 'success',
      data: {
        books: data,
      },
    });
    response.code(200);
    return response;
  }
  // get all books
  if (name === undefined
    && reading === undefined && finished === undefined
  ) {
    // eslint-disable-next-line no-shadow
    const data = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
    const response = h.response({
      status: 'success',
      data: {
        books: data,
      },
    });
    response.code(200);
    return response;
  }
  // show book data even there is no data ( just show empty data)
  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getDetailBook = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((e) => e.id === bookId)[0];
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const requestUpdateBook = (request, h) => {
  const { bookId } = request.params;

  const {
    name = null, year, author, summary, publisher,
    pageCount, readPage, reading,
  } = request.payload;

  const updateAt = new Date().toISOString();

  // find exist book
  const index = books.findIndex((e) => e.id === bookId);

  // if user not assign name
  if (name === null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // if readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // if book exist
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  // book doesnt exist
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const i = books.findIndex((e) => e.id === bookId);

  if (i !== -1) {
    // delete book
    books.splice(i, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {
  addBook,
  getAllNote,
  getDetailBook,
  requestUpdateBook,
  deleteBook,
};
