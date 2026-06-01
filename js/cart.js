document.addEventListener('DOMContentLoaded', () => {
    // Init shopping bag
    initShoppingCart();
});

// Manage shopping cart bag and enquiry form synchronization
function initShoppingCart() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartSidebar = document.getElementById('cart-drawer-sidebar');
    const cartCloseBtn = document.getElementById('cart-drawer-close-btn');
    const cartOverlay = document.getElementById('cart-overlay-bg');
    const checkoutTrigger = document.getElementById('cart-checkout-trigger');

    // Pre-fill enquiry form from checkout bag payload if exists
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        const checkoutData = localStorage.getItem('tscakes_cart_checkout');
        if (checkoutData) {
            try {
                const data = JSON.parse(checkoutData);
                const productChoiceSelect = document.getElementById('productChoice');
                const quantityInput = document.getElementById('quantity');
                const messageTextarea = document.getElementById('enquiryMessage');

                if (productChoiceSelect && data.dominantCategory) {
                    productChoiceSelect.value = data.dominantCategory;
                    productChoiceSelect.dispatchEvent(new Event('change')); // Trigger options updates
                }

                if (quantityInput && data.totalQty) {
                    quantityInput.value = data.totalQty;
                }

                if (messageTextarea && data.summary) {
                    messageTextarea.value = data.summary;
                    messageTextarea.dispatchEvent(new Event('input')); // Trigger char counts updates
                }

                enquiryForm.scrollIntoView({ behavior: 'smooth' });
                localStorage.removeItem('tscakes_cart_checkout'); // Consume data
            } catch (err) {
                console.error("Error parsing pre-fill checkout data: ", err);
            }
        }
    }

    if (!cartToggleBtn || !cartSidebar || !cartCloseBtn || !cartOverlay) return;

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

    updateCartDisplay();

    // Toggle shopping drawer open
    cartToggleBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Close shopping drawer
    const closeCartDrawer = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = '';
    };

    cartCloseBtn.addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', closeCartDrawer);

    // Empty entire bag list
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

    // Export bag items to enquiry form pre-filler
    checkoutTrigger.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your sweet treats bag is empty! Please add some pastries first.");
            return;
        }

        let summaryText = "Hi T's Cakes! I am interested in placing an order for the following items from my shopping bag:\n\n";
        let totalItemsCount = 0;
        let dominantCategory = "cakes";

        cart.forEach(item => {
            summaryText += `- ${item.qty}x ${item.title} (R${item.price} each)\n`;
            totalItemsCount += item.qty;
            if (item.category) dominantCategory = item.category;
        });

        summaryText += `\nEstimated Cart Subtotal: R${calculateCartSubtotal().toFixed(2)}\n`;
        summaryText += "Please let me know about baking availability, delivery slots, and booking confirmation details!";

        const checkoutPayload = {
            dominantCategory: dominantCategory,
            totalQty: totalItemsCount,
            summary: summaryText
        };

        localStorage.setItem('tscakes_cart_checkout', JSON.stringify(checkoutPayload));
        closeCartDrawer();
        window.location.href = 'enquiry.html';
    });

    // Add item to bag list
    window.addToCart = function (productId) {
        if (typeof PRODUCT_CATALOG === 'undefined') {
            console.error("PRODUCT_CATALOG is not loaded!");
            return;
        }
        const product = PRODUCT_CATALOG.find(p => p.id === productId);
        if (!product) return;

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

        saveCartState();
        updateCartDisplay();

        // Reveal drawer instantly
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    // Increase item quantity
    window.increaseQty = function (productId) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty += 1;
            saveCartState();
            updateCartDisplay();
        }
    };

    // Decrease item quantity
    window.decreaseQty = function (productId) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty -= 1;
            if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
            saveCartState();
            updateCartDisplay();
        }
    };

    // Remove item completely
    window.removeCartItem = function (productId) {
        cart = cart.filter(i => i.id !== productId);
        saveCartState();
        updateCartDisplay();
    };

    function calculateCartSubtotal() {
        return cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    }

    function saveCartState() {
        localStorage.setItem('tscakes_cart', JSON.stringify(cart));
    }

    // Refresh dynamic list and totals summary calculations
    function updateCartDisplay() {
        const itemsContainer = document.getElementById('cart-drawer-items-list');
        const badgeCount = document.getElementById('cart-badge-count');
        const subtotalEl = document.getElementById('cart-subtotal');
        const discountRow = document.getElementById('cart-discount-row');
        const discountEl = document.getElementById('cart-discount');
        const totalEl = document.getElementById('cart-total-cost');

        if (!itemsContainer) return;

        const totalItemsCount = cart.reduce((acc, curr) => acc + curr.qty, 0);
        if (badgeCount) {
            badgeCount.textContent = totalItemsCount;
        }

        // Render bag rows
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

        // Apply bulk discount (10% off for 10+ items)
        const subtotal = calculateCartSubtotal();
        subtotalEl.textContent = `R${subtotal.toFixed(2)}`;

        let discountPct = totalItemsCount >= 10 ? 0.10 : 0;

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
