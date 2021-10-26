const mongoose=require('mongoose');

//Schema
const orderItemSchema=new mongoose.Schema({
   quantity:{
       type:Number,
       required:true
   },
   product:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Product'
   }
})



//Model
OrderItem=mongoose.model('OrderItem',orderItemSchema);


//exporting Product
module.exports=OrderItem
