const mongoose=require('mongoose');

//Schema
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:'',
    },
    image:{
        type:String,
        default:'',
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',//will look for the ID in Category Collection
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:233
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    }
})

//Virtual
productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

productSchema.set('toJSON',{
    virtuals:true
})

//Model
Product=mongoose.model('Product',productSchema);//"Product" is the collection name on the MongoDB


//exporting Product
module.exports=Product
