const express = require('express')
// const books = require('./db/books')
const contacts = require('./db/contacts.json')
const products = require('./db/products.json')
const moment = require('moment')
const fs = require('fs/promises')
const cors = require('cors')
const booksRouter = require('./routes/api/books')

const app = express()

app.use( async(req, res, next) => {
    // console.log('midleware')
    const {method, url} = req
    const date = moment().format('DD-MM-YYYY_hh:mm:ss')
    await fs.appendFile('./public/server.log',  `\n${method} ${url} ${date}`)
    next()
})



app.use(cors())
app.use(express.json())
// console.log(express)

app.use('/api/books', booksRouter)

// app.get('/books', (req, res) => {
//     res.json(books)
//     // res.send(books)
// })
app.get('/contacts', (req, res) => {
    res.json(contacts)
    // res.send(books)
})
app.get('/products', (req, res) => {
    res.json(products)
    // res.send(books)
})

app.use((req , res) => {
    res.status(404).json({
        // message: 'Not Found Anyting'
    })
}) 

app.use((err, req, res, next) => {
    const {status = 500, message = 'Server Error'} = err
    res.status(status).json({message})
})


// app.get('/', (req, res) => {
//     console.log(req.url)
//     console.log(req.method)
//     res.send('<h2>Home Page</h2>')
// })
// app.get('/contacts', (req, res) => {
//      console.log(req.url)
//      console.log(req.method)
//     res.send('<h2>Contacts Of Mine</h2>')
// })

app.listen(4000, () => console.log('Server is Running'))