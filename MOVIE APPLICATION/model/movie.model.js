import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    watched: {
        type: Boolean,
        required: true
    }
},{timestamps: true})

export const movieModel = mongoose.model("Movie", movieSchema)