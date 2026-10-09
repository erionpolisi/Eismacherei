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
            '.section-title, .category-data, .vitrine-card, .angebot-container .angebot-content, .discount-container, .about-data, .about-img, .new-container'
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

/* ========== HERO BUBBLE STICKERS (platzen bei Klick) ========== */
// Auch das Logo in "Ueber Uns" bekommt Blasen: Wrapper fuer die Positionierung
const aboutImg = document.querySelector('.about-img');
if (aboutImg) {
    const wrap = document.createElement('div');
    wrap.className = 'bubble-wrap';
    aboutImg.parentNode.insertBefore(wrap, aboutImg);
    wrap.appendChild(aboutImg);
}

document.querySelectorAll('.home-group, .bubble-wrap').forEach(group => {
    [
        { emoji: '🍦', variant: 'home-sticker--ice' },
        { emoji: '🍓', variant: 'home-sticker--berry' }
    ].forEach(({ emoji, variant }) => {
        const sticker = document.createElement('span');
        sticker.className = `home-sticker ${variant}`;
        sticker.textContent = emoji;
        sticker.setAttribute('role', 'button');
        sticker.setAttribute('aria-label', 'Blase platzen lassen');
        sticker.tabIndex = 0;
        group.appendChild(sticker);

        onActivate(sticker, () => {
            if (sticker.classList.contains('popped')) return;

            // Bubble-Burst rund um die Blase
            const groupRect = group.getBoundingClientRect();
            const rect = sticker.getBoundingClientRect();
            const x = rect.left - groupRect.left + rect.width / 2;
            const y = rect.top - groupRect.top + rect.height / 2;

            for (let i = 0; i < 6; i++) {
                const bubble = document.createElement('span');
                bubble.className = 'sticker-burst';
                bubble.textContent = '🫧';
                const angle = (Math.PI * 2 * i) / 6 + Math.random() * .6;
                const distance = 34 + Math.random() * 22;
                bubble.style.left = `${x}px`;
                bubble.style.top = `${y}px`;
                bubble.style.setProperty('--dx', `${Math.round(Math.cos(angle) * distance)}px`);
                bubble.style.setProperty('--dy', `${Math.round(Math.sin(angle) * distance)}px`);
                group.appendChild(bubble);
                setTimeout(() => bubble.remove(), 850);
            }

            sticker.classList.remove('respawn');
            sticker.classList.add('popped');

            // Nach 2 Sekunden wieder herstellen
            setTimeout(() => {
                sticker.classList.remove('popped');
                void sticker.offsetWidth; // Reflow: Respawn-Animation neu starten
                sticker.classList.add('respawn');
            }, 2000);
        });
    });
});

/* ========== FOOTER EASTER EGGS ========== */
const footerEl = document.getElementById('footer');
const crocImg = document.querySelector('.footer-img-one');
const kittyImg = document.querySelector('.footer-img-two');

// Position eines Elements relativ zum Footer (fx/fy = Anker im Element)
function footerPoint(el, fx = 0.5, fy = 0.5) {
    const footerRect = footerEl.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left - footerRect.left + rect.width * fx,
        y: rect.top - footerRect.top + rect.height * fy,
        footerWidth: footerRect.width
    };
}

if (footerEl && crocImg) {
    crocImg.addEventListener('click', () => {
        if (footerEl.querySelectorAll('.croc-paw').length > 24) return;

        const { x, y, footerWidth } = footerPoint(crocImg, .35, .45);
        const dir = x > footerWidth / 2 ? -1 : 1; // immer Richtung freie Fläche laufen

        for (let i = 0; i < 7; i++) {
            const paw = document.createElement('span');
            paw.className = 'croc-paw';
            paw.textContent = '🐾';

            const zigzag = (i % 2 === 0 ? -1 : 1) * 15;
            paw.style.left = `${x + dir * (i + 1) * 54}px`;
            paw.style.top = `${y - (i + 1) * 22 + zigzag}px`;
            paw.style.setProperty('--paw-rot', `${dir * (i % 2 === 0 ? 30 : 55)}deg`);
            paw.style.animationDelay = `${i * 150}ms`;

            footerEl.appendChild(paw);
            setTimeout(() => paw.remove(), 2100 + i * 150);
        }
    });
}

if (footerEl && kittyImg) {
    kittyImg.addEventListener('click', () => {
        if (footerEl.querySelector('.kitty-bow')) return;

        const { x, y } = footerPoint(kittyImg, .5, .4);

        const bow = document.createElement('span');
        bow.className = 'kitty-bow';
        bow.textContent = '🎀';
        bow.style.left = `${x}px`;
        bow.style.top = `${y}px`;
        footerEl.appendChild(bow);
        setTimeout(() => bow.remove(), 1400);

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('span');
            sparkle.className = 'kitty-sparkle';
            sparkle.textContent = i % 2 === 0 ? '✨' : '⭐';

            const angle = (Math.PI * 2 * i) / 8 + Math.random() * .5;
            const distance = 55 + Math.random() * 30;
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            sparkle.style.setProperty('--dx', `${Math.round(Math.cos(angle) * distance)}px`);
            sparkle.style.setProperty('--dy', `${Math.round(Math.sin(angle) * distance)}px`);
            sparkle.style.animationDelay = `${i * 30}ms`;

            footerEl.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1250 + i * 30);
        }
    });
}
