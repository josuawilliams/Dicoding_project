const { addBookHandler, getAllBooksHandler, getBooksHandlerById } = require("./handler")

const routes = [
  {
    method: "POST",
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler
  },
  {
    method: "GET",
    path: "/books/:id",
    handler: getBooksHandlerById
  },
]

module.exports = routes