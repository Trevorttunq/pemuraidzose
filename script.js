/* =====================================================
   PEMURAI DZOSE
   WEBSITE INTERACTIONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       PAGE LOADER
    ================================================= */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            pageLoader.classList.add("loaded");
        }, 1500);

    });


    /* =================================================
       HEADER SCROLL
    ================================================= */

    const header = document.getElementById("header");

    function updateHeader() {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {

        menuBtn.classList.toggle("active");
        mobileMenu.classList.toggle("open");

        document.body.classList.toggle("no-scroll");

    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuBtn.classList.remove("active");
            mobileMenu.classList.remove("open");

            document.body.classList.remove("no-scroll");

        });

    });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);


    /* =================================================
       REVEAL ANIMATIONS
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =================================================
       SHOP FILTERS
    ================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const products =
        document.querySelectorAll(".product-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");


            products.forEach(product => {

                const category =
                    product.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    product.classList.remove("hidden");

                    setTimeout(() => {
                        product.style.opacity = "1";
                    }, 20);

                } else {

                    product.classList.add("hidden");

                }

            });

        });

    });


    /* =================================================
       CART
    ================================================= */

    const cartBtn =
        document.getElementById("cartBtn");

    const cartClose =
        document.getElementById("cartClose");

    const cartDrawer =
        document.getElementById("cartDrawer");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartItemsContainer =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    let cart = [];


    function openCart() {

        cartDrawer.classList.add("open");
        cartOverlay.classList.add("open");

        document.body.classList.add("no-scroll");

    }


    function closeCart() {

        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("open");

        document.body.classList.remove("no-scroll");

    }


    cartBtn.addEventListener("click", openCart);

    cartClose.addEventListener("click", closeCart);

    cartOverlay.addEventListener("click", closeCart);


    /* =================================================
       ADD TO CART
    ================================================= */

    const quickAddButtons =
        document.querySelectorAll(".quick-add");


    quickAddButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const product =
                button.closest(".product-card");


            const name =
                product.getAttribute("data-name");

            const price =
                Number(product.getAttribute("data-price"));

            const image =
                product.querySelector("img").src;


            const existing =
                cart.find(item => item.name === name);


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({
                    name,
                    price,
                    image,
                    quantity: 1
                });

            }


            updateCart();

            showToast(`${name} added to your bag`);

            openCart();

        });

    });


    /* =================================================
       UPDATE CART
    ================================================= */

    function updateCart() {

        cartItemsContainer.innerHTML = "";


        if (cart.length === 0) {

            cartItemsContainer.innerHTML = `
                <div class="empty-cart">

                    <i class="fa-solid fa-bag-shopping"></i>

                    <p>Your bag is empty.</p>

                    <a href="#shop" id="startShopping">
                        Start Shopping
                    </a>

                </div>
            `;

            cartCount.textContent = "0";

            cartTotal.textContent = "$0";

            return;

        }


        let total = 0;

        let quantityTotal = 0;


        cart.forEach((item, index) => {

            total += item.price * item.quantity;

            quantityTotal += item.quantity;


            const itemElement =
                document.createElement("div");

            itemElement.className = "cart-item";


            itemElement.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <button
                        class="remove-item"
                        data-index="${index}"
                    >
                        REMOVE
                    </button>

                </div>

                <div class="cart-item-price">
                    $${item.price * item.quantity}
                </div>

            `;


            cartItemsContainer.appendChild(itemElement);

        });


        cartCount.textContent = quantityTotal;

        cartTotal.textContent =
            `$${total.toFixed(2)}`;


        const removeButtons =
            document.querySelectorAll(".remove-item");


        removeButtons.forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.getAttribute("data-index"));

                cart.splice(index, 1);

                updateCart();

            });

        });

    }


    /* =================================================
       WISHLIST
    ================================================= */

    const wishlistButtons =
        document.querySelectorAll(".wishlist-btn");


    wishlistButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            button.classList.toggle("active");

            if (button.classList.contains("active")) {

                button.textContent = "♥";

                showToast("Added to your wishlist");

            } else {

                button.textContent = "♡";

            }

        });

    });


    /* =================================================
       TOAST
    ================================================= */

    const toast =
        document.getElementById("toast");

    let toastTimer;


    function showToast(message) {

        toast.querySelector("span").textContent =
            message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =================================================
       SEARCH
    ================================================= */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchClose =
        document.getElementById("searchClose");

    const searchInput =
        document.getElementById("searchInput");

    const searchResults =
        document.getElementById("searchResults");


    const searchableProducts = Array.from(products)
        .map(product => ({
            name: product.getAttribute("data-name"),
            category: product.getAttribute("data-category"),
            price: product.getAttribute("data-price")
        }));


    function openSearch() {

        searchOverlay.classList.add("open");

        document.body.classList.add("no-scroll");

        setTimeout(() => {

            searchInput.focus();

        }, 300);

    }


    function closeSearch() {

        searchOverlay.classList.remove("open");

        document.body.classList.remove("no-scroll");

        searchInput.value = "";

        searchResults.innerHTML = "";

    }


    searchBtn.addEventListener("click", openSearch);

    searchClose.addEventListener("click", closeSearch);


    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value.toLowerCase().trim();


        if (!query) {

            searchResults.innerHTML = "";

            return;

        }


        const results =
            searchableProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );


        if (results.length === 0) {

            searchResults.innerHTML = `
                <div class="search-result">
                    <span>No products found.</span>
                </div>
            `;

            return;

        }


        searchResults.innerHTML =
            results.map(product => `

                <div class="search-result">

                    <strong>${product.name}</strong>

                    <span>
                        $${product.price}
                    </span>

                </div>

            `).join("");

    });


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSearch();
            closeCart();

        }

    });


    /* =================================================
       NEWSLETTER
    ================================================= */

    const newsletterForm =
        document.getElementById("newsletterForm");


    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();


        const email =
            newsletterForm.querySelector("input").value;


        if (!email) return;


        newsletterForm.reset();


        showToast("You're on the list.");

    });


    /* =================================================
       START SHOPPING
    ================================================= */

    document.addEventListener("click", event => {

        if (event.target.id === "startShopping") {

            closeCart();

        }

    });


    /* =================================================
       CHECKOUT PLACEHOLDER
    ================================================= */

    const checkoutBtn =
        document.querySelector(".checkout-btn");


    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your bag is empty.");

            return;

        }


        showToast(
            "Checkout will be connected soon."
        );

    });


    /* =================================================
       PARALLAX EFFECT
    ================================================= */

    const heroImage =
        document.querySelector(".hero-image");


    window.addEventListener("scroll", () => {

        if (window.scrollY < window.innerHeight) {

            heroImage.style.transform =
                `scale(1) translateY(${window.scrollY * 0.12}px)`;

        }

    });


    /* =================================================
       INITIALIZE
    ================================================= */

    updateCart();

});