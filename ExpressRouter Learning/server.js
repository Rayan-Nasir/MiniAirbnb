const express = require("express");
const app = express();
const users = require("./users.js");
const posts = require("./posts.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Better way to write Session
const sessionOptions =  ({
    secret: "mysupersecretstring", 
    resave: false, 
    saveUninitialized: true 
})

//using session and flash
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) =>{
    res.locals.successMsg = req.flash("success")
    res.locals.errorMsg = req.flash("error")
    next();

});

//Register Route
app.get("/register", (req, res) =>{
    let {name ="anonymous"} = req.query; 
    req.session.name = name;

    if(name === "anonymous"){
        req.flash("error", "user not registerd");
    }else{
        req.flash("success", "user registered"); 
    }

    res.redirect("/hello");

});

//Hello route
app.get("/hello", (req, res) => {
res.render("page.ejs", {name: req.session.name});
});

// app.get("/reqcount", (req, res) =>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1

//     }
// res.send(`You sent the request ${req.session.count} times`);
// });


//Testing Sessions ID
// app.get("/sessiontest", (req, res) =>{
// res.send("Test successful");
// });

// app.use(cookieParser("secretcode"));

// //Signed Cookis
// app.get("/getsignedcookie", (req, res) =>{
// res.cookie("made-in", "China", {signed: true});
// res.send("signed cookie sent");
// });

// //Verifying signed cookie
// app.get("/verified", (req, res) =>{
//     console.log(req.cookies); //to print unsigned cookies
//     console.log(req.signedCookies); //to print signed cookies
//     res.send("verified");
// });

// //Route to send cookies
// app.get("/getcookies", (req, res) =>{
//     res.cookie("Greet", "hello");
//     res.cookie("madein", "Pakistan");
//     res.send("Sent you some cookies");
// });

// //Testing a cookie route for greeting to saved info
// app.get("/greet", (req, res) =>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);
// });

// //Root
// app.get("/", (req, res) =>{
// console.dir(req.cookies);
//     res.send("I am root");
//     });
    
    

// app.use("/users", users);
// app.use("/posts", posts);



app.listen(3000, ()=>{
    console.log("server is listening to 3000");
});