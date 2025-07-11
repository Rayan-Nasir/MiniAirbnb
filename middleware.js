const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        //saving redirectURL
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "You must be logged in to perform this action");
       return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectURL = (req, res, next) =>{
    if(req.session.redirectURL){
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
};

module.exports.isOwner = async (req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this post");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


//Creating Middleware of Joi by making it a function
module.exports.validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }

};

module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }

};


module.exports.isReviewAuthor = async (req, res, next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};