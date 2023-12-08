import express from "express";
import format from 'date-format';
const app = express();

const PORT = 4000 || process.env.PORT;
var date = new Date();
app.get("/",(req,res)=>{
    res.status(201).send("<p>Hello from rajjo </p>")
})

app.get("/api/v1/instagram", (req,res)=>{
    const instaObj = {
        username: "erajnishverma",
        follower: 100,
        following: 56,
        date : format.asString("dd/MM/yyyy at hh:mm:ss", date),
    }

    res.status(200).json(instaObj);
})

app.get("/api/v1/facebook", (req,res) =>{
    
    const facebookObj = {
        username: "shivamsharma",
        follower: 200,
        followings: 234,
        date : format.asString("dd/MM/yyyy at hh:mm:ss", date),
    }

    res.status(200).json(facebookObj);
})

app.get("/api/v1/linkedin", (req,res) =>{
    const linkedinObj = {
        username: "adityaverma",
        follower: 200,
        followings: 1000,
        date : format.asString("dd/MM/yyyy at hh:mm:ss", date),
    }

    res.status(200).json(linkedinObj);
})

app.get("/api/v1/:token", (req,res)=>{
    console.log(req.params.token);
    res.status(200).json({"params" : req.params.token});
})

app.listen(PORT,()=>{
    console.log("Server is running....");
})

