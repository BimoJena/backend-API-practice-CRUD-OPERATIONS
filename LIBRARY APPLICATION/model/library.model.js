import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    }
},{timestamps: true})

export const libraryModel = mongoose.model("Library", librarySchema)