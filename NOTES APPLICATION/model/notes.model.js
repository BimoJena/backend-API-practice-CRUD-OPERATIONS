import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
},{timestamps: true})

export const notesModel = mongoose.model("Notes", notesSchema)