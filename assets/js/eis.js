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

    // Vegan-Filter
    if (isVeganOnly) {
      daten = daten.filter(e => e.vegan);
    }

    // 🐶 Hundeeis → kein Split
    if (id === "hund") {
      renderSingleGrid(container, daten);
      return;
    }

    // Split
    const haupt = daten.filter(e => e.hauptsortiment);
    const optional = daten.filter(e => !e.hauptsortiment);

    if (haupt.length) {
      container.appendChild(createGroup("Hauptsortiment", "main", haupt));
    }

    if (optional.length) {
      container.appendChild(createGroup("Optional", "optional", optional));
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Fehler beim Laden der Inhalte</p>";
  }
});

/* ========== GROUPS ========== */

function createGroup(title, variant, items) {
  const wrapper = document.createElement("div");
  wrapper.className = `sortiment ${variant}`;

  const heading = document.createElement("h3");
  heading.className = "group-title";
  heading.textContent = title;

  const grid = document.createElement("div");
  grid.className = "card-grid";

  items.forEach(item => grid.appendChild(createCard(item)));

  wrapper.appendChild(heading);
  wrapper.appendChild(grid);
  return wrapper;
}

/* ========== HUND / SINGLE GRID ========== */

function renderSingleGrid(container, items) {
  const grid = document.createElement("div");
  grid.className = "card-grid";

  items.forEach(item => grid.appendChild(createCard(item)));
  container.appendChild(grid);
}

/* ========== CARD ========== */

function createCard(eis) {
  const card = document.createElement("div");
  card.className = "angebot-content";
  card.style.backgroundColor = eis.color || "var(--container-color)";

  card.innerHTML = `
    <div class="flip-inner">
      <div class="front">
        <img src="${eis.image}" alt="${eis.alt}" class="angebot-img">
        <p class="angebot-title">${eis.title}</p>
      </div>
      <div class="back">
        <p class="angebot-subtitle">${eis.description || ""}</p>
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  return card;
}
