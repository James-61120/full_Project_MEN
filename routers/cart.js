const express=require('express')
const productModel=require('../models/product.model')
const cartModel = require('../models/cart.model')
const router=express.Router()

router.get('/',async(req,res)=>{
    try{
        const cart = req.session.cart.items
        res.render('carts/cart',{cart:cart})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }  
})

router.get('/add/:id',async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id)
        let items_old = []
        if(req.session.cart)
         {
            items_old = req.session.cart.items
        }  
        const cart = new cartModel(items_old)
        //
        cart.add(product,req.params.id,product.imageSrc,cart.quantity)
        req.session.cart = cart
        res.redirect('/cart')
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
    
})

router.post('/delete/:id',(req,res)=>{
    try{
        let items_old = []
        if(req.session.cart)
        {
            items_old = req.session.cart.items
        }
        const cart = new cartModel(items_old)
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
        let items_old = []
        if(req.session.cart)
        {
            items_old = req.session.cart.items
        }
        const cart = new cartModel(items_old)
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
        let items_old = []
        if(req.session.cart)
        {
            items_old = req.session.cart.items
        }
        const cart = new cartModel(items_old)
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