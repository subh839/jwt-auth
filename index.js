const express =require("express")
const jwt= require("jsonwebtoken");
const app=express();
const secretKey="secretKey";
app.get("/",(req,res)=>{
    res.json({
        message:"json"
    })
})

app.post("/login",(req,res)=>{
const user={
    id:1,
    username:"Abhi",
    email:"golp@gmail.com"
}
jwt.sign({user},secretKey,{expiresIn:"300s"},(err,token)=>{
res.json({
    token
})
})
})

app.post("/profile",verifyToken,(req,res)=>{
jwt.verify(req.token,secretKey,(err,authData)=>{
if(err){
    res.send({result:"Invalid"})
}else{
    res.json({
        message:"profile accessed",
        authData
    })
}
}) 
    })

function verifyToken(req,res,next) {
    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
const bearer= bearerHeader.split(" ");
const token= bearer[1];
console.log(token);
req.token=token;
next();

    }else{
        res.send({
            result:"Invalid token "
        })
    }
}

app.listen(5000,()=>{
    console.log("running on 5000");
})