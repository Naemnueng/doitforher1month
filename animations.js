// ── MY MELODY PARTICLES ────────────────────────────────
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  // My Melody themed symbols & colors
  const SYMBOLS = ['♡', '🌸', '✿', '★', '·', '♪', '✦', '❀'];
  const COLORS = ['#f472b6', '#db2777', '#fda4af', '#f9a8d4', '#e879f9', '#c084fc'];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function Particle() { this.reset(true); }
  Particle.prototype.reset = function (initial) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : H + 20;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -(Math.random() * 0.7 + 0.25);
    this.size = Math.random() * 13 + 7;
    this.alpha = Math.random() * 0.45 + 0.1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.sym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  };
  Particle.prototype.update = function () {
    this.x += this.vx; this.y += this.vy; this.alpha -= 0.0007;
    if (this.y < -40 || this.alpha <= 0) this.reset(false);
  };
  Particle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.font = this.size + 'px serif';
    ctx.fillText(this.sym, this.x, this.y);
    ctx.restore();
  };

  function init() { resize(); particles = Array.from({ length: 60 }, () => new Particle()); }
  function loop() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(loop); }

  window.addEventListener('resize', resize);
  init(); loop();
})();

// ── SCROLL REVEAL ──────────────────────────────────────
(function () {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ── MOBILE NAV ─────────────────────────────────────────
(function () {
  const btn = document.getElementById('hamburger');
  const ul = document.getElementById('nav-links');
  if (!btn || !ul) return;
  btn.addEventListener('click', () => ul.classList.toggle('open'));
})();

// ── ACTIVE LINK ────────────────────────────────────────
(function () {
  const links = document.querySelectorAll('nav ul li a');
  const page = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

// ── ANNIVERSARY DAY COUNTER ────────────────────────────
(function () {
  const el = document.getElementById('counter-days');
  if (!el) return;
  const start = new Date('2026-02-14'); // ← change your start date
  const days = Math.floor((new Date() - start) / 86400000);
  el.textContent = days;
})();

// ── SPARKLE BUTTON EFFECT ──────────────────────────────
window.launchFirework = function (e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#f472b6', '#db2777', '#f9a8d4', '#e879f9', '#fbbf24'];
  for (let i = 0; i < 16; i++) {
    const spark = document.createElement('span');
    spark.style.cssText = `
      position:fixed; left:${cx}px; top:${cy}px;
      width:7px; height:7px; border-radius:50%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events:none; z-index:9999;
      animation: spark-out 0.75s ease forwards;
      --dx:${(Math.random() - 0.5) * 130}px;
      --dy:${(Math.random() - 0.5) * 130}px;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  }
};

const sparkStyle = document.createElement('style');
sparkStyle.textContent = `@keyframes spark-out {
  0%   { transform:translate(0,0) scale(1); opacity:1; }
  100% { transform:translate(var(--dx),var(--dy)) scale(0); opacity:0; }
}`;
document.head.appendChild(sparkStyle);
