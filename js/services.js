document.addEventListener('DOMContentLoaded', () => {
    // Init product search, filter, and sorting engine
    initProductEngine();

    // Init quick view modal specs
    initQuickViewModal();
});

// Manage search, category filtering, and sorting
function initProductEngine() {
    const dynamicContainer = document.getElementById('products-dynamic-container');
    if (!dynamicContainer) return; // Exit if container doesn't exist

    const searchInput = document.getElementById('product-search');
    const sortSelect = document.getElementById('product-sort');
    const tabs = document.querySelectorAll('.category-tab');

    let currentCategory = 'all';
    let searchQuery = '';
    let currentSort = 'featured';

    // Render initial catalog
    renderProducts();

    // Handle category selection tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            currentCategory = tab.getAttribute('data-category');
            renderProducts();
        });
    });

    // Handle search input queries
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderProducts();
        });
    }

    // Handle sorting selections
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    // Filter, sort, and render cards
    function renderProducts() {
        if (typeof PRODUCT_CATALOG === 'undefined') {
            console.error("PRODUCT_CATALOG array is not loaded!");
            return;
        }

        // Apply filters
        let processedProducts = PRODUCT_CATALOG.filter(p => {
            const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery) || p.desc.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        // Apply sorting
        if (currentSort === 'price-asc') {
            processedProducts.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            processedProducts.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'name-asc') {
            processedProducts.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Handle empty state
        if (processedProducts.length === 0) {
            dynamicContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <span style="font-size: 3.5rem; display: block; margin-bottom: 20px;">🍪</span>
                    <h3 style="font-size: 1.6rem; color: var(--brand-brown); margin-bottom: 10px;">No Matching Treats Found</h3>
                    <p style="font-size: 1.1rem; margin: 0;">Try typing another sweet keyword or adjusting your filter categories.</p>
                </div>
            `;
            return;
        }

        // Generate dynamic markup
        dynamicContainer.innerHTML = processedProducts.map((p, index) => `
            <article class="product-card" data-category="${p.category}" style="opacity: 0; transform: scale(0.94); transition: opacity 0.5s ease, transform 0.5s ease;">
                <img src="${p.img}" alt="${p.alt || p.title}" ${index > 2 ? 'loading="lazy"' : ''}>
                <div class="card-content">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <ul style="margin-bottom: 20px; font-size: 0.95rem;">
                        ${p.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                    <p><em>${p.priceText}</em></p>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button class="quick-view-btn" type="button" data-id="${p.id}" style="margin-top: 0; flex: 1;">✨ Specs</button>
                        <button class="cart-add-btn" type="button" data-id="${p.id}" style="background: var(--brand-pink-gradient); color: var(--brand-brown); border: none; font-family: inherit; font-weight: 700; font-size: 0.95rem; padding: 12px 20px; border-radius: var(--radius-pill); cursor: pointer; flex: 1.2; text-align: center; transition: var(--transition);">🛒 Add to Bag</button>
                    </div>
                </div>
            </article>
        `).join('');

        // Apply entrance fade-in transition
        const newCards = Array.from(dynamicContainer.querySelectorAll('.product-card'));
        requestAnimationFrame(() => {
            newCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 40); // Stagger cards reveal
            });
        });

        // Attach event listeners to card actions
        bindQuickViewButtons();
        bindAddToCartButtons();
    }
}

// Set up specs details modal
function initQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    const modalClose = modal.querySelector('.modal-close');

    if (modalClose) {
        modalClose.addEventListener('click', closeQuickView);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeQuickView();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeQuickView();
        }
    });

    function closeQuickView() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Bind specs modal triggers on product cards
function bindQuickViewButtons() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    const modalImg = document.getElementById('modal-product-img');
    const modalBadge = document.getElementById('modal-product-badge');
    const modalTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDesc = document.getElementById('modal-product-desc');
    const modalBullets = document.getElementById('modal-product-bullets');

    const triggerButtons = document.querySelectorAll('.quick-view-btn');

    triggerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.getAttribute('data-id');
            const product = PRODUCT_CATALOG.find(p => p.id === productId);

            if (!product) return;

            // Map category names to badge labels
            let badgeText = 'Signature Selection';
            if (product.category === 'cakes') badgeText = 'Premium Cakes';
            if (product.category === 'breads') badgeText = 'Artisanal Breads';
            if (product.category === 'pastries') badgeText = 'Morning Pastries';
            if (product.category === 'savory') badgeText = 'Gourmet Savory';

            // Populate modal fields
            modalImg.src = product.img;
            modalImg.alt = product.title;
            modalBadge.textContent = badgeText;
            modalTitle.textContent = product.title;
            modalPrice.textContent = product.priceText;
            modalDesc.textContent = product.desc;
            modalBullets.innerHTML = product.bullets.map(b => `<li>${b}</li>`).join('');

            // Open specs modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Bind add-to-bag triggers on cards
function bindAddToCartButtons() {
    const addButtons = document.querySelectorAll('.cart-add-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.getAttribute('data-id');
            if (typeof window.addToCart === 'function') {
                window.addToCart(productId);
            }
        });
    });
}
