import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log(`mongodb connected successfully`)
})
.catch((err)=>{
    console.log(`mongodb connection failed error: ${err}`)
})
