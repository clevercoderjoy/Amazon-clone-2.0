"use strict";

// function getCartItems
function getCartItems() {
  db.collection("cart-items").onSnapshot(function (snapshot) {
    var totalCount = 0;
    snapshot.forEach(function (doc) {
      totalCount += doc.data().quantity;
    });
    setCartCounter(totalCount);
  });
} // function getCartItems ends
// function setCartCounter


function setCartCounter(totalCount) {
  document.querySelector(".cart-item-number").innerText = totalCount;
}

getCartItems();