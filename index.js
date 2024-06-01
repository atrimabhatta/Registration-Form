var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var dotenv = require("dotenv");


const app = express ();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb+srv://Username:Password@cluster0.sspobf4.mongodb.net/')
var db=mongoose.connection
db.on('error', ()=> console.log("error in connec....."))
db.once('open', ()=> console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var email=req.body.email
    var phone=req.body.phone
    var age=req.body.age
    var Gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "email":email,
        "phone":phone,
        "age":age,
        "gender":Gender,
        "password":password
    }
    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    })
    return res.redirect('sign_up_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')

}).listen(3000);

console.log("Listening on port")
