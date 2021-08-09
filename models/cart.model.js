function cart(items_old){
    this.items = items_old || []
    this.priceTotal = 0
    this.add=function(product,id,imageSrc,quantity){
        const index = this.items.findIndex(s => s.id == id)
        if(this.items.findIndex(s => s.id == id)<0)
         { 
            this.items.push({id:id,item:product,imageSrc,quantity:1})
        }
        else{
            this.items[index].quantity++
        }
       
    }
    this.delete = function(id)
    {
        const index = this.items.findIndex(s => s.id == id)
        this.items.splice(index,1)
    }
    this.reduce = function(id)
    {
        const index = this.items.findIndex(s => s.id == id)
        this.items[index].quantity--
        if(this.items[index].quantity<=0)
        {
            this.items.splice(index,1)
        }
    }
    this.increase = function(id)
    {
        const index = this.items.findIndex(s => s.id == id)
        this.items[index].quantity++
    }
}
module.exports = cart