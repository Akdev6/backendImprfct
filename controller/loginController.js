const User = require('../model/userModel');
const { setToken } = require('../services/jtwauth');

const loginUser = async (req, res, next) => {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
        return res.status(400).json({
            success: false,
            message: 'Mobile number is required',
        });
    }

    try {
        // Find user in database
        const user = await User.findOne({ mobileNumber }).lean(); // Use .lean() for plain object

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Generate JWT token
        const token = setToken(user);

        // Set cookie with the token
        res.cookie('token', token, {
            httpOnly: true,            
            maxAge: 3600000, // 1 hour
        });

        // Send response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: user,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during login',
        });
    }
};

module.exports = loginUser;
