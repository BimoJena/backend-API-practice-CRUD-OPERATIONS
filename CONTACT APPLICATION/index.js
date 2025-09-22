import express from 'express'
import dotenv from 'dotenv'
import './db/db.js'
import route from './routes/api.route.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/contacts/', route)

app.get('/',(req,res)=>{
    res.send('app is ready')
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at port: ${process.env.PORT}`)
})