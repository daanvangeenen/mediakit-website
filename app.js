// ===== Strik Patisserie dashboard — store switching =====
//
// Per-store data is fictitious but the physical-store + webshop totals
// add up to the figures shown on the "Totaal" tab.
//
//   Omzet:      19.420 + 16.110 + 12.860 + 9.850 + 9.210 (webshop) = 67.450
//   Retouren:      138 +    115 +     92 +    71 +     66 (webshop) =    482
//   Klanten:     1.410 +  1.200 +    925 +   720 +    640 (webshop) =  4.895
//   Besteding per klant = 67.450 / 4.895 ≈ € 13,78 (weighted average)

const ICONS = {
  trend:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>',
  people: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><path d="M14 20c0-2.4 1.6-4 3.5-4S21 17.6 21 20"/></svg>',
  return: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H8"/></svg>',
  cart:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2.5 11h11l2-8H6.5"/></svg>',
  klant:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
};

const STORES = {
  totaal: {
    kpis: {
      omzet:     { value: '€ 67.450', delta: '+6,8%',  dir: 'up' },
      besteding: { value: '€ 13,78',  delta: '+1,1%',  dir: 'up' },
      retouren:  { value: '€ 482',    delta: '+4,2%',  dir: 'up' },
      fourth:    { label: 'Online omzet (webshop)', value: '€ 9.210', delta: '+12,3%', dir: 'up', icon: 'cart' },
    },
    summary: 'De totale omzet over alle winkels en de webshop is deze week <strong>€ 67.450</strong>. Dat is <strong class="up">6,8% hoger</strong> dan in dezelfde week vorig jaar. Je zit mooi op koers.',
    rows: [
      { icon: 'trend',  text: 'Je omzet is <strong class="up">6,8% hoger</strong><br/>dan dezelfde week vorig jaar.' },
      { icon: 'return', text: 'Je retouren zijn <strong class="up">4,2% hoger</strong><br/>dan vorig jaar.' },
      { icon: 'people', text: 'De gemiddelde besteding per klant<br/>is <strong>gelijk gebleven</strong> t.o.v. vorig jaar.' },
      { icon: 'cart',   text: 'Je online omzet is <strong class="up">12,3% hoger</strong><br/>dan dezelfde week vorig jaar.' },
    ],
  },

  ziekenstraat: {
    kpis: {
      omzet:     { value: '€ 19.420', delta: '+7,4%', dir: 'up' },
      besteding: { value: '€ 13,77',  delta: '+1,4%', dir: 'up' },
      retouren:  { value: '€ 138',    delta: '+3,8%', dir: 'up' },
      fourth:    { label: 'Aantal klanten', value: '1.410', delta: '+5,9%', dir: 'up', icon: 'klant' },
    },
    summary: 'Winkel Ziekenstraat draaide deze week <strong>€ 19.420</strong> omzet. Dat is <strong class="up">7,4% hoger</strong> dan dezelfde week vorig jaar — de sterkste week sinds Pasen.',
    rows: [
      { icon: 'trend',  text: 'Omzet is <strong class="up">7,4% hoger</strong><br/>dan dezelfde week vorig jaar.' },
      { icon: 'return', text: 'Retouren zijn <strong class="up">3,8% hoger</strong><br/>dan vorig jaar.' },
      { icon: 'people', text: 'Besteding per klant is <strong class="up">1,4% hoger</strong><br/>t.o.v. vorig jaar.' },
      { icon: 'klant',  text: '<strong>1.410 klanten</strong> deze week,<br/><strong class="up">5,9% meer</strong> dan vorig jaar.' },
    ],
  },

  heyendaal: {
    kpis: {
      omzet:     { value: '€ 16.110', delta: '+4,1%', dir: 'up' },
      besteding: { value: '€ 13,43',  delta: '+0,6%', dir: 'up' },
      retouren:  { value: '€ 115',    delta: '+5,2%', dir: 'up' },
      fourth:    { label: 'Aantal klanten', value: '1.200', delta: '+3,5%', dir: 'up', icon: 'klant' },
    },
    summary: 'Winkel Heyendaal kwam uit op <strong>€ 16.110</strong> omzet, <strong class="up">4,1% hoger</strong> dan vorig jaar. Stabiele groei in lijn met de trend.',
    rows: [
      { icon: 'trend',  text: 'Omzet is <strong class="up">4,1% hoger</strong><br/>dan dezelfde week vorig jaar.' },
      { icon: 'return', text: 'Retouren zijn <strong class="up">5,2% hoger</strong><br/>dan vorig jaar — even bekijken.' },
      { icon: 'people', text: 'Besteding per klant is <strong class="up">0,6% hoger</strong><br/>t.o.v. vorig jaar.' },
      { icon: 'klant',  text: '<strong>1.200 klanten</strong> deze week,<br/><strong class="up">3,5% meer</strong> dan vorig jaar.' },
    ],
  },

  lent: {
    kpis: {
      omzet:     { value: '€ 12.860', delta: '+9,2%', dir: 'up' },
      besteding: { value: '€ 13,90',  delta: '+2,1%', dir: 'up' },
      retouren:  { value: '€ 92',     delta: '+4,1%', dir: 'up' },
      fourth:    { label: 'Aantal klanten', value: '925', delta: '+6,8%', dir: 'up', icon: 'klant' },
    },
    summary: 'Winkel Lent presteert sterk met <strong>€ 12.860</strong> omzet, <strong class="up">9,2% hoger</strong> dan vorig jaar. De grootste stijger van deze week.',
    rows: [
      { icon: 'trend',  text: 'Omzet is <strong class="up">9,2% hoger</strong><br/>dan dezelfde week vorig jaar.' },
      { icon: 'return', text: 'Retouren zijn <strong class="up">4,1% hoger</strong><br/>dan vorig jaar.' },
      { icon: 'people', text: 'Besteding per klant is <strong class="up">2,1% hoger</strong><br/>t.o.v. vorig jaar.' },
      { icon: 'klant',  text: '<strong>925 klanten</strong> deze week,<br/><strong class="up">6,8% meer</strong> dan vorig jaar.' },
    ],
  },

  daalseweg: {
    kpis: {
      omzet:     { value: '€ 9.850',  delta: '-1,3%', dir: 'down' },
      besteding: { value: '€ 13,68',  delta: '-0,3%', dir: 'down' },
      retouren:  { value: '€ 71',     delta: '+2,9%', dir: 'up' },
      fourth:    { label: 'Aantal klanten', value: '720', delta: '-1,0%', dir: 'down', icon: 'klant' },
    },
    summary: 'Winkel Daalseweg sloot deze week af op <strong>€ 9.850</strong> omzet, <strong class="down">1,3% lager</strong> dan vorig jaar. Lichte daling, het volgen waard.',
    rows: [
      { icon: 'trend',  text: 'Omzet is <strong class="down">1,3% lager</strong><br/>dan dezelfde week vorig jaar.' },
      { icon: 'return', text: 'Retouren zijn <strong class="up">2,9% hoger</strong><br/>dan vorig jaar.' },
      { icon: 'people', text: 'Besteding per klant is <strong class="down">0,3% lager</strong><br/>t.o.v. vorig jaar.' },
      { icon: 'klant',  text: '<strong>720 klanten</strong> deze week,<br/><strong class="down">1,0% minder</strong> dan vorig jaar.' },
    ],
  },
};

