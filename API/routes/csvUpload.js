// Import necessary modules (multer, csv-parser, and your Data model)
const express = require('express')
// const csv = require('csv-parser');
const csv = require('csvtojson')
const Data = require('../models/csvModels'); // Replace with your actual data model import
const Router = new express.Router()
const multer = require('multer');

// Set up Multer for file uploads (store CSV files in memory)
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./routes/fileUploads" );
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname );
    },
});
const upload = multer({ storage });

// Define a POST route for uploading CSV files

Router.post('/upload', upload.single('csvfile'),async (req, res) => {
    const jsonArray = await csv().fromFile(req.file.path)
    // console.log(jsonArray)
    try{
        Data.insertMany(jsonArray,(err, result)=>{
            if(err){
                return res.status(500).json(err,"there was an error")
            }
            return res.json("added successfuly")
        })
        // res.json(jsonArray)
    }catch(e){
        res.status(500).send(e)
    }
  });

module.exports = Router