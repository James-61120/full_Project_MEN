const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema(
    {
        name:{type:String,required:true, default:"Banh trang"}
    }
)
module.exports = mongoose.model('category',categorySchema)