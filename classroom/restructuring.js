const express = require("express");
const app = express();
const users = require("./routers/user.js")
const posts = require("./routers/post.js")

app.get("/",(req,res)=>{
    res.send("Hi,I am root!");
})
app.use("/users",users);    
app.use("/posts",posts); 

app.listen(3000,()=>{
    console.log("server is listning on 3000");
})

