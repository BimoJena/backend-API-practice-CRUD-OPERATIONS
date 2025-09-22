import { moneyModel } from '../model/money.model.js'
import mongoose from 'mongoose'

export const createTransaction = async (req, res) => {
    try {
        const { amount, category, date, type } = req.body
        if (!amount || !category || !date || !type) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }
        const transaction = new moneyModel({ amount, category, date, type })
        transaction.save()
        return res.status(200).json(transaction)
    } catch (err) {
        return res.status(500).json({
            message: "error in createTransaction API",
            error: err.message
        })
    }
}

export const getAllTransactionDetails = async (req, res) => {
    try {
        const allTransactionDetails = await moneyModel.find()
        if (allTransactionDetails.length === 0) {
            return res.status(404).json({
                message: "no transaction history is there"
            })
        }
        return res.status(200).json(allTransactionDetails)
    } catch (err) {
        return res.status(500).json({
            message: "error in getAllTransactionDetails API",
            error: err.message
        })
    }
}

export const getTransactionDetailById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "no transaction exist with this ID"
            })
        }
        const transactionById = await moneyModel.findById(id)
        return res.status(200).json(transactionById)
    } catch (err) {
        return res.status(500).json({
            message: "error in getTransactionDetailById API",
            error: err.message
        })
    }
}

export const updateTransactionDetailById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "no such transaction exist with for this ID"
            })
        }
        const updateTransaction = await moneyModel.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(updateTransaction)
    } catch (err) {
        return res.status(500).json({
            message: "error in updateTransactionDetailById API",
            error: err.message
        })
    }
}

export const deleteTransactionDetailById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "no such transaction exist for this ID"
            })
        }
        const deleteTransaction = await moneyModel.findByIdAndDelete(id)
        return res.status(200).json(deleteTransaction)
    } catch (err) {
        return res.status(500).json({
            message: "error in deleteTransactionDetailById API",
            error: err.message
        })
    }
}

export const showBalance = async (req, res) => {
    try {
        const transaction = await moneyModel.find()

        if (!transaction || transaction.length === 0) {
            return res.status(200).json({
                balance: 0,
                message: "No transactions found"
            });
        }

        const transactionCredit = transaction
            .filter(type => type.type === "credit")
            .reduce((sum, type) => sum + type.amount, 0)

        const transactionDebit = transaction
            .filter(type => type.type === "debit")
            .reduce((sum, type) => sum + type.amount, 0)

        const balance = transactionCredit - transactionDebit

        return res.status(200).json({
            "total Credit": transactionCredit,
            "total Debit": transactionDebit,
            "total Balance": balance
        })

    } catch (err) {
        return res.status(500).json({
            message: "error in showBalance API",
            error: err.message
        })
    }
}

export const filterByCategory = async (req,res) =>{
    try{
        const filterCategory = req.query.category
        const categoryName = await moneyModel.find({category: filterCategory})
        if(categoryName.length === 0){
            return res.status(404).json({
                message: "no transaction of this category"
            })
        }
        return res.status(200).json(categoryName)
    }catch(err){
        return res.status(500).json({
            message: "error in filterByCategory API",
            error: err.message
        })
    }
}

export const filterByDates = async (req,res)=>{
    try{
        const {from, to} = req.query
        const filter = {}

        if(from && to){
            filter.date = {
                $gte: new Date(from),
                $lte: new Date(to)
            }
        }else if(from){
            filter.date = {$gte: new Date(from)}
        }else if(to){
            filter.date = {$lte: new Date(to)}
        }
        console.log(`generated filter data: ${filter}`)
        const transaction = await moneyModel.find(filter)

        if(transaction.length === 0){
            return res.status(404).json({message: "no records exist for such date"})
        }

        return res.status(200).json(transaction)
    }catch(err){
        return res.status(500).json({
            message: "error in filterByDates API",
            error: err.message
        })
    }
}