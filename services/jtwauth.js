const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

const setToken=(user ,res)=>{
    dotenv.config({path:'./config.env'})

    const payload={
        id:user._id,
        mobileNumber:user.mobileNumber,
        referalCode:user.referalCode
    } 

    const secret=process.env.JWT_SECRET

    const option={
        expiresIn:'1h'
    }

    try{     
        const token=jwt.sign(payload,secret,option)    
        return token
    }catch(error){
        throw new Error('Failed to create token');
    }
}

const getToken=(token,res)=>{
    const secret=process.env.JWT_SECRET
    try{
        const token= jwt.verify(token, secret)
        return token
    }catch(error){
        return res.status(400).json({
            success:false,
            message:'token not found'
        })
    }
    
}

module.exports={setToken, getToken}