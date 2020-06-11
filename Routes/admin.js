const Admin= require("../Models/Admin")
const express= require("express")
const router= express.Router();
const jwt = require("jsonwebtoken")
const bcrypt= require("bcryptjs")
const User= require("../Models/User")


router.get("/adminHome",(req,res)=>{
    res.sendFile(__dirname+"/adminHome.html")
})
router.get("/data",(req,res)=>{
    const token= req.cookies.token
    if(!token) return res.status(401).json({msg:"Authentication Error"})
    try{
        const decoded= jwt.verify(token,"AdminOfRepairIt")
        if(Admin.findById(decoded.admin.id)){
            User.find({}).then((response)=>{
                res.json(response)
                
            })
        }else{
            res.status(400).send();
        }
    }catch(err){
        console.log(err);
        res.status(500).send({mes:"invalid token"})
    }
    
})

router.put("/data",async(req,res)=>{
    await  User.findByIdAndUpdate(req.body.id,{$set:{
        [`posts.${req.body.index}`]:req.body.post
    }})
    
    
})
router.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/adminLogin.html")
})
router.post("/login",async(req,res)=>{
    
    let password= req.body.password
    let adminKey= req.body.adminKey
    try{
        const admin= await Admin.findOne({
            adminKey:adminKey
        })
        
        

        if(admin){
            
            if(admin.password===password){
                
                const payload={
                    admin:{
                        id:admin.id
                    }
                }

                jwt.sign(payload, "AdminOfRepairIt",(err,token)=>{
                    if(err) throw err;
                    res.cookie("token",token).redirect("/admin/adminHome")
                })
            }else{
                res.status(400).json({
                    msg:"de password thet an"
                })
            }
        }else{
            res.status(500).json({
                msg:"user not found"
            })
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = router;