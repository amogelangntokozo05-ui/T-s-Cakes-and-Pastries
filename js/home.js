/* =========================================================================
   T's Cakes and Pastries - Homepage FAQ & Testimonial Submitter
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Homepage FAQ accordion ---
    initFAQAccordion();

    // --- Initialize Homepage star review submitter ---
    initReviewSubmitter();
});

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
 * 10. Real-Time Interactive Testimonial Review Submitter
 * Handles interactive hover/click star selection, client-side validation,
 * dynamic DOM element insertion, and smooth elastic entry animations.
 */
function initReviewSubmitter() {
    const reviewForm = document.getElementById('live-review-form');
    const starsContainer = document.getElementById('review-stars-container');
    const ratingInput = document.getElementById('selected-rating-val');

    if (!reviewForm || !starsContainer || !ratingInput) return;

    const stars = starsContainer.querySelectorAll('.star-selector');
    let currentSelectedRating = 0;

    // A. Star Selector Hover & Click interactions
    stars.forEach((star, index) => {
        // Highlight stars up to hovered index on mouseenter
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
        });

        // Click to freeze selection
        star.addEventListener('click', () => {
            currentSelectedRating = index + 1;
            ratingInput.value = currentSelectedRating;
            highlightStars(currentSelectedRating);
            // Toggle accessibility aria check status
            stars.forEach((s, i) => {
                s.setAttribute('aria-checked', i < currentSelectedRating ? 'true' : 'false');
            });
        });
    });

    // Revert highlight to the selected rating when mouse leaves container
    starsContainer.addEventListener('mouseleave', () => {
        highlightStars(currentSelectedRating);
    });

    function highlightStars(rating) {
        stars.forEach((s, i) => {
            if (i < rating) {
                s.style.color = '#FFD700'; // gold color
                s.style.transform = 'scale(1.15)';
            } else {
                s.style.color = '#ccc'; // default grey
                s.style.transform = 'scale(1)';
            }
        });
    }

    // B. Live Form Submission handling
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

        // Create new visual testimonial card
        const newCard = document.createElement('article');
        newCard.className = 'testimonial-card';
        newCard.style.opacity = '0';
        newCard.style.transform = 'scale(0.8) translateY(40px)';
        newCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'; // elastic bounce in!

        // Generate gold stars markup
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

        // Prepend to testimonials grid
        grid.insertBefore(newCard, grid.firstChild);

        // Trigger hardware-accelerated spring entrance reveal
        requestAnimationFrame(() => {
            setTimeout(() => {
                newCard.style.opacity = '1';
                newCard.style.transform = 'scale(1) translateY(0)';
            }, 50);
        });

        // Show visual success notification banner
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

        // Reset form & rating state
        reviewForm.reset();
        currentSelectedRating = 0;
        ratingInput.value = 0;
        highlightStars(0);
    });
}
