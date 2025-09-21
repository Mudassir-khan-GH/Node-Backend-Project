import dotenv from 'dotenv'
import connect_DB from "./database/index.js";



dotenv.config({ 
    path: './env' 
})

connect_DB()