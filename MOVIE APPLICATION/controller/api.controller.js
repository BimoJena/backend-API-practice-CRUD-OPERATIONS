import { movieModel } from "../model/movie.model.js";
import mongoose from "mongoose";

export const createMovie = async (req,res)=>{
    try{
        const { title, genre, rating, watched} = req.body
        if( !title || !genre || !rating || !watched){
            return res.status(404).json({
                message: "all fields are required"
            })
        }
        const create = new movieModel({title, genre, rating, watched})
        create.save()
        return res.status(200).json(create)
    }catch(err){
        return res.status(500).json({
            message: "error in createMovie API",
            error: err.message
        })
    }
}

export const getAllMovies = async (req,res)=>{
    try{
        const movies = await movieModel.find()
        if(movies.length === 0){
            return res.status(404).json({message: "no movies exist"})
        }
        return res.status(200).json(movies)
    }catch(err){
        return res.status(500).json({
            message: "error in getAllMovies API",
            error: err.message
        })
    }
}

export const getMovieById = async (req,res)=>{
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                message: "no movie exist with this ID"
            })
        }
        const movie = await movieModel.findById(id)
        return res.status(200).json(movie)
    }catch(err){
        return res.status(500).json({
            message: "error in getMovieById API",
            error: err.message
        })
    }
}

export const updateMovieById = async (req,res)=>{
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                message: "no movie exist with this ID"
            })
        }
        const update = await movieModel.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).json(update)
    }catch(err){
        return res.status(500).json({
            message: "error in updateMovieById API",
            error: err.message
        })
    }
}

export const deleteMovieById = async (req,res) =>{
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                message: "no movie exist with this ID"
            })
        }
        const deleteMovie = await movieModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "movie deleted successfully",
            deleteMovie
        })
    }catch(err){
        return res.status(500).json({
            message: "error in deleteMovieById API",
            error: err.message
        })
    }
}

export const searchByGenre = async (req,res) =>{
    try{
        const {genre} = req.query
        const search = await movieModel.find({genre: genre})
        if(search.length === 0){
            return res.status(404).json({
                message: "no movie exist for this gerne"
            })
        }
        return res.status(200).json({
            message: "found the movies",
            // movieName: search.title  // aaise nahi hoga bcause ye array me aa rha hai
            movieName: search.map(movie => movie.title)
        })
    }catch(err){
        return res.status(500).json({
            message: "error in searchByGenre API",
            error: err.message
        })
    }
}

export const filterByWatched = async (req,res) =>{
    try{
        const {watched} = req.query
        const isWatched = watched === "true"
        const filterMovie = await movieModel.find({watched: isWatched})
        if(filterMovie.length === 0){
            return res.status(404).json({
                message: "no movie exist"
            })
        }
        return res.status(200).json(filterMovie)
    }catch(err){
        return res.status(500).json({
            message: "error in filterByWatched API",
            error: err.message
        })
    }
}


export const sortMovies = async (req,res) =>{
    try{
        const {sort} = req.query
        let filter = {}
        let query = movieModel.find(filter)
        if(sort === "rating"){
            query = query.sort({rating: -1})
        }
        const movies = await query
        if(movies.length === 0){
            return res.status(404).json({message: "no movie exist"})
        }
        return res.status(200).json(movies)
    }catch(err){
        return res.status(500).json({
            message: "error in sortMovies API",
            error: err.message
        })
    }
}