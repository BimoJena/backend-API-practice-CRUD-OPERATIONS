import express from 'express'
import { createNotes, deleteById, getAllNotes, getNotesById, getNotesByTag, updateNotesById } from '../controllers/api.controller.js'

const route = express.Router()

route.post('/', createNotes)
// route.get('/', getAllNotes)
// route.get('/', getNotesByTag) aaise dono get waale kaam nahi krte qki same route pe hai to hamesha upr wala hi run hoga 

route.get('/', (req,res) =>{
    if(req.query.tag){
        return getNotesByTag(req,res)
    }else{
        return getAllNotes(req,res)
    }
})
route.get('/:id', getNotesById)
route.put('/:id', updateNotesById)
route.delete('/:id', deleteById)

export default route