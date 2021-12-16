var items =[];

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {


     var removeCartItemButtons = document.getElementsByClassName('fa-trash-alt');
    it = localStorage.getItem('cart');
    if (it){
        items = JSON.parse(it);
    }

   //// need to control local storage whn this is pressed
    $('body').on('click','.trash', removeCartItem);

    var addToCartButtons = document.getElementsByClassName('col-sm-3')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked, false)
    }
    initTotal();
    showCart();
    set_cart_values()

}

$('body').on('click', '.de-btn1', function (e) {
    $(this).attr("disabled", "disabled");
    var siblings = $(this).siblings('input');
      if (parseInt(siblings.val(), 10) >= 1) {
        var q = parseInt(siblings.val(), 10) - 1;

          siblings.val(parseInt(siblings.val(), 10) - 1);
          console.log(q)
      }
      var id = $(this).siblings('input').attr('id');
     reset_cart(q,id)
     updateCartTotal()
     setTimeout('$(".de-btn1").removeAttr("disabled")', 500);

  });
  $('body').on('click','.inc-btn1' ,function () {
    $(this).attr("disabled", "disabled");
    var siblings = $(this).siblings('input');
    var q = parseInt(siblings.val(), 10) + 1;
    siblings.val(parseInt(siblings.val()) + 1);
    var id = $(this).siblings('input').attr('id');
    reset_cart(q,id)
    updateCartTotal()
    setTimeout('$(".inc-btn1").removeAttr("disabled")', 1500);

  });

function  initTotal(){

    var total = 0
    if(localStorage.getItem('cart')){
        var t = localStorage.getItem('cart');
        t = JSON.parse(t);
    
    //use local storage
    var cartTotal = document.getElementById("cart-total")
    for (var i = 0; i < t.length; i++) {
        console.log(t)
        var amount= parseInt(t[i].price.replace('R', '')) * t[i].quantity;
        total = total +amount;
    }
}
    cartTotal.innerText = 'R'+total
}

function reset_cart(q, id){

    var myarr = id.split('_');
    old_items = localStorage.getItem('cart')
    old_items = JSON.parse(old_items)
    var new_list = []
    for(let i = 0; i<old_items.length; i++){
        if (old_items[i].id == myarr[0]){
            new_list.push(
                {
                    'id': parseInt(items[i].id),
                    'quantity':q,
                    'name':old_items[i].name,
                    'image':old_items[i].image,
                    'color':old_items[i].color,
                    'price':old_items[i].price

                }
            )
          
        }
        else{
            new_list.push(old_items[i]);
        }

      localStorage.setItem('cart', JSON.stringify(new_list));
    }
    set_cart_values();

}

function removeCartItem(event){
    var buttonCLicked = event.target
    item_index = buttonCLicked.id;
    items.splice(item_index, 1);
    localStorage.setItem('cart', JSON.stringify(items));
    buttonCLicked.parentElement.parentElement.parentElement.remove();
    updateCartTotal()
    set_cart_values()
}

function quantityChanged(event) {
     var input = event.target
     if (isNaN(input.value) || input.value <= 0) {
         input.value = 1
     };
     updateCartTotal()
};

function showCart() {
 
    var cartItem = document.getElementById('show');
    var cartJSON = localStorage.getItem('cart') || [] ;
    var cart = JSON.parse(cartJSON);
    
    var cart = cart;
    
    var cartRowContents = '';

    for (let i = 0; i <= cart.length ; i++) {
        if (cart[i]) {
            cartRowContents += `
            <tr id="show t-row ${cart[i].id}" class="rows">
                <th class="pl-0 border-0" scope="row">
                <div class="media align-items-center">
                        <a class="reset-anchor d-block animsition-link" href="detail.html">
                            <img src="${cart[i].image}" alt="..." width="70"/>
                        </a>
                    <div class="media-body ml-3">
                        <strong class="h6">
                            <a id = "${cart[i].id}_name" class="reset-anchor animsition-link" href="detail.html">${cart[i].name}</a>
                        </strong>
                    </div>
                </div>
                </th>
                <td class="align-middle border-0">
                <p id="${cart[i].id}_color" class="mb-0 small"class="mb-0 small">${cart[i].color}</p>
                </td>
                <td class="align-middle border-0">
                <p id="${cart[i].id}_price" class="mb-0 small"class="mb-0 small">${cart[i].price}</p>
                </td>
                <td class="align-middle border-0">
                <div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>
                <div class="quantity">
                <button class="de-btn1 p-0" ><i class="fas fa-caret-left"></i></button>
                <input id="${cart[i].id}_quantity" class="form-control form-control-sm border-0 shadow-0 p-0" type="text" value="${cart[i].quantity}"/>
                <button class="inc-btn1 p-0"><i class="fas fa-caret-right"></i></button>
              </div>
                </div>
                </td>
                <td class="align-middle border-0">
                <a class="reset-anchor" href="#">
                <i id=${i} class=" trash fas fa-trash-alt small text-muted"></i>
                </a>
                </td>
        </tr>`
        }
    }
    if(cart.length == 0){
        cartRowContents = '';
    }
    document.getElementById('table_body').innerHTML= cartRowContents;
    var quantity = document.getElementsByTagName('input')[0].value;
    var newVal = quantity
};


//updates cart total and number of items o the cart
function updateCartTotal() {
    var table = document.getElementById("main-table")
    var cartRows = table.rows.length -1;
    var total = 0
    list = localStorage.getItem('cart');
    list = JSON.parse(list);

    var cartTotalEl = document.getElementById("cart-total")
        for (var i = 0; i < cartRows; i++) {
            var id = list[i].id;
            var priceElement = document.getElementById(id+"_price")
            var quantity = parseInt(document.getElementById(id+'_quantity').value)
            var price = parseInt(priceElement.innerText.replace('R', ''))
            
            total = total + (price*quantity);

        };

    cartTotalEl.innerText = 'R' + total
};



 $('body').on('click','#procced_to_checkout', function(){

    list = localStorage.getItem('cart');
    list = JSON.parse(list);
    orders = [];
    for(let i = 0 ; i<list.length ; i++){
        id = list[i].id;
                
        var priceElement = document.getElementById(id+'_price');
        var price = parseInt(priceElement.innerText.replace('R', ''))
        var name = document.getElementById(id+'_name').textContent;
        var quantity = parseInt(document.getElementById(id+'_quantity').value)
        var color = document.getElementById(id+'_color').textContent;
        var product = {name, color, quantity , price};
        orders.push(product);
    };

    localStorage.setItem('orders',JSON.stringify(orders));
    window.location.href = `checkout.html`;

});


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

