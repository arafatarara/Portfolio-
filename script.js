// =====================================================================
// Ara Portfolio — Data-Driven Renderer
// All page content lives in data.json. This file only renders it and
// wires up the site's interactive behavior. Edit data.json, not this
// file or index.html, to update the site's content.
// =====================================================================

// Brand icons that aren't in the Lucide set ship as raw SVG here,
// keyed by the "platform" value used in data.json's social array.
const BRAND_ICONS = {
    discord: '<svg viewBox="0 0 24 24" class="w-5 h-5 text-neutral-400 group-hover:text-[#5865F2] transition-colors" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.673-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
    x: '<svg viewBox="0 0 24 24" class="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
};

// Lucide icons + hover color used for platforms not in BRAND_ICONS.
const LUCIDE_SOCIAL = {
    instagram: { icon: 'instagram', hoverClass: 'group-hover:text-pink-400' },
    linkedin: { icon: 'linkedin', hoverClass: 'group-hover:text-blue-400' }
};

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '';
}

function setHtml(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value ?? '';
}

// ===== RENDER FUNCTIONS =====

function renderSite(site) {
    site = site || {};
    document.title = site.title || '';
    setText('pageTitle', site.title || '');
    setText('navInitials', site.initials);
    setText('navName', site.name);
    setText('onlineText', site.onlineText);
    setText('footerInitials', site.initials);
}

function renderTheme(theme) {
    if (!theme) return;
    const root = document.documentElement.style;
    if (theme.primary) root.setProperty('--theme-primary', theme.primary);
    if (theme.secondary) root.setProperty('--theme-secondary', theme.secondary);
    if (theme.tertiary) root.setProperty('--theme-tertiary', theme.tertiary);
    if (theme.primaryRgb) root.setProperty('--theme-primary-rgb', theme.primaryRgb);
    if (theme.secondaryRgb) root.setProperty('--theme-secondary-rgb', theme.secondaryRgb);
    if (theme.tertiaryRgb) root.setProperty('--theme-tertiary-rgb', theme.tertiaryRgb);
}

function renderHero(hero) {
    if (!hero) return;
    const pic = document.getElementById('profilePic');
    if (pic) pic.src = hero.profilePic || '';
    setText('heroName', hero.name);
    setText('heroTagline', hero.tagline);
    setText('heroUni', hero.university);

    const ctas = document.getElementById('heroCtas');
    if (ctas) {
        const buttons = [];
        if (hero.ctaPrimary) {
            buttons.push(`<a href="${escapeHtml(hero.ctaPrimary.href)}" class="btn-3d h-12 px-8 rounded-full text-sm font-medium flex items-center gap-2" style="background:linear-gradient(135deg,var(--theme-primary),var(--theme-secondary));color:#000"><i data-lucide="send" class="w-4 h-4"></i>${escapeHtml(hero.ctaPrimary.text)}</a>`);
        }
        if (hero.ctaSecondary) {
            buttons.push(`<a href="${escapeHtml(hero.ctaSecondary.href)}" class="btn-3d-outline h-12 px-8 rounded-full border border-white/10 text-sm font-medium text-neutral-300 bg-transparent flex items-center gap-2"><i data-lucide="folder-git-2" class="w-4 h-4"></i>${escapeHtml(hero.ctaSecondary.text)}</a>`);
        }
        ctas.innerHTML = buttons.join('');
    }
}

function renderAvailability(site) {
    setText('availabilityText', site && site.availabilityText);
}

function renderAbout(about) {
    if (!about) return;
    const pd = about.personalDetails || {};
    setText('fullName', pd.fullName);
    setText('dob', pd.dob);
    setText('nationality', pd.nationality);
    setText('languages', pd.languages);
    setText('major', pd.major);
    setText('rollNo', pd.rollNo);
    setText('bio', about.bio);
    const live = about.liveInfo || {};
    setText('semester', live.semester);
    setText('cgpa', live.cgpa);
}

