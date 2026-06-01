

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Global Scroll-Driven Reveal Animations ---
    initScrollReveal();

    // --- 2. Sleek Dark/Light Mode Theme Switcher ---
    initThemeSwitcher();

    // --- 3. Floating Scroll-to-Top Button ---
    initBackToTop();
});


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
 * 2. Sleek Dark/Light Mode Theme Switcher
 * Handles active color scheme states, localStorage persistence,
 * and dynamic navbar icon transitions.
 */
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');

    // Check local storage or fallback to system preference
    const savedTheme = localStorage.getItem('tscakes_theme');
    let currentTheme = 'light';

    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
    }

    // Set initial theme state
    applyTheme(currentTheme);

    // Bind click events to all theme toggles on the page
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('tscakes_theme', newTheme);
        });
    });

    // Helper to toggle theme classes and icons
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


function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (!backToTopBtn) return;

    // Show button when scrolled past 400px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
