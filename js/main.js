import { profile, skills, experience, education, certification, testReport } from './data.js';

const $ = (id) => document.getElementById(id);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

// Whole years worked since the career start date, updated automatically.
const yearsOfExperience = () => {
  const now = new Date();
  const { year, month } = profile.careerStart;
  let y = now.getFullYear() - year;
  if (now.getMonth() + 1 < month) y -= 1;
  return Math.max(y, 0);
};

// Hero
const [a, b, c] = profile.headline;
$('headline').innerHTML = `${a}<br>${b} <em>${c}</em>`;
$('lead').textContent = profile.summary;
$('badge').hidden = !profile.available;
$('linkedinBtn').href = profile.linkedin;
$('linkedinBtn2').href = profile.linkedin;
$('loc').textContent = profile.location;
$('foot').textContent = `© ${new Date().getFullYear()} ${profile.name}. Quality-checked.`;

if (profile.email) {
  $('emailBtn').href = `mailto:${profile.email}`;
  $('emailBtn').hidden = false;
}
document.querySelectorAll('.js-resume').forEach((a) => {
  if (!profile.resume) return;
  a.href = profile.resume;
  a.setAttribute('download', '');
  a.hidden = false;
});

// Live experience counter
const years = yearsOfExperience();
const yEl = $('years');
let n = 0;
const tick = setInterval(() => {
  n += 1;
  yEl.textContent = n >= years ? `${years}+` : n;
  if (n >= years) clearInterval(tick);
}, 110);

// Animated test report
const rep = $('report');
const lines = [
  ['dim', '$ run --suite nazneen.profile'],
  ...testReport.map(([k, t]) => [k, `${k === 'pass' ? '✔ PASS' : '⚠ WARN'} ${t}`]),
  ['dim', '------------------------------'],
  ['pass', `Experience: ${years}+ yrs · Status: available`],
];
lines.forEach(([cls, text], i) => {
  const d = el('div', cls, text.replace(/&/g, '&amp;'));
  d.style.animationDelay = `${0.3 + i * 0.28}s`;
  rep.appendChild(d);
});

// Highlights
profile.highlights.forEach((h) => {
  $('stats').appendChild(el('div', 'stat', `<b data-to="${h.value}" data-suffix="${h.suffix}">0${h.suffix}</b><span>${h.label}</span>`));
});

// About
profile.about.forEach((p) => $('about').appendChild(el('p', '', p)));

// Skills
skills.forEach((s) => {
  const card = el('div', 'skill reveal', `<h3>${s.title}</h3>`);
  const chips = el('div', 'chips');
  s.items.forEach((i) => chips.appendChild(el('span', '', i)));
  card.appendChild(chips);
  $('skills').appendChild(card);
});

// Experience
experience.forEach((j, i) => {
  const card = el(
    'article',
    `job reveal${i === 0 ? ' now' : ''}`,
    `<div class="job-head"><div><h3>${j.role}</h3><div class="org">${j.org} · ${j.place}</div></div><div class="period">${j.period}</div></div>`
  );
  const ul = el('ul');
  j.points.forEach((p) => ul.appendChild(el('li', '', p)));
  card.appendChild(ul);
  $('timeline').appendChild(card);
});

// Education & certification
$('edu').appendChild(
  el('div', 'card reveal', `<small>Education</small><h3>${education.school}</h3><p>${education.degree}</p><p>${education.detail}</p>`)
);
$('edu').appendChild(
  el(
    'div',
    'card reveal',
    `<small>Certification</small><h3>${certification.title}</h3><p>${certification.issuer}</p><p>${certification.detail}</p><a class="link" href="${certification.url}" target="_blank" rel="noopener">Verify credential</a>`
  )
);

// Count-up for highlights
const countUp = (node) => {
  const to = +node.dataset.to;
  const suffix = node.dataset.suffix;
  const start = performance.now();
  const step = (t) => {
    const p = Math.min((t - start) / 1200, 1);
    node.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 3)))}${suffix}`;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('show');
      if (e.target.dataset.to) countUp(e.target);
      io.unobserve(e.target);
    }),
  { threshold: 0.2 }
);
document.querySelectorAll('.reveal, .stat b').forEach((n) => io.observe(n));
document.querySelectorAll('.section > h2, .about-copy').forEach((n) => {
  n.classList.add('reveal');
  io.observe(n);
});

// Nav
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });
const burger = $('burger');
const links = $('links');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
links.addEventListener('click', () => {
  links.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
});
