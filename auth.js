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
          <svg width="72" height="72" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0 auto;">
            <defs>
              <linearGradient id="aA" x1="0" y1="0" x2="50" y2="60"><stop stop-color="#a78bfa"/><stop offset="1" stop-color="#6366f1"/></linearGradient>
              <linearGradient id="aB" x1="30" y1="10" x2="90" y2="70"><stop stop-color="#67e8f9"/><stop offset="1" stop-color="#06b6d4"/></linearGradient>
              <linearGradient id="aC" x1="50" y1="20" x2="110" y2="90"><stop stop-color="#f9a8d4"/><stop offset="1" stop-color="#ec4899"/></linearGradient>
              <linearGradient id="aD" x1="70" y1="40" x2="130" y2="110"><stop stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
              <linearGradient id="aE" x1="90" y1="50" x2="150" y2="120"><stop stop-color="#86efac"/><stop offset="1" stop-color="#22c55e"/></linearGradient>
            </defs>
            <path d="M12 58C12 42 24 30 40 30C56 30 68 42 68 58C68 74 56 82 40 82C37 82 34 81.5 31 80L18 87L21 77C15 72 12 65 12 58Z" fill="url(#aA)" opacity="0.8"/>
            <path d="M32 48C32 32 44 22 60 22C76 22 88 32 88 48C88 64 76 72 60 72C57 72 54 71.5 51 70L38 77L41 67C35 62 32 55 32 48Z" fill="url(#aB)" opacity="0.7"/>
            <path d="M52 68C52 52 64 42 80 42C96 42 108 52 108 68C108 84 96 92 80 92C77 92 74 91.5 71 90L58 97L61 87C55 82 52 75 52 68Z" fill="url(#aC)" opacity="0.7"/>
            <path d="M72 54C72 38 84 28 100 28C116 28 128 38 128 54C128 70 116 78 100 78C97 78 94 77.5 91 76L78 83L81 73C75 68 72 61 72 54Z" fill="url(#aD)" opacity="0.65"/>
            <path d="M92 72C92 56 104 46 120 46C136 46 148 56 148 72C148 88 136 96 120 96C117 96 114 95.5 111 94L98 101L101 91C95 86 92 79 92 72Z" fill="url(#aE)" opacity="0.6"/>
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
