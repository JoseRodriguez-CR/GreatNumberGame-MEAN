const express = require("express");
const session = require('express-session');
const app = express();



app.use(express.urlencoded({entended: true}));
app.use(express.static(__dirname + "/static"));
app.use(session({
    secret: 'codingdojo',
    resave: false,
    saveUninitialized: true
}))

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");



app.get("/", function(request, response){
    if(!request.session.actual){
        request.session.actual = Math.floor(Math.random()*100)+1;
    }
    console.log(request.session.actual);
    response.render("index", {guess: request.session.guess, actual: request.session.actual});
});

app.post("/guess", function(request, response){
    request.session.guess = request.body.guess;
    response.redirect("/"); 
});

app.get("/reset", function(request, response){
    request.session.actual = Math.floor(Math.random()*100)+1;
    console.log(request.session.actual)
    request.session.guess = undefined;
    response.redirect("/");
});

app.listen(8080, function(){
    console.log("Listening on port 8080");
}); 