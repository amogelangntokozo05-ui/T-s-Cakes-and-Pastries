

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Shopping Bag ---
    initShoppingCart();
});


function initShoppingCart() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartSidebar = document.getElementById('cart-drawer-sidebar');
    const cartCloseBtn = document.getElementById('cart-drawer-close-btn');
    const cartOverlay = document.getElementById('cart-overlay-bg');
    const checkoutTrigger = document.getElementById('cart-checkout-trigger');

    // --- State Population Path: enquiry.html Form Pre-filler ---
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        const checkoutData = localStorage.getItem('tscakes_cart_checkout');
        if (checkoutData) {
            try {
                const data = JSON.parse(checkoutData);
                const productChoiceSelect = document.getElementById('productChoice');
                const quantityInput = document.getElementById('quantity');
                const messageTextarea = document.getElementById('enquiryMessage');

                // 1. Pre-fill Product Category dropdown
                if (productChoiceSelect && data.dominantCategory) {
                    productChoiceSelect.value = data.dominantCategory;
                    // Trigger change event to load any conditional fieldsets (e.g. Custom Order assistant)
                    productChoiceSelect.dispatchEvent(new Event('change'));
                }

                // 2. Pre-fill Quantity
                if (quantityInput && data.totalQty) {
                    quantityInput.value = data.totalQty;
                }

                // 3. Pre-fill Additional Notes summary
                if (messageTextarea && data.summary) {
                    messageTextarea.value = data.summary;
                    // Trigger input event to update visual character counters
                    messageTextarea.dispatchEvent(new Event('input'));
                }

                // Smoothly scroll to the form so the user sees it pre-filled
                enquiryForm.scrollIntoView({ behavior: 'smooth' });

                // Clear checkout data once consumed so it doesn't repeat on reload
                localStorage.removeItem('tscakes_cart_checkout');
            } catch (err) {
                console.error("Error parsing pre-fill checkout data: ", err);
            }
        }
    }

    // Return early if not on a page containing the cart elements (only services.html contains drawer DOM elements)
    if (!cartToggleBtn || !cartSidebar || !cartCloseBtn || !cartOverlay) return;

    // Load existing cart from localStorage or default to empty
    let cart = [];
    try {
        const localData = localStorage.getItem('tscakes_cart');
        if (localData) {
            cart = JSON.parse(localData);
        }
    } catch (e) {
        console.error("Error loading cart: ", e);
        cart = [];
    }

    // Refresh display counts on initial load
    updateCartDisplay();

    // --- Event Listeners ---

    // Toggle drawer open
    cartToggleBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    });

    // Close drawer close buttons
    const closeCartDrawer = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = '';
    };

    cartCloseBtn.addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', closeCartDrawer);

    // Clear All Cart items callback
    const clearAllBtn = document.getElementById('cart-clear-all-btn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            if (confirm("Are you sure you want to empty your entire treats bag?")) {
                cart = [];
                saveCartState();
                updateCartDisplay();
            }
        });
    }

    // Proceed to checkout callback
    checkoutTrigger.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your sweet treats bag is empty! Please add some pastries first.");
            return;
        }

        // Build structured cart summary text for enquiry.html pre-population
        let summaryText = "Hi T's Cakes! I am interested in placing an order for the following items from my shopping bag:\n\n";
        let totalItemsCount = 0;
        let dominantCategory = "cakes"; // Default category fallback

        cart.forEach(item => {
            summaryText += `- ${item.qty}x ${item.title} (R${item.price} each)\n`;
            totalItemsCount += item.qty;
            if (item.category) dominantCategory = item.category; // Uses last added item's category
        });

        summaryText += `\nEstimated Cart Subtotal: R${calculateCartSubtotal().toFixed(2)}\n`;
        summaryText += "Please let me know about baking availability, delivery slots, and booking confirmation details!";

        // Save structured checkout payload in localStorage to be consumed by enquiry.html
        const checkoutPayload = {
            dominantCategory: dominantCategory,
            totalQty: totalItemsCount,
            summary: summaryText
        };

        localStorage.setItem('tscakes_cart_checkout', JSON.stringify(checkoutPayload));

        // Close drawer and redirect smoothly
        closeCartDrawer();
        window.location.href = 'enquiry.html';
    });

    // --- Cart Actions Functions ---

    // Add to Cart callback
    window.addToCart = function (productId) {
        // Safe check for product catalog visibility
        if (typeof PRODUCT_CATALOG === 'undefined') {
            console.error("PRODUCT_CATALOG is not loaded!");
            return;
        }
        const product = PRODUCT_CATALOG.find(p => p.id === productId);
        if (!product) return;

        // Check if item already exists in the cart
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                img: product.img,
                category: product.category,
                qty: 1
            });
        }

        // Save and refresh
        saveCartState();
        updateCartDisplay();

        // Slide open the drawer automatically to show responsive micro-action feedback
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    // Increments Item Quantity
    window.increaseQty = function (productId) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty += 1;
            saveCartState();
            updateCartDisplay();
        }
    };

    // Decrements Item Quantity
    window.decreaseQty = function (productId) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty -= 1;
            if (item.qty <= 0) {
                // Remove item completely if count hits zero
                cart = cart.filter(i => i.id !== productId);
            }
            saveCartState();
            updateCartDisplay();
        }
    };

    // Removes Item completely
    window.removeCartItem = function (productId) {
        cart = cart.filter(i => i.id !== productId);
        saveCartState();
        updateCartDisplay();
    };

    // Calculate Cart Subtotal
    function calculateCartSubtotal() {
        return cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    }

    // Save cart state
    function saveCartState() {
        localStorage.setItem('tscakes_cart', JSON.stringify(cart));
    }

    // Refresh dynamic Cart items, summary prices, and badges counts
    function updateCartDisplay() {
        const itemsContainer = document.getElementById('cart-drawer-items-list');
        const badgeCount = document.getElementById('cart-badge-count');
        const subtotalEl = document.getElementById('cart-subtotal');
        const discountRow = document.getElementById('cart-discount-row');
        const discountEl = document.getElementById('cart-discount');
        const totalEl = document.getElementById('cart-total-cost');

        if (!itemsContainer) return;

        // 1. Calculate counts
        const totalItemsCount = cart.reduce((acc, curr) => acc + curr.qty, 0);
        if (badgeCount) {
            badgeCount.textContent = totalItemsCount;
        }

        // 2. Render Cart Item Rows
        if (cart.length === 0) {
            itemsContainer.innerHTML = `
                <div class="cart-empty-message">
                    <span class="cart-empty-icon">🛒</span>
                    <p style="font-weight: 600; margin: 0; color: var(--brand-brown);">Your treats bag is empty</p>
                    <p style="font-size: 0.9rem; margin-top: 5px;">Add some sweet treats from our menu to begin!</p>
                </div>
            `;
        } else {
            itemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">R${item.price} each</p>
                    </div>
                    <div class="cart-item-qty-controls">
                        <button class="cart-qty-btn" onclick="decreaseQty('${item.id}')" type="button" aria-label="Decrease quantity">-</button>
                        <span class="cart-qty-value">${item.qty}</span>
                        <button class="cart-qty-btn" onclick="increaseQty('${item.id}')" type="button" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" type="button" aria-label="Remove item">
                        🗑️
                    </button>
                </div>
            `).join('');
        }

        // 3. Render Totals Summary math
        const subtotal = calculateCartSubtotal();
        subtotalEl.textContent = `R${subtotal.toFixed(2)}`;

        // Bulk 10% discount applies if total quantity of items >= 10
        let discountPct = 0;
        if (totalItemsCount >= 10) {
            discountPct = 0.10;
        }

        if (discountPct > 0) {
            const discountVal = subtotal * discountPct;
            discountEl.textContent = `-R${discountVal.toFixed(2)}`;
            discountRow.style.display = 'flex';
            totalEl.textContent = `R${(subtotal - discountVal).toFixed(2)}`;
        } else {
            discountRow.style.display = 'none';
            totalEl.textContent = `R${subtotal.toFixed(2)}`;
        }
    }
}
