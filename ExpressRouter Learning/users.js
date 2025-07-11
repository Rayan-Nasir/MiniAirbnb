const express = require("express");
const router = express.Router();


//User Routes

//Index Route 
router.get("/", (req, res) =>{
    res.send("GET for users");
});


//Show Route
router.get("/:id", (req, res) =>{
    res.send("Get for user id");
});


//New Route 
router.post("/", (req, res) =>{
    res.send("POST for users");
});


//Delete Route 
router.delete("/:id", (req, res) =>{
    res.send("DELETE for show user id");
});


module.exports = router;