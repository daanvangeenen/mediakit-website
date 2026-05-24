// ===== Strik Patisserie dashboard — store switching =====
//
// Klant: Strik Patisserie.  Software: Yield.
//
// Per-store data is fictitious. Physical stores + webshop (verstopt in Totaal)
// sommeren naar de Totaal-cijfers:
//
//   Omzet:    19.420 + 16.110 + 12.860 + 9.850 + 9.210 (webshop) = 67.450
//   Klanten:   1.410 +  1.200 +    925 +   720 +    640 (webshop) =  4.895
//   Retouren:    138 +    115 +     92 +    71 +     66 (webshop) =    482
//   Besteding per klant (gewogen): 67.450 / 4.895 ≈ € 13,78

const STORES = {
  totaal: {
    name: 'Totaal',
    kpis: {
      omzet:     { value: '€ 67.450', delta: '+6,8%', dir: 'up' },
      klanten:   { value: '4.895',    delta: '+5,6%', dir: 'up' },
      besteding: { value: '€ 13,78',  delta: '+1,1%', dir: 'up' },
      retouren:  { value: '€ 482',    delta: '+4,2%', dir: 'up' },
    },
    summary: 'Over al je winkels en de webshop draaide je deze week <strong>€ 67.450 omzet</strong> — <strong class="up">6,8% hoger</strong> dan dezelfde week vorig jaar. Je had <strong>4.895 klanten</strong> (+5,6%) die gemiddeld <strong>€ 13,78</strong> besteedden. Retouren zijn licht gestegen naar <strong>€ 482</strong> (+4,2%). Je zit mooi op koers.',
  },

  ziekenstraat: {
    name: 'Ziekenstraat',
    kpis: {
      omzet:     { value: '€ 19.420', delta: '+7,4%', dir: 'up' },
      klanten:   { value: '1.410',    delta: '+5,9%', dir: 'up' },
      besteding: { value: '€ 13,77',  delta: '+1,4%', dir: 'up' },
      retouren:  { value: '€ 138',    delta: '+3,8%', dir: 'up' },
    },
    summary: 'Winkel Ziekenstraat is je sterkste winkel deze week met <strong>€ 19.420 omzet</strong> (<strong class="up">+7,4%</strong> t.o.v. vorig jaar). Je bediende <strong>1.410 klanten</strong> (+5,9%) die gemiddeld <strong>€ 13,77</strong> besteedden. Retouren stegen licht naar <strong>€ 138</strong> (+3,8%).',
  },

  heyendaal: {
    name: 'Heyendaal',
    kpis: {
      omzet:     { value: '€ 16.110', delta: '+4,1%', dir: 'up' },
      klanten:   { value: '1.200',    delta: '+3,5%', dir: 'up' },
      besteding: { value: '€ 13,43',  delta: '+0,6%', dir: 'up' },
      retouren:  { value: '€ 115',    delta: '+5,2%', dir: 'up' },
    },
    summary: 'Winkel Heyendaal draaide deze week <strong>€ 16.110</strong> omzet — <strong class="up">4,1% hoger</strong> dan vorig jaar. <strong>1.200 klanten</strong> (+3,5%) besteedden gemiddeld <strong>€ 13,43</strong>. Stabiele groei, maar de retouren stijgen iets sneller (<strong>€ 115</strong>, +5,2%) — het bekijken waard.',
  },

  lent: {
    name: 'Lent',
    kpis: {
      omzet:     { value: '€ 12.860', delta: '+9,2%', dir: 'up' },
      klanten:   { value: '925',      delta: '+6,8%', dir: 'up' },
      besteding: { value: '€ 13,90',  delta: '+2,1%', dir: 'up' },
      retouren:  { value: '€ 92',     delta: '+4,1%', dir: 'up' },
    },
    summary: 'Winkel Lent is de grootste stijger van deze week met <strong>€ 12.860 omzet</strong> (<strong class="up">+9,2%</strong>). <strong>925 klanten</strong> kwamen langs (+6,8%) en gaven gemiddeld <strong>€ 13,90</strong> uit — de hoogste besteding per klant van al je winkels.',
  },

  daalseweg: {
    name: 'Daalseweg',
    kpis: {
      omzet:     { value: '€ 9.850',  delta: '-1,3%', dir: 'down' },
      klanten:   { value: '720',      delta: '-1,0%', dir: 'down' },
      besteding: { value: '€ 13,68',  delta: '-0,3%', dir: 'down' },
      retouren:  { value: '€ 71',     delta: '+2,9%', dir: 'up' },
    },
    summary: 'Winkel Daalseweg sloot de week af op <strong>€ 9.850 omzet</strong>, <strong class="down">1,3% lager</strong> dan vorig jaar. Met <strong>720 klanten</strong> (−1,0%) en een gemiddelde besteding van <strong>€ 13,68</strong> (−0,3%) is dit je zwakste week sinds maart. Het volgen waard.',
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
}

function renderStore(storeKey) {
  const store = STORES[storeKey];
  if (!store) return;

  renderKpiCard('omzet', store.kpis.omzet);
  renderKpiCard('klanten', store.kpis.klanten);
  renderKpiCard('besteding', store.kpis.besteding);
  renderKpiCard('retouren', store.kpis.retouren);

  const hero = document.getElementById('heroText');
  if (hero) hero.innerHTML = store.summary;

  const name = document.getElementById('currentStoreName');
  if (name) name.textContent = store.name;

  document.querySelectorAll('.store-selector-menu button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.store === storeKey);
  });
}

// ----- store selector wiring -----

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('storeSelector');
  if (!selector) return;

  const trigger = selector.querySelector('.store-selector-btn');
  const menu = selector.querySelector('.store-selector-menu');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    selector.classList.toggle('open');
  });
  document.addEventListener('click', () => selector.classList.remove('open'));

  menu.querySelectorAll('button[data-store]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      renderStore(btn.dataset.store);
      selector.classList.remove('open');
    });
  });

  renderStore('totaal');
});
