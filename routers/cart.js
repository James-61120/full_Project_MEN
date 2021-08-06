const express=require('express')
const productModel=require('../models/product.model')
const router=express.Router()

router.get('/',async(req,res)=>{
    try{

        res.render('carts/cart')
    }catch(e){
        console,log(e)
        res.redirect('/')
    }
    
})

module.exports=router