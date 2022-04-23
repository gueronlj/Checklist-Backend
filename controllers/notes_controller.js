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
   Note.find({}).sort({createdAt: 'desc'}).exec((error, data)=>{
      if(error){
         res.json(error);
         console.log(error);
      } else {
         res.json(data)
      }
   })
})

//-------------Update


//-------------Delete
