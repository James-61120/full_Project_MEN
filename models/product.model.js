const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name:{type:String,required:true, default:"Banh trang"},
        price:{type:Number, default:"1000"},
        quantity:{type:String, default:"10"},
        info:{type:String, default:"Banh trang tay ninh"},
        category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
        imageType:{type:String},
        imageData:{type:Buffer}
    }
)
productSchema.virtual('imageSrc').get(function()
{
    if(this.imageType != null && this.imageData != null)
    return `data:${this.imageType};charset=utf-8;base64,${this.imageData.toString('base64')}`
})
module.exports = mongoose.model('product',productSchema)