import express from 'express'
import { createMovie, deleteMovieById, filterByWatched, getAllMovies, getMovieById, searchByGenre, sortMovies, updateMovieById } from '../controller/api.controller.js'

const route = express.Router()

route.post('/', createMovie)
route.get('/',(req,res)=>{
    if(req.query.genre){
        return searchByGenre(req,res)
    }else if(req.query.watched){
        return filterByWatched(req,res)
    }else if(req.query.sort){
        return sortMovies(req,res)
    }
    else{
        return getAllMovies(req,res)
    }
})
route.get('/sortMovies', sortMovies)
route.get('/:id', getMovieById)
route.put('/:id', updateMovieById)
route.delete('/:id', deleteMovieById)

export default route