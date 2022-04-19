const express = require("express")
const app = express();
const mongoose = require ('mongoose');
const db = mongoose.connection;
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)

db.on('error', (error) => console.log(error.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
