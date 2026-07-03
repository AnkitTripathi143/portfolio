// Theme toggle (dark default, light on request; persisted via localStorage)
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  function applyTheme(t) {
    if (t === 'light') { root.setAttribute('data-theme', 'light'); }
    else { root.removeAttribute('data-theme'); }
  }
  let saved = 'dark';
  try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) {}
  applyTheme(saved);
  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();

// Mobile nav (hamburger -> dropdown menu)
(function () {
  const hamburger = document.getElementById('navHamburger');
  const menu = document.getElementById('navMobileMenu');
  if (!hamburger || !menu) return;
  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 880) closeMenu(); });
})();

// Cursor glow
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', e=>{
  glow.style.left = e.clientX+'px';
  glow.style.top = e.clientY+'px';
});

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', ()=>{
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
},{threshold:0.15});
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el=>io.observe(el));

// Counters (re-animate every time the section scrolls into view)
const counters = document.querySelectorAll('.stat-num');
const cio = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    const el = en.target;
    if(en.isIntersecting){
      if(el.dataset.animating === '1') return;
      el.dataset.animating = '1';
      const target = parseInt(el.dataset.count,10);
      const suffix = el.dataset.suffix || '';
      el.textContent = '0' + suffix;
      const dur = 1400;
      const start = performance.now();
      function tick(t){
        const p = Math.min((t-start)/dur,1);
        const eased = 1 - Math.pow(1-p,3);
        const cur = Math.round(eased*target);
        el.textContent = cur + suffix;
        if(p<1){ requestAnimationFrame(tick); } else { el.dataset.animating = '0'; }
      }
      requestAnimationFrame(tick);
    } else {
      el.dataset.animating = '0';
    }
  });
},{threshold:0.4});
counters.forEach(c=>cio.observe(c));

// Marquee content
const marqueeItems = ["ISO 9001:2015 Certified","ISO/IEC 27001:2022 Certified","GeM Registered Seller","Startup India Recognized","MSME Registered","CMMI Level 3","GDPR Compliance Ready","U.S. Government Contractor"];
const track = document.getElementById('marqueeTrack');
let html = '';
for(let r=0;r<2;r++){
  marqueeItems.forEach(it=>{ html += `<span><b>${it}</b></span><span class="sep">/</span>`; });
}
track.innerHTML = html;

// Tech tabs
const techData = {
  "Development": ["Java","Spring Boot","C#",".NET Core","Angular","React.js","TypeScript","REST APIs","Microservices"],
  "Cloud": ["AWS","Microsoft Azure","Google Cloud Platform","Terraform","Kubernetes","Docker","Serverless"],
  "Databases": ["SQL Server","PostgreSQL","MySQL","MongoDB","Redis","Oracle","Snowflake","Elasticsearch"],
  "DevOps": ["Jenkins","GitHub Actions","GitLab CI/CD","Ansible","Prometheus","Grafana","SonarQube"],
};
const tabsEl = document.getElementById('techTabs');
const panelsEl = document.getElementById('techPanels');
Object.keys(techData).forEach((cat,i)=>{
  const tab = document.createElement('div');
  tab.className = 'tech-tab' + (i===0?' active':'');
  tab.textContent = cat;
  tab.onclick = ()=>{
    document.querySelectorAll('.tech-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.tech-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-'+i).classList.add('active');
  };
  tabsEl.appendChild(tab);
  const panel = document.createElement('div');
  panel.className = 'tech-panel' + (i===0?' active':'');
  panel.id = 'panel-'+i;
  techData[cat].forEach(t=>{
    const pill = document.createElement('span');
    pill.className = 'tech-pill';
    pill.textContent = t;
    panel.appendChild(pill);
  });
  panelsEl.appendChild(panel);
});

