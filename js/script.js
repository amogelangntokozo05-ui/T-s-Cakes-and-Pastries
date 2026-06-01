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
        img: "images/Cake114.jpg",
        alt: "Custom designed tiered wedding and birthday celebration cakes with pink icing by T's Cakes Sandton",
        bullets: [
            "Classic Vanilla Sponge & Chocolate Truffle",
            "Red Velvet with Cream Cheese Frosting",
            "Vegan & Gluten-Free options available"
        ]
    },
    {
        id: "cake-belgian",
        title: "Belgian Chocolate Ganache",
        price: 480,
        priceText: "Prices start from R480",
        desc: "Indulge in pure chocolate bliss. This premium cake features three layers of rich chocolate sponge filled with luxurious Belgian truffle ganache and glazed to absolute perfection.",
        category: "cakes",
        img: "images/Cake7.jpg",
        alt: "Rich dark Belgian chocolate ganache custom celebration cake by T's Cakes",
        bullets: [
            "70% Dark Imported Belgian Cocoa",
            "Silky chocolate truffle icing",
            "Topped with handmade chocolate curls"
        ]
    },
    {
        id: "cake-redvelvet",
        title: "Red Velvet Grandeur",
        price: 460,
        priceText: "Prices start from R460",
        desc: "A classic red velvet cake, meticulously baked to be incredibly moist and light. Frosted with our signature sweet cream cheese icing and decorated with golden crumbs.",
        category: "cakes",
        img: "images/Cake887.jpg",
        alt: "Gourmet red velvet custom birthday cake with cream cheese frosting",
        bullets: [
            "Moist crimson cocoa layers",
            "Whipped cream cheese frosting",
            "Perfect for birthdays and romantic events"
        ]
    },
    {
        id: "breads-scones",
        title: "Baked Loaves & Scones",
        price: 45,
        priceText: "Prices start from R45 / batch",
        desc: "Freshly baked bread with a crispy crust and soft center. Our scones are a local community legend, baked fresh every two hours so they are always served warm.",
        category: "breads",
        img: "images/Scones668.jpg",
        alt: "Golden brown traditional buttermilk scones served fresh with fruit jam at T's Cakes Rosebank",
        bullets: [
            "Traditional Buttermilk Scones",
            "Cheese & Chive Savory Scones",
            "Artisanal Sourdough Loaves"
        ]
    },
    {
        id: "breads-sconepack",
        title: "Artisanal Scones Pack",
        price: 90,
        priceText: "Prices start from R90 / pack of 6",
        desc: "Our legendary buttermilk scones, freshly baked in-store. This pack of six golden rounds is perfect for high tea, morning meetings, or a cozy Sunday brunch.",
        category: "breads",
        img: "images/Scones665.jpg",
        alt: "Freshly baked buttermilk scones served on a wooden board with jam",
        bullets: [
            "Extremely light and buttery centers",
            "Includes individual strawberry jams",
            "Served warm in custom bakery boxes"
        ]
    },
    {
        id: "breads-sourdough",
        title: "Farmhouse Sourdough",
        price: 50,
        priceText: "Prices start from R50 / loaf",
        desc: "Classic country farmhouse sourdough bread, slowly fermented and stone-baked daily. Incredible when sliced thick, toasted, and spread with farm butter.",
        category: "breads",
        img: "images/Scones458.jpg",
        alt: "Artisanal country sourdough loaf with a crispy rustic crust",
        bullets: [
            "36-hour slow fermentation",
            "Crunchy rustic caramelized crust",
            "100% natural wild yeast culture"
        ]
    },
    {
        id: "pastries-premium",
        title: "Premium Pastries",
        price: 25,
        priceText: "Prices start from R25 / pastry",
        desc: "From flaky croissants to sweet Danishes, our pastries are rolled and folded completely by hand using imported European butter for that signature, golden crispness.",
        category: "pastries",
        img: "images/pastries1102.jpg",
        alt: "Golden hand-rolled buttery danish pastries and croissants in display tray at T's Cakes and Pastries",
        bullets: [
            "Hand-folded Butter Croissants",
            "Fruit & Custard Danishes",
            "Sticky Pecan Nut Buns"
        ]
    },
    {
        id: "pastries-strawberry",
        title: "Strawberry Danish Crown",
        price: 30,
        priceText: "Prices start from R30 / pastry",
        desc: "A crown-shaped flaky pastry baked with premium butter, centered with a delicious local strawberry compote and sweet vanilla baking custard.",
        category: "pastries",
        img: "images/pastries114.jpg",
        alt: "Fresh strawberry and custard flaky Danish pastry crown",
        bullets: [
            "Imported puff pastry dough layers",
            "Real wild strawberry compote",
            "Lightly dusted with powdered sugar"
        ]
    },
    {
        id: "pastries-pecanroll",
        title: "Pecan Cinnamon Roll",
        price: 28,
        priceText: "Prices start from R28 / pastry",
        desc: "Hand-rolled yeasted sweet dough filled with high-grade cinnamon and brown sugar, baked golden, and drizzled with a decadent cream glaze and fresh pecans.",
        category: "pastries",
        img: "images/pastries55.jpg",
        alt: "Gourmet cinnamon rolls topped with sweet glaze and pecan nuts",
        bullets: [
            "Warm sweet Saigon cinnamon filling",
            "Crisp toasted caramelized pecans",
            "Double-glazed with cream cheese icing"
        ]
    },
    {
        id: "muffins-gourmet",
        title: "Gourmet Muffins",
        price: 20,
        priceText: "Prices start from R20 / muffin",
        desc: "Gourmet muffins in multiple flavors baked fresh daily. Packed with real fruit, premium chocolate chunks, and locally sourced nuts, these are perfect for students and early-morning workers.",
        category: "pastries",
        img: "images/muffins25.jpg",
        alt: "Premium blueberry and double chocolate fudge gourmet muffins baked fresh daily at Sandton kitchen",
        bullets: [
            "Double Chocolate Fudge",
            "Blueberry & Lemon Zest",
            "Bran, Apple & Cinnamon (Healthy Option)"
        ]
    },
    {
        id: "muffins-box",
        title: "Early Morning Muffin Box",
        price: 120,
        priceText: "Prices start from R120 / box of 6",
        desc: "Get a mixed box of our freshly baked gourmet muffins. Includes double chocolate, wild blueberry, and apple-bran options to delight everyone.",
        category: "pastries",
        img: "images/muffins2210.jpg",
        alt: "Freshly baked assortment of six muffins in a presentation box",
        bullets: [
            "Warm and fresh out of the ovens at 5 AM",
            "Excellent morning team meeting sharing pack",
            "Includes double chocolate and berry options"
        ]
    },
    {
        id: "cupcakes-specialty",
        title: "Specialty Cupcakes",
        price: 35,
        priceText: "Prices start from R35 / cupcake",
        desc: "Bite-sized perfection. Our specialty cupcakes are baked using the same premium ingredients as our signature cakes, topped with a velvety smooth mountain of Swiss meringue buttercream. A delightful alternative to a large cake.",
        category: "cakes",
        img: "images/Cake3.jpg",
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
        img: "images/pastries63.jpg",
        alt: "Golden baked chicken and mushroom and steak savory pies fresh out of the oven at T's Cakes",
        bullets: [
            "Classic Pepper Steak Pie",
            "Spinach and Feta Deep Quiche",
            "Chicken & Mushroom Traditional Bake"
        ]
    },
    {
        id: "savory-pietray",
        title: "Artisanal Savory Pie Tray",
        price: 330,
        priceText: "Prices start from R330 / tray of 6",
        desc: "Host in style with a mixed sharing tray of our signature savory pies. Stuffed with slow-cooked premium meats and fresh vegetables, baked to a perfect golden crisp.",
        category: "savory",
        img: "images/pastries666.jpg",
        alt: "Assortment of freshly baked golden savory pies in catering tray",
        bullets: [
            "Gourmet slow-cooked beef and chicken fillings",
            "Perfect warm finger-food catering platters",
            "Double-baked flaky buttery puff pastry casings"
        ]
    },
    {
        id: "cookies-frosted",
        title: "Custom Frosted Cookies",
        price: 18,
        priceText: "Prices start from R18 / cookie",
        desc: "Melt-in-your-mouth shortbread and butter cookies that can be professionally air-brushed and iced to exactly match any party theme or corporate logo. These are extremely popular as individually wrapped wedding favors.",
        category: "cakes",
        img: "images/Cake002.jpg",
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
        img: "images/muffins69877.jpg",
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
    const orderForm = document.getElementById('enquiry-form');
    const contactForm = document.getElementById('contact-form');

    // --- enquiry.html Conditional Fields logic ---
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

    // --- Textareas Maxlength and Character counters ---
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLen = 500;
        textarea.setAttribute('maxlength', maxLen);

        let counter = textarea.parentNode.querySelector('.char-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.textContent = `0 / ${maxLen} characters`;
            textarea.parentNode.insertBefore(counter, textarea.nextSibling);
        }

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

    // --- Keypress and Live Input validations ---
    const bindLiveValidation = (input, validator) => {
        if (!input) return;
        input.addEventListener('input', () => {
            if (validator(input.value)) {
                setFieldValid(input);
            } else {
                setFieldInvalid(input);
            }
        });
    };

    const validateName = (val) => val.trim().length >= 3 && /^[A-Za-z\s]+$/.test(val);
    const validatePhone = (val) => /^\d{10}$/.test(val.replace(/\s+/g, ''));
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

    // Bind validations for enquiry.html
    bindLiveValidation(document.getElementById('fullName'), validateName);
    bindLiveValidation(document.getElementById('phoneNum'), validatePhone);
    bindLiveValidation(document.getElementById('emailAddr'), validateEmail);
    bindLiveValidation(document.getElementById('deliveryContact'), validatePhone);

    // Bind validations for contact.html
    bindLiveValidation(document.getElementById('contactName'), validateName);
    bindLiveValidation(document.getElementById('contactEmail'), validateEmail);
    bindLiveValidation(document.getElementById('contactPhone'), validatePhone);

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

    // --- Form Submissions and AJAX Handling ---

    // Form 1: enquiry.html submission flows
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Client-Side validation check
            const nameEl = document.getElementById('fullName');
            const emailEl = document.getElementById('emailAddr');
            const phoneEl = document.getElementById('phoneNum');
            const dateEl = document.getElementById('eventDate');
            const productEl = document.getElementById('productChoice');
            const deliverySelected = document.getElementById('delivery').checked;
            const deliveryContactEl = document.getElementById('deliveryContact');

            let errors = [];

            if (!validateName(nameEl.value)) {
                errors.push("Full Name must be at least 3 alphabetical characters.");
                setFieldInvalid(nameEl);
            }
            if (!validateEmail(emailEl.value)) {
                errors.push("Please enter a valid email address.");
                setFieldInvalid(emailEl);
            }
            if (!validatePhone(phoneEl.value)) {
                errors.push("Phone number must contain exactly 10 digits.");
                setFieldInvalid(phoneEl);
            }
            if (deliverySelected && deliveryContactEl && !validatePhone(deliveryContactEl.value)) {
                errors.push("Delivery contact phone number must contain exactly 10 digits.");
                setFieldInvalid(deliveryContactEl);
            }

            // Date validation (must be at least 48 hours in the future)
            const eventDate = new Date(dateEl.value);
            const now = new Date();
            const minTimeDiff = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
            if (!dateEl.value || (eventDate.getTime() - now.getTime()) < minTimeDiff) {
                errors.push("Booking Date must be at least 48 hours in the future to allow fresh baking preparations.");
                dateEl.classList.add('field-invalid');
            } else {
                dateEl.classList.remove('field-invalid');
                dateEl.classList.add('field-valid');
            }

            const responseContainer = document.getElementById('enquiry-response-container');

            if (errors.length > 0) {
                // Show errors dynamically
                responseContainer.innerHTML = `
                    <div style="background: rgba(198, 40, 40, 0.08); border: 2px solid #c62828; border-radius: var(--radius-lg); padding: 35px; color: #2d251f; animation: fadeIn 0.4s ease;">
                        <h4 style="color: #c62828; font-size: 1.4rem; margin-top: 0; margin-bottom: 15px; font-weight: 700;">⚠️ Form Submission Errors</h4>
                        <p style="margin-bottom: 20px; font-weight: 600;">Please correct the following fields before proceeding:</p>
                        <ul style="padding-left: 20px; font-size: 1.05rem; line-height: 1.6;">
                            ${errors.map(err => `<li style="margin-bottom: 8px;">${err}</li>`).join('')}
                        </ul>
                    </div>
                `;
                responseContainer.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            // AJAX simulated async submit (100% local and reliable offline)
            responseContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--glass-shadow);">
                    <div style="width: 50px; height: 50px; border: 4px solid rgba(255, 192, 203, 0.3); border-top-color: var(--brand-pink); border-radius: 50%; display: inline-block; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
                    <h4 style="color: var(--brand-brown); font-size: 1.3rem; margin: 0;">Processing and Validating your Enquiry Locally...</h4>
                </div>
            `;
            responseContainer.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                // Dynamic Cost Engine Calculations
                const category = productEl.value;
                const quantity = parseInt(document.getElementById('quantity').value) || 1;

                // Base Cost Indexing
                let basePricePerUnit = 25; // Default pastries
                let categoryLabel = "Premium Bakery Pastries";

                if (category === 'cakes') {
                    basePricePerUnit = 450;
                    categoryLabel = "Signature Celebration Cakes";
                } else if (category === 'bread') {
                    basePricePerUnit = 45;
                    categoryLabel = "Baked Bread & Loaves";
                } else if (category === 'pastries') {
                    basePricePerUnit = 25;
                    categoryLabel = "Premium Hand-Folded Pastries";
                } else if (category === 'muffins') {
                    basePricePerUnit = 20;
                    categoryLabel = "Gourmet Bakery Muffins";
                } else if (category === 'scones') {
                    basePricePerUnit = 15;
                    categoryLabel = "Traditional Buttermilk Scones";
                } else if (category === 'custom') {
                    basePricePerUnit = 500;
                    categoryLabel = "Custom Crafted Event Design";
                }

                // Volume discount math (10% off for bulk quantities >= 10)
                let discountPct = 0;
                let volumeDiscountAmount = 0;
                if (quantity >= 10) {
                    discountPct = 0.10;
                }

                const originalCost = basePricePerUnit * quantity;
                if (discountPct > 0) {
                    volumeDiscountAmount = originalCost * discountPct;
                }
                const productCost = originalCost - volumeDiscountAmount;

                // Delivery fees
                const deliveryFee = deliverySelected ? 150 : 0;
                const totalCost = productCost + deliveryFee;
                const depositNeeded = totalCost * 0.50; // 50% deposit policy

                // Allergen annotations
                const dietCheckboxes = document.querySelectorAll('input[name="diet[]"]:checked');
                let dietaryAlerts = [];
                dietCheckboxes.forEach(cb => {
                    if (cb.value === 'gluten-free') dietaryAlerts.push("Gluten-Free Ingredients Isolation Required");
                    if (cb.value === 'vegan') dietaryAlerts.push("Strict Plant-Based Vegan Preparations");
                    if (cb.value === 'nut-allergy') dietaryAlerts.push("Strict Nut-Free Isolation Zone");
                });

                // Compute Availability indicator
                const daysDiff = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                let availabilityStatus = " Highly Available (Order slot fits schedule perfectly)";
                if (category === 'cakes' && daysDiff < 5) {
                    availabilityStatus = " Tight Schedule (Requires urgent confirmation due to custom piping detail)";
                } else if (category === 'custom' && daysDiff < 10) {
                    availabilityStatus = " High Production Demand (Pending head baker final authorization)";
                }

                // Render dynamic glassmorphic receipt card
                responseContainer.innerHTML = `
                    <div style="background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--hover-shadow); padding: 50px 40px; border-left: 6px solid var(--brand-pink); animation: slideUp 0.5s ease; color: #2d251f;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; border-bottom: 2px solid var(--primary-bg); padding-bottom: 20px; margin-bottom: 30px;">
                            <div>
                                <span style="background: rgba(255, 192, 203, 0.2); color: var(--brand-brown); padding: 6px 14px; border-radius: var(--radius-pill); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">Enquiry Confirmed Locally</span>
                                <h3 style="font-size: 2.2rem; color: var(--brand-brown); margin: 10px 0 5px 0;">Estimate Cost Invoice</h3>
                                <p style="margin: 0; color: var(--text-muted);">Thank you, <strong>${nameEl.value}</strong>! Your enquiry has been locally verified and logged successfully.</p>
                            </div>
                            <div style="text-align: right;">
                                <p style="margin: 0; font-weight: 700; color: var(--brand-brown); font-size: 1.1rem;">Date Selected:</p>
                                <p style="margin: 0; font-size: 1.1rem; color: var(--brand-pink); font-weight: 800;">${dateEl.value}</p>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; margin-bottom: 40px;">
                            <div>
                                <h4 style="text-transform: uppercase; color: var(--brand-brown); font-size: 1.05rem; letter-spacing: 1px; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 8px; margin-bottom: 15px;">Cost Breakdown</h4>
                                <table style="width: 100%; border-collapse: collapse; font-size: 1.05rem;">
                                    <tr style="height: 35px;">
                                        <td style="color: #666;">${categoryLabel} (${quantity} qty)</td>
                                        <td style="text-align: right; font-weight: 600;">R${originalCost.toFixed(2)}</td>
                                    </tr>
                                    ${volumeDiscountAmount > 0 ? `
                                    <tr style="height: 35px; color: #2e7d32;">
                                        <td>Bulk Volume Discount (10%)</td>
                                        <td style="text-align: right; font-weight: 700;">-R${volumeDiscountAmount.toFixed(2)}</td>
                                    </tr>
                                    ` : ''}
                                    <tr style="height: 35px;">
                                        <td style="color: #666;">Fulfillment (${deliverySelected ? 'Local Delivery' : 'In-Store Pickup'})</td>
                                        <td style="text-align: right; font-weight: 600;">R${deliveryFee.toFixed(2)}</td>
                                    </tr>
                                    <tr style="height: 50px; border-top: 1px solid rgba(0,0,0,0.08); font-weight: 800; font-size: 1.25rem;">
                                        <td style="color: var(--brand-brown);">Total Estimated Cost</td>
                                        <td style="text-align: right; color: var(--brand-brown);">R${totalCost.toFixed(2)}</td>
                                    </tr>
                                    <tr style="height: 40px; border-top: 2px solid var(--primary-bg); font-weight: 700; color: var(--brand-pink); font-size: 1.1rem;">
                                        <td>50% Booking Deposit Required</td>
                                        <td style="text-align: right;">R${depositNeeded.toFixed(2)}</td>
                                    </tr>
                                </table>
                            </div>

                            <div>
                                <h4 style="text-transform: uppercase; color: var(--brand-brown); font-size: 1.05rem; letter-spacing: 1px; border-bottom: 1px dashed rgba(0,0,0,0.1); padding-bottom: 8px; margin-bottom: 15px;">Availability & Dietary Status</h4>
                                <p style="font-weight: 700; color: #2d251f; margin-bottom: 10px;">Production Schedule:</p>
                                <p style="font-size: 1.05rem; margin-top: 0; color: #555; line-height: 1.5; margin-bottom: 25px;">${availabilityStatus}</p>
                                
                                ${dietaryAlerts.length > 0 ? `
                                    <p style="font-weight: 700; color: #c62828; margin-bottom: 10px;"> Dietary Allergy Directives:</p>
                                    <ul style="padding-left: 20px; font-weight: 600; color: #c62828; font-size: 0.95rem; margin: 0;">
                                        ${dietaryAlerts.map(alert => `<li style="margin-bottom: 5px;">${alert}</li>`).join('')}
                                    </ul>
                                ` : `
                                    <p style="font-weight: 600; color: #2e7d32; margin: 0;">Standard Allergen Guidelines Apply</p>
                                `}
                            </div>
                        </div>

                        <div style="background: var(--primary-bg); padding: 25px 30px; border-radius: 12px; font-size: 0.95rem; color: #555; line-height: 1.6;">
                            <p style="margin: 0; font-weight: 600; color: var(--brand-brown); margin-bottom: 5px;">ℹ What happens next?</p>
                            We have logged this request on our local interface. A customer care representative will email you at <strong>${emailEl.value}</strong> or call you at <strong>${phoneEl.value}</strong> within 3 business hours to authorize the invoice and provide direct bank deposit info.
                        </div>
                    </div>
                `;
                responseContainer.scrollIntoView({ behavior: 'smooth' });
                orderForm.reset();

                // Clear validation outlines
                const inputs = orderForm.querySelectorAll('.field-valid, .field-invalid');
                inputs.forEach(input => {
                    input.classList.remove('field-valid', 'field-invalid');
                });
            }, 1000);
        });
    }

    // Form 2: contact.html submission flows
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Client-Side validation check
            const nameEl = document.getElementById('contactName');
            const emailEl = document.getElementById('contactEmail');
            const phoneEl = document.getElementById('contactPhone');
            const subjectEl = document.getElementById('contactSubject');
            const messageEl = document.getElementById('contactMessage');

            let errors = [];

            if (!validateName(nameEl.value)) {
                errors.push("Name must be at least 3 alphabetical characters.");
                setFieldInvalid(nameEl);
            }
            if (!validateEmail(emailEl.value)) {
                errors.push("Please enter a valid email address.");
                setFieldInvalid(emailEl);
            }
            if (!validatePhone(phoneEl.value)) {
                errors.push("Phone number must contain exactly 10 digits.");
                setFieldInvalid(phoneEl);
            }

            const responseContainer = document.getElementById('contact-response-container');

            if (errors.length > 0) {
                responseContainer.innerHTML = `
                    <div style="background: rgba(198, 40, 40, 0.08); border: 2px solid #c62828; border-radius: var(--radius-lg); padding: 25px; color: #c62828; animation: fadeIn 0.4s ease;">
                        <h4 style="font-weight: 700; margin-top: 0; margin-bottom: 10px;">⚠️ Errors in Submission</h4>
                        <ul style="padding-left: 20px; font-size: 1rem; line-height: 1.5; margin: 0;">
                            ${errors.map(err => `<li>${err}</li>`).join('')}
                        </ul>
                    </div>
                `;
                responseContainer.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            // AJAX simulated async submit (100% local and reliable offline)
            responseContainer.innerHTML = `
                <div style="text-align: center; padding: 30px; background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--glass-shadow);">
                    <div style="width: 40px; height: 40px; border: 4px solid rgba(255, 192, 203, 0.3); border-top-color: var(--brand-pink); border-radius: 50%; display: inline-block; animation: spin 1s linear infinite; margin-bottom: 15px;"></div>
                    <h4 style="color: var(--brand-brown); font-size: 1.1rem; margin: 0;">Preparing and Validating Message Locally...</h4>
                </div>
            `;
            responseContainer.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                const recipient = "info@tscakes.co.za";
                const subject = `[T's Cakes Contact - ${subjectEl.value}] ${nameEl.value}`;

                const body = `Hello T's Cakes Team,\n\nI have submitted a general inquiry via the website contact form. Here are my details:\n\n` +
                    `Name: ${nameEl.value}\n` +
                    `Email Address: ${emailEl.value}\n` +
                    `Phone Number: ${phoneEl.value}\n` +
                    `Type of Inquiry: ${subjectEl.value}\n\n` +
                    `------------------ MESSAGE BODY ------------------\n` +
                    `${messageEl.value}\n\n` +
                    `Please review and get in touch with me as soon as possible.\n\nBest Regards,\n${nameEl.value}`;

                const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                // Launch default mail client immediately on successful simulated processing
                window.location.href = mailtoUrl;

                // Success feedback and email fallback indicators
                responseContainer.innerHTML = `
                    <div style="background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--hover-shadow); padding: 40px 30px; border-left: 6px solid #2e7d32; animation: slideUp 0.5s ease; color: #2d251f;">
                        <h3 style="color: #2e7d32; font-size: 1.6rem; margin-top: 0; margin-bottom: 10px;">✔️ Message Successfully Verified & Compiled!</h3>
                        <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px;">
                            Hello <strong>${nameEl.value}</strong>! Your contact message has been locally verified. 
                            We have automatically compiled these details and launched your default mail application to securely dispatch the enquiry.
                        </p>
                        <div style="background: rgba(46, 125, 50, 0.05); padding: 20px; border-radius: 8px; font-size: 0.95rem; color: #333; line-height: 1.5; text-align: left; border: 1px solid rgba(46, 125, 50, 0.1);">
                            <strong>📧 Stated Recipient:</strong> <a href="mailto:${recipient}" style="color: #2e7d32; font-weight: 700;">${recipient}</a><br>
                            <strong>📋 Compiled Subject:</strong> <code>${subject}</code><br><br>
                            <em>If your mail client didn't launch automatically, please manually send an email to the recipient above using your compiled form details.</em>
                        </div>
                    </div>
                `;
                responseContainer.scrollIntoView({ behavior: 'smooth' });

                contactForm.reset();
                const inputs = contactForm.querySelectorAll('.field-valid, .field-invalid');
                inputs.forEach(input => {
                    input.classList.remove('field-valid', 'field-invalid');
                });
            }, 1000);
        });
    }
}
