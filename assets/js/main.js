// assets/js/main.js

/*  SHOW MENU  */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*  REMOVE MENU MOBILE  */
const navLinks = document.querySelectorAll('.nav-link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}

navLinks.forEach(n => n.addEventListener('click', linkAction));

/*  SCROLL ACTIVE LINK  */
const sections = document.querySelectorAll('section[id]'); 

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*  NEXT LOCATION LOGIC  */
const slides = document.querySelectorAll('.home-page');
let currentSlide = 0;

slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
});

function nextSlide() {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
    sessionStorage.setItem('currentSlideIndex', currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedSlide = sessionStorage.getItem('currentSlideIndex');
    if (savedSlide !== null) {
        slides.forEach((slide) => slide.style.display = 'none');
        currentSlide = parseInt(savedSlide);
        slides[currentSlide].style.display = 'block';
    }
});




/* ABOUT US */
const moreBTN = document.getElementById('mehr');
const moreTXT = document.getElementById('moreTXT');

    if (moreBTN) {
        moreBTN.addEventListener('click', () => {
          const isHidden = moreTXT.classList.toggle('hidden');
          moreBTN.innerText = isHidden ? 'Mehr erfahren' : 'Weniger anzeigen';
        });
      }

/*  NAVIGATION PER PFEILTASTEN + Auto-Jump */
let navIndex = 0;
let isScrolling = false;

// Erkenne aktives Scrollen
window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 200); // 200ms nach Scroll-Ende wieder freigeben
});

document.addEventListener('keydown', (e) => {
    if (isScrolling || navLinks.length === 0) return;

    if (e.key === 'ArrowRight') {
        navIndex = (navIndex + 1) % navLinks.length;
    } else if (e.key === 'ArrowLeft') {
        navIndex = (navIndex - 1 + navLinks.length) % navLinks.length;
    } else {
        return;
    }

    const nextLink = navLinks[navIndex];
    nextLink.classList.add('active-link');
    nextLink.click();

    e.preventDefault();
});

/*  sw.js  */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker registered'))
      .catch(err => console.error('SW registration failed', err));
  });
}