// Client logos
const clients = ["Vector Consulting Group","Prabhu Associates","Sulekha Yellow Pages","Scientific Scholar","GreenPepper","Equity Intelligence","IL&FS Investsmart","Geojit Financial Services","Promeoh","MoneyControl","IDBI Capital","Hyundai","edotsolutions","eBusinessedge","Raft Internationals","Sikh Matrimonials","Lamcy Plaza","Kreheja"];
const clientLogosEl = document.getElementById('clientLogos');
clients.forEach(c=>{
  const span = document.createElement('span');
  span.className = 'client-chip';
  span.textContent = c;
  clientLogosEl.appendChild(span);
});
// ── PORTFOLIO TABS & GALLERIES ─────────────────────────────────
const DRAWER_CATEGORIES = ["Brand Identity", "Collateral", "UI / UX"];
const portData = {
  "Brand Identity": [
    {src:"/images/img-b8cd96eb3022.jpg",title:"Palghar Basketball Association",cat:"Brand Identity"},
    {src:"/images/img-6ec6f2670063.jpg",title:"Prithvi Group — Corporate Identity",cat:"Brand Identity"},
    {src:"/images/img-6eee15ea5870.jpg",title:"Prabhu Associates",cat:"Brand Identity"},
    {src:"/images/img-94c846ade4fa.jpg",title:"Ancient Wisdom — Packaging",cat:"Brand Identity"},
    {src:"/images/img-c9a699c53bb7.jpg",title:"Ancient Wisdom — Exhibition",cat:"Brand Identity"},
    {src:"/images/img-f2f9c0102aa9.jpg",title:"Z2 Network — Brand Identity",cat:"Brand Identity"},
    {src:"/images/img-e8a9c520d811.jpg",title:"Z2 Network — Merchandise",cat:"Brand Identity"},
    {src:"/images/img-47100756ad61.jpg",title:"Café Brand Identity",cat:"Brand Identity"},
    {src:"/images/img-16528befec3e.jpg",title:"Carry & Camera — Vehicle Wrap",cat:"Brand Identity"},
    {src:"/images/img-f67da9c4dc1c.jpg",title:"Multi-brand Logo Portfolio",cat:"Brand Identity"},
    {src:"/images/img-2c7ca99df7a1.jpg",title:"Mobile App Brand Identities",cat:"Brand Identity"},
  ],
  "Collateral": [
    {src:"/images/img-2fb680012512.jpg",title:"Leap Ahead — Newspaper Campaign",cat:"Collateral"},
    {src:"/images/img-2833897d6e08.jpg",title:"Leap Ahead — Brand Booklet",cat:"Collateral"},
    {src:"/images/img-5c9397d6fe99.jpg",title:"Leap Ahead — Magazine",cat:"Collateral"},
    {src:"/images/img-38ade456b3cf.jpg",title:"Corporate Brochures",cat:"Collateral"},
    {src:"/images/img-14a873538749.jpg",title:"Direct Mailer Campaign",cat:"Collateral"},
    {src:"/images/img-df885c0efd77.jpg",title:"Exhibition Kiosk — Globel",cat:"Collateral"},
    {src:"/images/img-e6d52716dac0.jpg",title:"Infodrive — Annual Report",cat:"Collateral"},
    {src:"/images/img-b55fd28aa73b.jpg",title:"Analytics Brand Collateral",cat:"Collateral"},
    {src:"/images/img-03d3f0280da6.jpg",title:"Multi-fold Brochures",cat:"Collateral"},
    {src:"/images/img-8feaa781ab54.jpg",title:"Exhibition Stand — Globel",cat:"Collateral"},
    {src:"/images/img-bec8aa983979.jpg",title:"Presentation Design — Vector",cat:"Collateral"},
    {src:"/images/img-170f3589e6cd.jpg",title:"Digital Infographics",cat:"Collateral"},
    {src:"/images/img-46dc58e9555e.jpg",title:"Data Visualisation Collateral",cat:"Collateral"},
    {src:"/images/img-8756621b4d2f.jpg",title:"eLearning Collateral",cat:"Collateral"},
    {src:"/images/img-f5c9cf5d5fe2.jpg",title:"Pharma Presentations",cat:"Collateral"},
    {src:"/images/img-8c8d3fd463f0.jpg",title:"PomRed Beauty — Presentation",cat:"Collateral"},
    {src:"/images/img-4d5e7c1ad4d2.jpg",title:"Bird — Motion & Storyboard",cat:"Collateral"},
  ],
  "Social Media": [
    {src:"/images/img-e3b4c495978b.jpg",title:"Social Media Campaign",cat:"Social Media"},
    {src:"/images/img-d958530c4991.jpg",title:"Instagram Posts",cat:"Social Media"},
    {src:"/images/img-bcb0e4dd9e6f.jpg",title:"Vector Consulting — Social",cat:"Social Media"},
    {src:"/images/img-3dd6f08cc5ed.jpg",title:"GreenCRM — Social Kit",cat:"Social Media"},
  ],
  "UI / UX": [
    {src:"/images/img-43c34e1a9534.jpg",title:"Multi-screen Application UX",cat:"UI / UX"},
    {src:"/images/img-0f71fc793222.jpg",title:"News App — Mobile Icons",cat:"UI / UX"},
    {src:"/images/img-597b9f303545.jpg",title:"Heritage App — Mobile UX",cat:"UI / UX"},
    {src:"/images/img-43d6aed43c91.jpg",title:"iPayU — Payment App",cat:"UI / UX"},
    {src:"/images/img-35f79cc3eb96.jpg",title:"eCommerce Mobile App",cat:"UI / UX"},
    {src:"/images/img-ea502b6b0767.jpg",title:"Educational Portal — Tablet",cat:"UI / UX"},
    {src:"/images/img-ea93c918d5f8.jpg",title:"Web Application Dashboard",cat:"UI / UX"},
    {src:"/images/img-d363e4b4ceb1.jpg",title:"Travel Platform UX",cat:"UI / UX"},
    {src:"/images/img-2dbbca7abce2.jpg",title:"Analytics Dashboard",cat:"UI / UX"},
    {src:"/images/img-90d966b3206c.jpg",title:"Stock Market Platform",cat:"UI / UX"},
    {src:"/images/img-654f01a314f0.jpg",title:"B-POS Billing System",cat:"UI / UX"},
  ],
  "Websites": [
    {src:"/images/img-a5d65113ebf1.jpg",title:"Palghar / Cargo Website",cat:"Websites"},
    {src:"/images/img-40a3a280bce0.jpg",title:"Cultural Foundation Website",cat:"Websites"},
    {src:"/images/img-3622607bc0d6.jpg",title:"Dark Corporate Website",cat:"Websites"},
    {src:"/images/img-e2f913e8fcee.jpg",title:"Professional Services Website",cat:"Websites"},
    {src:"/images/img-b0e9769b9f0a.jpg",title:"Prabhu Associates Website",cat:"Websites"},
  ],
  "eLearning": [
    {src:"/images/img-052461487670.jpg",title:"Mindful — eLearning Platform",cat:"eLearning"},
    {src:"/images/img-6bf3f9bcd12a.jpg",title:"Corporate eLearning Courses",cat:"eLearning"},
  ],
};
const portTabsEl = document.getElementById('portTabs');
const portSectionsEl = document.getElementById('portSections');
Object.keys(portData).forEach((cat, i) => {
  const btn = document.createElement('button');
  btn.className = 'port-tab' + (i === 0 ? ' on' : '');
  btn.textContent = cat;
  btn.onclick = () => {
    document.querySelectorAll('.port-tab').forEach(t => t.classList.remove('on'));
    document.querySelectorAll('.port-section').forEach(s => s.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('ps' + i).classList.add('on');
  };
  portTabsEl.appendChild(btn);

  const sec = document.createElement('div');
  sec.className = 'port-section' + (i === 0 ? ' on' : '');
  sec.id = 'ps' + i;

  // Featured cards (first 1-2 items if marked as featured)
  const items = portData[cat];
  const gallery = document.createElement('div');
  gallery.className = 'gallery';
  const useDrawer = DRAWER_CATEGORIES.includes(cat);
  const visibleItems = useDrawer ? items.slice(0, 6) : items;
  visibleItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy"><div class="gi-overlay"></div><div class="gi-label"><span>${item.cat}</span><b>${item.title}</b></div>`;
    div.addEventListener('click', () => openLightbox(item.src, item.title + ' — ' + item.cat));
    gallery.appendChild(div);
  });
  sec.appendChild(gallery);

  if (useDrawer && items.length > visibleItems.length) {
    const viewAllWrap = document.createElement('div');
    viewAllWrap.className = 'port-view-all';
    const viewAllBtn = document.createElement('button');
    viewAllBtn.type = 'button';
    viewAllBtn.className = 'port-view-all-btn';
    viewAllBtn.textContent = `View all ${items.length} — ${cat} →`;
    viewAllBtn.addEventListener('click', () => openDrawer(cat, items));
    viewAllWrap.appendChild(viewAllBtn);
    sec.appendChild(viewAllWrap);
  }

  portSectionsEl.appendChild(sec);
});

