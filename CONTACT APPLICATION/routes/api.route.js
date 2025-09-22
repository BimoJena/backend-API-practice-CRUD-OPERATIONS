import express from 'express'
import { addContact, deleteContactById, getContactById, getContacts, updateContactById } from '../controllers/api.controllers.js'

const route = express.Router()

route.post('/', addContact)
route.get('/', getContacts)
route.get('/:id', getContactById)
route.put('/:id', updateContactById)
route.delete('/:id', deleteContactById)

export default route