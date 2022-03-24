"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// function gatCartItems
function getCartItems() {
  db.collection("cart-items").onSnapshot(function (snapshot) {
    var cartItems = [];
    snapshot.docs.forEach(function (doc) {
      cartItems.push(_objectSpread({
        id: doc.id
      }, doc.data()));
    });
    generatedCartItems(cartItems);
    getTotalCost(cartItems);
  });
} // function getCartItems ends
// function decreaseCount


function decreaseCount(itemId) {
  var cartItem = db.collection("cart-items").doc(itemId);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().quantity > 1) {
        cartItem.update({
          quantity: doc.data().quantity - 1
        });
      }
    }
  });
} // function decreaseCount ends
// function increaseCount


function increaseCount(itemId) {
  var cartItem = db.collection("cart-items").doc(itemId);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().quantity > 0) {
        cartItem.update({
          quantity: doc.data().quantity + 1
        });
      }
    }
  });
} // function increaseCount ends
// function deleteItem


function deleteItem(itemId) {
  db.collection("cart-items").doc(itemId)["delete"]();
} // function deleteItem ends
// function getTotalCost


function getTotalCost(items) {
  var totalCost = 0;
  items.forEach(function (item) {
    totalCost += item.price * item.quantity;
  });
  document.querySelector(".total-cost-number").innerText = "\u20B9".concat(totalCost, ".00");
} // function getTotalCost ends
// function generatedCartItems


function generatedCartItems(cartItems) {
  var itemsHTML = "";
  cartItems.forEach(function (item) {
    itemsHTML += "\n        <div class=\"cart-item flex items-center pb-4 border-b border-gray-100\">\n            <div class=\"cart-item-img w-40 h-24 bg-white rounded-lg p-4\">\n                <img class=\"w-full h-full object-contain\" src=\"".concat(item.image, "\" alt=\"\">\n            </div>\n            <div class=\"cart-item-details flex-grow\">\n                <div class=\"item-title font-bold text-sm text-gray-600\">\n                    ").concat(item.name, "\n                </div>\n                <div class=\"cart-item-brand text-small text-gray-400\">\n                    ").concat(item.make, "\n                </div>\n            </div>\n            <div class=\"cart-item-counter w-48 flex item-center\">\n                <div data-id=\"").concat(item.id, "\" class=\"cart-item-decrease text-gray-400 bg-gray-100 cursor-pointer rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2\">\n                    <i class=\"fas fa-chevron-left fa-xs\"></i>\n                </div>\n                <h4 class=\"text-gray-400\">x").concat(item.quantity, "</h4>\n                <div data-id=\"").concat(item.id, "\" class=\"cart-item-increase text-gray-400 bg-gray-100 cursor-pointer rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2\">\n                    <i class=\"fas fa-chevron-right fa-xs\"></i>\n                </div>\n            </div>\n            <div class=\"cart-item-total-cost w-48 font-bold text-gray-400\">\n                \u20B9").concat(item.price * item.quantity, ".00\n            </div>\n            <div data-id=\"").concat(item.id, "\" class=\"cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400\">\n                <i class=\"fas fa-times\"></i>\n            </div>\n        </div>\n        ");
  });
  document.querySelector(".cart-items").innerHTML = itemsHTML;
  createEventListeners();
} // function generatedCartItems ends
// function createEventListeners


function createEventListeners() {
  var decreaseButtons = document.querySelectorAll(".cart-item-decrease");
  var increaseButtons = document.querySelectorAll(".cart-item-increase");
  var deleteButtons = document.querySelectorAll(".cart-item-delete");
  decreaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      decreaseCount(button.dataset.id);
    });
  });
  increaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      increaseCount(button.dataset.id);
    });
  });
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      deleteItem(button.dataset.id);
    });
  });
} // function createEventListeners ends


getCartItems();