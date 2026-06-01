document.addEventListener('DOMContentLoaded', () => {
    // Initialize FAQs accordion and testimonials review submitter
    initFAQAccordion();
    initReviewSubmitter();
});

// Manage collapsible accordion panels
function initFAQAccordion() {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const panel = header.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Close all sibling accordions
            const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
            siblingItems.forEach(sib => {
                if (sib !== item) {
                    sib.classList.remove('active');
                    sib.querySelector('.accordion-panel').style.maxHeight = null;
                }
            });

            // Toggle selected panel
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

// Manage user star review submissions
function initReviewSubmitter() {
    const reviewForm = document.getElementById('live-review-form');
    const starsContainer = document.getElementById('review-stars-container');
    const ratingInput = document.getElementById('selected-rating-val');

    if (!reviewForm || !starsContainer || !ratingInput) return;

    const stars = starsContainer.querySelectorAll('.star-selector');
    let currentSelectedRating = 0;

    // Handle hover and click interactions for stars
    stars.forEach((star, index) => {
        // Highlight stars on hover
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
        });

        // Set selected rating on click
        star.addEventListener('click', () => {
            currentSelectedRating = index + 1;
            ratingInput.value = currentSelectedRating;
            highlightStars(currentSelectedRating);
            
            // Set accessibility aria check attributes
            stars.forEach((s, i) => {
                s.setAttribute('aria-checked', i < currentSelectedRating ? 'true' : 'false');
            });
        });
    });

    // Restore selected rating when mouse leaves stars container
    starsContainer.addEventListener('mouseleave', () => {
        highlightStars(currentSelectedRating);
    });

    // Helper to highlight star elements visually
    function highlightStars(rating) {
        stars.forEach((s, i) => {
            if (i < rating) {
                s.style.color = '#FFD700'; // gold
                s.style.transform = 'scale(1.15)';
            } else {
                s.style.color = '#ccc'; // grey
                s.style.transform = 'scale(1)';
            }
        });
    }

    // Process live reviews publishing
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const rating = parseInt(ratingInput.value) || 0;
        const author = document.getElementById('reviewAuthor').value.trim();
        const title = document.getElementById('reviewTitle').value.trim();
        const message = document.getElementById('reviewText').value.trim();

        if (rating === 0) {
            alert("Please select a star rating by clicking on the stars before publishing your review!");
            return;
        }

        const grid = document.querySelector('.testimonials-grid');
        if (!grid) return;

        // Build new review card
        const newCard = document.createElement('article');
        newCard.className = 'testimonial-card';
        newCard.style.opacity = '0';
        newCard.style.transform = 'scale(0.8) translateY(40px)';
        newCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Spring entry

        // Build star rating markup
        let starsMarkup = '';
        for (let i = 0; i < 5; i++) {
            starsMarkup += `<span style="color: ${i < rating ? '#FFD700' : '#ccc'}; font-size: 1.25rem;">★</span>`;
        }

        newCard.innerHTML = `
            <span class="quote-watermark">"</span>
            <div class="star-rating" style="margin-bottom: 12px; display: flex; gap: 4px;">
                ${starsMarkup}
            </div>
            <p class="testimonial-text">"${message}"</p>
            <h4 class="testimonial-author">${author}</h4>
            <p class="testimonial-title">${title} (Verified Live)</p>
        `;

        // Prepend to display reviews list
        grid.insertBefore(newCard, grid.firstChild);

        // Trigger entrance transition
        requestAnimationFrame(() => {
            setTimeout(() => {
                newCard.style.opacity = '1';
                newCard.style.transform = 'scale(1) translateY(0)';
            }, 50);
        });

        // Show green visual success alert on button
        const submitBtn = document.getElementById('submit-review-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.style.background = '#2e7d32';
        submitBtn.style.color = '#fff';
        submitBtn.textContent = '✔️ Published Live Instantly!';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.textContent = originalText;
        }, 2000);

        // Reset inputs and stars state
        reviewForm.reset();
        currentSelectedRating = 0;
        ratingInput.value = 0;
        highlightStars(0);
    });
}
