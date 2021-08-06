function cart(){
    this.items=[]
    this.add=function(product,id){
        this.items[id]=product
    }
}
module.exports = cart