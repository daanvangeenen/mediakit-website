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

const CLOSING_DEFAULT = 'Wil je meer weten over een specifiek onderdeel? Klik op een van de blokjes hieronder.';

const STORES = {
  totaal: {
    name: 'Totaal',
    intro: 'Het was een goede week voor de winkels!',
    bullets: [
      'Je <strong>omzet</strong> is <strong class="up">6,8% hoger</strong> dan vorig jaar — <strong>€ 67.450</strong> in totaal.',
      'Je had <strong class="up">5,6% meer klanten</strong>, in totaal <strong>4.895</strong>.',
      'De <strong>besteding per klant</strong> bleef stabiel op <strong>€ 13,78</strong> (+1,1%).',
      'Retouren stegen licht naar <strong>€ 482</strong> (+4,2%) — niets om je zorgen over te maken.',
    ],
    closing: CLOSING_DEFAULT,
    kpis: {
      omzet:     { value: '€ 67.450', delta: '+6,8%', dir: 'up' },
      klanten:   { value: '4.895',    delta: '+5,6%', dir: 'up' },
      besteding: { value: '€ 13,78',  delta: '+1,1%', dir: 'up' },
      retouren:  { value: '€ 482',    delta: '+4,2%', dir: 'up' },
    },
  },

  ziekenstraat: {
    name: 'Ziekenstraat',
    intro: 'Het was een sterke week voor Ziekenstraat!',
    bullets: [
      'Je <strong>omzet</strong> groeide met <strong class="up">7,4%</strong> naar <strong>€ 19.420</strong> — de hoogste van al je winkels.',
      'Je bediende <strong>1.410 klanten</strong>, <strong class="up">5,9% meer</strong> dan vorig jaar.',
      'De gemiddelde <strong>besteding per klant</strong> kwam uit op <strong>€ 13,77</strong> (+1,4%).',
      'Retouren stegen licht naar <strong>€ 138</strong> (+3,8%).',
    ],
    closing: CLOSING_DEFAULT,
    kpis: {
      omzet:     { value: '€ 19.420', delta: '+7,4%', dir: 'up' },
      klanten:   { value: '1.410',    delta: '+5,9%', dir: 'up' },
      besteding: { value: '€ 13,77',  delta: '+1,4%', dir: 'up' },
      retouren:  { value: '€ 138',    delta: '+3,8%', dir: 'up' },
    },
  },

  heyendaal: {
    name: 'Heyendaal',
    intro: 'Een stabiele week voor Heyendaal.',
    bullets: [
      'Je <strong>omzet</strong> steeg met <strong class="up">4,1%</strong> naar <strong>€ 16.110</strong>.',
      '<strong>1.200 klanten</strong> kwamen langs — <strong class="up">3,5% meer</strong> dan vorig jaar.',
      'De gemiddelde besteding per klant is <strong>€ 13,43</strong> (+0,6%).',
      'Let op: <strong>retouren</strong> stijgen sneller dan omzet — <strong class="up">+5,2%</strong> naar € 115. Even bekijken.',
    ],
    closing: CLOSING_DEFAULT,
    kpis: {
      omzet:     { value: '€ 16.110', delta: '+4,1%', dir: 'up' },
      klanten:   { value: '1.200',    delta: '+3,5%', dir: 'up' },
      besteding: { value: '€ 13,43',  delta: '+0,6%', dir: 'up' },
      retouren:  { value: '€ 115',    delta: '+5,2%', dir: 'up' },
    },
  },

  lent: {
    name: 'Lent',
    intro: 'Lent is de grootste stijger van deze week!',
    bullets: [
      'Je <strong>omzet</strong> groeide met <strong class="up">9,2%</strong> naar <strong>€ 12.860</strong> — de sterkste groei van al je winkels.',
      '<strong>925 klanten</strong> bezochten de winkel — <strong class="up">6,8% meer</strong> dan vorig jaar.',
      'De gemiddelde <strong>besteding per klant</strong> van <strong>€ 13,90</strong> is de hoogste van al je winkels.',
      'Retouren bleven beheerst op <strong>€ 92</strong> (+4,1%).',
    ],
    closing: CLOSING_DEFAULT,
    kpis: {
      omzet:     { value: '€ 12.860', delta: '+9,2%', dir: 'up' },
      klanten:   { value: '925',      delta: '+6,8%', dir: 'up' },
      besteding: { value: '€ 13,90',  delta: '+2,1%', dir: 'up' },
      retouren:  { value: '€ 92',     delta: '+4,1%', dir: 'up' },
    },
  },

  daalseweg: {
    name: 'Daalseweg',
    intro: 'Een wat mindere week voor Daalseweg.',
    bullets: [
      'Je <strong>omzet</strong> daalde licht met <strong class="down">1,3%</strong> naar <strong>€ 9.850</strong>.',
      '<strong>720 klanten</strong> kwamen langs — <strong class="down">1,0% minder</strong> dan vorig jaar.',
      'De gemiddelde besteding daalde naar <strong>€ 13,68</strong> (−0,3%).',
      'Retouren stegen met <strong class="up">2,9%</strong> naar <strong>€ 71</strong>.',
    ],
    closing: 'Klik op een van de blokjes hieronder voor meer details over wat hier speelt.',
    kpis: {
      omzet:     { value: '€ 9.850',  delta: '-1,3%', dir: 'down' },
      klanten:   { value: '720',      delta: '-1,0%', dir: 'down' },
      besteding: { value: '€ 13,68',  delta: '-0,3%', dir: 'down' },
      retouren:  { value: '€ 71',     delta: '+2,9%', dir: 'up' },
    },
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

  const introEl = document.getElementById('heroIntro');
  const bulletsEl = document.getElementById('heroBullets');
  const closingEl = document.getElementById('heroClosing');
  if (introEl) introEl.textContent = store.intro;
  if (bulletsEl) bulletsEl.innerHTML = store.bullets.map(b => `<li>${b}</li>`).join('');
  if (closingEl) closingEl.textContent = store.closing || CLOSING_DEFAULT;

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
