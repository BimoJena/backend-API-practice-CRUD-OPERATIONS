import mongoose from 'mongoose'
import { receipeModel } from '../model/receipe.model.js'

export const createReceipe = async (req, res) => {
    try {
        const { title, ingredients, steps, author } = req.body
        if (!title || !ingredients || !steps || !author) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }
        const create = new receipeModel({ title, ingredients, steps, author })
        create.save()
        return res.status(200).json(create)
    } catch (err) {
        return res.status(400).json({
            message: "error in createReceipe API",
            error: err.message
        })
    }
}

export const getAllReciepe = async (req, res) => {
    try {
        const allReceipe = await receipeModel.find()
        if (allReceipe.length === 0) {
            return res.status(400).json({
                message: "no receipe exist"
            })
        }
        return res.status(200).json(allReceipe)
    } catch (err) {
        return res.status(400).json({
            message: "error in getAllReceipe API",
            error: err.message
        })
    }
}

export const getReceipeById = async (req, res) => {
    try {
        const { id } = req.params;

        /**
         * 
         * Reason: receipeModel.findById(id) CastError throw kar deta hai kyunki Mongoose us invalid string ko ObjectId me convert nahi kar sakta.

            Iska matlab hai: JavaScript exception throw hoti hai → control directly catch block me chala jata hai.

            Tab ye if(!receipe) wala block run hi nahi hota, kyunki receipe tak pahuch hi nahi pa raha.
         * 
         */

        if (!mongoose.Types.ObjectId.isValid(id)) {  // cast
            return res.status(404).json({
                message: "recipe do not exist"
            });
        }
        const receipe = await receipeModel.findById(id)

        // if (!receipe) {
        //     return res.status(404).json({
        //         message: "receipe do not exist"
        //     })
        // } 
        //iske hone naa hone se as such frk nahi pd rha ab
        return res.status(200).json(receipe)
    } catch (err) {
        return res.status(400).json({
            message: "error in getReceipeById API",
            error: err.message
        })
    }
}

export const updateReceipeById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "receipe do not exist"
            })
        }
        const receipeUpdate = await receipeModel.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(receipeUpdate)
    } catch (err) {
        return res.status(404).json({
            message: "error in updateReceipeById API",
            error: err.message
        })
    }
}

export const deleteReceipeById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "receipe do not exist"
            })
        }

        const deleteReceipe = await receipeModel.findByIdAndDelete(id)
        return res.status(200).json(deleteReceipe)

    } catch (err) {
        return res.status(404).json({
            message: "error in deleteReceipeById API",
            error: err.message
        })
    }
}


export const getReceipeByIngredients = async (req, res) => {
    try {
        const ingredient = req.query.ingredient
        const receipe = await receipeModel.find({ ingredients: { $in: [ingredient] } })
        if (receipe.length === 0) {
            return res.status(404).json({
                message: 'no recipe with such ingredients'
            })
        }
        return res.status(200).json(receipe)
    }catch(err){
        return res.status(404).json({
            message: 'error in getReceipeByIngredients API',
            error: err.message
        })
    }

}

export const getReceipeByTitle = async (req,res) =>{
    try{
        const title = req.query.title
        const receipe = await receipeModel.find({ title: { $in: [title] } })
        if(!receipe){
            return res.status(404).json({
                message: "no recipe with this title exist"
            })
        }
        return res.status(200).json(receipe)
    }catch(err){
        return res.status(404).json({
            message: "error in getReceipeByTitle API",
            error: err.message
        })
    }
}

export const getReceipeByAuthor = async (req,res) =>{
    try{
        const author = req.query.author
        const receipe = await receipeModel.find({author: author})
        if(receipe.length === 0){
            return res.status(404).json({
                message: "no recipe exit from this author"
            })
        }
        return res.status(200).json(receipe)
    }catch(err){
        return res.status(404).json({
            message: "error in getReceipeByAuthor API",
            message: err.message
        })
    }
}