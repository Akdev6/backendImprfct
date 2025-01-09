
const logoutUser = (req, res, next) => {
    
    res.clearCookie('token')

    return res.status(200).json({
        success:true,
        message:'logout success'
    })
}

module.exports=logoutUser