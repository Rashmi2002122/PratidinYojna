const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{
    console.log("Reacher to the router")
    res.send("index");
})

module.exports=router;
