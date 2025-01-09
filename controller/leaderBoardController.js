const User = require('../model/userModel');

exports.leaderBoard=async(req,res,next)=>{
    const user=await User.find().sort({referralCount:-1}).limit(2).select('userName referralCount');
    
    if(!user){
        return res.status(400).json({
            success:false,
            messsage:'No Data Found'
        })
    }

    return res.status(200).json({
        success:true,
        messsage:'data found',
        user
    })
}

