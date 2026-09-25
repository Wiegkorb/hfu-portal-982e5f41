// ═══════════════════════════════════════════════════════
//  HFU IT-Support – Gemeinsames Daten-Modul (data.js)
//  Schmetterling Orange: #f18700
// ═══════════════════════════════════════════════════════

const STORAGE_KEY = 'hfu_v7';

// ── Default-Daten ────────────────────────────────────────
const defaultData = {

  news: [
    {
      id: 'n1',
      title: 'HFU IT-Support Portal ist online',
      badge: 'Neu',
      date: '25.09.2026',
      content: 'Kurzanleitungen, Videos und direkte Hilfe für häufige IT-Fragen – übersichtlich an einem Ort. Natürlich sind wir weiterhin wie gewohnt per Ticket und telefonisch erreichbar.'
    },
    {
      id: 'n2',
      title: 'Passbolt Passwort-Manager ist aktiv',
      badge: 'Wichtig',
      date: '25.09.2026',
      content: 'Bitte führt die Ersteinrichtung von Passbolt zeitnah durch. Eine Schritt-für-Schritt-Anleitung findet ihr im Portal unter Anleitungen.'
    }
  ],

  tools: [
    {
      id: 't1',
      title: 'Passbolt',
      icon: 'fa-key',
      desc: 'Nutze Passbolt, um deine dienstlichen Passwörter sicher zu speichern und verschlüsselt mit Kollegen zu teilen.',
      url: 'https://passbolt.intranet.schmetterling.de/',
      guideId: 'passbolt-guide',
      helpLabel: 'Brauchst du Hilfe bei der Ersteinrichtung?',
      helpGuideId: 'passbolt-guide'
    },
    {
      id: 't2',
      title: 'Passwort ändern',
      icon: 'fa-lock',
      desc: 'Hier kannst du dein Passwort ändern. Diese Möglichkeit soll auf lange Sicht die Users Plattform ablösen.',
      url: 'https://myaccount.microsoft.com/password',
      guideId: null,
      helpLabel: 'Probleme bei der Passwortvergabe?',
      helpGuideId: 'passwort-guide'
    }
  ],

  furtherLinks: [
    { id: 'l1', title: 'Microsoft', icon: 'fa-globe', url: 'https://microsoft.com' },
    { id: 'l2', title: 'Azubiplatform', icon: 'fa-globe', url: '#' },
    { id: 'l3', title: 'Daktela', icon: 'fa-globe', url: '#' },
    { id: 'l4', title: 'Emma', icon: 'fa-globe', url: '#' }
  ],

  forms: [
    {
      id: 'f1',
      title: 'Bestellformular',
      icon: 'fa-cart-shopping',
      desc: 'Bestelle neue Hardware oder Software oder frage nach Ersatz.',
      url: 'https://schmetterlinginternational.sharepoint.com/sites/home/SitePages/Bestellformular.aspx'
    },
    {
      id: 'f2',
      title: 'Auslandszugriff',
      icon: 'fa-globe',
      desc: 'Beantrage den Zugriff auf unsere Systeme für das Ausland.',
      url: 'https://forms.office.com/pages/responsepage.aspx?id=LbzfhJFi70e6QdqmVtuWBE5ViJS_UdBHiM8691TQpVZUOUhRTDRGTkMwR1NPRkRESzVUVFU1TTJZNC4u&route=shorturl'
    }
  ],

  // Anleitungs-Kategorien (für Tab-Navigation)
  guideCategories: [
    { id: 'cat-ersteinrichtung', label: 'Ersteinrichtung', icon: 'fa-computer', type: 'setup' },
    { id: 'cat-vpn',            label: 'VPN',              icon: 'fa-shield-halved', type: 'problem' },
    { id: 'cat-telefon',        label: 'Telefon/Teams',    icon: 'fa-phone', type: 'problem' },
    { id: 'cat-apps',           label: 'Apps installieren',icon: 'fa-puzzle-piece', type: 'problem' },
    { id: 'cat-passwort',       label: 'Passwort Anlegen', icon: 'fa-key', type: 'problem' },
    { id: 'cat-email',          label: 'Verdächtige E-Mail?', icon: 'fa-envelope-open-text', type: 'problem' },
    { id: 'cat-postfach',       label: 'Postfach hinzufügen', icon: 'fa-inbox', type: 'problem' }
  ],

  // Anleitungen – jede hat Blöcke (text, video, image, steps, cta)
  guides: [
    {
      id: 'g1',
      slug: 'passbolt-guide',
      title: 'Passbolt Ersteinrichtung',
      categoryId: 'cat-ersteinrichtung',
      desc: 'Schritt-für-Schritt-Anleitung für die eigenständige Ersteinrichtung von Passbolt.',
      blocks: [
        {
          type: 'steps',
          heading: 'Passbolt Ersteinrichtung',
          items: [
            { text: 'Einladung öffnen: Öffne die E-Mail in Outlook und klicke auf den Button "Get started". Du hast keine Mail für die Ersteinrichtung bekommen?', link: { label: 'Mail an die HFU', url: 'mailto:hilfe@schmetterling.de' } },
            { text: 'Passphrase festlegen: Gib dein gewünschtes Passwort (Passphrase) zweimal ein und klicke auf Weiter.' },
            { text: 'Recovery-Kit speichern: Die Datei passbolt-recovery-kit.asc wird automatisch heruntergeladen. Speichere diese in deinem OneDrive-Ordner. Setze das Häkchen bei "Ich habe mein Wiederherstellungs-Kit sicher gespeichert" und klicke auf Weiter.' },
            { text: 'Hintergrundfarbe wählen: Wähle eine Hintergrundfarbe sowie mindestens 8 Zeichen für dein persönliches Passwort und klicke auf Weiter.' },
            { text: 'Einrichtung abschließen: Warte einen Moment, bis die Initialisierung abgeschlossen ist und du zum Dashboard weitergeleitet wirst. Dir werden keine Passwörter angezeigt?', link: { label: 'Mail an die HFU', url: 'mailto:hilfe@schmetterling.de' } }
          ]
        }
      ]
    },
    {
      id: 'g2',
      slug: 'vpn-guide',
      title: 'Erste Hilfe bei VPN-Problemen',
      categoryId: 'cat-vpn',
      desc: 'Wenn interne Webseiten wie Passbolt oder andere Firmenressourcen nicht laden, liegt häufig ein Problem mit der VPN-Verbindung vor.',
      blocks: [
        {
          type: 'text',
          heading: 'VPN neu starten',
          content: '1. Öffne die Windows-Suche über das Startmenü oder die Windows-Taste.\n2. Suche nach "VPN Neustarten".\n3. Führe das Programm oder Skript per Doppelklick aus.\n4. Warte etwa 5 bis 10 Sekunden und prüfe anschließend, ob Passbolt wieder erreichbar ist.'
        },
        {
          type: 'text',
          heading: 'Computer neu starten',
          content: '• Sollte der Zugriff weiterhin nicht funktionieren, starte deinen Computer einmal vollständig neu.\n• Prüfe danach erneut, ob die interne Seite erreichbar ist.'
        },
        {
          type: 'text',
          heading: 'IT-Ticket erstellen',
          content: '• Ist das Problem danach noch nicht behoben, sende eine Email mithilfe der folgenden Schaltfläche'
        }
      ]
    },
    {
      id: 'g3',
      slug: 'passwort-guide',
      title: 'Passwort anlegen im Unternehmensportal',
      categoryId: 'cat-passwort',
      desc: 'Damit ein neues Passwort vom System sofort akzeptiert wird, muss es mindestens 12 Zeichen lang sein und alle vier Bausteine enthalten.',
      blocks: [
        {
          type: 'video',
          heading: 'Passwort ändern im Unternehmensportal',
          url: '',
          thumbnail: ''
        },
        {
          type: 'steps',
          heading: 'Passwort-Anforderungen',
          items: [
            { text: 'Großbuchstaben (Beispiel: A, B, C)' },
            { text: 'Kleinbuchstaben (Beispiel: a, b, c)' },
            { text: 'Zahlen (Beispiel: 1, 2, 3)' },
            { text: 'Sonderzeichen (Beispiel: !, ?, #, -)' }
          ]
        },
        {
          type: 'text',
          heading: 'Häufige Fehler',
          content: '• Umlaute verwenden: ä, ö, ü und ß funktionieren oft nicht.\n• Eigene Daten genutzt: Name, Geburtsdatum oder Login-Name sind verboten.\n• Leerzeichen kopiert: Beim Einfügen darauf achten, dass am Ende kein unsichtbares Leerzeichen mitkopiert wurde.'
        }
      ]
    }
  ],

  // Team-Mitglieder
  team: [
    { id: 'tm1', name: 'Felix Hohmann',      role: 'IT Systemadministrator',              photo: '' },
    { id: 'tm2', name: 'Mario Grüner',       role: 'IT Systemadministrator',              photo: '' },
    { id: 'tm3', name: 'Jannik Roth',        role: 'Ausbildung zum Fachinformatiker Systemintegration', photo: '' },
    { id: 'tm4', name: 'Korbinian Wiegärtner', role: 'Ausbildung zum Fachinformatiker Systemintegration', photo: '' },
    { id: 'tm5', name: 'Yazen Alsaho',       role: 'Ausbildung zum Fachinformatiker Systemintegration', photo: '' }
  ]
};

// ── Storage-Funktionen ───────────────────────────────────
function hfuLoadData() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : hfuClone(defaultData);
  } catch { return hfuClone(defaultData); }
}

function hfuSaveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) { console.error('Save failed', e); }
}

function hfuClone(o) { return JSON.parse(JSON.stringify(o)); }

function hfuResetData() {
  localStorage.removeItem(STORAGE_KEY);
  return hfuClone(defaultData);
}

// ID-Generator
function hfuId(prefix) { return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2,6); }
