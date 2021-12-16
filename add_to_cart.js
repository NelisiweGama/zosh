

$('body').on('click','#add_to_cart_button',function(){
  var items = [];
  var name = document.getElementsByTagName('h1')[0].innerText;
  var price = document.getElementsByClassName('lead')[0].innerText;
  var image = document.getElementsByClassName('img-fluid')[0].src;
  var color = document.getElementsByClassName('color')[0].innerText;
  var quantity =1;
  var id = 0;
  if(localStorage.getItem('cart')){
      list = localStorage.getItem('cart')
      list = JSON.parse(list);
      id = list.length
      items =list;
  };
  var item = {id, name, color, quantity , price, image };
  items.push(item);
  console.log('here');
  localStorage.setItem('cart', JSON.stringify(items));

  window.location.href = `cart.html`;

});
