const mongoose=require('mongoose')

const userModel=mongoose.Schema({
    userName:{
        type:String,
        required:[true,'Enter user name']
    },
    mobileNumber:{
        type:Number,
        required:[true,'Enter Mobile Number']
    },
    referralCode:{
        type:String,
        required:true
    },
    referredBy:{
        type:String,           
    },
    referralCount:{
        type:Number,
        default:0
    }
})

const User=mongoose.model('user',userModel)

module.exports=User 