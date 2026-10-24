import { profile, projects, skills, experience } from './data.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const PALETTE = ['#ff4ecd', '#ff9f43', '#3ef0ff', '#b8ff5c', '#8b5cf6', '#ffd93d'];
const color = (i) => PALETTE[i % PALETTE.length];

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const initials = (text) =>
  text
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/* ---------- Render content from data.js ---------- */

function renderHero() {
  document.title = `${profile.name} — ${profile.roles[0]}`;
  $('#logo').innerHTML = `${esc(profile.initials)}<span>.</span>`;

  const [first, ...rest] = profile.name.split(' ');
  const lines = [first, rest.join(' ')].filter(Boolean);
  let i = 0;
  const html = lines
    .map((line, li) => {
      const chars = [...line]
        .map((ch) => {
          const style = `--i:${i}` + (li === 1 ? `;color:${color(i)}` : '');
          i++;
          return ch === ' ' ? ' ' : `<span class="char" style="${style}">${esc(ch)}</span>`;
        })
        .join('');
      return `<span class="line" aria-hidden="true">${chars}</span>`;
    })
    .join('');
  $('#hero-name').innerHTML = `<span class="sr-only">${esc(profile.name)}</span>${html}`;

  $('#hero-status').textContent = profile.available ? 'Available for new projects' : profile.location;
  $('#hero-tagline').textContent = profile.tagline;

  const resume = $('#resume-link');
  if (profile.resume) {
    resume.href = profile.resume;
    resume.setAttribute('download', '');
  } else {
    resume.addEventListener('click', (e) => {
      e.preventDefault();
      toast('Resume coming soon ✨');
    });
  }
}

function renderMarquee() {
  const items = skills.flatMap((g) => g.items);
  const row = items.map((s) => `<span class="marquee-item">${esc(s)}</span>`).join('');
  $('#marquee-track').innerHTML = row + row;
}

function renderAbout() {
  $('#avatar-initials').textContent = profile.initials;
  $('#about-bio').innerHTML = profile.bio
    .map((p, i) => `<p class="reveal${i === 0 ? ' lead' : ''}" style="--d:${i * 0.1}s">${esc(p)}</p>`)
    .join('');
  $('#about-stats').innerHTML = profile.stats
    .map(
      (s, i) => `
      <li class="stat reveal" style="--d:${0.2 + i * 0.1}s">
        <span class="stat-value" data-count="${s.value}" data-suffix="${esc(s.suffix)}" style="color:${color(i)}">${s.value}${esc(s.suffix)}</span>
        <span class="stat-label">${esc(s.label)}</span>
      </li>`,
    )
    .join('');
}

