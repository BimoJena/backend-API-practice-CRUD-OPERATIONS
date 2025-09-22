import mongoose, { mongo } from 'mongoose'
import { libraryModel } from '../model/library.model.js'

export const addBook = async (req, res) => {
    try {
        const { title, author, genre, available } = req.body
        if (!title || !author || !genre || !available) {
            return res.status(404).json({
                message: "all fields are required"
            })
        }
        const books = new libraryModel({ title, author, genre, available })
        books.save()
        return res.status(200).json(books)
    } catch (err) {
        return res.status(404).json({
            message: 'error in addBook API',
            error: err.message
        })
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await libraryModel.find()
        return res.status(200).json(books)
    } catch (err) {
        return res.status(404).json({
            message: "error in getAllBooks API",
            error: err.message
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "this book do not exist"
            })
        }
        const book = await libraryModel.findById(id)

        return res.status(200).json(book)

    } catch (err) {
        return res.status(404).json({
            message: "error in getBookById API",
            error: err.message
        })
    }
}

export const updateBookById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "book do not exist"
            })
        }
        const book = await libraryModel.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).json(book)
    } catch (err) {
        return res.status(404).json({
            message: "error in updateBookById API",
            error: err.message
        })
    }
}

export const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "this book do not exist"
            })
        }
        const book = await libraryModel.findByIdAndDelete(id)
        return res.status(200).json(book)
    } catch (err) {
        return res.status(404).json({
            message: "error in deleteBookById API",
            error: err.message
        })
    }
}

export const toggleAvailability = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                message: "book do not exist"
            })
        }
        const book = await libraryModel.findById(id)

        if (book.available == true) {    // longcut
            book.available = false
        } else if (book.available == false) {
            book.available = true
        }
        // book.available = !book.available //(shortcut)
        await book.save()
        return res.status(200).json({
            message: "status upgraded",
            boodTitle: book.title,
            status: book.available
        })
    } catch (err) {
        return res.status(404).json({
            message: "error in toggleAvailability API",
            error: err.message
        })
    }
}

export const searchAuthor = async (req, res) => {
    try {
        const name = req.query.author
        const authorName = await libraryModel.find({ author: name })
        if (authorName.length === 0) {
            return res.status(404).json({
                message: "no such author exist"
            })
        }
        return res.status(200).json(authorName)
    } catch (err) {
        return res.status(404).json({
            message: "error in searchAuthor API",
            error: err.message
        })
    }
}

export const listOnlyAvailableBooks = async (req, res) => {
    try {
        const status = req.query.available

        if(status !== "true" && status !== "false"){
            return res.status(404).json({
                message: "query must be true or false"
            })
        }

        const isAvailable = status === "true"
        const availableStatus = await libraryModel.find({ available: isAvailable })

        if (availableStatus.length === 0) {
            return res.status(404).json({
                message: "no books are available"
            })
        }
        return res.status(200).json(availableStatus)
    } catch (err) {
        return res.status(404).json({
            message: "error in getBookByAvailabilityStatus API",
            error: err.message
        })
    }
}