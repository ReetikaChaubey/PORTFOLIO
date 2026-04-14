// ===== CONTENT INITIALIZATION ===== //
class ContentInitializer {
    constructor() {
        this.init();
    }

    init() {
        this.populateHeroSection();
        this.attachButtonListeners();
    }

    populateHeroSection() {
        // Populate hero name
        const heroName = document.getElementById('heroName');
        if (heroName && portfolioData.personal) {
            const names = portfolioData.personal.name.split(' ');
            heroName.innerHTML = names.map(name => `<span class="word">${name}</span>`).join('');
        }

        // Populate hero title
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle && portfolioData.personal) {
            heroTitle.textContent = portfolioData.personal.title;
        }

        // Populate hero info
        const heroInfo = document.getElementById('heroInfo');
        if (heroInfo && portfolioData.personal) {
            heroInfo.classList.add('hero-info');
            heroInfo.innerHTML = `
                <div class="info-item">
                    <strong>📧 Email:</strong> ${portfolioData.personal.email}
                </div>
                <div class="info-item">
                    <strong>📱 Phone:</strong> ${portfolioData.personal.phone}
                </div>
                <div class="info-item">
                    <strong>📍 Location:</strong> ${portfolioData.personal.location}
                </div>
            `;
        }
    }

    attachButtonListeners() {
        const buttons = document.querySelectorAll('[data-section]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const sectionId = e.target.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ===== NAVIGATION ===== //
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        this.navLinks.forEach((link) => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');
    }
}

// ===== THEME TOGGLE ===== //
class ThemeToggle {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.htmlElement = document.documentElement;
        this.body = document.body;

        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = this.body.classList.contains('light-theme') ? 'dark' : 'light';
        this.setTheme(currentTheme);
    }

    setTheme(theme) {
        if (theme === 'light') {
            this.body.classList.add('light-theme');
            this.themeToggle.textContent = '☀️';
        } else {
            this.body.classList.remove('light-theme');
            this.themeToggle.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    }
}

// ===== SCROLL ANIMATIONS ===== //
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = new IntersectionObserver((entries) => this.observe(entries), this.observerOptions);

        this.init();
    }

    init() {
        // Observe elements with data-reveal attribute
        const revealElements = document.querySelectorAll('[data-reveal]');
        revealElements.forEach((el) => this.observer.observe(el));

        // Trigger animations for skills and timeline on scroll
        window.addEventListener('scroll', () => this.triggerProgressAnimations());
    }

    observe(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                this.observer.unobserve(entry.target);
            }
        });
    }

    triggerProgressAnimations() {
        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) return;

        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Skills are in view, trigger progress bars
            const progressBars = document.querySelectorAll('.skill-progress');
            progressBars.forEach((bar) => {
                if (!bar.classList.contains('animated')) {
                    bar.classList.add('animated');
                }
            });
        }
    }
}

// ===== TILT EFFECT (3D Cards) ===== //
class TiltEffect {
    constructor() {
        this.init();
    }

    init() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        tiltElements.forEach((element) => {
            element.addEventListener('mousemove', (e) => this.handleTilt(e));
            element.addEventListener('mouseleave', (e) => this.resetTilt(e));
        });
    }

    handleTilt(e) {
        const element = e.currentTarget;
        // Simple subtle hover effect - no 3D
        element.style.opacity = '0.9';
    }

    resetTilt(e) {
        const element = e.currentTarget;
        element.style.opacity = '1';
    }
}

// ===== PARALLAX SCROLLING ===== //
class ParallaxScroll {
    constructor() {
        this.init();
    }

    init() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
            });
        }
    }
}

// ===== SMOOTH SCROLL ===== //
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== FORM HANDLING ===== //
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = {
            name: this.form.querySelector('input[placeholder="Your Name"]').value,
            email: this.form.querySelector('input[placeholder="Your Email"]').value,
            subject: this.form.querySelector('input[placeholder="Subject"]').value,
            message: this.form.querySelector('textarea').value
        };

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Create a loading state
        const submitBtn = this.form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (in real app, send to backend)
        setTimeout(() => {
            // Success message
            console.log('Form submitted:', data);
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.form.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    validateForm(data) {
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        return true;
    }
}

// ===== HERO ANIMATION ===== //
class HeroAnimation {
    constructor() {
        this.init();
    }

    init() {
        const heroWords = document.querySelectorAll('.word');
        heroWords.forEach((word, index) => {
            word.style.setProperty('--animation-delay', `${index * 0.2}s`);
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ELEMENTS ===== //
class ElementObserver {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-reveal]').forEach((el) => {
            observer.observe(el);
        });
    }
}

// ===== PAGE LOAD ANIMATION ===== //
class PageLoadAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add initial animation on page load
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }
}

// ===== UTILITY FUNCTIONS ===== //

/**
 * Debounce function to optimize scroll and resize events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Get viewport dimensions
 */
function getViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

/**
 * Animate values over time
 */
function animateValue(element, start, end, duration, callback) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        if (callback) {
            callback(value);
        }
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// ===== INITIALIZE ALL MODULES ===== //
document.addEventListener('DOMContentLoaded', () => {
    // Initialize content from data
    new ContentInitializer();
    
    // Initialize all features
    // new CustomCursor(); // Disabled for beginner-friendly experience
    new Navigation();
    new ThemeToggle();
    new ScrollAnimations();
    new TiltEffect();
    new ParallaxScroll();
    new SmoothScroll();
    new FormHandler();
    new HeroAnimation();
    new ElementObserver();
    new PageLoadAnimation();

    console.log('Portfolio loaded successfully!');
});

// ===== MOBILE OPTIMIZATION ===== //
if ('ontouchstart' in window) {
    // Remove hover effects on touch devices
    document.body.classList.add('touch-device');
}

// ===== PREVENT MEMORY LEAKS ===== //
window.addEventListener('beforeunload', () => {
    // Clean up event listeners if needed
    console.log('Cleaning up...');
});

// ===== ADVANCED SCROLL PHYSICS ===== //
// Disabled for beginner-friendly simplification
// class SmoothScrollPhysics { ... }
// new SmoothScrollPhysics();

// ===== DYNAMIC PARTICLE SYSTEM (Optional Enhancement) ===== //
// Disabled for better performance and simpler experience
// class ParticleSystem { ... }
// new ParticleSystem();

// ===== ACCESSIBILITY & PERFORMANCE ===== //

/**
 * Disable animations for users who prefer reduced motion
 */
function handlePrefersReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-base', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
        console.log('Animations disabled for accessibility');
    }
}

handlePrefersReducedMotion();
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handlePrefersReducedMotion);

/**
 * Monitor performance
 */
function logPerformanceMetrics() {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

logPerformanceMetrics();
