document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations, theme switcher, and scroll-to-top button
    initScrollReveal();
    initThemeSwitcher();
    initBackToTop();
});

// Manage scroll-driven reveal transitions
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
            rootMargin: '0px 0px -50px 0px' // Offset trigger point
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers without observer support
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

// Manage dark/light theme switching state
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    const savedTheme = localStorage.getItem('tscakes_theme');
    let currentTheme = 'light';

    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
    }

    applyTheme(currentTheme);

    // Toggle theme on button clicks
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('tscakes_theme', newTheme);
        });
    });

    // Helper to toggle document attributes and toggle icons
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeButtons.forEach(btn => {
                const iconSpan = btn.querySelector('.theme-toggle-icon');
                if (iconSpan) iconSpan.textContent = '☀️';
            });
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeButtons.forEach(btn => {
                const iconSpan = btn.querySelector('.theme-toggle-icon');
                if (iconSpan) iconSpan.textContent = '🌙';
            });
        }
    }
}

// Manage back-to-top scroll actions
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (!backToTopBtn) return;

    // Toggle button visibility past 400px scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll back to body top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
