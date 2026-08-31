// the main shopping interactivy


// Get the cart container
const cartContainer = document.getElementById("cart-container");


// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ============================================
// DISPLAY CART
// ============================================

function displayCart() {

    // Clear the container
    cartContainer.innerHTML = "";


    // Check if the cart is empty
    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    You haven't added anything yet.
                </p>

                <br>

                <a
                    href="products.html"
                    class="button"
                >
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    // Display every product in the cart
    cart.forEach(function(item) {

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <img
                src="${item.thumbnail}"
                alt="${item.title}"
            >


            <div>

                <h3>
                    ${item.title}
                </h3>

                <p class="cart-price">
                    $${item.price}
                </p>

            </div>


            <!-- Quantity controls -->

            <div class="cart-quantity">

                <button
                    onclick="decreaseCartQuantity(${item.id})"
                >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseCartQuantity(${item.id})"
                >
                    +
                </button>

            </div>


            <!-- Product total -->

            <p>
                $${(item.price * item.quantity).toFixed(2)}
            </p>


            <!-- Remove button -->

            <button
                class="remove-button"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;


        cartContainer.appendChild(cartItem);

    });


    // Calculate total
    calculateTotal();
}


// ============================================
// INCREASE QUANTITY
// ============================================

function increaseCartQuantity(productId) {

    const product = cart.find(function(item) {

        return item.id === productId;

    });


    if (product) {

        product.quantity++;

    }


    saveCart();

    displayCart();
}


// ============================================
// DECREASE QUANTITY
// ============================================

function decreaseCartQuantity(productId) {

    const product = cart.find(function(item) {

        return item.id === productId;

    });


    if (product) {

        if (product.quantity > 1) {

            product.quantity--;

        } else {

            removeFromCart(productId);

            return;
        }

    }


    saveCart();

    displayCart();
}


// ============================================
// REMOVE PRODUCT
// ============================================

function removeFromCart(productId) {

    cart = cart.filter(function(item) {

        return item.id !== productId;

    });


    saveCart();

    displayCart();
}


// ============================================
// CALCULATE TOTAL
// ============================================

function calculateTotal() {

    let total = cart.reduce(function(sum, item) {

        return sum + (item.price * item.quantity);

    }, 0);


    const totalDiv = document.createElement("div");

    totalDiv.classList.add("cart-summary");


    totalDiv.innerHTML = `

        <h2>
            Total: $${total.toFixed(2)}
        </h2>

        <a
            href="products.html"
            class="button"
        >
            Continue Shopping
        </a>

        <a
            href="checkout.html"
            class="button"
        >
            Checkout
        </a>

    `;


    cartContainer.appendChild(totalDiv);
}


// ============================================
// SAVE CART
// ============================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// Start
displayCart();