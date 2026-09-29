/* =========================================
   CROWNFOLD PRODUCT SYSTEM
========================================= */

const products = {

    "CF-001": {
        name: "Riviera Linen Shirt",
        image: "product/CF-001.png",
        price: 899
    },

    "CF-002": {
        name: "Azure Check Shirt",
        image: "product/CF-002.png",
        price: 899
    },

    "CF-003": {
        name: "Mocha Stripe Shirt",
        image: "product/CF-003.png",
        price: 899
    },

    "CF-004": {
        name: "Terra Texture Shirt",
        image: "product/CF-004.png",
        price: 899
    },

    "CF-005": {
        name: "Navy Crest Check Shirt",
        image: "product/CF-005.png",
        price: 899
    },

    "CF-006": {
        name: "Midnight Stripe Shirt",
        image: "product/CF-006.png",
        price: 899
    }

};


/* =========================================
   LOAD PRODUCT
========================================= */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const product = products[productId];


if (product) {

    const image = document.getElementById("productImage");

    const name = document.getElementById("productName");

    const price = document.getElementById("productPrice");


    if (image) {
        image.src = product.image;
        image.alt = product.name;
    }

   
  const thumbnailImage = document.getElementById("thumbnailImage");

if (thumbnailImage) {
    thumbnailImage.src = product.image;
    thumbnailImage.alt = product.name;
}


    if (name) {
        name.textContent = product.name;
    }


    if (price) {
        price.textContent = "₹" + product.price;
    }

}


/* =========================================
   QUANTITY
========================================= */

let quantity = 1;

const quantityDisplay =
    document.getElementById("quantity");

const minusBtn =
    document.getElementById("minusBtn");

const plusBtn =
    document.getElementById("plusBtn");


if (plusBtn) {

    plusBtn.addEventListener("click", () => {

        quantity++;

        quantityDisplay.textContent = quantity;

    });

}


if (minusBtn) {

    minusBtn.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent = quantity;

        }

    });

}


/* =========================================
   SIZE SELECTION
========================================= */

const sizeButtons =
    document.querySelectorAll(".size-btn");


sizeButtons.forEach(button => {

    button.addEventListener("click", () => {

        sizeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

    });

});



/* =========================================
   ADD TO CART
========================================= */

const addToCartBtn =
    document.getElementById("addToCart");

if (addToCartBtn) {

    addToCartBtn.addEventListener("click", () => {

        const selectedSize =
            document.querySelector(".size-btn.selected");

        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        const cartItem = {
            id: productId,
            name: product.name,
            image: product.image,
            price: product.price,
            size: selectedSize.textContent,
            quantity: quantity
        };

        let cart =
            JSON.parse(localStorage.getItem("crownfoldCart")) || [];

        cart.push(cartItem);
      
       localStorage.setItem(
    "crownfoldCart",
    JSON.stringify(cart)
);


/* UPDATE HEADER CART COUNT */

const cartCount =
    document.getElementById("cartCount");

if (cartCount) {

    const totalQuantity = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalQuantity;

}


alert("Product added to cart!");    });

}

const relatedCards = document.querySelectorAll(".related-card");

relatedCards.forEach(card => {

    const link = card.getAttribute("href");

    if (!link) return;

    const urlParams = new URLSearchParams(
        link.split("?")[1]
    );

    const relatedProductId = urlParams.get("id");

    if (relatedProductId === productId) {
        card.style.display = "none";
    }

});

/* =========================================
   LOAD HEADER CART COUNT
========================================= */

function updateProductCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const savedCart =
        JSON.parse(localStorage.getItem("crownfoldCart")) || [];

    const totalQuantity = savedCart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalQuantity;

}

updateProductCartCount();