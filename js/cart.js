/* =========================================
   CROWNFOLD — CART SYSTEM
========================================= */

const cartContainer =
    document.getElementById("cartContainer");

const cartTotal =
    document.getElementById("cartTotal");

let cart =
    JSON.parse(localStorage.getItem("crownfoldCart")) || [];


/* =========================================
   UPDATE HEADER CART COUNT
========================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalQuantity = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalQuantity;

}


/* =========================================
   DISPLAY CART
========================================= */

function displayCart() {

    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    Add something from the Crownfold collection.
                </p>

                <a href="index.html" class="shop-button">
                    CONTINUE SHOPPING
                </a>

            </div>
        `;

        cartTotal.textContent = "₹0";

        updateCartCount();

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            Number(item.price) * Number(item.quantity);

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h2>${item.name}</h2>

                    <p>Code: ${item.id}</p>

                    <p>Size: ${item.size}</p>

                </div>

            </div>


            <div class="cart-quantity">

                <button
                    onclick="changeQuantity(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                >
                    +
                </button>

            </div>


            <strong class="cart-price">
                ₹${itemTotal}
            </strong>


            <button
                class="remove-btn"
                onclick="removeItem(${index})"
            >
                REMOVE
            </button>

        `;


        cartContainer.appendChild(cartItem);

    });


    cartTotal.textContent = "₹" + total;

    updateCartCount();

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(index, change) {

    if (!cart[index]) return;

    cart[index].quantity =
        Number(cart[index].quantity) + change;


    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }


    saveCart();

}


/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart();

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "crownfoldCart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();

}


/* =========================================
   CHECKOUT BUTTON
========================================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");


if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


        window.location.href = "checkout.html";

    });

}


/* =========================================
   INITIAL LOAD
========================================= */

displayCart();

updateCartCount();