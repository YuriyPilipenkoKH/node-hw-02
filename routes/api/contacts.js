const express = require('express')
const contacts = require('../../db/contacts')
const {HttpError} = require('../../helpers')
const Joi = require('joi')

const router = express.Router()
const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
})

router.get('/', async (req, res) => {
  
    try {
        const result = await contacts.getAll()
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
        const result = await contacts.getById(id)
        if(!result){
            throw HttpError(404, 'Not Found ID')

        }
        res.json(result)
    }
     catch (error) {

        next(error)
   
    }
})

module.exports = router