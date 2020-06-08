const express= require("express");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const router= express.Router();


const User= require("../Models/User");

router.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})





router.post("/signup",async(req,res)=>{

    const name= req.body.name;
    const password= req.body.password;
    const email= req.body.email;
    const mobile= req.body.mobile;

    try{
        let user= await User.findOne({
            mobile
        })

        if(user){
            res.status(404).send({
                msg:"User Already Exists"
            })
        }else{
            user= new User({
                name:name,
                email:email,
                password:password,
                mobile:mobile
            })
            await user.save();
            console.log("user Saved")
            
        

        
            const payload= {
                user:{
                    id:user.id
                }
            }

            jwt.sign(payload,"Abhi1190",(err,token)=>{
                if(err) throw err;
                res.status(200).send()
            })
        }
    }catch(err){
        res.status(400).send("oops")
    }
})
//login route

router.get("/signin", (req,res)=>{
    res.sendFile(__dirname+"/signin.html")
})

router.post(
    "/signin",
    async (req,res)=>{
        const mobile= req.body.mobile;
        const password= req.body.password;

        try{
            let user=await User.findOne({
                mobile
            })

            if(user){
                if(user.password===password){
                    const payload={
                        user:{
                            id:user.id
                        }
                    }

                    jwt.sign(payload, "Abhi1190",(err,token)=>{
                        if(err) throw err;
                        res.cookie("token",token).redirect("/home")
                    })
                }else{
                    res.status(400).send("Wrong password")
                }
            }else{
                res.status(404).json({
                    msg:"user not found"
                })
            }
            
        }catch(err){
            res.status(401).send()
        }
    }
)

router.get("/home", (req,res)=>{
    res.sendFile(__dirname+"/home.html")
})
router.get("/data", (req,res)=>{
    const token=req.cookies.token;
    if(!token) return res.status(401).json({msg:"Authentication Error"})

    try{
        
        const decoded= jwt.verify(token,"Abhi1190")
        User.findById(decoded.user.id).then((response)=>{
            console.log(response);
            res.status(200).json(response)
        })
        
    }catch(err){
        console.log(err);
        res.status(500).send({mes:"invalid token"})
    }
})

router.get("/addNewPost",(req,res)=>{
    res.sendFile(__dirname+"/addNewPost.html")
})
router.post("/addNewPost",(req,res)=>{
    const token=req.cookies.token;
    if(!token){
        res.status(401).send("Auth error")
    }
    else{
        const decoded=jwt.verify(token,"Abhi1190")
        console.log(decoded.user.id)
        const post={
            "name":req.body.name,
            "type":req.body.type,
            "adminMsg":req.body.adminMsg,
            "description":req.body.description,
            "Model":req.body.model,
            "location":req.body.location
        }
        User.findByIdAndUpdate(decoded.user.id,{$push:{posts:post}}).then((response)=>{
            res.status(200)
        })
        
    }
})

module.exports= router; 