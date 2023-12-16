import express from 'express';
import dotenv from 'dotenv';
import {User} from './model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const app = express();
app.use(express.json());
dotenv.config();


app.get("/",(req,res)=>{
    res.send("<h1>Auth System is running - RKV </h1>")
})

app.post("/register", async (req,res)=>{
    try {
        const {firstname,lastname,email,password} = req.body;
        if(!(email && password && firstname && lastname)){
            res.status(400).send("All Fields are required");
        }
        const userExist =await User.findOne({email});
        if(userExist){
            res.status(400).send("User Already Exist");
        }
        const myEncryptedPassword = await bcrypt.hash(password,10);
        
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: myEncryptedPassword,
        })

        //token

        const token = jwt.sign(
            {
                user_id: user._id,
                email
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"2h"
            }
        )
        user.token = token
        //update or not
        //handle password situation
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
})

app.post("/login", async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!(email && password)){
            res.status(400).send("Field are missing");
        }
        const user = await User.findOne({email}); 
       

        const match = await bcrypt.compare(password,user.password);

        if(user && match){
            const token = jwt.sign(
                {
                    user_id:user._id,
                    email,
                },
                process.env.SECRET_KEY,
                {
                    expiresIn:"2h"
                }
            )

            user.token=token;
            user.password=undefined;
            res.status(200).send(user);
        }else{
            res.status(400).send("Email or Password are incorrect");
        }

    } catch (error) {
        console.log(error);
    }
})


export default app;
