const yup = require('yup');

async function validate(schema, data) {
  try {
    const value = await schema.validate(data, { stripUnknown: true })
    return { status: true, data: value }
  } catch (err) {
    throw { status: false, message: err.message, code: 400 }
  }
}

const validationSchema = async (data) => {
  const userSchema = yup.object().shape({
    name: yup.string().required("Gagal menambahkan buku. Mohon isi nama buku"),
    year: yup.number().required("Gagal menambahkan buku. Mohon isi tahun buku"),
    author: yup.string().required("Gagal menambahkan buku. Mohon isi author buku"),
    summary: yup.string().required("Gagal menambahkan buku. Mohon isi summary buku"),
    publisher: yup.string().required("Gagal menambahkan buku. Mohon isi publisher buku"),
    pageCount: yup.number().required("Gagal menambahkan buku. Mohon isi pageCount buku"),
    readPage: yup.number().when('pageCount', (pageCount, userSchema) => {
      if (data?.readPage > pageCount[0]) {
        throw {message : "Read Page Tidak boleh lebih besar dari page count"}
      }
    }).required("Gagal menambahkan buku. Mohon isi readPage buku"),
    reading: yup.boolean("Harus True Atau False").required("Gagal menambahkan buku. Mohon isi Reading buku"),
  });

  const value = await validate(userSchema, data)
  return value
}

module.exports = {
  validationSchema
}