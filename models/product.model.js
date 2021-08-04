const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name:{type:String,required:true, default:"Banh trang"},
        price:{type:Number, default:"1000"},
        quantity:{type:String, default:"10"},
        info:{type:String, default:"Banh trang tay ninh"},
        category:{type:mongoose.Schema.Types.ObjectId,ref:"category"}
    }
)
module.exports = mongoose.model('product',productSchema)