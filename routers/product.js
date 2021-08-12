const express = require('express')
const productModel = require('../models/product.model')
const categoryModel = require('../models/category.model')
const router = express.Router()


router.get('/',async(req,res)=>{
    try{
        const products = await productModel.find().populate('category',['name'])
        /*console.log(products)*/
        res.render('products/list',{products:products})
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    } 
})

router.get('/add',async(req,res)=>{
    const categories = await categoryModel.find()
    const products = await productModel.find()
    res.render('products/add',{products:products,categories:categories})
})

router.post('/',async(req,res)=>
{
    
    try{
        const productNew = new productModel({
            name:req.body.name,
            price:req.body.price,
            info:req.body.info,
            quantity:req.body.quantity,
            category:req.body.category,
        })
        if(req.body.image != null && req.body.image !=='')
        {
            const imageEncode = JSON.parse(req.body.image)
            productNew.imageType = imageEncode.type 
            productNew.imageData = new Buffer.from(imageEncode.data,'base64') 
        }
    await productNew.save()
    res.redirect('/product')
    }
    catch(e)
    {
        console.log(e.message)
        res.redirect('/')
    }
})

router.post('/delete/:id',async(req,res)=>
{
    try{
        const productDelete = await productModel.findById(req.params.id)
        await productDelete.remove()
        res.redirect('/product')
    }
    catch(e)
    {
        console.log(e.message)
        res.redirect('/')
    }
})
/*-----------------------------------------edit*/
router.get('/edit/:id',async(req,res)=>{
    try{
        const products = await productModel.findById(req.params.id)
        const categories = await categoryModel.find()
        res.render('products/edit',{products:products,categories:categories})
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    } 
})

router.put('/edit/:id',async(req,res)=>{
    try{
           
            const product = await productModel.findById(req.params.id)
            product.name = req.body.name,
            product.price = req.body.price,
            product.info = req.body.info,
            product.quantity = req.body.quantity,
            product.category = req.body.category
            await product.save()
            res.redirect('/product')
        }
    catch(e)
    {
        console.log(e.message)
        res.redirect('/')
    }
})
module.exports = router