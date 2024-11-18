const express=require('express')
const router=express.Router();

router.get("/", (req,res)=>{
    res.render("../views/firstRenderingPage/rendering.ejs");
})
router.get("/about",(req,res)=>{
    res.render("../views/firstRenderingPage/about.ejs");
})
router.get("/RisingStar",(req,res)=>{
    res.render("../views/firstRenderingPage/RisingStar.ejs");
})

module.exports=router;