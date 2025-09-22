import express from 'express'
import { createTODO, getTODO, getTodoById, updateTodo, deleteTodo } from '../controllers/todo.controller.js'

const route = express.Router()

route.post('/', createTODO)
route.get('/', getTODO)
route.get('/:id', getTodoById)
route.put('/:id', updateTodo)
route.delete('/:id', deleteTodo)

export default route