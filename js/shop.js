/* =====================================================
   CROWNFOLD — SHOP FILTER + SORT
===================================================== */

const categoryButtons = document.querySelectorAll(".category-btn");
const productsContainer = document.querySelector(".shop-grid");
const products = Array.from(document.querySelectorAll(".shop-product-card"));

let currentCategory = "ALL";


/* PRODUCT DATA */

const productData = {
    "CF-001": {
        name: "Riviera Linen Shirt",
        price: 899
    },

    "CF-002": {
        name: "Azure Check Shirt",
        price: 899
    },

    "CF-003": {
        name: "Mocha Stripe Shirt",
        price: 899
    },

    "CF-004": {
        name: "Terra Texture Shirt",
        price: 899
    },

    "CF-005": {
        name: "Navy Crest Check Shirt",
        price: 899
    },

    "CF-006": {
        name: "Midnight Stripe Shirt",
        price: 899
    }
};


/* CATEGORY FILTER */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.textContent.trim();

        applyFilters();

    });

});


/* CREATE SORT DROPDOWN */

const sortButton = document.querySelector(".sort-btn");

const sortMenu = document.createElement("div");

sortMenu.className = "sort-menu";

sortMenu.innerHTML = `
    <button data-sort="featured">Featured</button>
    <button data-sort="low">Price: Low to High</button>
    <button data-sort="high">Price: High to Low</button>
    <button data-sort="az">Name: A–Z</button>
    <button data-sort="za">Name: Z–A</button>
`;

sortButton.parentElement.appendChild(sortMenu);


/* OPEN / CLOSE SORT MENU */

sortButton.addEventListener("click", () => {

    sortMenu.classList.toggle("show");

});


/* SORT OPTIONS */

sortMenu.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        const sortType = button.dataset.sort;

        sortProducts(sortType);

        sortMenu.classList.remove("show");

        sortButton.innerHTML =
            `SORT: ${button.textContent.toUpperCase()} <span>⌄</span>`;

    });

});


/* FILTER FUNCTION */

function applyFilters() {

    products.forEach(product => {

        const code =
            product
            .querySelector(".shop-product-image span")
            .textContent
            .trim();

        if (
            currentCategory === "ALL" ||
            currentCategory === "SHIRTS" ||
            currentCategory === "COLLECTION"
        ) {

            product.style.display = "block";

        }

        else if (currentCategory === "NEW IN") {

            if (code === "CF-001" || code === "CF-002") {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        }

    });

}


/* SORT FUNCTION */

function sortProducts(type) {

    const sortedProducts = [...products];

    if (type === "low") {

        sortedProducts.sort((a, b) => {

            const codeA =
                a.querySelector(".shop-product-image span").textContent.trim();

            const codeB =
                b.querySelector(".shop-product-image span").textContent.trim();

            return productData[codeA].price - productData[codeB].price;

        });

    }

    else if (type === "high") {

        sortedProducts.sort((a, b) => {

            const codeA =
                a.querySelector(".shop-product-image span").textContent.trim();

            const codeB =
                b.querySelector(".shop-product-image span").textContent.trim();

            return productData[codeB].price - productData[codeA].price;

        });

    }

    else if (type === "az") {

        sortedProducts.sort((a, b) => {

            const codeA =
                a.querySelector(".shop-product-image span").textContent.trim();

            const codeB =
                b.querySelector(".shop-product-image span").textContent.trim();

            return productData[codeA].name.localeCompare(
                productData[codeB].name
            );

        });

    }

    else if (type === "za") {

        sortedProducts.sort((a, b) => {

            const codeA =
                a.querySelector(".shop-product-image span").textContent.trim();

            const codeB =
                b.querySelector(".shop-product-image span").textContent.trim();

            return productData[codeB].name.localeCompare(
                productData[codeA].name
            );

        });

    }

    /* FEATURED = ORIGINAL ORDER */

    if (type === "featured") {

        sortedProducts.sort((a, b) => {

            const codeA =
                a.querySelector(".shop-product-image span").textContent.trim();

            const codeB =
                b.querySelector(".shop-product-image span").textContent.trim();

            return codeA.localeCompare(codeB);

        });

    }


    /* PUT PRODUCTS BACK INTO GRID */

    sortedProducts.forEach(product => {

        productsContainer.appendChild(product);

    });

}


/* INITIAL STATE */

applyFilters();