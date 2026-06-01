/* =========================================================================
   T's Cakes and Pastries - Core Interaction Script
   Author: Antigravity
   Module: WEDE5020 Part 2.1 & 2.2 Rubric Enhancements
   ========================================================================= */

// --- Centralized Product Database (Part 2.2 Dynamic Content) ---
const PRODUCT_CATALOG = [
    {
        id: "cake-signature",
        title: "Signature Cakes",
        price: 450,
        priceText: "Prices start from R450",
        desc: "We craft custom-designed cakes for all occasions. Our master bakers specialize in multi-tiered wedding cakes, novelty birthday designs, and elegant corporate centerpieces.",
        category: "cakes",
        img: "Images/Cake114.jpg",
        alt: "Custom designed tiered wedding and birthday celebration cakes with pink icing by T's Cakes Sandton",
        bullets: [
            "Classic Vanilla Sponge & Chocolate Truffle",
            "Red Velvet with Cream Cheese Frosting",
            "Vegan & Gluten-Free options available"
        ]
    },
    {
        id: "breads-scones",
        title: "Baked Loaves & Scones",
        price: 45,
        priceText: "Prices start from R45 / batch",
        desc: "Freshly baked bread with a crispy crust and soft center. Our scones are a local community legend, baked fresh every two hours so they are always served warm.",
        category: "breads",
        img: "Images/Scones668.jpg",
        alt: "Golden brown traditional buttermilk scones served fresh with fruit jam at T's Cakes Rosebank",
        bullets: [
            "Traditional Buttermilk Scones",
            "Cheese & Chive Savory Scones",
            "Artisanal Sourdough Loaves"
        ]
    },
    {
        id: "pastries-premium",
        title: "Premium Pastries",
        price: 25,
        priceText: "Prices start from R25 / pastry",
        desc: "From flaky croissants to sweet Danishes, our pastries are rolled and folded completely by hand using imported European butter for that signature, golden crispness.",
        category: "pastries",
        img: "Images/pastries1102.jpg",
        alt: "Golden hand-rolled buttery danish pastries and croissants in display tray at T's Cakes and Pastries",
        bullets: [
            "Hand-folded Butter Croissants",
            "Fruit & Custard Danishes",
            "Sticky Pecan Nut Buns"
        ]
    },
    {
        id: "muffins-gourmet",
        title: "Gourmet Muffins",
        price: 20,
        priceText: "Prices start from R20 / muffin",
        desc: "Gourmet muffins in multiple flavors baked fresh daily. Packed with real fruit, premium chocolate chunks, and locally sourced nuts, these are perfect for students and early-morning workers.",
        category: "pastries",
        img: "Images/muffins25.jpg",
        alt: "Premium blueberry and double chocolate fudge gourmet muffins baked fresh daily at Sandton kitchen",
        bullets: [
            "Double Chocolate Fudge",
            "Blueberry & Lemon Zest",
            "Bran, Apple & Cinnamon (Healthy Option)"
        ]
    },
    {
        id: "cupcakes-specialty",
        title: "Specialty Cupcakes",
        price: 35,
        priceText: "Prices start from R35 / cupcake",
        desc: "Bite-sized perfection. Our specialty cupcakes are baked using the same premium ingredients as our signature cakes, topped with a velvety smooth mountain of Swiss meringue buttercream. A delightful alternative to a large cake.",
        category: "cakes",
        img: "Images/Cake3.jpg",
        alt: "Decadent carrot and strawberry cream cupcakes piped with Swiss meringue frosting at Pretoria Menlyn",
        bullets: [
            "Salted Caramel & Pretzel Crunch",
            "Classic Carrot Cake with Walnuts",
            "Strawberry & Real Champagne Info"
        ]
    },
    {
        id: "savory-pies",
        title: "Savory Pies & Quiches",
        price: 55,
        priceText: "Prices start from R55 / pie",
        desc: "Not everything we bake is sweet! We offer a massive range of deeply satisfying savory pies encased in our signature flaky, buttery crust. Perfect for a quick, warm lunch or explicitly catering a daytime corporate event.",
        category: "savory",
        img: "Images/pastries63.jpg",
        alt: "Golden baked chicken and mushroom and steak savory pies fresh out of the oven at T's Cakes",
        bullets: [
            "Classic Pepper Steak Pie",
            "Spinach and Feta Deep Quiche",
            "Chicken & Mushroom Traditional Bake"
        ]
    },
    {
        id: "cookies-frosted",
        title: "Custom Frosted Cookies",
        price: 18,
        priceText: "Prices start from R18 / cookie",
        desc: "Melt-in-your-mouth shortbread and butter cookies that can be professionally air-brushed and iced to exactly match any party theme or corporate logo. These are extremely popular as individually wrapped wedding favors.",
        category: "cakes",
        img: "Images/Cake002.jpg",
        alt: "Intricately frosted shortbread cookies air-brushed with royal icing for celebration party favors",
        bullets: [
            "Rich Vanilla Bean Sugar Cookies",
            "Double Chunk Macadamia Nut",
            "Custom Royal Icing Designs"
        ]
    },
    {
        id: "trays-breakfast",
        title: "Catering Breakfast Trays",
        price: 350,
        priceText: "Prices start from R350 / tray",
        desc: "Take the hassle completely out of morning arrangements. We manually build massive, beautifully arranged breakfast trays featuring a mixed assortment of our absolute best miniature baked goods, ready to serve instantly.",
        category: "savory",
        img: "Images/muffins69877.jpg",
        alt: "Huge morning catering platter of miniature butter croissants, Danishes, and fresh berry muffins",
        bullets: [
            "Miniature Croissant & Fresh Jam Board",
            "Assorted Fruit Danish Platter",
            "Mixed Muffins & Coffee Thermos Bundle"
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Scroll-Driven Reveal Animations ---
    initScrollReveal();

    // --- 2. Interactive Store Location Maps (Leaflet.js) ---
    initStoreMaps();

    // --- 3. Image Gallery Lightbox Modal ---
    initGalleryLightbox();

    // --- 4. Dynamic Content Rendering, Search & Sorting Engine ---
    initProductEngine();

    // --- 5. Specialty Modal setup ---
    initQuickViewModal();

    // --- 6. FAQ Accordion System ---
    initFAQAccordion();

    // --- 7. Conditional Form Fieldsets & Visual Validation ---
    initFormInteractions();
});

/**
 * 1. Global Scroll-Driven Reveal Animations
 * Uses IntersectionObserver to trigger smooth fade-up entry animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before crossing
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

/**
 * 2. Interactive Store Location Maps (Leaflet.js)
 * Replaces static iFrames with live Leaflet coordinates, markers, and popups
 */
function initStoreMaps() {
    const locations = {
        sandton: {
            id: 'map-sandton',
            coords: [-26.1075, 28.0543],
            title: 'Sandton Flagship',
            address: '42 Nelson Mandela Square, Sandton, 2196',
            phone: '011 555 3210'
        },
        rosebank: {
            id: 'map-rosebank',
            coords: [-26.1458, 28.0416],
            title: 'Rosebank Branch',
            address: '14 Jellicoe Avenue, Rosebank, 2196',
            phone: '011 555 3210'
        },
        menlyn: {
            id: 'map-menlyn',
            coords: [-25.7824, 28.2764],
            title: 'Menlyn Pretoria',
            address: 'Shop 45, Menlyn Maine, Pretoria, 0081',
            phone: '011 555 3210'
        }
    };

    let mapsExist = false;
    for (const key in locations) {
        if (document.getElementById(locations[key].id)) {
            mapsExist = true;
            break;
        }
    }

    if (mapsExist && typeof L !== 'undefined') {
        for (const key in locations) {
            const loc = locations[key];
            const container = document.getElementById(loc.id);
            if (!container) continue;

            const map = L.map(loc.id, {
                scrollWheelZoom: false,
                dragging: !L.Browser.mobile,
                tap: !L.Browser.mobile
            }).setView(loc.coords, 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            const popupContent = `
                <div style="font-family: 'Inter', sans-serif; padding: 5px; color: #2D251F;">
                    <h4 style="font-family: 'Outfit', sans-serif; font-weight: 700; color: #5C3A21; margin: 0 0 5px; font-size: 1.15rem;">${loc.title}</h4>
                    <p style="margin: 0 0 10px; font-size: 0.9rem; line-height: 1.4; color: #73675E;">${loc.address}</p>
                    <a href="tel:${loc.phone.replace(/\s+/g, '')}" style="color: #FFC0CB; font-weight: 700; font-size: 0.9rem; text-decoration: none; display: inline-block; background: #5C3A21; padding: 6px 14px; border-radius: 50px; transition: all 0.3s ease;">📞 Call Branch</a>
                </div>
            `;

            const marker = L.marker(loc.coords).addTo(map);
            marker.bindPopup(popupContent);
            
            if (window.innerWidth > 900) {
                marker.openPopup();
            }
        }
    }
}

/**
 * 3. Image Gallery Lightbox Modal
 */
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryContainer = document.getElementById('stacked-gallery');

    if (!lightbox || !galleryContainer) return;

    const articles = Array.from(galleryContainer.querySelectorAll('article'));
    const imagesData = [];
    let currentIndex = 0;

    articles.forEach((article, index) => {
        const img = article.querySelector('img');
        const summary = article.querySelector('summary');
        const detailsH3 = article.querySelector('.details-content h3');
        const detailsP = article.querySelector('.details-content p');

        if (img) {
            imagesData.push({
                src: img.src,
                alt: img.alt || 'Ts Cakes and Pastries creation',
                title: summary ? summary.textContent.trim() : (detailsH3 ? detailsH3.textContent.trim() : 'Ts Cakes Creation'),
                desc: detailsP ? detailsP.textContent.trim() : ''
            });

            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        }
    });

    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    function openLightbox(index) {
        currentIndex = index;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
        updateLightboxContent();
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const data = imagesData[currentIndex];
        if (!data) return;

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            lightboxImg.src = data.src;
            lightboxImg.alt = data.alt;
            lightboxCaption.innerHTML = `
                <h3>${data.title}</h3>
                ${data.desc ? `<p>${data.desc}</p>` : ''}
            `;
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 150);
    }

    function showPrevImage(e) {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
        updateLightboxContent();
    }

    function showNextImage(e) {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex + 1) % imagesData.length;
        updateLightboxContent();
    }
}

