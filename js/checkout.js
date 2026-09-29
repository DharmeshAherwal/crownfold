/* =========================================
   CROWNFOLD — CHECKOUT SYSTEM
========================================= */

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const placeOrderBtn =
    document.getElementById("placeOrderBtn");


let cart =
    JSON.parse(localStorage.getItem("crownfoldCart")) || [];


/* =========================================
   LOAD ORDER SUMMARY
========================================= */

function loadCheckout() {

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="checkout-empty">
                Your cart is empty.
            </p>
        `;

        checkoutTotal.textContent = "₹0";

        placeOrderBtn.disabled = true;

        return;
    }


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>


            <strong>
                ₹${itemTotal}
            </strong>

        `;


        checkoutItems.appendChild(itemElement);

    });


    checkoutTotal.textContent =
        "₹" + total;

}


/* =========================================
   PLACE ORDER
========================================= */

placeOrderBtn.addEventListener(
    "click",
    () => {

        const fullName =
            document.getElementById("fullName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const pincode =
            document.getElementById("pincode").value.trim();

        const state =
            document.getElementById("state").value.trim();


        if (
            !fullName ||
            !phone ||
            !address ||
            !city ||
            !pincode ||
            !state
        ) {

            alert(
                "Please fill in all required details."
            );

            return;
        }


        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


       /* =========================================
   SAVE ORDER TO LOCAL STORAGE
========================================= */

const existingOrders =
    JSON.parse(
        localStorage.getItem("crownfoldOrders")
    ) || [];


const orderDate =
    new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });


/*
   Save every cart item as an order entry
*/

cart.forEach(item => {

    const order = {

        id:
            "CF-" +
            Date.now() +
            "-" +
            Math.floor(Math.random() * 1000),

        date: orderDate,

        status: "PROCESSING",

        name: item.name,

        image: item.image,

        size: item.size,

        quantity: Number(item.quantity),

        total:
            Number(item.price) *
            Number(item.quantity)

    };


    existingOrders.unshift(order);

});


localStorage.setItem(
    "crownfoldOrders",
    JSON.stringify(existingOrders)
);


/* =========================================
   CLEAR CART
========================================= */

localStorage.removeItem(
    "crownfoldCart"
);


/* =========================================
   SUCCESS
========================================= */

alert(
    "Order placed successfully! Thank you for shopping with Crownfold."
);


window.location.href =
    "orders.html";

    }
);


/* =========================================
   INITIAL LOAD
========================================= */

loadCheckout();

