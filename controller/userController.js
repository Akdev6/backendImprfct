const User = require('../model/userModel');

const userRegister = async (req, res, next) => {
    const { userName, mobileNumber } = req.body;
    const { referredBy } = req.params; // Extract referredBy as a string from params

    // Check if required fields are provided
    if (!userName || !mobileNumber) {
        return res.status(400).json({
            success: false,
            message: 'UserName and Mobile Number fields are mandatory',
        });
    }
    else if(mobileNumber.length<10){
        return res.status(400).json({
            success: false,
            message: 'Mobile Number must be 10 number',
        });
    }

    try {
        // Check if the user already exists
        const finduser = await User.findOne({ mobileNumber });

        if (finduser) {
            return res.status(400).json({
                success: false,
                message: 'User already registered',
            });
        }

        // Generate unique referral code
        const createUniqueCode = () => {
            const characters = 'aksldjklsfjkcvnvdhfeirtyertyeirkjfbjh1233456789_@$#^&*';
            const characterLimit = 6;
            let randomCode = '';

            for (let i = 0; i < characterLimit; i++) {
                const code = Math.floor(Math.random() * characters.length);
                randomCode += characters[code];
            }

            return randomCode;
        };

        const randomcode = createUniqueCode();

        // Save new user data
        const savedata = await User.create({
            userName: userName,
            mobileNumber: mobileNumber,
            referralCode: randomcode,
            referredBy: referredBy || 'none', 
        });

        if (!savedata) {
            return res.status(400).json({
                success: false,
                message: 'User failed to register',
            });
        }

        // Update referral count for the referrer if referredBy is valid
        if (referredBy && referredBy !== 'none') {
            await User.findOneAndUpdate(
                { referralCode: referredBy },
                { $inc: { referralCount: 1 } }
            );
        }

        res.status(200).json({
            success: true,
            message: 'User registration successful',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration',
        });
    }
};

module.exports = userRegister;
