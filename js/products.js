// API, serach ,filter and sort happen, also gets the products from the dummyjson



// The API URL
const apiUrl = "https://dummyjson.com/products";


// This will store all the products
let products = [];


// Get the HTML elements
const productsContainer = document.getElementById("products-container");

const searchInput = document.getElementById("search-input");

const categoryFilter = document.getElementById("category-filter");

const sortProducts = document.getElementById("sort-products");


// ============================================
// GET PRODUCTS FROM API
// ============================================

async function getProducts() {

    // Show loading message
    productsContainer.innerHTML = "<p>Loading products...</p>";

    try {

        // Ask the API for products
        const response = await fetch(apiUrl);


        // Check if the request worked
        if (!response.ok) {
            throw new Error("Could not get products");
        }


        // Convert the response to JavaScript data
        const data = await response.json();


        // Store the products
        products = data.products;


        // Display the products
        displayProducts(products);


        // Create the category options
        createCategories();


    } catch (error) {

        // Show an error if something goes wrong
        productsContainer.innerHTML =
            "<p>Unable to load products. Please try again.</p>";

        console.log(error);

    }
}


// ============================================
// DISPLAY PRODUCTS
// ============================================

function displayProducts(productList) {

    // Clear the old products
    productsContainer.innerHTML = "";


    // Check if there are no products
    if (productList.length === 0) {

        productsContainer.innerHTML =
            "<p>No products found.</p>";

        return;
    }


    // Go through every product
    productList.forEach(function(product) {

        // Create a product card
        const productCard = document.createElement("div");

        productCard.classList.add("product-card");


        // Put the product information inside the card
        productCard.innerHTML = `

            <img
                src="${product.thumbnail}"
                alt="${product.title}"
            >

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-title">
                    ${product.title}
                </h3>

                <p class="product-price">
                    $${product.price}
                </p>

                <p class="product-rating">
                    ⭐ ${product.rating}
                </p>

                <div class="product-buttons">

                    <a
                        href="product-details.html?id=${product.id}"
                        class="details-button"
                    >
                        View Details
                    </a>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;


        // Add the card to the page
        productsContainer.appendChild(productCard);

    });
}


// ============================================
// CREATE CATEGORY OPTIONS
// ============================================

function createCategories() {

    // Get all the categories
    const categories = products.map(function(product) {
        return product.category;
    });


    // Remove duplicate categories
    const uniqueCategories = [...new Set(categories)];


    // Add each category to the dropdown
    uniqueCategories.forEach(function(category) {

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });
}


// ============================================
// SEARCH, FILTER AND SORT
// ============================================

function updateProducts() {

    // Get what the user typed
    const searchTerm = searchInput.value.toLowerCase();


    // Get the selected category
    const selectedCategory = categoryFilter.value;


    // Get the selected sorting option
    const selectedSort = sortProducts.value;


    // Start with all products
    let filteredProducts = products;


    // SEARCH
    if (searchTerm !== "") {

        filteredProducts = filteredProducts.filter(function(product) {

            return product.title
                .toLowerCase()
                .includes(searchTerm);

        });

    }


    // CATEGORY FILTER
    if (selectedCategory !== "all") {

        filteredProducts = filteredProducts.filter(function(product) {

            return product.category === selectedCategory;

        });

    }


    // SORTING

    if (selectedSort === "price-low") {

        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });

    }


    if (selectedSort === "price-high") {

        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });

    }


    if (selectedSort === "name-a") {

        filteredProducts.sort(function(a, b) {

            return a.title.localeCompare(b.title);

        });

    }


    if (selectedSort === "name-z") {

        filteredProducts.sort(function(a, b) {

            return b.title.localeCompare(a.title);

        });

    }


    // Display the final result
    displayProducts(filteredProducts);
}


// ============================================
// EVENTS
// ============================================


// Search when the user types
searchInput.addEventListener("input", updateProducts);


// Filter when the category changes
categoryFilter.addEventListener("change", updateProducts);


// Sort when the sorting option changes
sortProducts.addEventListener("change", updateProducts);


// ============================================
// ADD TO CART
// ============================================

function addToCart(productId) {

    // Find the product
    const product = products.find(function(product) {

        return product.id === productId;

    });


    // Get the current cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    // Check if the product is already in the cart
    const existingProduct = cart.find(function(item) {

        return item.id === productId;

    });


    if (existingProduct) {

        // Increase quantity
        existingProduct.quantity++;

    } else {

        // Add a new product
        cart.push({

            id: product.id,

            title: product.title,

            price: product.price,

            thumbnail: product.thumbnail,

            quantity: 1

        });

    }


    // Save the cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Update cart number
    updateCartCount();


    alert("Product added to cart!");
}


// ============================================
// UPDATE CART NUMBER
// ============================================

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems = totalItems + item.quantity;

    });


    cartCount.textContent = totalItems;
}


// Start the page
getProducts();