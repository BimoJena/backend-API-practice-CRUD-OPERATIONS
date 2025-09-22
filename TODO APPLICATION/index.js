import express from "express";
import dotenv from 'dotenv'
import './db/db.js'
import route from './routes/apiRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/todo', route)


app.get('/',(req,res) => {
    res.send("hello world")
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
})
