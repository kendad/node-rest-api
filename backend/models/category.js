const mongoose=require('mongoose');

//Schema
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String
    },
    color:{
        type:String
    }
})


//Model
Category=mongoose.model('Category',categorySchema);


//exporting Product
module.exports=Category
