const express=require('express')
const productModel=require('../models/product.model')
const cartModel = require()
const router=express.Router('../models/cart.model')

router.get('/',async(req,res)=>{
    try{
        console.log(req.session.cart)
        res.render('carts/cart')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }  
})

router.get('/add/:id',(req,res)=>{
    try{
        // const id=req.params.id
        // const product=await productModel.find({price:30000})
 
        const cart=new cartModel()
        cart.add("meo",1)
        req.session.cart=cart
        res.redirect('/cart')
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
    
})

module.exports=router