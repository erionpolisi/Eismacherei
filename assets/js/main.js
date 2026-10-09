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

// Must exceed the sections' scroll-margin-top, otherwise the
// highlight lags one section behind after an anchor jump.
const NAV_HIGHLIGHT_OFFSET = 90;

function highlightActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - NAV_HIGHLIGHT_OFFSET;
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

function showSlide(index, animate = true) {
    if (slides.length === 0) return;
    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
        const isActive = i === currentSlide;
        slide.style.display = isActive ? 'block' : 'none';
        slide.classList.remove('slide-in');
        if (isActive && animate) slide.classList.add('slide-in');
    });
    sessionStorage.setItem('currentSlideIndex', String(currentSlide));
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Restore last viewed location (bounds-checked, without entry animation)
const savedSlide = Number.parseInt(sessionStorage.getItem('currentSlideIndex'), 10);
showSlide(Number.isInteger(savedSlide) ? savedSlide : 0, false);

document.querySelectorAll('[data-slide-next]').forEach(button => {
    onActivate(button, nextSlide);
});

/* ========== ABOUT US (animated read more) ========== */
const moreBTN = document.getElementById('mehr');
const moreTXT = document.getElementById('moreTXT');

if (moreBTN && moreTXT) {
    moreBTN.addEventListener('click', () => {
        const isOpen = moreTXT.classList.toggle('open');
        moreBTN.innerText = isOpen ? 'Weniger anzeigen' : 'Mehr erfahren';
    });
}

/* ========== SHOWCASE MARQUEE (Eistorten / Torten / Mehlspeisen gemischt) ========== */
const showcaseTrack = document.getElementById('showcase-track');

if (showcaseTrack) {
    const showcaseImages = [
        { src: 'assets/img/torten/torte1-img.webp', href: 'angebot-html/torten.html', alt: 'Motivtorte' },
        { src: 'assets/img/eistorte/torte1-img.webp', href: 'angebot-html/eistorte.html', alt: 'Eistorte' },
        { src: 'assets/img/mehlspeisen/mehlspeise1-img.webp', href: 'angebot-html/mehlspeisen.html', alt: 'Mehlspeise' },
        { src: 'assets/img/torten/torte2-img.webp', href: 'angebot-html/torten.html', alt: 'Malakofftorte' },
        { src: 'assets/img/eistorte/torte2-img.webp', href: 'angebot-html/eistorte.html', alt: 'Eistorte' },
        { src: 'assets/img/mehlspeisen/mehlspeise2-img.webp', href: 'angebot-html/mehlspeisen.html', alt: 'Mehlspeise' },
        { src: 'assets/img/torten/torte5-img.webp', href: 'angebot-html/torten.html', alt: 'Schnitten' },
        { src: 'assets/img/eistorte/torte3-img.webp', href: 'angebot-html/eistorte.html', alt: 'Eistorte' },
        { src: 'assets/img/mehlspeisen/mehlspeise3-img.webp', href: 'angebot-html/mehlspeisen.html', alt: 'Mehlspeise' },
        { src: 'assets/img/torten/torte8-img.webp', href: 'angebot-html/torten.html', alt: 'Esterhazytorte' },
        { src: 'assets/img/eistorte/torte4-img.webp', href: 'angebot-html/eistorte.html', alt: 'Eistorte' },
        { src: 'assets/img/mehlspeisen/mehlspeise4-img.webp', href: 'angebot-html/mehlspeisen.html', alt: 'Mehlspeise' },
        { src: 'assets/img/torten/torte10-img.webp', href: 'angebot-html/torten.html', alt: 'Mozarttorte' },
        { src: 'assets/img/eistorte/torte5-img.webp', href: 'angebot-html/eistorte.html', alt: 'Eistorte' },
        { src: 'assets/img/mehlspeisen/mehlspeise5-img.webp', href: 'angebot-html/mehlspeisen.html', alt: 'Mehlspeise' },
        { src: 'assets/img/torten/torte6-img.webp', href: 'angebot-html/torten.html', alt: 'Motivtorte' },
        { src: 'assets/img/eistorte/torte6-img.webp', href: 'angebot-html/eistorte.html', alt: 'Eistorte' },
        { src: 'assets/img/torten/torte3-img.webp', href: 'angebot-html/torten.html', alt: 'Motivtorte' }
    ];

    const createShowcaseItem = ({ src, href, alt }, isDuplicate) => {
        const link = document.createElement('a');
        link.className = 'showcase-item';
        link.href = href;
        if (isDuplicate) {
            link.setAttribute('aria-hidden', 'true');
            link.tabIndex = -1;
        }

        const img = document.createElement('img');
        img.src = src;
        img.alt = isDuplicate ? '' : alt;
        img.loading = 'lazy';
        img.draggable = false;

        link.appendChild(img);
        return link;
    };

    // Two copies make the -50% marquee loop seamless
    const fragment = document.createDocumentFragment();
    showcaseImages.forEach(data => fragment.appendChild(createShowcaseItem(data, false)));
    showcaseImages.forEach(data => fragment.appendChild(createShowcaseItem(data, true)));
    showcaseTrack.appendChild(fragment);
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
