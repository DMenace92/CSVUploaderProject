const express = require('express')
const csv = require('csvtojson')
const Data = require('../models/csvModels'); 
const Router = new express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./routes/fileUploads" );
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname );
    },
});
const upload = multer({ storage });


Router.post('/upload', upload.single('csvfile'),async (req, res) => {
    const jsonArray = await csv().fromFile(req.file.path)
    try{
        Data.insertMany(jsonArray,(err, result)=>{
            if(err){
                return res.status(500).json(err,"there was an error")
            }
            return res.json("added successfuly")
        })
    }catch(e){
        res.status(500).send(e)
    }
  });

module.exports = Router