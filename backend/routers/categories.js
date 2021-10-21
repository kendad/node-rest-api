const Category=require('../models/category')
const express = require('express');
const router=express.Router();

router.get('/',async (req,res)=>{
    const categoryList= await Category.find();
    if(!categoryList){
        res.status(500).json({success:false});
    }else{
        res.status(200).send(categoryList);
    }
});

router.get('/:id',async(req,res)=>{
    Category.findById(req.params.id,(err,category)=>{
        if(!err && category){
            res.status(200).send(category);
        }else{
            res.status(500).json({message:'does not exists'});
        }
    });

});

router.post('/',async(req,res)=>{
    let category=new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    });
    category=await category.save();
    if(!category){
        return res.status(404).send('the category cannot be created');
    }
    res.send(category);
});

router.put('/:id',async(req,res)=>{
    const category= await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color,
        },
        {new:true}//returns the new updated data
    );
    if(!category){
        return res.status(400).send('the category cannot be updated');
    }
    res.send(category);
});

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    Category.findByIdAndRemove(req.params.id,(err,category)=>{
        if(!err){
            return res.status(200).json({success:true,message:'deleted'})
        }else{
            return res.send({success:false,message:err});
        }
    });
})


module.exports=router;
