const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



//Compact method - same routes being written together
router.route("/")
.get(listingController.index)
.post(isLoggedIn, upload.single(`newObj[image][url]`), validateListing, wrapAsync(listingController.createListing));



//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);



router.route("/:id")
.get(listingController.showListings)
.put(isLoggedIn, isOwner, upload.single(`newObj[image][url]`), validateListing, wrapAsync (listingController.updateListing))
.delete(isLoggedIn, isOwner, listingController.deleteListing);



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);



module.exports = router;