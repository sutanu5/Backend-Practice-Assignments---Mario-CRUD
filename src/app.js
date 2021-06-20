const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
//GET
app.get('/mario',async(req,res) => {
    const marioChar = await marioModel.find();
    res.send(marioChar);
})

//GET BY ID
app.get('/mario/:id',async(req,res) => {
    // try{
    //     const marioChar = await marioModel.findById(req.params.id);
    //     if(marioChar){
    //         let data = {
    //             marioChar
    //         }
    //         res.status(200).send(data);
    //     }
    // }catch(error){
    //         let data = {
    //             message:error.message
    //         }
    //         res.status(400).send(data);
    // }
    const marioChar = await marioModel.findById(req.params.id)
    .catch((error) => {
        return res.status(400).send({message:error.message});
    })
    res.send(marioChar);

    
})

//POST
app.post('/mario',async(req,res) => {
    if(!req.body.name || !req.body.weight){
        return res.status(400).send({message:'either name or weight is missing'})
    }
    let marioChar = new marioModel({
        name:req.body.name,
        weight:req.body.weight
    })
    result = await marioChar.save();
    res.status(201).send(result);
})

//PATCH
app.patch('/mario/:id', async(req, res) => {

    const marioChar = await marioModel.findByIdAndUpdate( req.params.id , req.body, {
        new: true
    }).catch((error) => {
        return res.status(400).send({message:error.message});
    })

    // if(!marioChar) return res.status(400).send({message:error.message});

    res.status(200).send(marioChar);

    // try{
    //     const marioChar = await marioModel.findByIdAndUpdate( req.params.id , req.body, {
    //         new: true
    //     });
    //     let data = {
    //         marioChar
    //     }
    //     res.status(200).send(data);
    // }catch(error){
    //         let data = {
    //             message:error.message
    //         }
    //         res.status(400).send(data);
    // }
});


//DELETE
app.delete('/mario/:id',async(req,res) => {

    try{
        const marioChar = await marioModel.findByIdAndDelete(req.params.id);
        let data = {
            marioChar,
            message:'character deleted'
        }
        res.send(data);
    }catch(error){
            let data = {
                message:error.message
            }
            res.status(400).send(data);
    }
})
module.exports = app;