function renderSkills(skills) {
    if (!skills) return;

    const barsEl = document.getElementById('skillBars');
    if (barsEl) {
        barsEl.innerHTML = (skills.proficiency || []).map(s => `
            <div class="skill-item" data-skill="${escapeHtml(s.name)}" data-level="${escapeHtml(s.level)}">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-neutral-300">${escapeHtml(s.name)}</span>
                    <div class="flex items-center gap-2"><span class="text-xs font-medium" style="color:var(--theme-primary)">${escapeHtml(s.level)}%</span></div>
                </div>
                <div class="h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <div class="skill-bar-fill h-full rounded-full" style="--skill-level:${escapeHtml(s.level)}%;background:linear-gradient(to right,var(--theme-primary),var(--theme-secondary))"></div>
                </div>
            </div>
        `).join('');
    }

    const toolsEl = document.getElementById('toolsList');
    if (toolsEl) {
        toolsEl.innerHTML = (skills.tools || []).map(tool => `
            <span class="tool-tag px-3 py-1.5 rounded-lg glass-light text-xs text-neutral-300 hover:text-white transition-all flex items-center gap-1.5" data-tool="${escapeHtml(tool)}"><span>${escapeHtml(tool)}</span></span>
        `).join('');
    }

    const softEl = document.getElementById('softSkillsList');
    if (softEl) {
        softEl.innerHTML = (skills.softSkills || []).map(s => `
            <div class="flex items-center gap-3 glass-light rounded-xl p-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:rgba(var(--theme-primary-rgb),.08)"><i data-lucide="${escapeHtml(s.icon)}" class="w-4 h-4" style="color:var(--theme-primary)"></i></div>
                <span class="text-xs text-neutral-300">${escapeHtml(s.label)}</span>
            </div>
        `).join('');
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = (projects || []).map((p, i) => {
        const delay = i > 0 ? ` style="transition-delay:${(i * 0.1).toFixed(1)}s"` : '';
        const media = p.image
            ? `<div class="h-40 overflow-hidden"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover"></div>`
            : `<div class="h-40 overflow-hidden flex items-center justify-center" style="background:${escapeHtml(p.iconBg)}"><i data-lucide="${escapeHtml(p.icon)}" class="w-14 h-14" style="color:${escapeHtml(p.iconColor)};opacity:.7"></i></div>`;
        const tags = (p.tags || []).map(t => `<span class="px-2.5 py-1 rounded-lg glass-light text-[11px] text-neutral-300">${escapeHtml(t)}</span>`).join('');
        return `
            <div class="slide-up project-card card-3d glass rounded-2xl overflow-hidden border-glow"${delay}>
                ${media}
                <div class="p-6">
                    <h4 class="text-base font-medium mb-2">${escapeHtml(p.title)}</h4>
                    <p class="text-sm text-neutral-400 leading-relaxed mb-4">${escapeHtml(p.description)}</p>
                    <div class="flex flex-wrap gap-2 mb-5">${tags}</div>
                    <div class="flex gap-3">
                        <a href="${escapeHtml(p.liveUrl || '#')}" target="_blank" rel="noopener" class="btn-3d-outline flex-1 h-9 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5" style="border:1px solid rgba(var(--theme-primary-rgb),.3);color:var(--theme-primary)"><i data-lucide="external-link" class="w-3.5 h-3.5"></i>Live Preview</a>
                        <a href="${escapeHtml(p.githubUrl || '#')}" target="_blank" rel="noopener" class="btn-3d-outline flex-1 h-9 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5" style="border:1px solid rgba(255,255,255,.12);color:#e5e5e5"><i data-lucide="github" class="w-3.5 h-3.5"></i>GitHub</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderContact(contact) {
    if (!contact) return;
    setHtml('homeAddress', contact.homeAddress);
    setText('email', contact.email);
    setText('phone', contact.phone);
    setHtml('uniAddress', contact.uniAddress);
}

function renderSocial(social) {
    const el = document.getElementById('socialLinks');
    if (!el) return;
    el.innerHTML = (social || []).map(s => {
        let iconHtml;
        if (BRAND_ICONS[s.platform]) {
            iconHtml = BRAND_ICONS[s.platform];
        } else {
            const conf = LUCIDE_SOCIAL[s.platform] || { icon: s.platform, hoverClass: 'group-hover:text-white' };
            iconHtml = `<i data-lucide="${escapeHtml(conf.icon)}" class="w-5 h-5 text-neutral-400 ${conf.hoverClass} transition-colors"></i>`;
        }
        return `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" class="btn-3d-outline w-full aspect-square rounded-xl glass-light flex items-center justify-center group" title="${escapeHtml(s.label)}">${iconHtml}</a>`;
    }).join('');
}

function renderFooter(footer) {
    if (!footer) return;
    setText('footerCopyright', footer.copyright);
    setText('footerTagline', footer.tagline);
}

// ===== BOOTSTRAP =====

async function loadSiteData() {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`Failed to load data.json: ${res.status}`);
    return res.json();
}

