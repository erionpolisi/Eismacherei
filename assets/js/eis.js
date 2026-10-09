// assets/js/eis.js — renders sortiment cards from JSON

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".angebot-container");
  if (!container) return;

  const id = container.id;
  const title = document.querySelector(".section-title")?.textContent.toLowerCase() || "";
  const isVeganOnly = title.includes("vegan");

  try {
    const res = await fetch(`angebot-json/${id}.json`);
    if (!res.ok) throw new Error(`Fehler beim Laden von ${id}.json`);
    let daten = await res.json();

    if (isVeganOnly) {
      daten = daten.filter(eis => eis.vegan);
    }

    // Hundeeis: single grid, no main/optional split
    if (id === "hund") {
      container.appendChild(createGroup(null, "main", daten));
      return;
    }

    const haupt = daten.filter(eis => eis.hauptsortiment);
    const optional = daten.filter(eis => !eis.hauptsortiment);

    if (haupt.length) {
      container.appendChild(createGroup("Hauptsortiment", "main", haupt));
    }

    if (optional.length) {
      container.appendChild(createGroup("Optional", "optional", optional));
    }
  } catch (err) {
    console.error(err);
    const error = document.createElement("p");
    error.textContent = "Fehler beim Laden der Inhalte";
    container.replaceChildren(error);
  }
});

/* ========== GROUPS ========== */

function createGroup(title, variant, items) {
  const wrapper = document.createElement("div");
  wrapper.className = `sortiment ${variant}`;

  if (title) {
    const heading = document.createElement("h3");
    heading.className = "group-title";
    heading.textContent = title;
    wrapper.appendChild(heading);
  }

  const grid = document.createElement("div");
  grid.className = "card-grid";
  items.forEach(item => grid.appendChild(createCard(item)));

  wrapper.appendChild(grid);
  return wrapper;
}

/* ========== CARD ========== */

function createCard(eis) {
  const card = document.createElement("div");
  card.className = "angebot-content";
  card.style.backgroundColor = eis.color || "var(--container-color)";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", eis.title || "");

  const inner = document.createElement("div");
  inner.className = "flip-inner";

  const front = document.createElement("div");
  front.className = "front";

  const img = document.createElement("img");
  img.src = eis.image;
  img.alt = eis.alt || eis.title || "";
  img.className = "angebot-img";
  img.loading = "lazy";

  const cardTitle = document.createElement("p");
  cardTitle.className = "angebot-title";
  cardTitle.textContent = eis.title || "";

  front.append(img, cardTitle);

  const back = document.createElement("div");
  back.className = "back";

  const description = document.createElement("p");
  description.className = "angebot-subtitle";
  description.textContent = eis.description || "";

  back.appendChild(description);
  inner.append(front, back);
  card.appendChild(inner);

  const flip = () => card.classList.toggle("flipped");

  card.addEventListener("click", flip);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    }
  });

  return card;
}
