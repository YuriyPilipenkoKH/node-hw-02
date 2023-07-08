const express = require('express')
const books = require('../../db/books')
const {HttpError} = require('../../helpers')
const Joi = require('joi')

const router = express.Router()
const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
})

router.get('/', async (req, res) => {
    // res.json(books)
    try {
        const result = await books.getAll()
        console.log(result)
        if(!result){
            throw HttpError(404, 'Not Found All')
          
        }
        res.json(result)
    } 
    catch (error) {
        next(error)
    }

})

router.get('/:id', async( req, res, next) => {
    try {
       
        const {id} = req.params
        const result = await books.getById(id)
        if(!result){
            throw HttpError(404, 'Not Found ID')
            // const error = new Error('Not Found')
            // error.status = 404
            // throw error
            // return res.status(404).json({
            //     message: 'Not Found'
            // })
        }
        res.json(result)
    }
     catch (error) {

        next(error)
        // const {status = 500, message = 'Server Error'} = error
        // res.status(status).json({
        //     message
        // })
    }
})

router.post('/', async (req, res, next) => {
   try {
    const {error} = addSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const result = await books.add(req.body)
    res.status(201).json(result)
   } 
   catch (error) {
    next(error)
   }
}) 
router.put('/:id',async (req, res,  next) => {
   try {
    const {error} = addSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const {id} = req.params
    const result = await books.update(id, req.body)

    if(!result){
        throw HttpError(404, 'Not Found')
    }

   } 
   catch (error) {
    next(error)
   }

})
router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params
        const result = await books.del(id)
        res.status(201).json(result)
       } 
       catch (error) {
        next(error)
       }
    
})

module.exports = router