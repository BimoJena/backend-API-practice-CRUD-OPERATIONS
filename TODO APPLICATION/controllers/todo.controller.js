
import { todoModel } from '../models/todo.model.js'


export const createTODO = async (req, res) => {
    try {
        const { title, description, completed } = req.body

        if (!title) {
            return res.status(400).json({
                message: "title is required"
            })
        }
        const todo = new todoModel({title, description, completed})
        await todo.save()
        return res.status(201).json(todo)

    }catch(err){
        return res.status(401).json({
            message: "something went wrong",
            error: err.message
        })
    }
}


export const getTODO = async (req, res) => {
    try{
        const todos = await todoModel.find(); // saare todo milenge
        return res.status(201).json(todos)
    }catch(err){
        return res.status(401).json({
            message: "failed to fetch the data",
            error: err.message
        })
    }
}


export const getTodoById = async (req, res) =>{
    try{
        const {id} = req.params;
        const todo = await todoModel.findById(id)
        if(!todo){
            return res.status(401).json({
                message: "todo not found"
            })
        }
        return res.status(401).json(todo)
    }
    catch(err){
        return res.status(201).json({
            message: "failed to fetch todo by id",
            error: err.message
        })
    }
}


export const updateTodo = async (req,res) => {
    try{
        const {id} = req.params
        const todo = await todoModel.findByIdAndUpdate(id, req.body, {new: true})
        if(!todo){
            return res.status(401).json({
                message: "no such todo with this id"
            })
        }
        return res.status(201).json(todo)
    }catch(err){
        return res.status(401).json({
            message: 'failed to update the data',
            error: err.message
        })
    }
}


export const deleteTodo = async (req,res) =>{
    try{
        const {id} = req.params
        const todo = await todoModel.findByIdAndDelete(id)
        if(!todo){
            return res.status(401).json({
                message: 'no such todo is present there'
            })
        }
        return res.status(201).json(todo)
    }catch(err){
        return res.status(401).json({
            message: 'something went wrong in deleting the data',
            error: err.message
        })
    }
}