const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema} = require("../schema.js")


//listings validation-----
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        console.log(error);
        console.log(errMsg);
        throw new ExpressError ( 400, errMsg);
    }else{
        next();
    }
}

//----------------------------------------------Index Route----------------------------------------------
router.get("/",wrapAsync(async(req,res,next)=>{
    let allListing = await Listing.find();
    // console.log(allListing);
    res.render("listings/index.ejs",{allListing});
}));


//----------------------------------------------CREATE (New & Create Route)----------------------------------------------
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
})

router.post("/",validateListing,wrapAsync( async(req,res,next)=>{  
    req.flash("success","New Listing Created!")
    const newListing = new Listing(req.body.listing);      
    await newListing.save();
    res.redirect("/listings");

    })
);
//----------------------------------------------READ (Show Route)----------------------------------------------
router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;                      //use urlencoded app.set-----
    let listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}));

//----------------------------------------------UPDATE (Edit & Update Route)----------------------------------------------
router.get("/:id/edit",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{listing});
}));

router.put("/:id",validateListing,wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    // if(!req.body.listing){                      
    //     throw new ExpressError(400,"Send valid data for listing")
    // }
    let updateListing = req.body.listing;  
    // console.log(updateListing);
    // console.log({...updateListing});  
    await Listing.findByIdAndUpdate(id,updateListing);
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`)
}));

//----------------------------------------------DELETE (Delete Route)----------------------------------------------
router.delete("/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    let deleteListing =await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("error","Listing Deleted!")
    console.log("delete")
    res.redirect("/listings");
}));

//export----------------
module.exports = router;