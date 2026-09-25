// ═══════════════════════════════════════════════════════
//  HFU IT-Support – app.js (Hauptseite)
// ═══════════════════════════════════════════════════════

let appData = hfuLoadData();
let currentGuideCategory = 'all';
let currentGuideSearchTerm = '';

// ── Navigation (SPA) ─────────────────────────────────
function navigate(pageId, opts = {}) {
  document.querySelectorAll('.hfu-page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

  if (pageId === 'pageGuides') {
    renderGuideTabs('guideTabs');
    filterGuides();
  }
  if (pageId === 'pageGuideDetail' && opts.guideId) {
    showGuideDetail(opts.guideId);
  }
  if (pageId === 'pageTools') renderTools();
  if (pageId === 'pageForms') renderForms();
  if (pageId === 'pageLanding') renderLanding();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Render: Landing ───────────────────────────────────
function renderLanding() {
  renderNews();
  renderTeam();
}

function renderNews() {
  const list = document.getElementById('newsList');
  const count = document.getElementById('newsCount');
  if (!list) return;
  const news = appData.news || [];
  count.textContent = news.length + ' Meldung' + (news.length !== 1 ? 'en' : '');
  if (!news.length) {
    list.innerHTML = '<div class="hfu-news-item"><span style="color:#aaa;font-size:12px">Keine aktuellen Meldungen.</span></div>';
    return;
  }
  list.innerHTML = news.map(n => `
    <div class="hfu-news-item">
      <div class="hfu-news-meta">
        <span class="hfu-badge badge-${n.badge}">${n.badge}</span>
        <span class="hfu-news-date">${n.date || ''}</span>
      </div>
      <div class="hfu-news-title">${n.title}</div>
      <div class="hfu-news-content">${n.content}</div>
    </div>
  `).join('');
}

function renderTeam() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;
  const team = appData.team || [];
  if (!team.length) { grid.innerHTML = ''; return; }
  grid.innerHTML = team.map(m => `
    <div class="hfu-team-card">
      <div class="hfu-team-photo placeholder">
        ${m.photo
          ? `<img src="${m.photo}" alt="${m.name}" style="width:100%;height:100%;object-fit:cover">`
          : `<i class="fa-solid fa-user" style="font-size:34px;color:#888"></i>`
        }
      </div>
      <div class="hfu-team-info">
        <div class="hfu-team-name">${m.name}</div>
        <div class="hfu-team-role">${m.role}</div>
      </div>
    </div>
  `).join('');
}

// ── Render: Tools ─────────────────────────────────────
function renderTools() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;
  const tools = appData.tools || [];
  if (!tools.length) { grid.innerHTML = '<div class="hfu-empty"><i class="fa-solid fa-toolbox"></i>Keine Tools vorhanden.</div>'; return; }
  grid.innerHTML = tools.map(t => `
    <div class="hfu-item-card">
      <div class="hfu-item-card-body">
        <div style="font-size:26px;color:var(--sm-orange);margin-bottom:4px"><i class="fa-solid ${t.icon || 'fa-toolbox'}"></i></div>
        <div class="hfu-item-card-title">${t.title}</div>
        <div class="hfu-item-card-desc">${t.desc}</div>
        <a href="${t.url}" target="_blank" class="hfu-item-card-btn">
          Zu ${t.title} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px"></i>
        </a>
      </div>
      ${t.helpLabel ? `<button class="hfu-item-card-help" onclick="openGuideFromTool('${t.helpGuideId}')">${t.helpLabel}</button>` : ''}
    </div>
  `).join('');

  // Weitere Links
  const flGrid = document.getElementById('furtherLinksGrid');
  if (!flGrid) return;
  const links = appData.furtherLinks || [];
  flGrid.innerHTML = links.map(l => `
    <a href="${l.url}" target="_blank" class="hfu-further-link">
      <i class="fa-solid ${l.icon || 'fa-globe'}"></i>
      ${l.title}
    </a>
  `).join('');
}