// ----- render helpers -----

function arrow(dir) {
  return dir === 'down' ? '↓' : '↑';
}

function renderKpiCard(kpiKey, data) {
  const card = document.querySelector(`[data-kpi="${kpiKey}"]`);
  if (!card) return;

  const valueEl = card.querySelector('[data-field="value"]');
  const deltaEl = card.querySelector('[data-field="delta"]');
  if (valueEl) valueEl.textContent = data.value;
  if (deltaEl) {
    deltaEl.textContent = `${arrow(data.dir)} ${data.delta}`;
    deltaEl.className = data.dir === 'down' ? 'delta-down' : 'delta-up';
  }

  // The fourth KPI also has a swappable label + icon
  const labelEl = card.querySelector('[data-field="label"]');
  const iconEl = card.querySelector('[data-field="icon"]');
  if (labelEl && data.label) labelEl.textContent = data.label;
  if (iconEl && data.icon) iconEl.innerHTML = ICONS[data.icon] || '';
}

function renderInsight(store) {
  const textEl = document.getElementById('insightText');
  const rowsEl = document.getElementById('insightRows');
  if (textEl) textEl.innerHTML = store.summary;
  if (rowsEl) {
    rowsEl.innerHTML = store.rows.map(r => `
      <div class="insight-row">
        <span class="row-icon">${ICONS[r.icon] || ''}</span>
        <span>${r.text}</span>
      </div>
    `).join('');
  }
}

function renderStore(storeKey) {
  const store = STORES[storeKey];
  if (!store) return;

  renderKpiCard('omzet', store.kpis.omzet);
  renderKpiCard('besteding', store.kpis.besteding);
  renderKpiCard('retouren', store.kpis.retouren);
  renderKpiCard('fourth', store.kpis.fourth);
  renderInsight(store);

  document.querySelectorAll('.store-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.store === storeKey);
  });
}

// ----- init -----

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.store-tab').forEach(tab => {
    tab.addEventListener('click', () => renderStore(tab.dataset.store));
  });
  renderStore('totaal');
});