function renderProjects() {
  $('#projects-grid').innerHTML = projects
    .map((p, i) => {
      const [c1, c2] = p.colors || [color(i), color(i + 2)];
      const media = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy" />`
        : `<div class="project-art" aria-hidden="true">
             <span class="project-mono">${esc(initials(p.title))}</span>
             <i class="shape s1"></i><i class="shape s2"></i><i class="shape s3"></i>
           </div>`;
      const links = [
        p.live && `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live site <span class="arrow">↗</span></a>`,
        p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Source <span class="arrow">↗</span></a>`,
      ]
        .filter(Boolean)
        .join('');
      return `
        <li class="project reveal${p.featured ? ' featured' : ''}" style="--d:${(i % 2) * 0.1}s">
          <article class="project-card" data-tilt style="--c1:${c1};--c2:${c2}">
            <div class="project-media${p.image ? '' : ' has-art'}">${media}</div>
            <div class="project-body">
              <p class="project-meta"><span>${esc(p.category)}</span><span>${esc(p.year)}</span></p>
              <h3 class="project-title">${esc(p.title)}</h3>
              <p class="project-desc">${esc(p.description)}</p>
              <ul class="tags">${p.tech.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul>
              ${links ? `<div class="project-links">${links}</div>` : ''}
            </div>
          </article>
        </li>`;
    })
    .join('');
}

function renderSkills() {
  $('#skills-grid').innerHTML = skills
    .map(
      (g, i) => `
      <article class="skill-group reveal" style="--c:${color(i)};--d:${i * 0.08}s">
        <span class="skill-num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(g.title)}</h3>
        <p>${esc(g.blurb)}</p>
        <ul class="chips">${g.items.map((s) => `<li class="chip">${esc(s)}</li>`).join('')}</ul>
      </article>`,
    )
    .join('');
}

function renderExperience() {
  $('#timeline').innerHTML = experience
    .map(
      (e, i) => `
      <li class="tl-item reveal" style="--c:${color(i)}">
        <span class="tl-dot" aria-hidden="true"></span>
        <div class="tl-card">
          <p class="tl-period">${esc(e.period)}${e.type === 'education' ? ' · Education' : ''}</p>
          <h3 class="tl-role">${esc(e.role)}</h3>
          <p class="tl-org">${esc(e.org)}</p>
          <p class="tl-desc">${esc(e.description)}</p>
        </div>
      </li>`,
    )
    .join('');
}

function renderContact() {
  const email = $('#contact-email');
  email.href = `mailto:${profile.email}`;
  email.textContent = profile.email;
  $('#socials').innerHTML = profile.socials
    .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} <span aria-hidden="true">↗</span></a></li>`)
    .join('');
  $('#footer-copy').textContent = `© ${new Date().getFullYear()} ${profile.name}. Designed & built with lots of ☕.`;
}

/* ---------- Effects ---------- */

function runLoader() {
  return new Promise((resolve) => {
    const loader = $('#loader');
    if (reduceMotion) {
      loader.remove();
      return resolve();
    }
    const count = $('#loader-count');
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      count.textContent = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      if (p < 1) return requestAnimationFrame(tick);
      loader.classList.add('done');
      setTimeout(() => loader.remove(), 1000);
      resolve();
    };
    requestAnimationFrame(tick);
  });
}

function typeRoles(el, roles) {
  if (reduceMotion) {
    el.textContent = roles[0];
    return;
  }
  let r = 0;
  let i = 0;
  let deleting = false;
  const step = () => {
    const word = roles[r];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let delay = deleting ? 40 : 85;
    if (!deleting && i === word.length) {
      deleting = true;
      delay = 1700;
    } else if (deleting && i === 0) {
      deleting = false;
      r = (r + 1) % roles.length;
      delay = 300;
    }
    setTimeout(step, delay);
  };
  step();
}

function initCursor() {
  if (!finePointer || reduceMotion) return;
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  document.body.classList.add('has-cursor');
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  window.addEventListener(
    'pointermove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    },
    { passive: true },
  );
  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener('pointerover', (e) => {
    ring.classList.toggle('is-hover', !!e.target.closest('a, button, input, textarea, .chip, [data-tilt]'));
  });
  document.addEventListener('pointerdown', () => ring.classList.add('is-down'));
  document.addEventListener('pointerup', () => ring.classList.remove('is-down'));
  document.documentElement.addEventListener('pointerleave', () => document.body.classList.remove('has-cursor'));
  document.documentElement.addEventListener('pointerenter', () => document.body.classList.add('has-cursor'));
}

function initReveal() {
  const els = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );
  els.forEach((el) => io.observe(el));
}

function initCounters() {
  if (reduceMotion) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target;
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1400, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 },
  );
  $$('[data-count]').forEach((el) => {
    el.textContent = '0' + el.dataset.suffix;
    io.observe(el);
  });
}

function initTilt() {
  if (!finePointer || reduceMotion) return;
  $$('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  $$('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}

function initScroll() {
  const bar = $('#progress');
  const nav = $('#nav');
  const timeline = $('#timeline');
  const heroContent = $('#hero-content');
  const onScroll = () => {
    const doc = document.documentElement;
    const y = doc.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('scrolled', y > 40);

    if (!reduceMotion && y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.25}px)`;
      heroContent.style.opacity = String(1 - y / (window.innerHeight * 0.9));
    }

    const r = timeline.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight * 0.7 - r.top) / r.height, 0), 1);
    timeline.style.setProperty('--progress', progress);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

function initNav() {
  const links = $$('#nav-links a');
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((a) => a.classList.remove('active'));
        byId.get(entry.target.id)?.classList.add('active');
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  $$('main section[id]').forEach((s) => io.observe(s));

  const toggle = $('#menu-toggle');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  links.forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
}

function initContactForm() {
  // Opens the visitor's email app. Swap for Formspree/EmailJS to send directly.
  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast('Opening your email app…');
    form.reset();
  });
}

let toastTimer;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function initScene() {
  import('./scene.js')
    .then(({ initScene }) => initScene($('#hero-canvas'), { reduceMotion }))
    .catch((err) => {
      console.warn('3D scene unavailable, using fallback.', err);
      document.body.classList.add('no-webgl');
    });
}

/* ---------- Boot ---------- */

renderHero();
renderMarquee();
renderAbout();
renderProjects();
renderSkills();
renderExperience();
renderContact();

initCursor();
initReveal();
initCounters();
initTilt();
initMagnetic();
initScroll();
initNav();
initContactForm();
initScene();

runLoader().then(() => {
  document.body.classList.add('loaded');
  setTimeout(() => typeRoles($('#typed'), profile.roles), reduceMotion ? 0 : 900);
});
