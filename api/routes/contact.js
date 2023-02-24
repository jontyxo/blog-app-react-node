const router = require("express").Router();
const Contact = require("../models/Contact");



router.post("/contact", async(req,res)=>{

   
   console.log(req.body)
   
   try {
    const newContact = new Contact({
        email:req.body.email,
        message:req.body.message
       });
     const savedContact = await newContact.save();
     res.status(200).json(savedContact);
   } catch (err) {
     res.status(500).json(err);
   }
})

module.exports=router;