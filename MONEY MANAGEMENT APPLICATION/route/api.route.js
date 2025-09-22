import express from 'express'
import { createTransaction, deleteTransactionDetailById, filterByCategory, filterByDates, getAllTransactionDetails, getTransactionDetailById, showBalance, updateTransactionDetailById } from '../controller/api.controller.js'

const route = express.Router()

route.post('/', createTransaction)
route.get('/',(req,res)=>{
    if(req.query.category){
        return filterByCategory(req,res)
    }else{
        return getAllTransactionDetails(req,res)
    }
})

route.get('/balance', showBalance)
route.get('/filter/date', filterByDates)
route.get('/:id', getTransactionDetailById)
route.put('/:id', updateTransactionDetailById)
route.delete('/:id', deleteTransactionDetailById)

export default route