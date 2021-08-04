const express = require('express')
const indexRouter = require('./routers/index')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()

/*connect*/
const connectFunction = async()=>{
    try{
        await mongoose.connect(process.env.STR_CONNECT,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("connected successfully")
    }
    catch(e)
    {
        console.log(e)
        console.log("connection failed !")
    }
}
connectFunction()
app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')
app.set('layout','layouts/layout')

app.use(methodOverride('_method'))
app.use(expressLayouts)
app.use('/', indexRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)
app.use(express.static('public'))

app.listen(process.env.PORT||3000)