function openGuideFromTool(guideId) {
  if (!guideId) return;
  navigate('pageGuideDetail', { guideId });
}

// ── Render: Forms ─────────────────────────────────────
function renderForms() {
  const grid = document.getElementById('formsGrid');
  if (!grid) return;
  const forms = appData.forms || [];
  if (!forms.length) { grid.innerHTML = '<div class="hfu-empty"><i class="fa-solid fa-file-lines"></i>Keine Formulare vorhanden.</div>'; return; }
  grid.innerHTML = forms.map(f => `
    <div class="hfu-item-card">
      <div class="hfu-item-card-body">
        <div style="font-size:26px;color:var(--sm-orange);margin-bottom:4px"><i class="fa-solid ${f.icon || 'fa-file-lines'}"></i></div>
        <div class="hfu-item-card-title">${f.title}</div>
        <div class="hfu-item-card-desc">${f.desc}</div>
        <a href="${f.url}" target="_blank" class="hfu-item-card-btn">
          Zum Formular <i class="fa-solid fa-external-link" style="font-size:10px"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// ── Render: Anleitungen – Tabs ────────────────────────
function renderGuideTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const cats = appData.guideCategories || [];
  container.innerHTML = `
    <button class="hfu-guide-tab tab-all ${currentGuideCategory === 'all' ? 'active' : ''}" onclick="selectGuideCategory('all')">
      <i class="fa-solid fa-border-all"></i> Alle
    </button>
  ` + cats.map(c => `
    <button class="hfu-guide-tab ${currentGuideCategory === c.id ? 'active' : ''}" onclick="selectGuideCategory('${c.id}')">
      <i class="fa-solid ${c.icon}"></i> ${c.label}
    </button>
  `).join('');
}

function selectGuideCategory(catId) {
  currentGuideCategory = catId;
  renderGuideTabs('guideTabs');
  filterGuides();
}

// ── Render: Anleitungen – Übersicht ──────────────────
function filterGuides() {
  const grid = document.getElementById('guideOverviewGrid');
  if (!grid) return;
  const search = (document.getElementById('guideSearch')?.value || '').toLowerCase();
  const guides = (appData.guides || []).filter(g => {
    const matchCat = currentGuideCategory === 'all' || g.categoryId === currentGuideCategory;
    const matchSearch = !search || g.title.toLowerCase().includes(search) || (g.desc || '').toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (!guides.length) {
    grid.innerHTML = '<div class="hfu-empty"><i class="fa-solid fa-magnifying-glass"></i>Keine Anleitungen gefunden.</div>';
    return;
  }

  grid.innerHTML = guides.map(g => {
    const cat = (appData.guideCategories || []).find(c => c.id === g.categoryId);
    // Ersten Video-Block für Preview-Bild
    const videoBlock = (g.blocks || []).find(b => b.type === 'video');
    const imageBlock = (g.blocks || []).find(b => b.type === 'image');

    let previewHtml = '';
    if (imageBlock?.url) {
      previewHtml = `<img src="${imageBlock.url}" alt="${g.title}" style="width:100%;height:100%;object-fit:cover">`;
    } else if (cat) {
      previewHtml = `<i class="fa-solid ${cat.icon}"></i>`;
    }

    return `
      <div class="hfu-guide-overview-card" onclick="navigate('pageGuideDetail', { guideId: '${g.id}' })">
        <div class="hfu-guide-overview-card-img">${previewHtml}</div>
        <div class="hfu-guide-overview-card-body">
          <div class="hfu-guide-overview-card-cat">${cat ? cat.label : ''}</div>
          <div class="hfu-guide-overview-card-title">${g.title}</div>
          <div class="hfu-guide-overview-card-desc">${g.desc || ''}</div>
          <span class="hfu-guide-overview-card-cta">Zur Anleitung <i class="fa-solid fa-arrow-right fa-xs"></i></span>
        </div>
      </div>
    `;
  }).join('');
}

// ── Render: Anleitung Detail ──────────────────────────
function showGuideDetail(guideId) {
  const guide = (appData.guides || []).find(g => g.id === guideId);
  if (!guide) return navigate('pageGuides');

  document.getElementById('guideDetailTitle').textContent = guide.title;

  // Tabs
  renderGuideTabs('guideDetailTabs');

  // Back-Button: Zurück zur gefilterten Kategorie
  const backBtn = document.getElementById('guideBackBtn');
  if (backBtn) {
    const cat = (appData.guideCategories || []).find(c => c.id === guide.categoryId);
    backBtn.onclick = () => {
      if (cat) currentGuideCategory = guide.categoryId;
      navigate('pageGuides');
    };
  }

  // Blocks rendern
  const content = document.getElementById('guideDetailContent');
  if (!content) return;
  const blocks = guide.blocks || [];

  content.innerHTML = blocks.map(block => renderBlock(block)).join('');
}

function renderBlock(block) {
  switch(block.type) {
    case 'text': return `
      <div class="hfu-block">
        ${block.heading ? `<div class="hfu-block-heading">${block.heading}</div>` : ''}
        <div class="hfu-block-text">${escapeHtml(block.content || '').replace(/\n/g, '<br>')}</div>
      </div>`;

    case 'video': return `
      <div class="hfu-block">
        ${block.heading ? `<div class="hfu-block-heading">${block.heading}</div>` : ''}
        <div class="hfu-block-video-wrap">
          <div class="hfu-block-video-player">
            ${block.url
              ? `<iframe src="${embedVideoUrl(block.url)}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`
              : `<div class="hfu-block-video-placeholder"><i class="fa-solid fa-circle-play"></i>Kein Video hinterlegt</div>`
            }
          </div>
          <div class="hfu-block-text">${escapeHtml(block.content || '').replace(/\n/g, '<br>')}</div>
        </div>
      </div>`;

    case 'image': return `
      <div class="hfu-block">
        ${block.heading ? `<div class="hfu-block-heading">${block.heading}</div>` : ''}
        ${block.url ? `<img src="${block.url}" alt="${block.caption || ''}" class="hfu-block-image">` : ''}
        ${block.caption ? `<div class="hfu-block-image-caption">${block.caption}</div>` : ''}
      </div>`;

    case 'steps': return `
      <div class="hfu-block">
        ${block.heading ? `<div class="hfu-block-heading">${block.heading}</div>` : ''}
        <div class="hfu-steps-list">
          ${(block.items || []).map((item, i) => `
            <div class="hfu-step">
              <div class="hfu-step-num">${i + 1}</div>
              <div>
                <span>${escapeHtml(item.text || '').replace(/\n/g, '<br>')}</span>
                ${item.link ? `<br><a href="${item.link.url}" class="hfu-step-link" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px"></i> ${item.link.label}</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;

    case 'cta': return `
      <div class="hfu-block hfu-block-cta">
        <a href="${block.url || '#'}" target="_blank" class="hfu-btn-cta">
          <i class="fa-solid ${block.icon || 'fa-arrow-right'}"></i> ${block.label || 'Öffnen'}
        </a>
      </div>`;

    default: return '';
  }
}

// Konvertiert YouTube/Stream-URLs in Embed-URLs
function embedVideoUrl(url) {
  if (!url) return '';
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Microsoft Stream
  if (url.includes('microsoftstream.com') || url.includes('web.microsoftstream.com')) {
    const stMatch = url.match(/video\/([a-f0-9-]{36})/i);
    if (stMatch) return `https://web.microsoftstream.com/embed/video/${stMatch[1]}`;
  }
  // SharePoint Embed (bereits embed URL)
  return url;
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  appData = hfuLoadData();
  navigate('pageLanding');
});

// Daten-Update (wenn Admin-Seite gespeichert hat)
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    appData = hfuLoadData();
    const activePage = document.querySelector('.hfu-page.active');
    if (activePage) navigate(activePage.id);
  }
});

// Tastenkombination Ctrl + Shift + A öffnet Admin-Bereich
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    window.location.href = 'admin.html';
  }
});

