const mongoose = require('mongoose');
const {DB_NAME} = require('../constants.js')


const connect_DB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error occured in connecting DB :", error)
        process.exit(1)
    }
}
// ${process.env.MONGODB_URI}/${DB_NAME}
module.exports = connect_DB