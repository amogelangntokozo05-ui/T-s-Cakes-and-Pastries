/* =========================================================================
   T's Cakes and Pastries - Core Interaction Script
   Author: Antigravity
   Module: WEDE5020 Part 2.1 Rubric Enhancements
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Global Scroll-Driven Reveal Animations ---
    initScrollReveal();

    // --- 2. Interactive Store Location Maps (Leaflet.js) ---
    initStoreMaps();

    // --- 3. Image Gallery Lightbox Modal ---
    initGalleryLightbox();

    // --- 4. Product Category Filters & Live Search ---
    initProductFilters();

    // --- 5. Featured/Product Quick View Modal ---
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
    // Coordinate definitions for locations
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

    // Check if map containers exist on this page
    let mapsExist = false;
    for (const key in locations) {
        if (document.getElementById(locations[key].id)) {
            mapsExist = true;
            break;
        }
    }

    // Initialize Leaflet maps if map containers are present
    if (mapsExist && typeof L !== 'undefined') {
        for (const key in locations) {
            const loc = locations[key];
            const container = document.getElementById(loc.id);
            if (!container) continue;

            // Initialize map instance and turn off mouse scroll hijacking
            const map = L.map(loc.id, {
                scrollWheelZoom: false,
                dragging: !L.Browser.mobile, // Disable drag on mobile to improve scrolling
                tap: !L.Browser.mobile
            }).setView(loc.coords, 15);

            // Add clean OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            // Create beautiful customized popup content
            const popupContent = `
                <div style="font-family: 'Inter', sans-serif; padding: 5px; color: #2D251F;">
                    <h4 style="font-family: 'Outfit', sans-serif; font-weight: 700; color: #5C3A21; margin: 0 0 5px; font-size: 1.15rem;">${loc.title}</h4>
                    <p style="margin: 0 0 10px; font-size: 0.9rem; line-height: 1.4; color: #73675E;">${loc.address}</p>
                    <a href="tel:${loc.phone.replace(/\s+/g, '')}" style="color: #FFC0CB; font-weight: 700; font-size: 0.9rem; text-decoration: none; display: inline-block; background: #5C3A21; padding: 6px 14px; border-radius: 50px; transition: all 0.3s ease;">📞 Call Branch</a>
                </div>
            `;

            // Place marker with popup
            const marker = L.marker(loc.coords).addTo(map);
            marker.bindPopup(popupContent);
            
            // Auto open the popup on desktop screens for high fidelity look
            if (window.innerWidth > 900) {
                marker.openPopup();
            }
        }
    }
}

/**
 * 3. Image Gallery Lightbox Modal
 * Direct DOM manipulation to display interactive overlay with navigation controls
 */
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryContainer = document.getElementById('stacked-gallery');

    if (!lightbox || !galleryContainer) return;

    // Collect all gallery articles containing images
    const articles = Array.from(galleryContainer.querySelectorAll('article'));
    const imagesData = [];
    let currentIndex = 0;

    // Parse image assets and captions directly from the DOM structure
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

            // Bind click handler to open the lightbox
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        }
    });

    // Lightbox Control Elements
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Event Bindings
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    // Close when clicking empty black backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    // Keyboard bindings for high fidelity browsing
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Open lightbox function
    function openLightbox(index) {
        currentIndex = index;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Stop page scrolling
        updateLightboxContent();
    }

    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Restore page scrolling
    }

    // Cycle transitions
    function updateLightboxContent() {
        const data = imagesData[currentIndex];
        if (!data) return;

        // Apply scale transition logic
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            lightboxImg.src = data.src;
            lightboxImg.alt = data.alt;
            
            // Build modern text layout inside modal
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
 * 4. Product Category Filters & Live Search
 * Dynamic product catalog filtering using advanced DOM Manipulation and CSS transitions
 */
function initProductFilters() {
    const searchInput = document.getElementById('product-search');
    const tabs = document.querySelectorAll('.category-tab');
    const productGrid = document.getElementById('products');

    if (!productGrid) return;

    const cards = Array.from(productGrid.querySelectorAll('.product-card'));
    let currentCategory = 'all';
    let searchQuery = '';

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
            filterProducts();
        });
    });

    // Bind Search Input Checks
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProducts();
        });
    }

    // Core Filtering logic with multi-stage CSS Transitions
    function filterProducts() {
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category');

            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
            const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                // If it was hidden, show it in the DOM first, then slide/fade in
                if (card.classList.contains('hidden')) {
                    card.classList.remove('hidden');
                    card.setAttribute('aria-hidden', 'false');
                    // Force a layout reflow before removing fade-out for animation to trigger
                    void card.offsetWidth; 
                }
                card.classList.remove('fade-out');
            } else {
                // Fade and scale down first
                card.classList.add('fade-out');
                card.setAttribute('aria-hidden', 'true');
                
                // Hide completely from layout after animation transitions finish (500ms)
                setTimeout(() => {
                    if (card.classList.contains('fade-out')) {
                        card.classList.add('hidden');
                    }
                }, 500);
            }
        });
    }
}

