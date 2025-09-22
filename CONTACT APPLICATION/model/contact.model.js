import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
},{timestamps: true})

export const contactModel = mongoose.model("Contacts", contactSchema)