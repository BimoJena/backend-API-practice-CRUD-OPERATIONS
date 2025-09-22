import mongoose from "mongoose";

const receipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients:{
        type: [String],
        default: []
    },
    steps:{
        type: [String],
        default: []
    },
    author: {
        type: String,
        required: true
    }

},{timestamps: true})

export const receipeModel = mongoose.model("Receipe", receipeSchema)