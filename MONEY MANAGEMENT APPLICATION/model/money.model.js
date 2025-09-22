import mongoose from "mongoose";

const moneySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    }
},{timestamps: true})

export const moneyModel = mongoose.model("Money", moneySchema)
