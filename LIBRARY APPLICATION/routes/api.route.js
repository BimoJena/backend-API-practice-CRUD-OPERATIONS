import express from 'express'
import { addBook, deleteBookById, getAllBooks, getBookById, listOnlyAvailableBooks, searchAuthor, toggleAvailability, updateBookById } from '../controllers/api.controller.js'

const route = express.Router()

route.post('/', addBook)

route.get('/:id', getBookById)
route.put('/:id', updateBookById)
route.delete('/:id', deleteBookById)
route.get('/:id/toggle', toggleAvailability)

route.get('/',(req,res)=>{
    if(req.query.author){
       return searchAuthor(req,res)
    }else if(req.query.available){
        return listOnlyAvailableBooks(req,res)
    }
    else{
        return getAllBooks(req,res)
    }
})

export default route