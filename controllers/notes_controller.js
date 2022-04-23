const express = require('express')
const notes = express.Router()
const Note = require('../Models/note.js')

//-------------Create
notes.post('/new', (req,res)=>{
   Note.create(req.body, (error, newNote)=>{
      console.log('New note has been added', newNote);
      res.json(newNote)
   })
})

//--------------Read
notes.get('/', (req, res)=>{
   Note.find({}).sort({createdAt: 1}).exec((error, data)=>{
      if(error){
         res.json(error);
         console.log(error);
      } else {
         res.json(data)
      }
   })
})

//-------------Update Note
notes.put('/:id', (req, res) => {
    Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (error, updated) => {
            if(error){
               res.json(error)
               console.log(error);
            }else{
               res.json(updated)
            }
        }
    )
})

//-------------Delete
notes.delete('/:id',(req,res)=>{
   Note.findByIdAndRemove(
      req.params.id,
      (error, deleted)=> {
         if(error){
            res.json(error);
            console.log(error);
         }else{
            res.json(deleted)
         }
      }
   )
})

module.exports = notes
