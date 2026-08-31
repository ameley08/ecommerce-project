// makes the cart number appear correctly on every page


// Get the cart from localStorage
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];


// Get the cart counter from the page
let cartCount = document.getElementById("cart-count");


// If the cart counter exists, update it
if (cartCount) {

    // Add all the quantities together
    let totalItems = 0;

    savedCart.forEach(function(item) {

        totalItems = totalItems + item.quantity;

    });

    cartCount.textContent = totalItems;
}