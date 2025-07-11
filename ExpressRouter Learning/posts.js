const express = require("express");
const router = express.Router();


//Posts Routes

//Index Route 
router.get("/", (req, res) =>{
    res.send("GET for posts");
});


//Show Route 
router.get("/:id", (req, res) =>{
    res.send("Get for post id");
});


//New Route 
router.post("/", (req, res) =>{
    res.send("POST for posts");
});


//Delete Route 
router.delete("/:id", (req, res) =>{
    res.send("DELETE for show post id");
});


module.exports = router;
