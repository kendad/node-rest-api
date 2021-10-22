const User=require('../models/user');
const express=require('express');
const router=express.Router();
const bycrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');

router.get('/',async (req,res)=>{
    const userList= await User.find().select('-passwordHash');
    if(!userList){
        res.status(500).json({success:false});
    }else{
        res.status(200).send(userList);
    }
});


router.get('/:id',async(req,res)=>{
    User.findById(req.params.id,(err,user)=>{
        if(!err && user){
            res.status(200).send(user);
        }else{
            res.status(500).json({message:'User does not exists'});
        }
    }).select('-passwordHash');

});

router.post('/login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    const secret=process.env.secret;//getting secret from .env file

    if(!user){
        return res.status(400).send('The User Not Found')
    }

    //comparing passwords
    if(user && bycrypt.compareSync(req.body.password,user.passwordHash)){
        //creating tokens 
        const token=jwt.sign({
            userId:user.id,
            isAdmin:user.isAdmin,
        },secret,{expiresIn:'1d'});

        return res.status(200).send({user:user.email,token:token});
    }else{
        return res.status(400).send("Incorrect Password");
    }
})


router.post('/register',async(req,res)=>{
    let user=new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:bycrypt.hashSync(req.body.password,10),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    });
    user=await user.save();
    if(!user){
        return res.status(404).send('user cannot be created');
    }
    res.send(user);
});

router.get('/get/count',async(req,res)=>{
    const userCount=await User.countDocuments();
    if(!userCount) return res.status(500).json({success:false});
    res.send({
        count:userCount
    });

});

router.delete('/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id,(err,user)=>{
        if(!err){
            return res.status(200).json({success:true,message:'User deleted'})
        }else{
            return res.send({success:false,message:err});
        }
    });
})

module.exports = router;