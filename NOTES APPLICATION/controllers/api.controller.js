import {notesModel} from '../model/notes.model.js'

export const createNotes = async (req,res) =>{
    try{
        const {title, content, tags} = req.body
        if(!title || !content || !tags){
            return res.status(400).json({
                message: "all fields are required"
            })
        }
        const create = new notesModel({title, content, tags})
        await create.save()
        return res.status(200).json(create)
    }catch(err){
        return res.status(400).json({
            message: "error in creating notes",
            error: err.message
        })
    }
}

export const getAllNotes = async (req,res) =>{
    try{
        const allNotes = await notesModel.find()
        return res.status(200).json(allNotes)
    }catch(err){
        return res.status(400).json({
            message: "error in fetching all notes",
            error: err.message
        })
    }
}

export const getNotesByTag = async (req,res) => {
  try {
    const tag = req.query.tag;
    const notes = await notesModel.find({ tags: { $in: [tag] } });
    if(!notes){
      return res.status(400).json({ message: "Tag is required" });
    }

    // const notes = await notesModel.find({  tags: { $elemMatch: { $regex: new RegExp(tag, "i") } } });

    return res.status(200).json(notes);
  } catch(err) {
    return res.status(500).json({ message: "Error fetching notes by tag", error: err.message });
  }
}

export const getNotesById = async (req,res) =>{
    try{
        const {id} = req.params
        const notes = await notesModel.findById(id)
        if(!notes){
            return res.status(400).json({
                message: "no notes exist with this ID"
            })
        }
        return res.status(200).json(notes)
    }catch(err){
        return res.status(400).json({
            message: "error in fetching get notes by id",
            error: err.message
        })
    }
}

export const updateNotesById = async (req,res) =>{
    try{
        const {id} = req.params
        const notesUpdate = await notesModel.findByIdAndUpdate(id, req.body, {new: true})
        if(!notesUpdate){
            return res.status(400).json({
                message: "notes with this ID not exist"
            })
        }
        return res.status(200).json(notesUpdate)
    }catch(err){
        return res.status(400).json({
            message: "error in update notes api",
            error: err.message
        })
    }
}


export const deleteById = async (req,res) =>{
    try{
        const {id} = req.params
        const deleteNotes = await notesModel.findByIdAndDelete(id) // always find first fir hi kaam karo
        if(!deleteNotes){
            return res.status(400).json({
                message: "notes with this ID not exist"
            })
        }
        return res.status(200).json({
            message: "notes deleted with id",
            id_was: id,
            deleteNotes
        })
    }catch(err){
        return res.status(400).json({
            message: "error in deleting notes api",
            error: err.message
        })
    }
}