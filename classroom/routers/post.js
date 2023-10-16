const express = require("express");
const router = express.Router();     

//Posts-----------
//index 
router.get("/",(req,res)=>{
    res.send("GET for posts!");
})
//show 
router.get("/:id",(req,res)=>{
    res.send("GET for show posts!");
})
//post 
router.post("/",(req,res)=>{
    res.send("POST for post id!");posts
})
//delete 
router.delete("/:id",(req,res)=>{
    res.send("DELETE for post id!");
})

module.exports = router;