function cart(cart_old){
    this.items =cart_old.items || []
    this.priceTotal = cart_old.priceTotal||0
    this.add=function(product,id,imageSrc,quantity){
        const index = this.items.findIndex(s => s.id == id)
        if(this.items.findIndex(s => s.id == id)<0)
         { 
            this.items.push({id:id,item:product,imageSrc,quantity:1})
        }
        else{
            this.items[index].quantity++
        }
        this.priceTotal+=product.price
        console.log(this.priceTotal)
       
    }
    this.delete = function(id)
    {
        const index = this.items.findIndex(s => s.id == id)
        this.priceTotal -= this.items[index].item.price*this.items[index].quantity
        this.items.splice(index,1)
    }
    this.reduce=(id)=>{
        const index=this.items.findIndex(x => x.id === id)
        this.priceTotal-=this.items[index].item.price
        this.items[index].quantity--
        if(this.items[index].quantity<=0){
            this.items.splice(index,1)
        }
    }
    this.increase = function(id)
    {
        const index=this.items.findIndex(x => x.id === id)
        this.priceTotal+=this.items[index].item.price
        this.items[index].quantity++
    }

}
module.exports = cart