const mongoose = require('mongoose');
const dotenv=require('dotenv')

dotenv.config({port:'/config.env'});

const DB_URL =  "mongodb+srv://developerankit0608:DYJN5CLFk94NP0jL@cluster0.c4ezm.mongodb.net/referralSystem"
console.log(DB_URL);

const DBconnect = async () => {
    if (!DB_URL) {
        console.error('Error: DB_URL is not defined in the environment variables.');
        return;
    }

    try {
        const data = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${data.connection.host}`);
    } catch (error) {
        console.error('Mongoose connection error:', error);
    }
};

module.exports = DBconnect;
