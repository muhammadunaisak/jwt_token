const express=require("express");
const app=express();
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");


dotenv.config({path:'./config/config.env'});


app.use(express.urlencoded({extended:true}));
const users=[
    {
    username:'unais',password:'123'
    },
]
app.get('/',(req,res)=>{
    const token =req.cookies;


    if (token) {
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,result)=>{
  console.log("verify..");     
     if(result){
        console.log(result);
        res.redirect('/profile');

    //   res.sendFile(__dirname+'/login.html');
    } else {
        // res.redirect('/profile');
        console.log("else.....");
        res.sendFile(__dirname+'/login.html');

    }
});
}else{   
     res.sendFile(__dirname+'/login.html');
}
});

app.post('/',(req,res)=>{
  
const {username,password}=req.body;


const user=users.find((item)=>item.username===username&&item.password===password);
if (!user) {
  res.redirect('/');
} else {
 const data ={
    username,
    time:Date(),
 }
 const token=jwt.sign(data,process.env.JWT_SECRET_KEY,{expiresIn:'10min'})
 console.log(token);
res.cookie('token',token).redirect('/profile');

}
    // res.send("login sucesss")
});


app.get('/profile',(req,res)=>{
    res.sendFile(__dirname+'/profile.html');
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});