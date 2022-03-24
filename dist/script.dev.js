"use strict";

// getting items from the database and storing them to an array
function getItems() {
  db.collection("items").get().then(function (querySnapshot) {
    var items = [];
    querySnapshot.forEach(function (doc) {
      items.push({
        id: doc.id,
        image: doc.data().image,
        name: doc.data().name,
        make: doc.data().make,
        price: doc.data().price,
        rating: doc.data().rating
      });
    });
    generateItems(items);
  });
} // function getItems ends
// function addToCart
// updates the cart count and adds the item to the cart in the database


function addToCart(item) {
  var cartItem = db.collection("cart-items").doc(item.id);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1
      });
    } else {
      cartItem.set({
        image: item.image,
        name: item.name,
        make: item.make,
        price: item.price,
        rating: item.rating,
        quantity: 1
      });
    }
  });
} // getting items from the array and displaying them on the page


function generateItems(items) {
  var itemsHTML = ""; // looping through each item in the array

  items.forEach(function (item) {
    // creating a div element for each item
    var doc = document.createElement("div"); // adding the class for each item inside the div element

    doc.classList.add("product-listing", "mr-5"); // creating an innerHTML for each item to be displayed on the page

    doc.innerHTML = "\n        <div class=\"product-image w-48 h-52 bg-white rounded-lg\">\n            <img class=\"w-full h-full object-contain p-4\" src=\"".concat(item.image, "\" alt=\"\">\n        </div>\n        <div class=\"product-name text-gray-700 font-bold mt-2 text-sm\">\n            ").concat(item.name, "\n        </div>\n        <div class=\"product-make text-green-700 font-bold\">\n            ").concat(item.make, "\n        </div>\n        <div class=\"product-rating text-yellow-400 font-bold my-1\">\n            \u2B50\u2B50\u2B50\u2B50\u2B50 ").concat(item.rating, "\n        </div>\n        <div class=\"product-price font-bold text-gray-700 text-lg\">\n            \u20B9").concat(item.price, "\n        </div>\n        "); // add to cart button
    // creating a div element for each add item

    var addToCartEl = document.createElement("div"); // adding the class to div element

    addToCartEl.classList.add("add-to-cart", "h-8", "w-28", "bg-yellow-500", "items-center", "flex", "justify-center", "rounded", "text-white", "text-md", "cursor-pointer", "hover:bg-yellow-600", "font-bold", "mt-4"); // text on the button

    addToCartEl.innerText = "Add to Cart";
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
    }); // appending text to the button created

    doc.appendChild(addToCartEl); // appending the entire div to it's respective class

    document.querySelector(".product-listing").appendChild(doc);
  });
} // function generateItems ends


getItems();