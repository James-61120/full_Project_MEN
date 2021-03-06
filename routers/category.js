const express = require('express')
const categoryModel = require('../models/category.model')
const router = express.Router()


router.get('/',async(req,res)=>{
    try{
        const categories = await categoryModel.find()
        console.log(categories)
        res.render('categories/list',{categories:categories})
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    } 
})
/*--------------------------------------------ADD*/
router.get('/add',(req,res)=>{
    const category=new categoryModel()
    res.render('categories/add',{category:category})
})

router.post('/',async(req,res)=>
{
    try{
        const categoryNew = new categoryModel({
            name:req.body.name
        })
        await categoryNew.save()
        res.redirect('/category')
    }
    catch(e)
    {
        console.log(e.message)
        res.redirect('/')
    }
})
/*--------------------------------------------Delete*/
router.post('/delete/:id',async(req,res)=>
{
    try{
        const categoryDelete = await categoryModel.findById(req.params.id)
        await categoryDelete.remove()
        res.redirect('/category')
    }
    catch(e)
    {
        console.log(e.message)
        res.redirect('/')
    }
})
/*-------------------------------------------EDIT*/
router.get('/edit/:id',async(req,res)=>{
    try{
        const category = await categoryModel.findById(req.params.id)
        res.render('categories/edit',{category:category})
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    }
  
})
router.put('/edit/:id',async(req,res)=>{
    try{
        const category = await categoryModel.findById(req.params.id)
        category.name = req.body.name
        await category.save()
        res.redirect('/category')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})

module.exports = router