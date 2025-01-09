const User = require('../model/userModel');

const userRegister = async (req, res) => {
    const { userName, mobileNumber } = req.body;
    const { referralCode } = req.params;

    if (!userName || !mobileNumber || !referralCode) {
        return res.status(400).json({
            success: false,
            message: 'UserName, Mobile Number, and referral code are mandatory.',
        });
    }

    try {
        const existingUser = await User.findOne({ mobileNumber });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already registered.',
            });
        }

        const referredByUser = await User.findOne({ referralCode });

        if (!referredByUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid referral code.',
            });
        }

        const generateUniqueCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return code;
        };

        let uniqueCode = '';
        do {
            uniqueCode = generateUniqueCode();
        } while (await User.findOne({ referralCode: uniqueCode }));

        const newUser = await User.create({
            userName,
            mobileNumber,
            referralCode: uniqueCode,
            referredBy: referralCode,
        });

        await User.updateOne({ referralCode }, { $inc: { referralCount: 1 } });

        res.status(200).json({
            success: true,
            message: 'User registration successful.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration.',
        });
    }
};

module.exports = userRegister;
