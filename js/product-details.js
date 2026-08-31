// the specific product from the dummyjson and qty


// Get the product details container
const productDetails = document.getElementById("product-details");


// Get the ID from the URL
const params = new URLSearchParams(window.location.search);

const productId = params.get("id");


// This will store the product
let currentProduct = null;


// This is the quantity
let quantity = 1;


// ============================================
// GET ONE PRODUCT
// ============================================

async function getProduct() {

    productDetails.innerHTML =
        "<p>Loading product...</p>";


    try {

        // Get the product using its ID
        const response = await fetch(
            `https://dummyjson.com/products/${productId}`
        );


        if (!response.ok) {
            throw new Error("Product not found");
        }


        // Convert response to JavaScript data
        const product = await response.json();


        // Save the product
        currentProduct = product;


        // Display the product
        displayProduct(product);


    } catch (error) {

        productDetails.innerHTML =
            "<p>Unable to load this product.</p>";

        console.log(error);

    }
}


// ============================================
// DISPLAY PRODUCT
// ============================================

function displayProduct(product) {

    productDetails.innerHTML = `

        <div class="product-details">

            <div>

                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                >

            </div>


            <div>

                <p class="small-text">
                    ${product.category}
                </p>

                <h1>
                    ${product.title}
                </h1>

                <p>
                    ⭐ ${product.rating}
                </p>

                <p class="details-price">
                    $${product.price}
                </p>

                <p class="details-description">
                    ${product.description}
                </p>

                <p>
                    <strong>Brand:</strong>
                    ${product.brand || "Not available"}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${product.stock}
                </p>

                <p>
                    <strong>Discount:</strong>
                    ${product.discountPercentage}%
                </p>


                <!-- Quantity -->

                <div class="quantity">

                    <button onclick="decreaseQuantity()">
                        -
                    </button>

                    <span id="quantity">
                        1
                    </span>

                    <button onclick="increaseQuantity()">
                        +
                    </button>

                </div>


                <!-- Add to cart -->

                <button
                    class="button"
                    onclick="addProductToCart()"
                >
                    Add to Cart
                </button>

            </div>

        </div>

    `;
}


// ============================================
// INCREASE QUANTITY
// ============================================

function increaseQuantity() {

    quantity++;

    document.getElementById("quantity").textContent = quantity;
}


// ============================================
// DECREASE QUANTITY
// ============================================

function decreaseQuantity() {

    if (quantity > 1) {

        quantity--;

        document.getElementById("quantity").textContent = quantity;

    }
}


// ============================================
// ADD PRODUCT TO CART
// ============================================

function addProductToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    // Check if product is already there
    const existingProduct = cart.find(function(item) {

        return item.id === currentProduct.id;

    });


    if (existingProduct) {

        existingProduct.quantity =
            existingProduct.quantity + quantity;

    } else {

        cart.push({

            id: currentProduct.id,

            title: currentProduct.title,

            price: currentProduct.price,

            thumbnail: currentProduct.thumbnail,

            quantity: quantity

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert("Product added to cart!");

}


// Start
getProduct();