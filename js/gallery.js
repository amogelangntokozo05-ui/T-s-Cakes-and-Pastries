/* =========================================================================
   T's Cakes and Pastries - Gallery Photo Lightbox Modal
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Gallery Lightbox ---
    initGalleryLightbox();
});

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
