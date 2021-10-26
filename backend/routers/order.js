const mongoose=require('mongoose');

//Schema
const orderSchema=new mongoose.Schema({
    orderItems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'OrderItem',
            required:true
        }
    ],
    shippingAddress1:{
        type:String
    },
    shippingAddress2:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Pending'
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }
})

//Virtual
orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderSchema.set('toJSON',{
    virtuals:true
})



//Model
Order=mongoose.model('Order',orderSchema);


//exporting Product
module.exports=Order
