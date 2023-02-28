const { nanoid } = require('nanoid');
const books = require("./books.js");
const { validationSchema } = require("../validator/index")
const fs = require('fs')

const addBookHandler = async (request, h) => {
  try {
    const validate = await validationSchema(request.payload)
    
    
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = validate.data
    const id = nanoid(16)
    const insertAt = new Date().toISOString()
    const updatedAt = insertAt;
    const finished = pageCount === readPage ? true : false
    const newBook = {
      name, year, author, summary, publisher, pageCount, readPage, reading, id, insertAt, updatedAt, finished
    }
     
    const textData = JSON.stringify(newBook)
    fs.writeFile("./data.txt", textData, function (err) {
      if(err) throw err
      console.log("data has been saved")
    })

    books.push(newBook)

    const isSuccess = books.filter((note) => note.id).length > 0
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          noteId: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  } catch (err) {
    if (!err.status) {
      const response = h.response({
        status: 'fail',
        message: err.message,
      });
      return response.code(400)
    }
  }
}

const getAllBooksHandler = (request, h) => ({
  status: "success",
  data: {
    books
  }
})

const getBooksHandlerById = async (request, h) => {
  try {
    console.log("jojojoj")
  } catch (error) {
    console.log(error)
  }
}
//   {
//   status: "success",
//   data: {
//     books
//   }
// }


module.exports = { addBookHandler, getAllBooksHandler, getBooksHandlerById }