const express = require("express");
const router = express.Router({mergeParams: true});   

const Listing = require("../models/listing.js")
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {reviewSchema} = require("../schema.js")


//reviews validation----
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        console.log(error);
        console.log(errMsg);
        throw new ExpressError(400,errMsg)        
    }else{
        next();
    }
}

//------------------------------------------------Create Reviews Route--------------------------------------------
router.post("/",validateReview,wrapAsync(async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    console.log(listing)
    let newReview = new Review(req.body.review);
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();      
    console.log("new review saved")
    req.flash("success","New Review Created!")
    res.redirect(`/listings/${req.params.id}`)
}));

//------------------------------------------------Delete Reviews Route--------------------------------------------
router.delete("/:reviewId",wrapAsync(async(req,res,next)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); 
    await Review.findByIdAndDelete(reviewId);                         
    req.flash("error","Review Deleted!")
    res.redirect(`/listings/${id}`); 
}))

module.exports = router;