async function init() {
    try {
        const data = await loadSiteData();
        renderTheme(data.theme);
        renderSite(data.site);
        renderAvailability(data.site);
        renderHero(data.hero);
        renderAbout(data.about);
        renderSkills(data.skills);
        renderProjects(data.projects);
        renderContact(data.contact);
        renderSocial(data.social);
        renderFooter(data.footer);
    } catch (err) {
        console.error('Could not load site content from data.json:', err);
    }

    // Icons must be (re)initialized after dynamic content is injected.
    lucide.createIcons();

    setupInteractivity();
}

// ===== INTERACTIVITY (unchanged behavior) =====

function setupInteractivity() {
    // ===== TOAST NOTIFICATIONS =====
    const toastEl = document.getElementById('toast');
    const toastMsgEl = document.getElementById('toastMsg');
    let toastTimer;
    function showToast(message) {
        toastMsgEl.textContent = message;
        toastEl.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
    }

    // ===== PARTICLES =====
    (function () {
        const c = document.getElementById('particles');
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = (Math.random() * 100 + 100) + '%';
            p.style.background = Math.random() > .5 ? 'var(--theme-primary)' : 'var(--theme-secondary)';
            p.style.opacity = Math.random() * .4 + .1;
            p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
            p.style.animation = `particleFloat ${Math.random() * 15 + 10}s linear infinite`;
            p.style.animationDelay = `-${Math.random() * 15}s`;
            c.appendChild(p);
        }
    })();

    // ===== LIVE CLOCK =====
    function updateClock() {
        const n = new Date();
        document.getElementById('liveTime').textContent = n.toLocaleTimeString('en-US', { hour12: true });
        document.getElementById('liveDate').textContent = n.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ===== SCROLL ANIMATIONS =====
    const obs = new IntersectionObserver(e => {
        e.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('visible');
                en.target.querySelectorAll('.skill-bar-fill').forEach(b => setTimeout(() => b.classList.add('animated'), 200));
            }
        });
    }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.slide-up').forEach(el => obs.observe(el));

    // ===== ACTIVE NAV =====
    const secs = document.querySelectorAll('section[id]'), navs = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let c = '';
        secs.forEach(s => { if (scrollY >= s.offsetTop - 100) c = s.id; });
        navs.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + c) l.classList.add('active');
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ===== 3D BUTTON MOUSE TRACKING =====
    document.querySelectorAll('.btn-3d,.btn-3d-outline').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            btn.style.transform = `perspective(600px) rotateX(${-y * 15}deg) rotateY(${x * 15}deg) translateY(-4px)`;
            if (!btn.classList.contains('btn-3d-outline')) btn.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px,rgba(var(--theme-primary-rgb),.4),var(--theme-secondary) 60%,#1d4ed8 100%)`;
            btn.style.boxShadow = `${x * -3}px ${y * 3 + 15}px 40px rgba(var(--theme-primary-rgb),.25),0 0 20px rgba(var(--theme-primary-rgb),.15)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.background = btn.classList.contains('btn-3d') ? 'linear-gradient(135deg,var(--theme-primary),var(--theme-secondary))' : '';
            btn.style.boxShadow = '';
        });
    });

    // ===== 3D CARD MOUSE TRACKING =====
    document.querySelectorAll('.card-3d').forEach(c => {
        c.addEventListener('mousemove', e => {
            const r = c.getBoundingClientRect();
            c.style.transform = `rotateY(${((e.clientX - r.left) / r.width - .5) * 12}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 12}deg) translateZ(20px)`;
        });
        c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });

    // ===== CONTACT FORM =====
    document.getElementById('contactForm').addEventListener('submit', e => {
        e.preventDefault();
        showToast("Message sent! I'll get back to you soon.");
        e.target.reset();
    });

    // ===== MOBILE MENU =====
    document.getElementById('mobileMenuBtn').addEventListener('click', () => { document.getElementById('mobileMenu').classList.add('open'); });
    document.getElementById('mobileMenuClose').addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', init);
