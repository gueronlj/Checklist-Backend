const express = require('express')
const checklist = express.Router()
const Item = require('../models/item.js')
const items = require('../models/seed.js')

//--------------Seed---------------------------------
// checklist.get('/seed', (req, res) => {
//    Item.create(
//       items, (error, seed) => {
//          console.log(seed);
//          res.json(seed)
//       }
//    )
// })

//================SHOW ALL=======================
checklist.get('/', (req, res) => {
   Item.find({}, (error, data) => {
      res.json(data)
   })
})

module.exports = checklist
