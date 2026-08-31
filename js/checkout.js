// checkout form validation
// ============================================
// CHECKOUT PAGE
// ============================================


// Get the form
const checkoutForm =
    document.getElementById("checkout-form");


// Get the cart
let checkoutCart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Get the summary area
const checkoutSummary =
    document.getElementById("checkout-summary");


// Get confirmation section
const confirmation =
    document.getElementById("order-confirmation");


// ============================================
// DISPLAY ORDER SUMMARY
// ============================================

function displayOrderSummary() {

    checkoutSummary.innerHTML = "";


    // Check if cart is empty
    if (checkoutCart.length === 0) {

        checkoutSummary.innerHTML = `
            <p>Your cart is empty.</p>

            <br>

            <a
                href="products.html"
                class="button"
            >
                Go Shopping
            </a>
        `;

        return;
    }


    // Display each product
    checkoutCart.forEach(function(item) {

        const itemDiv = document.createElement("div");

        itemDiv.classList.add("summary-item");


        itemDiv.innerHTML = `

            <span>
                ${item.title} x ${item.quantity}
            </span>

            <span>
                $${(item.price * item.quantity).toFixed(2)}
            </span>

        `;


        checkoutSummary.appendChild(itemDiv);

    });


    // Calculate total
    const total = checkoutCart.reduce(
        function(sum, item) {

            return sum + (item.price * item.quantity);

        },
        0
    );


    // Show total
    const totalDiv = document.createElement("div");

    totalDiv.classList.add("summary-total");


    totalDiv.innerHTML = `

        <span>Total</span>

        <span>
            $${total.toFixed(2)}
        </span>

    `;


    checkoutSummary.appendChild(totalDiv);
}


// ============================================
// FORM VALIDATION
// ============================================

checkoutForm.addEventListener("submit", function(event) {

    // Stop the form from refreshing the page
    event.preventDefault();


    // Get the values from the form
    const firstName =
        document.getElementById("first-name").value.trim();

    const lastName =
        document.getElementById("last-name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const country =
        document.getElementById("country").value.trim();

    const postalCode =
        document.getElementById("postal-code").value.trim();


    // Clear old error messages
    clearErrors();


    // This checks if everything is correct
    let formIsValid = true;


    // FIRST NAME

    if (firstName === "") {

        showError(
            "first-name-error",
            "First name is required."
        );

        formIsValid = false;
    }


    // LAST NAME

    if (lastName === "") {

        showError(
            "last-name-error",
            "Last name is required."
        );

        formIsValid = false;
    }


    // EMAIL

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError(
            "email-error",
            "Please enter a valid email."
        );

        formIsValid = false;
    }


    // PHONE

    if (phone === "") {

        showError(
            "phone-error",
            "Phone number is required."
        );

        formIsValid = false;
    }


    // ADDRESS

    if (address === "") {

        showError(
            "address-error",
            "Address is required."
        );

        formIsValid = false;
    }


    // CITY

    if (city === "") {

        showError(
            "city-error",
            "City is required."
        );

        formIsValid = false;
    }


    // COUNTRY

    if (country === "") {

        showError(
            "country-error",
            "Country is required."
        );

        formIsValid = false;
    }


    // POSTAL CODE

    if (postalCode === "") {

        showError(
            "postal-code-error",
            "Postal code is required."
        );

        formIsValid = false;
    }


    // ========================================
    // IF EVERYTHING IS CORRECT
    // ========================================

    if (formIsValid) {

        placeOrder();

    }

});


// ============================================
// SHOW ERROR
// ============================================

function showError(id, message) {

    document.getElementById(id).textContent = message;

}


// ============================================
// CLEAR ERRORS
// ============================================

function clearErrors() {

    const errors =
        document.querySelectorAll(".form-section small");


    errors.forEach(function(error) {

        error.textContent = "";

    });

}


// ============================================
// PLACE ORDER
// ============================================

function placeOrder() {

    // Calculate order total
    const total = checkoutCart.reduce(
        function(sum, item) {

            return sum + (item.price * item.quantity);

        },
        0
    );


    // Put total in confirmation message
    document.getElementById(
        "confirmation-total"
    ).textContent = "$" + total.toFixed(2);


    // Hide the form
    checkoutForm.style.display = "none";


    // Show confirmation
    confirmation.classList.add("show");


    // Clear the cart
    localStorage.removeItem("cart");

}


// Start
displayOrderSummary();