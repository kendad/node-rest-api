const mongoose=require('mongoose');

//Schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        deafult:false
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    }
})

//virtual
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
userSchema.set('toJSON',{
    virtuals:true,
});


//Model
User=mongoose.model('User',userSchema);


//exporting User
module.exports=User;
