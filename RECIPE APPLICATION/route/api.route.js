import express from 'express'
import { createReceipe, deleteReceipeById, getAllReciepe, getReceipeByAuthor, getReceipeById, getReceipeByIngredients, getReceipeByTitle, updateReceipeById } from '../controllers/api.controller.js'

const route = express.Router()

route.post('/', createReceipe)
route.get('/:id', getReceipeById)
route.put('/:id', updateReceipeById)
route.delete('/:id',deleteReceipeById)
route.get('/', (req,res)=>{
    if(req.query.ingredient){
        return getReceipeByIngredients(req,res)
    }else if(req.query.title){
        return getReceipeByTitle(req,res)
    }else if(req.query.author){
        return getReceipeByAuthor(req,res)
    }
    else{
        return getAllReciepe(req,res)
    }
})

export default route