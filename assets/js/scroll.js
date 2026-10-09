// assets/js/scroll.js — endless image gallery with zoom overlay

document.addEventListener("DOMContentLoaded", () => {
  /* ========== ZOOM OVERLAY ========== */
  const overlay = document.createElement("div");
  overlay.className = "image-overlay";
  overlay.id = "imageOverlay";
  overlay.style.display = "none";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "Bildansicht");

  const overlayImg = document.createElement("img");
  overlayImg.id = "overlayImage";
  overlayImg.alt = "";

  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  function openOverlay(img) {
    overlayImg.src = img.src;
    overlayImg.alt = img.alt || "Vergrößertes Bild";
    overlay.style.display = "flex";
  }

  function closeOverlay() {
    overlay.style.display = "none";
    overlayImg.src = "";
  }

  document.body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "IMG" && target.closest(".scroll-slide")) {
      openOverlay(target);
    } else if (overlay.style.display === "flex") {
      closeOverlay();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.style.display === "flex") closeOverlay();
  });

  /* ========== GALLERIES ========== */
  document.querySelectorAll(".scroll-gallery-inner").forEach(initGallery);

  async function initGallery(galleryEl) {
    const id = galleryEl.id || "torten";
    const scrollWrapper = galleryEl.closest(".scroll-gallery");
    if (!scrollWrapper) return;

    let slideData;
    try {
      const res = await fetch(`angebot-json/${id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      slideData = await res.json();
    } catch (err) {
      console.error(`Fehler beim Laden der Galerie-Daten (${id}):`, err);
      return;
    }

    if (!Array.isArray(slideData) || slideData.length === 0) return;

    // Two copies of every slide allow a seamless, endless loop
    const fragment = document.createDocumentFragment();
    [...slideData, ...slideData].forEach(data => fragment.appendChild(createSlide(data)));
    galleryEl.appendChild(fragment);

    // Wrap around instead of endlessly appending new DOM nodes
    scrollWrapper.addEventListener("scroll", () => {
      const half = galleryEl.scrollWidth / 2;
      if (half > 0 && scrollWrapper.scrollLeft >= half) {
        scrollWrapper.scrollLeft -= half;
      }
    }, { passive: true });

    /* Manual navigation buttons */
    document.querySelectorAll(".scroll-btn[data-scroll]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dir = Number(btn.dataset.scroll) || 0;
        scrollWrapper.scrollBy({ left: dir * 320, behavior: "smooth" });
      });
    });

    /* Pause auto-scroll while the visitor interacts with the gallery */
    let isHovering = false;
    const pointerEls = [scrollWrapper, ...document.querySelectorAll(".scroll-btn")];

    pointerEls.forEach(el => {
      el.addEventListener("pointerenter", () => { isHovering = true; });
      el.addEventListener("pointerleave", () => { isHovering = false; });
      el.addEventListener("touchstart", () => { isHovering = true; }, { passive: true });
      el.addEventListener("touchend", () => { isHovering = false; }, { passive: true });
    });

    /* Smooth auto-scroll via requestAnimationFrame (desktop only) */
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isMobile && !prefersReducedMotion) {
      const SPEED = 35; // pixels per second
      let lastTime = null;
      let subPixel = 0;

      function step(time) {
        if (lastTime !== null && !isHovering && !document.hidden) {
          subPixel += ((time - lastTime) / 1000) * SPEED;
          const pixels = Math.floor(subPixel);
          if (pixels > 0) {
            scrollWrapper.scrollLeft += pixels;
            subPixel -= pixels;
          }
        }
        lastTime = time;
        requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }
  }

  function createSlide({ image, title }) {
    const slide = document.createElement("div");
    slide.className = "scroll-slide";

    const img = document.createElement("img");
    img.src = image;
    img.alt = title || "";
    img.loading = "lazy";
    img.draggable = false;

    const caption = document.createElement("div");
    caption.className = "scroll-slide-title";
    caption.textContent = title || "";

    slide.append(img, caption);
    return slide;
  }
});
