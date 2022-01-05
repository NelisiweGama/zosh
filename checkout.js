
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}
function ready() {
  set_cart_values();
  order_summary();

}



function order_summary(){
  var products = localStorage.getItem('orders');
  products = JSON.parse(products);
  var list = ''
  var total = 0;
  for(let i = 0;  i<products.length; i++){
    total += products[i].price * products[i].quantity;
    var name =products[i].quantity +"x "+ products[i].color + " " + products[i].name
    list +=`

    <li class="d-flex align-items-center justify-content-between"><strong class="small font-weight-bold">${name}</strong><span class="text-muted small">R${products[i].price}</span></li>
    <li class="border-bottom my-2"></li>
    `

  }
  list +=`
  <li class="d-flex align-items-center justify-content-between"><strong class="text-uppercase small font-weight-bold">Total</strong><span>R${total}</span></li>
  `
  document.getElementById('order_list').innerHTML= list;

}

function sendData(){
  //disable button on click place order button
  let button = document.querySelector("#submit")
  button.disabled = true;

  console.log('here');
  var firstname= $('#firstName').val();
  var lastname= $('#lastName').val();
  var phone = $('#phone').val();
  var email = $('#email').val();
  //address
  var address ={
    'street': $('#address').val(),
    'complex' : $('#addressalt').val(),
    'city': $('#city').val(),
    'state': $('#state').val()
  }

  var products = localStorage.getItem('orders');
  products = JSON.parse(products);
  var reference = Math.random(3);
  data = {
    'reference':reference,
    'firstname':firstname,
    'email':email,
    'cell':phone,
    'lastname': lastname,
    'address' : address,
    'data': products,  
  }
  
  $.ajax({
    type: "POST",
    //this should point to the backend server i.e 'https://zoshbackend.com/api/sendOrder'
    url: 'http://127.0.0.1:3000/api/sendOrder',
    data: JSON.stringify(data),
     contentType: 'application/json',
    success: function (data, status){
        console.log(status);
        confirm_order(firstname, reference, email,products);
    }

  });

};

function confirm_order (firstname, reference,email, data){
  data1 = {
    'firstname':firstname,
    'reference':reference,
    'email':email,
    'data':data
  }
  $.ajax({
    type: "POST",
    //this should point to the backend server i.e 'https://zoshbackend.com/api/confirmOrder'
    url: 'http://127.0.0.1:3000/api/confirmOrder',
    data: JSON.stringify(data1),
     contentType: 'application/json',
    success: function (data, status){
        console.log(status);
    var proceed = confirm("Order has been successfully placed, check your emails for payment method and receipt!");
    if (proceed) {
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');
    window.location.href = `index.html`;

    } else {
      var not_placed = confirm('somethig went wrong the order was not received!')

    }
    }

  });

}
// This function counts number of items on the cart
function set_cart_values() {
  var num = 0
  if (localStorage.getItem('cart')){
      var items = localStorage.getItem('cart');
      items = JSON.parse(items)
      console.log(items)
      for(let i = 0 ; i<items.length; i++){
        num += items[i].quantity 
  }
  
  document.querySelector('.nav-link span').textContent = "(" + (num) + ")";

  }
 }
