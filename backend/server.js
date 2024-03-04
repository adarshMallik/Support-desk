const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000
const connectDB = require('./config/db')

// Connect to the database
connectDB()

const app = express()

//Used to send or receive raw JSON data
app.use(express.json())
// to receive datas of type urlencoded 
app.use(express.urlencoded({extended:false}))




app.get('/', (req,res)=>{
    res.status(200).json({message: ' Welcome to the Support Desk API'})
})

//Routes calling post request
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))