/**
 * 5. Featured/Product Quick View Modal
 * Pulls attributes directly from clicked card and populates interactive modal overlay
 */
function initQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    const modalClose = modal.querySelector('.modal-close');
    const modalImg = document.getElementById('modal-product-img');
    const modalBadge = document.getElementById('modal-product-badge');
    const modalTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDesc = document.getElementById('modal-product-desc');
    const modalBullets = document.getElementById('modal-product-bullets');

    // Bind Quick View Buttons dynamically across all product cards
    const productGrid = document.getElementById('products');
    const cards = productGrid ? productGrid.querySelectorAll('.product-card') : [];

    cards.forEach(card => {
        // Create Quick View Button programmatically if it doesn't exist
        if (!card.querySelector('.quick-view-btn')) {
            const contentDiv = card.querySelector('.card-content');
            if (contentDiv) {
                const btn = document.createElement('button');
                btn.className = 'quick-view-btn';
                btn.type = 'button';
                btn.textContent = '✨ Quick View Specs';
                
                // Position button nicely inside layout
                const priceElement = contentDiv.querySelector('p em') || contentDiv.lastElementChild;
                if (priceElement) {
                    contentDiv.insertBefore(btn, priceElement.nextSibling);
                } else {
                    contentDiv.appendChild(btn);
                }
            }
        }

        // Click handler logic
        const qvBtn = card.querySelector('.quick-view-btn');
        if (qvBtn) {
            qvBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const title = card.querySelector('h3').textContent;
                const img = card.querySelector('img').src;
                const priceElement = card.querySelector('p em');
                const price = priceElement ? priceElement.textContent : 'Custom Price';
                const desc = card.querySelector('p').textContent;
                
                // Pull bullet points
                const bullets = Array.from(card.querySelectorAll('ul li')).map(li => li.textContent);
                
                // Determine Category Badge text
                const catCode = card.getAttribute('data-category') || 'bakery';
                let badgeText = 'Signature Selection';
                if (catCode === 'cakes') badgeText = 'Premium Cakes';
                if (catCode === 'breads') badgeText = 'Artisanal Breads';
                if (catCode === 'pastries') badgeText = 'Morning Pastries';
                if (catCode === 'savory') badgeText = 'Gourmet Savory';

                // Populate modal
                modalImg.src = img;
                modalImg.alt = title;
                modalBadge.textContent = badgeText;
                modalTitle.textContent = title;
                modalPrice.textContent = price;
                modalDesc.textContent = desc;

                // Load bullet items nicely
                modalBullets.innerHTML = '';
                bullets.forEach(bullet => {
                    const li = document.createElement('li');
                    li.textContent = bullet;
                    modalBullets.appendChild(li);
                });

                // Display modal with scale/fade animations
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Close bindings
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

            // Collapse other open panels for clean editorial accordion behaviour
            const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
            siblingItems.forEach(sib => {
                if (sib !== item) {
                    sib.classList.remove('active');
                    sib.querySelector('.accordion-panel').style.maxHeight = null;
                }
            });

            // Toggle active state on current item
            if (!isActive) {
                item.classList.add('active');
                // Calculate precise scrollHeight and set it on max-height style rules
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
    // 7.1. Conditional Delivery Fieldset
    const fulfillmentRadios = document.getElementsByName('fulfillment');
    const orderForm = document.querySelector('form');
    
    if (fulfillmentRadios.length > 0 && orderForm) {
        // Create delivery details block programmatically in DOM if missing
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

            // Insert before the last message box
            const messageBox = orderForm.querySelector('textarea').closest('div').parentElement;
            if (messageBox) {
                orderForm.insertBefore(deliveryBlock, messageBox);
            }
        }

        // Change listener
        const toggleDelivery = () => {
            const deliverySelected = document.getElementById('delivery').checked;
            const addressInput = document.getElementById('deliveryAddr');
            const contactInput = document.getElementById('deliveryContact');

            if (deliverySelected) {
                deliveryBlock.classList.add('show');
                // Set requirements
                if (addressInput) addressInput.setAttribute('required', 'required');
                if (contactInput) contactInput.setAttribute('required', 'required');
            } else {
                deliveryBlock.classList.remove('show');
                // Remove requirements
                if (addressInput) addressInput.removeAttribute('required');
                if (contactInput) contactInput.removeAttribute('required');
            }
        };

        fulfillmentRadios.forEach(radio => radio.addEventListener('change', toggleDelivery));
        toggleDelivery(); // run once on start
    }

    // 7.2. Conditional Custom Order helper
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
            // Insert after Personal Info
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

    // 7.3. Character Counters on Textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        // Create counter element programmatically
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

    // 7.4. Real-time Visual Field Validation
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
