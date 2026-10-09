// assets/js/hours.js — Live-Status + dynamischer Saisonkalender

const MONTH_NAMES = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const WEEKDAY_NAMES = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const WINTER_MONTHS = [10, 11, 0, 1]; // Nov–Feb

/* Öffnungszeiten für ein konkretes Datum (null = geschlossen) */
function getOpeningHours(date) {
  const month = date.getMonth();
  const weekday = date.getDay(); // So = 0

  if (WINTER_MONTHS.includes(month)) return null;
  if ([2, 3, 9].includes(month)) return { open: 11, close: 20 }; // März, April, Oktober
  if ([4, 8].includes(month)) return { open: 11, close: 21 };    // Mai, September
  if ([6, 7].includes(month)) return { open: 11, close: 22 };    // Juli, August
  if (month === 5) {                                             // Juni
    return (weekday >= 1 && weekday <= 5)
      ? { open: 9, close: 22 }
      : { open: 11, close: 22 };
  }
  return null;
}

/* ========== LIVE-STATUS ========== */
(function renderStatus() {
  const pill = document.getElementById('status');
  const text = document.getElementById('status-text');
  if (!pill || !text) return;

  const now = new Date();
  const hours = getOpeningHours(now);

  let state = 'closed';
  let label;

  if (!hours) {
    label = 'Winterpause – wir sehen uns im März!';
  } else if (now.getHours() >= hours.open && now.getHours() < hours.close) {
    state = 'open';
    label = `Jetzt geöffnet · bis ${hours.close} Uhr`;
  } else if (now.getHours() < hours.open) {
    label = `Noch geschlossen · öffnet heute um ${hours.open} Uhr`;
  } else {
    label = 'Für heute geschlossen';
  }

  pill.classList.add(state);
  text.textContent = label;
})();

/* ========== SAISONKALENDER ========== */
const calTitle = document.getElementById('cal-title');
const calWeekdays = document.getElementById('cal-weekdays');
const calDays = document.getElementById('cal-days');
const btnPrev = document.getElementById('cal-prev');
const btnNext = document.getElementById('cal-next');

if (calTitle && calWeekdays && calDays && btnPrev && btnNext) {
  const today = new Date();
  const MIN_MONTH = today.getFullYear() * 12 + today.getMonth() - 12;
  const MAX_MONTH = today.getFullYear() * 12 + today.getMonth() + 12;

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  WEEKDAY_NAMES.forEach(name => {
    const el = document.createElement('span');
    el.textContent = name;
    calWeekdays.appendChild(el);
  });

  function renderCalendar() {
    calTitle.textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
    calDays.replaceChildren();

    const firstWeekday = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Mo = 0
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < firstWeekday; i++) {
      const filler = document.createElement('div');
      filler.className = 'calendar-day empty';
      calDays.appendChild(filler);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const hours = getOpeningHours(date);

      const cell = document.createElement('div');
      cell.className = 'calendar-day' + (hours ? '' : ' closed');

      const isToday = day === today.getDate()
        && viewMonth === today.getMonth()
        && viewYear === today.getFullYear();

      if (isToday) {
        cell.classList.add('today');
        cell.setAttribute('aria-current', 'date');
      }

      const num = document.createElement('span');
      num.className = 'day-number';
      num.textContent = day;

      const label = document.createElement('span');
      label.className = 'day-hours';
      label.textContent = hours ? `${hours.open}–${hours.close}` : '–';

      cell.append(num, label);
      calDays.appendChild(cell);
    }

    const index = viewYear * 12 + viewMonth;
    btnPrev.disabled = index <= MIN_MONTH;
    btnNext.disabled = index >= MAX_MONTH;
  }

  function changeMonth(delta) {
    const index = Math.min(MAX_MONTH, Math.max(MIN_MONTH, viewYear * 12 + viewMonth + delta));
    viewYear = Math.floor(index / 12);
    viewMonth = ((index % 12) + 12) % 12;
    renderCalendar();
  }

  btnPrev.addEventListener('click', () => changeMonth(-1));
  btnNext.addEventListener('click', () => changeMonth(1));

  renderCalendar();
}
