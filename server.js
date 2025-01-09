const app = require('./app');  
const dotenv=require('dotenv')
const database=require('./database/db')

dotenv.config({port:'/config.env'});

// database connection 
database()

// PORT and App server cobbection
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
