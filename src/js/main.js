import '../styles/main.css';

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = `${mx}px`;
  cursor.style.top = `${my}px`;
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;
  requestAnimationFrame(animRing);
}

animRing();

document.querySelectorAll('a,button,.feature-card,.coming-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    ring.style.borderColor = 'rgba(220,220,220,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(220,220,220,0.5)';
  });
});

// Nav scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => obs.observe(el));

// Count-up animation
function countUp(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  const timer = setInterval(() => {
    start = Math.min(start + increment, target);
    el.textContent = `${Math.floor(start).toLocaleString()}${suffix || '+'}`;
    if (start >= target) clearInterval(timer);
  }, step);
}

const statObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        if (!el.dataset.suffix && el.dataset.count) countUp(el, target, '+');
        statObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll('.stat-num[data-count]').forEach((el) => statObs.observe(el));

// CTA handler
function handleCTA() {
  const input = document.getElementById('phoneInput');
  const val = input.value.trim();
  if (!val) {
    input.focus();
    return;
  }
  const btn = document.querySelector('.cta-btn');
  btn.textContent = "✓ You're In";
  btn.style.background = '#4ade80';
  btn.style.color = '#050505';
  input.value = '';
  input.placeholder = "We'll be in touch soon!";
  setTimeout(() => {
    btn.textContent = 'Join Now';
    btn.style.background = '';
    btn.style.color = '';
  }, 4000);
}

// Buy/Sell/Rent intent tabs
function switchIntent(intent, btn) {
  document.querySelectorAll('.intent-tab').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('.intent-panel').forEach((p) => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`panel-${intent}`).classList.add('active');
}

// Residential / Commercial category tabs
function switchCat(intent, cat, btn) {
  const panel = document.getElementById(`panel-${intent}`);
  panel.querySelectorAll('.cat-tab').forEach((t) => t.classList.remove('active'));
  panel.querySelectorAll('.cat-panel').forEach((p) => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`${intent}-${cat}`).classList.add('active');
}

const progObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.progress-fill').forEach((bar) => {
          const w = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = w;
          }, 200);
        });
        progObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll('.coming-card').forEach((c) => progObs.observe(c));

// Expose handlers used by inline onclick attributes in index.html
window.handleCTA = handleCTA;
window.switchIntent = switchIntent;
window.switchCat = switchCat;
