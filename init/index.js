const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Mongo_URL = "mongodb://127.0.0.1:27017/wonderlust"

//Calling main function created to connect with DB
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

//Connecting with Database
async function main() {
    await mongoose.connect(Mongo_URL);
}

//Deleting existing data
const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner: "68683a1c6dd02ed91f32f1cc"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

//Calling initDB function
initDB();

