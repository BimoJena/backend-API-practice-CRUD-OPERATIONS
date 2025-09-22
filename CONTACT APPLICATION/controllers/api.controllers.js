import {contactModel} from '../model/contact.model.js'

export const addContact = async (req, res) =>{
    try{
        const {name, email, phone, address} = req.body

        if(!name || !email ||!phone ||!address){
            return res.status(401).json({
                message: "all fields are required"
            })
        }

        const findPhone = await contactModel.findOne({phone})

        if(findPhone){
            return res.status(401).json({
                message: "Phone Number already exists"
            })
        }

        const contact = new contactModel({name, email, phone, address})
        await contact.save()
        return res.status(201).json(contact)
        
    }catch(err){
        return res.status(401).json({
            message: "addcontact error occured",
            error: err.message
        })
    }
}

export const getContacts = async (req,res) =>{
    try{
        const contacts = await contactModel.find(); // saare contacts de dega
        return res.status(201).json(contacts)
    }catch(err){
        return res.status(401).json({
            message: "error in fetching all contacts",
            error: err.message
        })
    }
}

export const getContactById = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(401).json({
                message: "this contact does not exist"
            })
        }
        const findContact = await contactModel.findById(id);
        return res.status(201).json(findContact)
    }catch(err){
        return res.status(401).json({
            message: "error in fetching specific contact",
            error: err.message
        })
    }
}

export const updateContactById = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(401).json({
                message: "contact does not exist"
            })
        }
        const contactUpdate = await contactModel.findByIdAndUpdate(id,req.body, {new: true})
        return res.status(201).json(contactUpdate)
    }catch(err){
        return res.status(401).json({
            message: "error in updating contact",
            error: err.message
        })
    }
}

export const deleteContactById = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message: "contact does not exist"
            })
        }
        const deleteContact = await contactModel.findByIdAndDelete(id)
        return res.status(200).json(deleteContact)
    }catch(err){
        return res.status(400).json({
            message: "delete contact is not working",
            error: err.message
        })
    }
}