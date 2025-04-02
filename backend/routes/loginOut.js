import express from'express';
import { auth } from '../middleware';
const router=express.Router();
import { UserModel } from '../database/todo';
const jwt=require('jsonwebtoken');
const JWT_SECRET="I love mumma";

//sign up
router.post('/signup',async(req,res)=>{
const email=req.body.email;
const name=req.body.email;
const password=req.body.email;
try {
    await UserModel.create({
        name:name,
        email:email,
        password:password
    });
    res.status(200).json({msg:'the user Have been registered'});

}
catch (error) {
    res.status(400).json({msg:'err in logging window side'});
}
})

//signin
router.post('/signin',async(req,res)=>{
    const email=req.body.email;
    const name=req.body.email;
    const password=req.body.email;
    const user=await UserModel.find({
        email:email,
        password:password
    })
    if (user) {
        const token=jwt.sign({id:user._id},JWT_SECRET);
        res.json({token:token});
    }    
    else{
        res.json({msg:"invalid token"});
    }
})

export default router;