

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Product Engine (Search, Filter, Sort) ---
    initProductEngine();

    // --- Initialize Quick View Modal Specs ---
    initQuickViewModal();
});

// Render product dynamic search, category filters, and sorting engine
function initProductEngine() {
    const dynamicContainer = document.getElementById('products-dynamic-container');
    if (!dynamicContainer) return; // Only execute on pages containing the dynamic list container

    const searchInput = document.getElementById('product-search');
    const sortSelect = document.getElementById('product-sort');
    const tabs = document.querySelectorAll('.category-tab');

    let currentCategory = 'all';
    let searchQuery = '';
    let currentSort = 'featured'; // default sort

    // Render initial product cards catalog
    renderProducts();

    // Bind Category Tab Clicks
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

    // Bind Search Input Clicks
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderProducts();
        });
    }

    // Bind Sorting Selection Choices
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    // Primary Logic Loop combining Dynamic Load, Filters, Search, and Sort algorithms
    function renderProducts() {
        if (typeof PRODUCT_CATALOG === 'undefined') {
            console.error("PRODUCT_CATALOG array is not loaded!");
            return;
        }

        // Step A: Apply dynamic filtering and query searches
        let processedProducts = PRODUCT_CATALOG.filter(p => {
            const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery) || p.desc.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        // Step B: Apply dynamic sorting specifications
        if (currentSort === 'price-asc') {
            processedProducts.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            processedProducts.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'name-asc') {
            processedProducts.sort((a, b) => a.title.localeCompare(b.title));
        }
        // If 'featured', maintains default schema declaration indices

        // Step C: Render HTML dynamic elements template
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

        // Programmatic string templating mapping catalog to dynamic DOM nodes
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

        // Step D: Trigger sequential premium hardware-accelerated entrance transitions
        const newCards = Array.from(dynamicContainer.querySelectorAll('.product-card'));
        requestAnimationFrame(() => {
            newCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 40); // 40ms stagger offset
            });
        });

        // Step E: Bind modal selectors to dynamic buttons
        bindQuickViewButtons();
        bindAddToCartButtons();
    }
}

// Initialize product Quick View details specs modal
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

// Bind details specs modal actions to product cards
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

            // Compute descriptive category badge
            let badgeText = 'Signature Selection';
            if (product.category === 'cakes') badgeText = 'Premium Cakes';
            if (product.category === 'breads') badgeText = 'Artisanal Breads';
            if (product.category === 'pastries') badgeText = 'Morning Pastries';
            if (product.category === 'savory') badgeText = 'Gourmet Savory';

            // Populate Modal Content directly from local script database
            modalImg.src = product.img;
            modalImg.alt = product.title;
            modalBadge.textContent = badgeText;
            modalTitle.textContent = product.title;
            modalPrice.textContent = product.priceText;
            modalDesc.textContent = product.desc;

            // Dynamic Bullet Injection
            modalBullets.innerHTML = product.bullets.map(b => `<li>${b}</li>`).join('');

            // Scale-up modal view
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Bind add to bag click actions to catalog cards
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
