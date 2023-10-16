const express = require("express");
const app = express();
const users = require("./routers/user.js")
const posts = require("./routers/post.js")
const cookieParser = require("cookie-parser")       

// app.use(cookieParser());
app.use(cookieParser("secretcode"));  

//cookies-----------------
app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namste");          
    res.cookie("country","india");
    res.send("sent you some cookies")
})

app.get("/greet",(req,res)=>{
    let  {name = "anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
})
//signed cookie-------------
app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in","India",{signed:true});   
    res.send("signed cookie send");
})
//verify cookie-------------
app.get("/verify",(req,res)=>{
    console.log(req.cookies);             
    console.log(req.signedCookies);        
    res.send("verified");
})


app.get("/",(req,res)=>{
    console.dir(req.cookies);    
    res.send("Hi,I am root!");      
})

app.use("/users",users);
app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listning on 3000");
})

