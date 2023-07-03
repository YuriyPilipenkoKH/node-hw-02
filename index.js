const express = require('express')
const books = require('.')

const app = express()


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