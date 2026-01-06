require('dotenv/config');
// const DB = require('./src/config/db.js')
const express = require('express')
const authroutes = require('./src/routes/AuthRoute.js')
const userroutes = require('./src/routes/UserRoute.js')

const app = express()
app.use(express.json())
app.use('/api',authroutes)
app.use('/api',userroutes)
// app.use('/login',authroutes)
// DB()
const PORT = process.env.PORT || 30007
    app.listen(PORT ,async()=>{
        console.log(`Server Is Running in http://localhost:${PORT}`)

    })
