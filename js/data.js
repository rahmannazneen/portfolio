// ------------------------------------------------------------------
//  All portfolio content lives here. Replace the dummy data with your
//  own and the whole site updates.
// ------------------------------------------------------------------

export const profile = {
  name: 'Alex Rivera',
  initials: 'AR',
  roles: ['Frontend Developer', 'Creative Coder', 'UI/UX Enthusiast', 'Three.js Tinkerer'],
  tagline: 'I design and build playful, high-performance web experiences that people actually remember.',
  available: true,
  location: 'Remote · Worldwide',
  email: 'hello@alexrivera.dev',
  resume: '', // e.g. 'resume.pdf' (put the file in /public)
  bio: [
    "Hey! I'm Alex, a developer who lives right where design meets code. I turn bold ideas into fast, accessible and delightfully animated interfaces.",
    'Over the past five years I have shipped products for startups and agencies, from e-commerce storefronts to real-time dashboards. Lately I have been obsessed with WebGL, motion design and making the web feel a little more alive.',
    "When I'm not coding you'll find me sketching UI ideas, hunting for good coffee or losing at chess.",
  ],
  stats: [
    { value: 5, suffix: '+', label: 'Years experience' },
    { value: 40, suffix: '+', label: 'Projects shipped' },
    { value: 25, suffix: '', label: 'Happy clients' },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'X / Twitter', url: 'https://x.com/' },
    { label: 'Dribbble', url: 'https://dribbble.com/' },
  ],
};

export const projects = [
  {
    title: 'Nebula Commerce',
    category: 'E-commerce',
    year: '2025',
    description:
      'A headless storefront with interactive 3D product previews, instant search and a checkout that converts 30% better than the old one.',
    tech: ['Next.js', 'Three.js', 'Stripe', 'Tailwind'],
    live: 'https://example.com',
    repo: 'https://github.com/',
    image: '',
    colors: ['#ff4ecd', '#8b5cf6'],
    featured: true,
  },
  {
    title: 'Pulse Analytics',
    category: 'Dashboard',
    year: '2025',
    description: 'Real-time analytics dashboard streaming thousands of events per second into smooth, animated charts.',
    tech: ['React', 'D3.js', 'WebSockets'],
    live: 'https://example.com',
    repo: 'https://github.com/',
    image: '',
    colors: ['#3ef0ff', '#3b6cff'],
  },
  {
    title: 'Chroma',
    category: 'Tool',
    year: '2024',
    description: 'AI-assisted color palette generator with contrast checking and one-click export to CSS and Figma.',
    tech: ['JavaScript', 'Canvas', 'OpenAI API'],
    live: 'https://example.com',
    repo: 'https://github.com/',
    image: '',
    colors: ['#ff9f43', '#ff4e6a'],
  },
  {
    title: 'Wanderlust',
    category: 'Mobile web',
    year: '2024',
    description: 'Offline-first travel journal PWA with interactive maps, photo stories and trip sharing.',
    tech: ['Vue', 'Firebase', 'Mapbox'],
    live: 'https://example.com',
    repo: 'https://github.com/',
    image: '',
    colors: ['#b8ff5c', '#1fbf8f'],
  },
  {
    title: 'Synthwave Player',
    category: 'Creative',
    year: '2023',
    description: 'A music player that turns any track into a live, audio-reactive retro landscape.',
    tech: ['Web Audio API', 'WebGL', 'GLSL'],
    live: 'https://example.com',
    repo: 'https://github.com/',
    image: '',
    colors: ['#8b5cf6', '#ff4ecd'],
  },
  {
    title: 'TaskFlow',
    category: 'SaaS',
    year: '2023',
    description: 'Collaborative Kanban board with real-time sync, drag and drop and keyboard-first workflows.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL'],
    live: 'https://example.com',
    repo: 'https://github.com/',
    image: '',
    colors: ['#ffd93d', '#ff9f43'],
  },
];

export const skills = [
  {
    title: 'Frontend',
    blurb: 'Building fast, accessible interfaces.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue'],
  },
  {
    title: 'Creative',
    blurb: 'Motion, 3D and everything that sparkles.',
    items: ['Three.js', 'WebGL', 'GSAP', 'Framer Motion', 'Canvas', 'GLSL'],
  },
  {
    title: 'Backend',
    blurb: 'APIs and data that hold it all together.',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Firebase', 'REST'],
  },
  {
    title: 'Tools',
    blurb: 'The everyday kit.',
    items: ['Git', 'Figma', 'Vite', 'Docker', 'Jest', 'Vercel'],
  },
];

export const experience = [
  {
    period: '2023 — Present',
    role: 'Senior Frontend Developer',
    org: 'Pixel & Co.',
    description:
      'Leading a team of four building interactive marketing sites and design systems for global brands. Cut average page load time by 45%.',
  },
  {
    period: '2021 — 2023',
    role: 'Frontend Developer',
    org: 'Brightwave Studio',
    description:
      'Built award-nominated campaign sites with WebGL and scroll-driven storytelling. Introduced a component library used across 20+ projects.',
  },
  {
    period: '2019 — 2021',
    role: 'Junior Web Developer',
    org: 'Launchpad Labs',
    description: 'Shipped responsive web apps for early-stage startups and learned to love clean, tested code.',
  },
  {
    period: '2015 — 2019',
    role: 'BSc in Computer Science',
    org: 'State University',
    description: 'Focused on human-computer interaction and computer graphics. Graduated with honours.',
    type: 'education',
  },
];
