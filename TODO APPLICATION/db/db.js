import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log(`mongoDB connected successfully`)
})
.catch((err) =>{
    console.log(`mongoDB connection failed: ${err}`)
})