const express = require("express");
const app = express();
const session = require("express-session");     
const flash = require("connect-flash")

const path = require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//send sessionId to all routes.. in cookie
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions))    
app.use(flash());
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success")
    res.locals.errorMsg = req.flash("error")
    next();
})

app.get("/register",(req,res)=>{
    let {name ="anonymous"} = req.query;
    // console.log(req.session);
    req.session.name = name;       
    if(name === "anonymous"){
        req.flash("error","User not registered ")
    }else{
        req.flash("success","User registered successfully")
    }
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    // res.send(`hello, ${req.session.name}`);
    // console.log(req.flash("success"));                 
    // res.render("page.ejs",{name: req.session.name,msg: req.flash("success")});
    // res.locals.successMsg = req.flash("success")        
    // res.locals.errorMsg = req.flash("error")
    res.render("page.ejs",{name: req.session.name}) //flash msg res.locals me store kiye or vo send karta h
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){     
//         req.session.count++    
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// })

// app.get("/test",(req,res)=>{
//     res.send ("test successful!")  
// })
app.listen(3000,()=>{
    console.log("server is listning on 3000");
})

