const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')


const bookPath = path.join(__dirname, 'books.json')
// console.log(bookPath)  

const getAll = async () => {
    // const data = await fs.readFile(`${__dirname}/books.json`, 'utf-8' )
    const data = await fs.readFile(bookPath, 'utf-8'  ) //'utf-8'
   console.log("data")
    return JSON.parse(data)  || null
//     return data
}

const getById = async (id) => {
    const BookId = String(id)
    const books = await getAll() 
    const result = books.find(book => book.id === BookId )
    return result || null
}

const add = async (data) => {
    const books = await getAll() 
    const newBook = {
        id: nanoid(),
        ...data,

    }
    books.push(newBook)
    await fs.writeFile(bookPath, JSON.stringify(books, null, 2))
    return newBook
} 

const update = async (id, data) => {
    const BookId = String(id)
    const books = await getAll()
    const index  = books.findIndex(b => b.id === BookId)
     if (index === -1){
        return null
     }
     books[index] = {id, ...data}
     await fs.writeFile(bookPath, JSON.stringify(books, null, 2))
     return books[index]
}

const del = async (id) => {
    const BookId = String(id)
    const books = await getAll()
    const index  = books.findIndex(b => b.id === BookId)
     if (index === -1){
        return null
     }

     const result = books.splice(index, 1)
     await fs.writeFile(bookPath, JSON.stringify(books, null, 2))
     return result
}
 

module.exports = {
    getAll,
    getById,
    add,  
    update,
    del,
    prom: 20,
}
  