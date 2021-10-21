const Product=require('../models/product')
const Category=require('../models/category')
const express = require('express');
const router=express.Router();
const mongoose=require('mongoose')

router.get(`/`,async (req,res)=>{
    //filtering products if we get a QueryParameter
    let filter={}
    if(req.query.categories){
        filter={category:req.query.categories.split(',')};
    }

    const productList= await Product.find(filter).select('name image -_id').populate('category');//get only the name and image and no id
    if(!productList){
        res.status(500).json({success:false});
    }else{
        res.send(productList);
    }
});

router.get('/:id',(req,res)=>{
    const product=Product.findById(req.params.id,(err,item)=>{
        if(!err){
            res.send(item);
        }else{
            res.status(500).json({success:false});
        }
    }).populate('category');//its populating the category field
});

router.post(`/`, async(req,res)=>{

    const category=await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    let product=new Product({
        name:req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured
    });

    product=await product.save()

    if(!product)
    return res.status(500).send('The product cannot be created')

    return res.send(product);
    
});

router.put('/:id',async(req,res)=>{

    const category=await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category');

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid ID')
    }


    const product= await Product.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured
        },
        {new:true}//returns the new updated data
    );
    if(!product){
        return res.status(400).send('the category cannot be updated');
    }
    res.send(product);
});

router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id,(err,product)=>{
        if(!err){
            return res.status(200).json({success:true,message:'Product deleted'})
        }else{
            return res.send({success:false,message:err});
        }
    });
})

//get the total number of items in the database
router.get('/get/count',async(req,res)=>{
    const productCount=await Product.countDocuments();
    if(!productCount) return res.status(500).json({success:false});
    res.send({
        count:productCount
    });

});

//get the featuredProducts
router.get('/get/featured/:count',async(req,res)=>{
    const count=req.params.count ? req.params.count : 0;
    const featuredProducts=await Product.find({isFeatured:true}).limit(+count);//the + changes the string to a number
    if(!featuredProducts) return res.status(500).json({success:false});
    res.send({
        count:featuredProducts
    });

});


module.exports=router;
