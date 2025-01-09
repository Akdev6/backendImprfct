const User = require('../model/userModel');

exports.findUser = async (req, res, next) => {
    const { mobileNumber } = req.body; // Extract the mobileNumber directly from req.body
    console.log(mobileNumber);

    if (!mobileNumber) {
        return res.status(400).json({
            success: false,
            message: 'Mobile number is required.',
        });
    }

    try {
        const user = await User.findOne({ mobileNumber }).lean(); // Query using the extracted mobileNumber
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User found.',
            user,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};
