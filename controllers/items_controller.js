const express = require('express')
const checklist = express.Router()
const Item = require('../models/item.js')
const items = require('../models/seed.js')

//--------------Seed---------------------------------
checklist.get('/seed', (req, res) => {
   Item.create(
      items, (error, seed) => {
         console.log(seed);
         res.json(seed)
      }
   )
})

//================SHOW ALL=======================
checklist.get('/', (req, res) => {
   Item.find({}, (error, data) => {
      if(error){
         res.json(error);
         console.log(error);
      } else {
         res.json(data)
      }
   })
})

//============Quick increase======================
checklist.put('/increase/:id',(req,res) => {
   Item.findByIdAndUpdate(
      req.params.id,
      {$inc:{quantity: 1}},
      {new:true},
      (error, updatedItem) =>{
         if (error){
            res.json({'error':error})
         } else {
            //enable (check) item if quantity more than 0
            if(updatedItem.quantity>0){
               Item.findByIdAndUpdate(
                  req.params.id,
                  {status:true},
                  {new:true},
                  (error, updatedItem) =>{
                     if (error){
                        res.json({'error':error})
                     } else {
                        res.json(updatedItem)
                     }
                  }
               )
            } else {
               res.json(updatedItem)
            }
         }
      }
   )
})

//============Quick decrease======================
checklist.put('/decrease/:id',(req,res) => {
   Item.findByIdAndUpdate(
      req.params.id,
      {$inc:{quantity: -1}},
      {new:true},
      (error, updatedItem) =>{
         if (error){
            res.json({'error':error})
         } else {
            //disable (uncheck) item if quantity reduced to 0 or less
            if(updatedItem.quantity<=0){
               Item.findByIdAndUpdate(
                  req.params.id,
                  {status:false},
                  {new:true},
                  (error, updatedItem) =>{
                     if (error){
                        res.json({'error':error})
                     } else {
                        res.json(updatedItem)
                     }
                  }
               )
            } else {
               res.json(updatedItem)
            }
         }
      }
   )
})

//==========Change Status======================

//Disable all
checklist.put('/uncheck-all/',(req,res)=>{
   Item.updateMany(
      {},
      {status:false, quantity: 0},
      {multi:true},
      (error, response)=>{
         res.json(response)
      }
   )
})

//Enable
checklist.put('/enable/:id',(req,res) => {
   Item.findByIdAndUpdate(
      req.params.id,
      {status:true},
      {new:true},
      (error, updatedItem) =>{
         if (error){
            res.json({'error':error})
         } else {
            res.json(updatedItem)
         }
      }
   )
})

//Disable
checklist.put('/disable/:id',(req,res) => {
   Item.findByIdAndUpdate(
      req.params.id,
      {status:false},
      {new:true},
      (error, updatedItem) =>{
         if (error){
            res.json({'error':error})
         } else {
            res.json(updatedItem)
         }
      }
   )
})

//=====Add New Item ===========
checklist.post('/new', (req,res)=>{
   Item.create(req.body, (error, newItem)=>{
      console.log('New item has been added', newItem);
      res.json(newItem)
   })
})


module.exports = checklist
