// function gatCartItems
function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generatedCartItems(cartItems);
        getTotalCost(cartItems);
    })
}
// function getCartItems ends

// function decreaseCount
function decreaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if(doc.exists) {
            if(doc.data().quantity > 1){
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}
// function decreaseCount ends

// function increaseCount
function increaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if(doc.exists) {
            if(doc.data().quantity > 0){
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}
// function increaseCount ends

// function deleteItem
function deleteItem(itemId){
    db.collection("cart-items").doc(itemId).delete();
}
// function deleteItem ends

// function getTotalCost
function getTotalCost(items){
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += item.price * item.quantity;
    })
    document.querySelector(".total-cost-number").innerText = `₹${totalCost}.00`;
}
// function getTotalCost ends

// function generatedCartItems
function generatedCartItems(cartItems){
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b border-gray-100">
            <div class="cart-item-img w-40 h-24 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain" src="${item.image}" alt="">
            </div>
            <div class="cart-item-details flex-grow">
                <div class="item-title font-bold text-sm text-gray-600">
                    ${item.name}
                </div>
                <div class="cart-item-brand text-small text-gray-400">
                    ${item.make}
                </div>
            </div>
            <div class="cart-item-counter w-48 flex item-center">
                <div data-id="${item.id}" class="cart-item-decrease text-gray-400 bg-gray-100 cursor-pointer rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2">
                    <i class="fas fa-chevron-left fa-xs"></i>
                </div>
                <h4 class="text-gray-400">x${item.quantity}</h4>
                <div data-id="${item.id}" class="cart-item-increase text-gray-400 bg-gray-100 cursor-pointer rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2">
                    <i class="fas fa-chevron-right fa-xs"></i>
                </div>
            </div>
            <div class="cart-item-total-cost w-48 font-bold text-gray-400">
                ₹${item.price * item.quantity}.00
            </div>
            <div data-id="${item.id}" class="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                <i class="fas fa-times"></i>
            </div>
        </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}
// function generatedCartItems ends

// function createEventListeners
function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");
    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            decreaseCount(button.dataset.id);
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            increaseCount(button.dataset.id);
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function() {
            deleteItem(button.dataset.id);
        })
    })
}
// function createEventListeners ends

getCartItems();