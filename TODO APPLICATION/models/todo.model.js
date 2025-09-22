import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

export const todoModel = mongoose.model("Todo", todoSchema)