require('dotenv').config();
const connect_DB = require('./database/index.js');
const { app } = require('./app.js');



connect_DB()
.then(() => {
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log("Your app is listening on port : ",process.env.PORT || 8000);
    })
})
.catch((error) => {
    
    console.log("Error occured in connecting database !!",error);
})