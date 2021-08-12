const express=require('express')
const productModel=require('../models/product.model')
const cartModel = require('../models/cart.model')
const router=express.Router()

router.get('/',async(req,res)=>{
    try{
        let cart = []
        let total = 0
        if(req.session.cart)
        {
            cart = req.session.cart.items
            total = req.session.cart.priceTotal
        }
       
        res.render('carts/cart',{cart:cart,total:total})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }  
})

router.get('/add/:id',async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id)
        const cart = new cartModel(req.session.cart ? req.session.cart:{items:[]})
        cart.add(product,req.params.id,product.imageSrc,cart.quantity)
        req.session.cart = cart
        res.send("add successfully")
        //res.redirect('/cart')
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
    
})

router.post('/delete/:id',(req,res)=>{
    try{
        const cart = new cartModel(req.session.cart)
        cart.delete(req.params.id)
        req.session.cart = cart
        res.redirect('/cart')
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
    
})

router.get('/reduce/:id',(req,res)=>{
    try{
        const cart = new cartModel(req.session.cart)
        cart.reduce(req.params.id)
        req.session.cart = cart
        res.redirect('/cart')
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    }
})

router.get('/increase/:id',(req,res)=>{
    try{
        const cart = new cartModel(req.session.cart)
        cart.increase(req.params.id)
        req.session.cart = cart
        res.redirect('/cart')
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    }
})
module.exports = router