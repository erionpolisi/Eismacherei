// assets/js/main.js

/* ========== MOBILE MENU ========== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* Lets Enter/Space trigger click on non-button elements with role="button" */
function onActivate(el, handler) {
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handler();
        }
    });
}

if (navToggle && navMenu) {
    onActivate(navToggle, () => navMenu.classList.add('show-menu'));
}

if (navClose && navMenu) {
    onActivate(navClose, () => navMenu.classList.remove('show-menu'));
}

/* Close mobile menu after choosing a link */
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('show-menu');
    });
});

/* ========== SCROLL BEHAVIOUR (active link + header shadow) ========== */
const sections = document.querySelectorAll('section[id]');
const header = document.getElementById('header');
let isScrolling = false;
let scrollTimeout = null;

function highlightActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const navLink = document.querySelector(`.nav-menu a[href*="${section.id}"]`);

        if (!navLink) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
}

function onScroll() {
    highlightActiveLink();

    if (header) header.classList.toggle('scroll-header', window.scrollY > 40);

    // Block keyboard section-jumps while the page is still scrolling
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { isScrolling = false; }, 200);
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ========== LOCATION SLIDES (home) ========== */
const slides = document.querySelectorAll('.home-page');
let currentSlide = 0;

function showSlide(index) {
    if (slides.length === 0) return;
    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? 'block' : 'none';
    });
    sessionStorage.setItem('currentSlideIndex', String(currentSlide));
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Restore last viewed location (bounds-checked)
const savedSlide = Number.parseInt(sessionStorage.getItem('currentSlideIndex'), 10);
showSlide(Number.isInteger(savedSlide) ? savedSlide : 0);

document.querySelectorAll('[data-slide-next]').forEach(button => {
    onActivate(button, nextSlide);
});

/* ========== ABOUT US (read more) ========== */
const moreBTN = document.getElementById('mehr');
const moreTXT = document.getElementById('moreTXT');

if (moreBTN && moreTXT) {
    moreBTN.addEventListener('click', () => {
        const isHidden = moreTXT.classList.toggle('hidden');
        moreBTN.innerText = isHidden ? 'Mehr erfahren' : 'Weniger anzeigen';
    });
}

/* ========== ARROW-KEY SECTION NAVIGATION ========== */
let navIndex = 0;

document.addEventListener('keydown', (e) => {
    if (isScrolling || navLinks.length === 0) return;

    if (e.key === 'ArrowRight') {
        navIndex = (navIndex + 1) % navLinks.length;
    } else if (e.key === 'ArrowLeft') {
        navIndex = (navIndex - 1 + navLinks.length) % navLinks.length;
    } else {
        return;
    }

    navLinks[navIndex].click();
    e.preventDefault();
});

    /* ========== SCROLL REVEAL ========== */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealEls = document.querySelectorAll(
            '.section-title, .category-data, .angebot-container .angebot-content, .discount-container, .about-data, .about-img, .new-container'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 3) * 80}ms`;
            observer.observe(el);
        });
    }
