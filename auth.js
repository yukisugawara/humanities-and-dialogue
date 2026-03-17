// Simple password protection
(function() {
  const PASS_HASH = '2026';
  const STORAGE_KEY = 'hd_auth_2026';

  if (sessionStorage.getItem(STORAGE_KEY) === 'true') return;

  // Hide page content
  document.body.style.visibility = 'hidden';

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = `
    <div style="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;
      background:linear-gradient(-45deg,#fef3c7,#fce7f3,#e0e7ff,#ccfbf1);background-size:400% 400%;
      animation:authGrad 20s ease infinite;font-family:'Noto Sans JP',sans-serif;">
      <div style="background:rgba(255,255,255,0.8);backdrop-filter:blur(20px);border-radius:2rem;
        padding:2.5rem;max-width:360px;width:90%;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,0.1);
        border:1px solid rgba(255,255,255,0.9);">
        <div style="margin-bottom:1.5rem;">
          <svg width="64" height="64" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0 auto;">
            <defs>
              <linearGradient id="authA" x1="0" y1="0" x2="70" y2="70"><stop stop-color="#c084fc"/><stop offset="1" stop-color="#818cf8"/></linearGradient>
              <linearGradient id="authB" x1="50" y1="30" x2="120" y2="100"><stop stop-color="#f9a8d4"/><stop offset="1" stop-color="#fb923c"/></linearGradient>
            </defs>
            <ellipse cx="44" cy="52" rx="32" ry="28" fill="url(#authA)" opacity="0.85"/>
            <ellipse cx="76" cy="58" rx="32" ry="28" fill="url(#authB)" opacity="0.75"/>
            <ellipse cx="60" cy="55" rx="14" ry="12" fill="white" opacity="0.5"/>
            <circle cx="36" cy="48" r="3" fill="white" opacity="0.9"/>
            <circle cx="42" cy="44" r="2" fill="white" opacity="0.7"/>
            <circle cx="82" cy="54" r="3" fill="white" opacity="0.9"/>
            <circle cx="76" cy="50" r="2" fill="white" opacity="0.7"/>
          </svg>
        </div>
        <p style="font-size:1.1rem;font-weight:800;color:#1f2937;margin-bottom:0.25rem;">人文学と対話</p>
        <p style="font-size:0.75rem;color:#9ca3af;margin-bottom:1.5rem;">パスワードを入力してください</p>
        <input id="auth-input" type="password" placeholder="パスワード"
          style="width:100%;padding:0.75rem 1rem;border-radius:1rem;border:2px solid #e5e7eb;
          font-size:1rem;text-align:center;outline:none;transition:border 0.2s;box-sizing:border-box;"
          onfocus="this.style.borderColor='#7c3aed'" onblur="this.style.borderColor='#e5e7eb'">
        <p id="auth-error" style="color:#ef4444;font-size:0.75rem;margin-top:0.5rem;display:none;">パスワードが違います</p>
        <button id="auth-btn"
          style="margin-top:1rem;width:100%;padding:0.75rem;border-radius:1rem;border:none;
          background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-size:0.9rem;
          font-weight:700;cursor:pointer;transition:opacity 0.2s;"
          onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
          入る
        </button>
      </div>
    </div>
    <style>@keyframes authGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}</style>
  `;
  document.body.appendChild(overlay);
  document.body.style.visibility = 'visible';

  const input = document.getElementById('auth-input');
  const btn = document.getElementById('auth-btn');
  const error = document.getElementById('auth-error');

  function tryAuth() {
    if (input.value === PASS_HASH) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      overlay.style.transition = 'opacity 0.5s ease';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 500);
    } else {
      error.style.display = 'block';
      input.style.borderColor = '#ef4444';
      input.value = '';
      setTimeout(() => { error.style.display = 'none'; input.style.borderColor = '#e5e7eb'; }, 2000);
    }
  }

  btn.addEventListener('click', tryAuth);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryAuth(); });
  setTimeout(() => input.focus(), 100);
})();
