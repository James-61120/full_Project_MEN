const root=location.protocol+"//"+location.host
$('.addCart').click(function(event){
    event.preventDefault()
    const href=this.href
    console.log(href)
    $.ajax({
        url:href,
        type:'GET',
        data:{},
        success:function(){
          swal("Add successful!", "continute!", "success");
        
        }
      })
})

$('.reduceCart').click(function(event){
    event.preventDefault()
    const href=this.href
    const id=this.id
    const qty2="#qty2"+id
    $.ajax({
        url:href,
        type:'GET',
        data:{},
        success:function(){
          swal("Reduce successfully !", "continute!", "success");
          $("#total1").load(root+"/cart #total2");
          $("#qty"+id).load(root+"/cart "+qty2);
        }
      })
})

$('.increaseCart').click(function(event){
    event.preventDefault()
    const href=this.href
    const id=this.id
    const qty2="#qty2"+id
    $.ajax({
        url:href,
        type:'GET',
        data:{},
        success:function(){
          swal("Increase successfully !", "continute!", "success");
          $("#total1").load(root+"/cart #total2");
          $("#qty"+id).load(root+"/cart "+qty2);
        }
      })
})

$('.deleteFormCart').on("submit", function(event) {
  event.preventDefault()
  const action = $(this).attr('action')
  const href=root+action
  const tr_cart_id= "#tr_cart_"+ $(this).data("id")
  console.log(tr_cart_id)
  $.ajax({
      url:href,
      type:'POST',
      data:{},
      success:function(){
          console.log("delete ok")
          swal("Delete successful!", "continute!", "success");
          $("#total1").load(root+"/cart #total2");
          $(tr_cart_id).empty();
      }
    })
  })