const express = require('express')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const router = express.Router()

router.get('/',async(req,res)=>{
    try{
        const users = await userModel.find()
        console.log(users)
        res.render('users/list_user',{users:users})
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    } 
})
router.get('/register',(req,res)=>{
   
    res.render('users/register')
})
router.post('/',async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        await user.save()
        res.redirect('/user')
    }
    catch(e)
    {
        console.log(e)
        res.redirect('/')
    }
})
router.get('/login',(req,res)=>{
    
    res.render('users/login')
})

router.post('/delete/:id',async(req,res)=>
{
    try{
        const userDelete = await userModel.findById(req.params.id)
        await userDelete.remove()
        res.redirect('/user')
    }
    catch(e)
    {
        console.log(e.message)
        res.redirect('/')
    }
})

module.exports = router