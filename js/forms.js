

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Form Interactions ---
    initFormInteractions();
});


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
                <div class="cake-assistant-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; align-items: start;">
                    <!-- Left Column: Selection Controls -->
                    <div class="cake-controls-col" style="display: flex; flex-direction: column; gap: 20px;">
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
                            </select>
                        </div>
                        <div>
                            <label for="cakeFrosting" style="font-weight: 600; color: var(--brand-brown); display: block; margin-bottom: 8px;">Frosting Flavor & Color</label>
                            <select id="cakeFrosting" name="cakeFrosting">
                                <option value="vanilla">Vanilla Cream (Cream-White)</option>
                                <option value="strawberry">Strawberry Blush (Pastel Pink)</option>
                                <option value="chocolate">Chocolate Ganache (Deep Brown)</option>
                                <option value="cinnamon">Cinnamon Caramel (Warm Gold)</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-weight: 600; color: var(--brand-brown); display: block; margin-bottom: 12px;">Specialty Toppings</label>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-primary); font-weight: 500;">
                                    <input type="checkbox" id="topSprinkles" name="toppings[]" value="sprinkles" style="width:18px; height:18px; accent-color:var(--brand-brown);">
                                    🌈 Rainbow Sprinkles
                                </label>
                                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-primary); font-weight: 500;">
                                    <input type="checkbox" id="topCherries" name="toppings[]" value="cherries" style="width:18px; height:18px; accent-color:var(--brand-brown);">
                                    🍒 Sweet Glacé Cherries
                                </label>
                                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-primary); font-weight: 500;">
                                    <input type="checkbox" id="topDrizzle" name="toppings[]" value="drizzle" style="width:18px; height:18px; accent-color:var(--brand-brown);">
                                    🍫 Rich Cocoa Drizzle
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Interactive Visual Preview -->
                    <div class="cake-preview-col" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--primary-bg); border: 2px dashed rgba(92,58,33,0.15); border-radius: 20px; padding: 30px; min-height: 360px;">
                        <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--brand-light-brown); font-weight: 800; margin-bottom: 25px;">🎂 Live Visual Bake Preview</span>
                        <div class="cake-preview-wrapper" style="position: relative; width: 100%; height: 240px; display: flex; flex-direction: column-reverse; align-items: center; justify-content: flex-start; padding-bottom: 20px;">
                            <!-- Silver Cake Base/Plate -->
                            <div class="cake-plate" style="width: 220px; height: 16px; background: linear-gradient(180deg, #e0e0e0 0%, #b3b3b3 100%); border-radius: 50%; box-shadow: 0 6px 15px rgba(0,0,0,0.1); margin-top: -8px; z-index: 1;"></div>
                            
                            <!-- Bottom Tier (Tier 1) -->
                            <div class="visual-tier bottom-tier" style="width: 170px; height: 60px; background: #faf8f5; border: 1px solid rgba(0,0,0,0.06); position: relative; transition: all 0.4s ease; z-index: 2; margin-bottom: -4px;">
                                <div class="drizzle-overlay" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 12px; background: #4e2f1d; border-radius: 10px 10px 0 0; clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 90% 90%, 80% 50%, 70% 80%, 60% 40%, 50% 90%, 40% 50%, 30% 80%, 20% 40%, 10% 70%, 0% 50%);"></div>
                                <div class="sprinkles-overlay" style="display: none; position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; background-image: radial-gradient(circle, #f06292 1.5px, transparent 1.5px), radial-gradient(circle, #4db6ac 1.5px, transparent 1.5px), radial-gradient(circle, #ffb74d 1.5px, transparent 1.5px); background-size: 20px 20px; background-position: 0 0, 6px 10px, 12px 3px;"></div>
                                <div class="cherry-top left-shoulder" style="display: none; position: absolute; top: -14px; left: 15px; width: 16px; height: 16px; background: #d32f2f; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><div style="position: absolute; top: -6px; left: 8px; width: 2px; height: 8px; background: #2e7d32; transform: rotate(20deg); border-radius: 1px;"></div></div>
                                <div class="cherry-top right-shoulder" style="display: none; position: absolute; top: -14px; right: 15px; width: 16px; height: 16px; background: #d32f2f; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><div style="position: absolute; top: -6px; left: 8px; width: 2px; height: 8px; background: #2e7d32; transform: rotate(20deg); border-radius: 1px;"></div></div>
                                <div class="cherry-top cherry-crown" style="display: none; position: absolute; top: -18px; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; background: #d32f2f; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 5;"><div style="position: absolute; top: -8px; left: 9px; width: 2px; height: 10px; background: #2e7d32; transform: rotate(15deg); border-radius: 1px;"></div></div>
                            </div>
                            
                            <!-- Middle Tier (Tier 2) -->
                            <div class="visual-tier middle-tier" style="display: none; width: 125px; height: 50px; background: #faf8f5; border: 1px solid rgba(0,0,0,0.06); position: relative; transition: all 0.4s ease; z-index: 3; margin-bottom: -4px;">
                                <div class="drizzle-overlay" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 12px; background: #4e2f1d; border-radius: 8px 8px 0 0; clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 90% 90%, 80% 50%, 70% 80%, 60% 40%, 50% 90%, 40% 50%, 30% 80%, 20% 40%, 10% 70%, 0% 50%);"></div>
                                <div class="sprinkles-overlay" style="display: none; position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; background-image: radial-gradient(circle, #f06292 1.5px, transparent 1.5px), radial-gradient(circle, #4db6ac 1.5px, transparent 1.5px), radial-gradient(circle, #ffb74d 1.5px, transparent 1.5px); background-size: 18px 18px; background-position: 0 0, 5px 8px, 10px 3px;"></div>
                                <div class="cherry-top left-shoulder" style="display: none; position: absolute; top: -14px; left: 12px; width: 16px; height: 16px; background: #d32f2f; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><div style="position: absolute; top: -6px; left: 8px; width: 2px; height: 8px; background: #2e7d32; transform: rotate(20deg); border-radius: 1px;"></div></div>
                                <div class="cherry-top right-shoulder" style="display: none; position: absolute; top: -14px; right: 12px; width: 16px; height: 16px; background: #d32f2f; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><div style="position: absolute; top: -6px; left: 8px; width: 2px; height: 8px; background: #2e7d32; transform: rotate(20deg); border-radius: 1px;"></div></div>
                                <div class="cherry-top cherry-crown" style="display: none; position: absolute; top: -18px; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; background: #d32f2f; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 5;"><div style="position: absolute; top: -8px; left: 9px; width: 2px; height: 10px; background: #2e7d32; transform: rotate(15deg); border-radius: 1px;"></div></div>
                            </div>
                            
                            <!-- Top Tier (Tier 3) -->
                            <div class="visual-tier top-tier" style="display: none; width: 85px; height: 42px; background: #faf8f5; border: 1px solid rgba(0,0,0,0.06); position: relative; transition: all 0.4s ease; z-index: 4; margin-bottom: -4px;">
                                <div class="drizzle-overlay" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 12px; background: #4e2f1d; border-radius: 6px 6px 0 0; clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 90% 90%, 80% 50%, 70% 80%, 60% 40%, 50% 90%, 40% 50%, 30% 80%, 20% 40%, 10% 70%, 0% 50%);"></div>
                                <div class="sprinkles-overlay" style="display: none; position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; background-image: radial-gradient(circle, #f06292 1.5px, transparent 1.5px), radial-gradient(circle, #4db6ac 1.5px, transparent 1.5px), radial-gradient(circle, #ffb74d 1.5px, transparent 1.5px); background-size: 15px 15px; background-position: 0 0, 4px 6px, 8px 2px;"></div>
                                <div class="cherry-top cherry-crown" style="display: none; position: absolute; top: -18px; left: 50%; transform: translateX(-50%); width: 18px; height: 18px; background: #d32f2f; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 5;"><div style="position: absolute; top: -8px; left: 9px; width: 2px; height: 10px; background: #2e7d32; transform: rotate(15deg); border-radius: 1px;"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            const fieldsets = orderForm.querySelectorAll('fieldset');
            if (fieldsets.length > 0) {
                orderForm.insertBefore(customBlock, fieldsets[1].nextSibling);
            }

            // Immediately hook up Visual Builder interactive event handlers
            setupCakeBuilder(customBlock);
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

    // Helper to control and animate the live stacked visual cake preview
    function setupCakeBuilder(customBlock) {
        const layersSelect = document.getElementById('cakeLayers');
        const shapeSelect = document.getElementById('cakeShape');
        const frostingSelect = document.getElementById('cakeFrosting');
        const sprinklesCheck = document.getElementById('topSprinkles');
        const cherriesCheck = document.getElementById('topCherries');
        const drizzleCheck = document.getElementById('topDrizzle');

        // Preview Tiers
        const bottomTier = customBlock.querySelector('.bottom-tier');
        const middleTier = customBlock.querySelector('.middle-tier');
        const topTier = customBlock.querySelector('.top-tier');

        if (!layersSelect || !shapeSelect || !frostingSelect || !sprinklesCheck || !cherriesCheck || !drizzleCheck) return;

        // Topping elements
        const bottomDrizzle = bottomTier.querySelector('.drizzle-overlay');
        const middleDrizzle = middleTier.querySelector('.drizzle-overlay');
        const topDrizzle = topTier.querySelector('.drizzle-overlay');

        const bottomSprinkles = bottomTier.querySelector('.sprinkles-overlay');
        const middleSprinkles = middleTier.querySelector('.sprinkles-overlay');
        const topSprinkles = topTier.querySelector('.sprinkles-overlay');

        const bottomCherries = bottomTier.querySelectorAll('.cherry-top');
        const middleCherries = middleTier.querySelectorAll('.cherry-top');
        const topCherries = topTier.querySelectorAll('.cherry-top');

        const updateCakePreview = () => {
            const layers = parseInt(layersSelect.value) || 1;
            const shape = shapeSelect.value;
            const frosting = frostingSelect.value;
            const hasSprinkles = sprinklesCheck.checked;
            const hasCherries = cherriesCheck.checked;
            const hasDrizzle = drizzleCheck.checked;

            // 1. Frosting Color mapping
            let frostingColor = '#faf8f5'; // vanilla default
            if (frosting === 'strawberry') frostingColor = '#ffb0c4'; // pastel pink
            if (frosting === 'chocolate') frostingColor = '#5c3a21'; // deep brown
            if (frosting === 'cinnamon') frostingColor = '#df9b72'; // warm gold cinnamon

            // Apply frosting color to all tiers
            [bottomTier, middleTier, topTier].forEach(tier => {
                tier.style.backgroundColor = frostingColor;
            });

            // 2. Shape mapping (border-radius)
            let borderRadiusBottom = '10px 10px 4px 4px';
            let borderRadiusMiddle = '8px 8px 4px 4px';
            let borderRadiusTop = '6px 6px 4px 4px';

            if (shape === 'square') {
                borderRadiusBottom = '4px';
                borderRadiusMiddle = '4px';
                borderRadiusTop = '4px';
            } else if (shape === 'heart') {
                borderRadiusBottom = '50% 50% 4px 4px / 20% 20% 4px 4px';
                borderRadiusMiddle = '50% 50% 4px 4px / 20% 20% 4px 4px';
                borderRadiusTop = '50% 50% 4px 4px / 20% 20% 4px 4px';
            }

            bottomTier.style.borderRadius = borderRadiusBottom;
            middleTier.style.borderRadius = borderRadiusMiddle;
            topTier.style.borderRadius = borderRadiusTop;

            // 3. Layers count (visibility check)
            if (layers === 1) {
                middleTier.style.display = 'none';
                topTier.style.display = 'none';
            } else if (layers === 2) {
                middleTier.style.display = 'block';
                topTier.style.display = 'none';
            } else {
                middleTier.style.display = 'block';
                topTier.style.display = 'block';
            }

            // 4. Sprinkles display
            [bottomSprinkles, middleSprinkles, topSprinkles].forEach(s => {
                s.style.display = hasSprinkles ? 'block' : 'none';
            });

            // 5. Drizzle display
            [bottomDrizzle, middleDrizzle, topDrizzle].forEach(d => {
                d.style.display = hasDrizzle ? 'block' : 'none';
                if (frosting === 'chocolate') {
                    d.style.backgroundColor = '#faf8f5'; // white chocolate drizzle
                } else {
                    d.style.backgroundColor = '#4e2f1d'; // dark chocolate drizzle
                }
            });

            // 6. Cherries display
            // Reset all cherries first
            bottomCherries.forEach(c => c.style.display = 'none');
            middleCherries.forEach(c => c.style.display = 'none');
            topCherries.forEach(c => c.style.display = 'none');

            if (hasCherries) {
                if (layers === 1) {
                    bottomTier.querySelector('.cherry-crown').style.display = 'block';
                } else if (layers === 2) {
                    middleTier.querySelector('.cherry-crown').style.display = 'block';
                    bottomCherries.forEach(c => {
                        if (!c.classList.contains('cherry-crown')) c.style.display = 'block';
                    });
                } else {
                    topTier.querySelector('.cherry-crown').style.display = 'block';
                    middleCherries.forEach(c => {
                        if (!c.classList.contains('cherry-crown')) c.style.display = 'block';
                    });
                    bottomCherries.forEach(c => {
                        if (!c.classList.contains('cherry-crown')) c.style.display = 'block';
                    });
                }
            }
        };

        // Bind events
        [layersSelect, shapeSelect, frostingSelect].forEach(select => {
            select.addEventListener('change', updateCakePreview);
        });
        [sprinklesCheck, cherriesCheck, drizzleCheck].forEach(check => {
            check.addEventListener('change', updateCakePreview);
        });

        // Initial preview render
        updateCakePreview();
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
