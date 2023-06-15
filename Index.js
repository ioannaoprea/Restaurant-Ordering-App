import { menuArray } from "./data.js";

const menuItems=document.getElementById("menu-items");
const addBtn=document.getElementsByClassName("add-btn");
const ordered=document.getElementById("order");
const paymentForm=document.getElementById("payment-form");
const paymentBtn=document.getElementById("payment-btn");

let order=[];


// to know which item is selected for the order
document.addEventListener("click", function(e){
  if(e.target.dataset.addBtn){
    handleAddItem(e.target.dataset.addBtn);
  }else if(e.target.dataset.removeBtn) {
    handleRemoveItem(e.target.dataset.removeBtn);
  };
})


function handleAddItem(itemId) {
  const targetItem=menuArray.filter((item)=>item.id===Number(itemId))[0];
  order.push(targetItem);
  getOrder(targetItem);
}

// render order items
function getOrder(){
  let totalPrice=0;
  let orderHtml=``;
  orderHtml+=`<h2 class="order-title">Your order:</h2>`;
  order.forEach(item=>{
    orderHtml+=`
    <div class="ordered-item">
      <div class="item-parent">
            <div class="name"> ${item.name} </div>
            <div class="remove" id="remove" data-remove-btn="${item.id}">remove</div>
      </div>
      <div class="price"> $${item.price} </div>
    </div>`;
    totalPrice+=item.price;
  });
  orderHtml+=`
  <div class="price-divider"></div>
  <div class="total-price">
      <div class="total-price-text">Total price:</div>
      <div class="price">$${totalPrice}</div>
  </div>
  <button class="btn" id="complete-order">Complete order</button>`
  ordered.innerHTML=orderHtml;
  if(totalPrice>0){
    completeOrder();
  } else if(totalPrice===0){
    ordered.style.display="none";
  }
}

// render payment form 
function completeOrder() {
  const completeOrder=document.getElementById("complete-order");
  completeOrder.addEventListener("click", function(){
    paymentForm.style.display="block";
  });
}

// after payment
paymentBtn.addEventListener("click", function(e){
  const name=document.getElementById("name");
  e.preventDefault();
  ordered.innerHTML=`
  <div class="thanks">Thanks, ${name.value}! Your order is on its way!</div>
  <img src="https://media.tenor.com/5Xgt3Phtx64AAAAC/thank-you-sticker-thanks-sticker.gif" alt="A cat saying thank you!">`
  paymentForm.style.display="none";
  menuItems.style.display="none"
})

function handleRemoveItem(itemId){
  const targetItem=menuArray.filter((item)=>item.id!==Number(itemId))[0];
  order=order.filter(item=>item.id!==Number(itemId));
  getOrder(targetItem);
 
}

// render menu items from data doc
function renderMenuItems() {
    let ordersFeed = "";
  
    menuArray.forEach(function (menuItem) {
      ordersFeed += `
        <div class="menu">
          <span class="emoji">${menuItem.emoji}</span>
          
          <div class="menu-details">
            <h2 class="item-name">${menuItem.name}</h2>
            <p class="item-ingred">${menuItem.ingredients}</p>
            <h3 class="item-price">$${menuItem.price}</h3>
          </div>
          
          <button class="add-btn" data-add-btn="${menuItem.id}" id="add-btn${menuItem.id}">+</button>
        </div>`;
    });
  
  menuItems.innerHTML = ordersFeed;
}
renderMenuItems();