/**
 * 4. Dynamic Content Rendering, Search & Sorting Engine
 * Incorporates dynamic loading (2.2), filters, real-time query matching, and price/alphabetic sorting.
 */
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
                    <button class="quick-view-btn" type="button" data-id="${p.id}">✨ Quick View Specs</button>
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
    }
}

/**
 * 5. Specialty Modal setup
 * Binds dynamically created Quick View trigger buttons directly to database entries
 */
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

/**
 * Helper to bind buttons dynamically generated on catalog sorting updates
 */
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

/**
 * 6. FAQ Accordion System
 * Smooth slide up/down animation based on ScrollHeight computations
 */
function initFAQAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const panel = header.nextElementSibling;
            const isActive = item.classList.contains('active');

            const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
            siblingItems.forEach(sib => {
                if (sib !== item) {
                    sib.classList.remove('active');
                    sib.querySelector('.accordion-panel').style.maxHeight = null;
                }
            });

            if (!isActive) {
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                panel.style.maxHeight = null;
            }
        });
    });
}

/**
 * 7. Conditional Form Fieldsets & Visual Validation
 * Dynamically slides open relevant form subsections based on selection parameters
 */
function initFormInteractions() {
    const fulfillmentRadios = document.getElementsByName('fulfillment');
    const orderForm = document.querySelector('form');
    
    if (fulfillmentRadios.length > 0 && orderForm) {
        let deliveryBlock = document.getElementById('delivery-details-fieldset');
        if (!deliveryBlock) {
            deliveryBlock = document.createElement('fieldset');
            deliveryBlock.id = 'delivery-details-fieldset';
            deliveryBlock.className = 'conditional-fieldset';
            deliveryBlock.innerHTML = `
                <legend style="font-size: 1.5rem; color: var(--brand-brown); font-weight: 700; margin-bottom: 20px; padding: 0 10px;">📦 Local Delivery Details</legend>
                <div>
                    <label for="deliveryAddr" style="font-weight: 600; color: var(--brand-brown); display: block; margin-bottom: 8px;">Physical Address <span style="color:red;">*</span></label>
                    <input type="text" id="deliveryAddr" name="deliveryAddr" placeholder="Street Address, Suburb, City, Postal Code">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label for="deliveryTime" style="font-weight: 600; color: var(--brand-brown); display: block; margin-bottom: 8px;">Preferred Time <span style="color:red;">*</span></label>
                        <select id="deliveryTime" name="deliveryTime">
                            <option value="morning">Morning (08:00 AM - 11:30 AM)</option>
                            <option value="midday">Midday (11:30 AM - 14:30 PM)</option>
                            <option value="afternoon">Afternoon (14:30 PM - 17:00 PM)</option>
                        </select>
                    </div>
                    <div>
                        <label for="deliveryContact" style="font-weight: 600; color: var(--brand-brown); display: block; margin-bottom: 8px;">Delivery Contact Phone <span style="color:red;">*</span></label>
                        <input type="tel" id="deliveryContact" name="deliveryContact" placeholder="e.g. 072 432 9811">
                    </div>
                </div>
            `;

            const messageBox = orderForm.querySelector('textarea').closest('div').parentElement;
            if (messageBox) {
                orderForm.insertBefore(deliveryBlock, messageBox);
            }
        }

        const toggleDelivery = () => {
            const deliverySelected = document.getElementById('delivery').checked;
            const addressInput = document.getElementById('deliveryAddr');
            const contactInput = document.getElementById('deliveryContact');

            if (deliverySelected) {
                deliveryBlock.classList.add('show');
                if (addressInput) addressInput.setAttribute('required', 'required');
                if (contactInput) contactInput.setAttribute('required', 'required');
            } else {
                deliveryBlock.classList.remove('show');
                if (addressInput) addressInput.removeAttribute('required');
                if (contactInput) contactInput.removeAttribute('required');
            }
        };

        fulfillmentRadios.forEach(radio => radio.addEventListener('change', toggleDelivery));
        toggleDelivery();
    }

    const categorySelect = document.getElementById('productChoice');
    if (categorySelect && orderForm) {
        let customBlock = document.getElementById('custom-order-fieldset');
        if (!customBlock) {
            customBlock = document.createElement('fieldset');
            customBlock.id = 'custom-order-fieldset';
            customBlock.className = 'conditional-fieldset';
            customBlock.innerHTML = `
                <legend style="font-size: 1.5rem; color: var(--brand-brown); font-weight: 700; margin-bottom: 20px; padding: 0 10px;">🎨 Custom Order Assistant</legend>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                        <label for="cakeLayers" style="font-weight: 600; color: var(--brand-brown); display: block; margin-bottom: 8px;">Cake Layers</label>
                        <select id="cakeLayers" name="cakeLayers">
                            <option value="1">Single Tier (Standard)</option>
                            <option value="2">2-Tier Showpiece</option>
                            <option value="3">3-Tier Wedding Grandeur</option>
                        </select>
                    </div>
                    <div>
                        <label for="cakeShape" style="font-weight: 600; color: var(--brand-brown); display: block; margin-bottom: 8px;">Cake Shape</label>
                        <select id="cakeShape" name="cakeShape">
                            <option value="round">Classic Round</option>
                            <option value="square">Modern Square</option>
                            <option value="heart">Romantic Heart</option>
                            <option value="novelty">Sculpted Novelty</option>
                        </select>
                    </div>
                </div>
            `;
            const fieldsets = orderForm.querySelectorAll('fieldset');
            if (fieldsets.length > 0) {
                orderForm.insertBefore(customBlock, fieldsets[1].nextSibling);
            }
        }

        const toggleCustomOptions = () => {
            if (categorySelect.value === 'custom' || categorySelect.value === 'cakes') {
                customBlock.classList.add('show');
            } else {
                customBlock.classList.remove('show');
            }
        };

        categorySelect.addEventListener('change', toggleCustomOptions);
        toggleCustomOptions();
    }

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLen = 500;
        textarea.setAttribute('maxlength', maxLen);

        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0 / ${maxLen} characters`;
        textarea.parentNode.insertBefore(counter, textarea.nextSibling);

        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            counter.textContent = `${count} / ${maxLen} characters`;
            if (count >= maxLen - 20) {
                counter.style.color = '#c62828';
            } else {
                counter.style.color = '';
            }
        });
    });

    const nameInput = document.getElementById('fullName') || document.getElementById('contactName');
    const phoneInput = document.getElementById('phoneNum') || document.getElementById('deliveryContact');
    const emailInput = document.getElementById('emailAddr') || document.getElementById('contactEmail');

    if (nameInput) {
        nameInput.addEventListener('input', () => {
            const val = nameInput.value.trim();
            if (val.length >= 3 && /^[A-Za-z\s]+$/.test(val)) {
                setFieldValid(nameInput);
            } else {
                setFieldInvalid(nameInput);
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            const val = phoneInput.value.replace(/\s+/g, '');
            if (/^\d{10}$/.test(val)) {
                setFieldValid(phoneInput);
            } else {
                setFieldInvalid(phoneInput);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const val = emailInput.value.trim();
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                setFieldValid(emailInput);
            } else {
                setFieldInvalid(emailInput);
            }
        });
    }

    function setFieldValid(input) {
        input.classList.remove('field-invalid');
        input.classList.add('field-valid');
    }

    function setFieldInvalid(input) {
        if (input.value.trim() === '') {
            input.classList.remove('field-invalid');
            input.classList.remove('field-valid');
            return;
        }
        input.classList.remove('field-valid');
        input.classList.add('field-invalid');
    }
}