// Observe galleries for stagger
document.querySelectorAll('.gallery').forEach(g => {
  const gaIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.gallery-item').forEach((item, i) => {
        item.style.cssText = 'opacity:0;transform:translateY(24px)';
        setTimeout(() => { item.style.transition = 'opacity .6s ease, transform .6s ease'; item.style.opacity = '1'; item.style.transform = 'none'; }, i * 80);
      });
      gaIo.unobserve(e.target);
    });
  }, { threshold: 0.05 });
  gaIo.observe(g);
});

// ── LIGHTBOX ──────────────────────────────────────────────────
const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img'), lbCap = document.getElementById('lb-caption');
function openLightbox(src, cap) { lbImg.src = src; lbCap.textContent = cap || ''; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
document.getElementById('lb-close').onclick = closeLightbox;
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
function closeLightbox() { lb.classList.remove('open'); document.body.style.overflow = ''; }

// ── PORTFOLIO DRAWER (Brand Identity / Collateral / UI-UX) ─────
const pd = document.getElementById('portDrawer');
const pdTag = document.getElementById('pd-tag');
const pdTitle = document.getElementById('pd-title');
const pdGrid = document.getElementById('pd-grid');
function openDrawer(cat, items) {
  pdTag.textContent = `${items.length} items`;
  pdTitle.textContent = cat + ' — All Work';
  pdGrid.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy"><div class="gi-overlay"></div><div class="gi-label"><span>${item.cat}</span><b>${item.title}</b></div>`;
    div.addEventListener('click', () => openLightbox(item.src, item.title + ' — ' + item.cat));
    pdGrid.appendChild(div);
  });
  pd.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() { pd.classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('pd-close').onclick = closeDrawer;
document.getElementById('pdBackdrop').addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// ── DEVOPS ENGINEERING PORTFOLIO — fullscreen project preview modal ─────
(function () {
  const modal = document.getElementById('devopsModal');
  if (!modal) return;

  const backdrop = document.getElementById('devopsModalBackdrop');
  const panel = modal.querySelector('.devops-modal-panel');
  const closeBtn = document.getElementById('devopsModalClose');
  const titleEl = document.getElementById('devopsModalTitle');
  const urlEl = document.getElementById('devopsModalUrl');
  const iframe = document.getElementById('devopsModalIframe');
  const loader = document.getElementById('devopsModalLoader');
  const cards = document.querySelectorAll('.devops-card');

  let lastFocused = null;
  let closeTimer = null;

  function openModal(card) {
    const title = card.getAttribute('data-title') || 'Project preview';
    const src = card.getAttribute('data-src');
    const url = card.getAttribute('data-url') || src;
    if (!src) return;

    clearTimeout(closeTimer);
    lastFocused = document.activeElement;

    titleEl.textContent = title;
    urlEl.textContent = url;
    loader.classList.remove('hidden');
    iframe.setAttribute('aria-label', title + ' — live preview');
    iframe.src = src;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog once the opening transition starts.
    requestAnimationFrame(() => closeBtn.focus());
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Clear the iframe only after the fade-out finishes, so any diagrams
    // or animations inside it stop running rather than continuing offscreen.
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      iframe.src = 'about:blank';
      loader.classList.remove('hidden');
    }, 450);

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  iframe.addEventListener('load', () => {
    if (iframe.src && iframe.src.indexOf('about:blank') === -1) {
      loader.classList.add('hidden');
    }
  });

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    // Lightweight focus trap: cycle Tab between the close button and iframe.
    if (e.key === 'Tab') {
      const focusable = [closeBtn, iframe];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
