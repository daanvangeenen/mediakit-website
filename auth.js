// ===== Strik Patisserie — client-side auth (demo only) =====
// NOTE: This is a demo gate. Real auth needs a backend.

const AUTH = {
  VALID_EMAIL: 'daan@software.nl',
  VALID_PASSWORD: 'daan123',
  KEY: 'strik_auth',
};

function isLoggedIn() {
  try {
    const raw = localStorage.getItem(AUTH.KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    return !!data && data.email === AUTH.VALID_EMAIL;
  } catch (e) {
    return false;
  }
}

function login(email, password) {
  const e = (email || '').trim().toLowerCase();
  const p = password || '';
  if (e === AUTH.VALID_EMAIL && p === AUTH.VALID_PASSWORD) {
    localStorage.setItem(AUTH.KEY, JSON.stringify({ email: e, ts: Date.now() }));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem(AUTH.KEY);
  window.location.href = 'login.html';
}

// Guard: redirect to login if not authenticated.
// Call this immediately on protected pages (in <head>) to avoid a flash.
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.replace('login.html');
  }
}

// Inverse guard: if already logged in, skip the login page.
function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.replace('index.html');
  }
}

// ----- Login form wiring (runs on login.html) -----
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  redirectIfLoggedIn();

  const errorEl = document.getElementById('loginError');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (login(email, password)) {
      window.location.href = 'index.html';
    } else {
      errorEl.textContent = 'Onjuist e-mailadres of wachtwoord. Probeer het opnieuw.';
      errorEl.classList.add('visible');
    }
  });
});

// ----- Logout dropdown wiring (runs on protected pages) -----
document.addEventListener('DOMContentLoaded', () => {
  const userMenu = document.getElementById('userMenu');
  if (!userMenu) return;

  const trigger = userMenu.querySelector('.user');
  const dropdown = userMenu.querySelector('.user-dropdown');
  const logoutBtn = userMenu.querySelector('.logout-btn');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => dropdown.classList.remove('open'));
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
});
