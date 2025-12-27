const mainWrapper = document.createElement("div");
mainWrapper.className = "sortiment main";
mainWrapper.innerHTML = `<h3>Hauptsortiment</h3>`;

const mainGrid = document.createElement("div");
mainGrid.className = "card-grid";
mainWrapper.appendChild(mainGrid);

const optionalWrapper = document.createElement("div");
optionalWrapper.className = "sortiment optional";
optionalWrapper.innerHTML = `<h3>Optional</h3>`;

const optionalGrid = document.createElement("div");
optionalGrid.className = "card-grid";
optionalWrapper.appendChild(optionalGrid);

container.append(mainWrapper, optionalWrapper);

// Karten
eisDaten.forEach(eis => {
  const card = document.createElement("div");
  card.className = "angebot-content";
  card.style.backgroundColor = eis.color;

  card.innerHTML = `
    <div class="flip-inner">
      <div class="front">
        <img src="${eis.image}" alt="${eis.alt}">
        <h4>${eis.title}</h4>
      </div>
      <div class="back">
        <p>${eis.description}</p>
      </div>
    </div>
  `;

  card.onclick = () => card.classList.toggle("flipped");

  if (eis.hauptsortiment) {
    mainGrid.appendChild(card);
  } else {
    optionalGrid.appendChild(card);
  }
});
