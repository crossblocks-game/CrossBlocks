// ═══ CROSSBLOCKS — Script principal ═══

let cards = [];
let selectedWeapons = [];

// ═══ GALERIE D'UNITÉS PRÉ-FAITES (d'après les règles officielles) ═══
var GALLERY = [
  // ── République (Clones) ──
  { name:"SW Clone Phase 2", faction:"République", theme:"clone", points:200, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil laser (bleu)"] },
  { name:"SW Clone Phase 2 de Geonosis", faction:"République", theme:"clone", points:230, hp:2, armor:15, move:0, pa:5, weapons:["SW Blaster laser (bleu)"] },
  { name:"SW Clone Spécialiste 501ème", faction:"République", theme:"clone", points:250, hp:2, armor:15, move:0, pa:5, weapons:["SW Double fusil laser lourd (bleu)"] },
  { name:"SW Clone Sniper 501ème", faction:"République", theme:"military", points:260, hp:2, armor:15, move:0, pa:5, weapons:["SW Sniper laser lourd (bleu)"] },
  { name:"SW Clone Phase 2 (Sniper)", faction:"République", theme:"clone", points:260, hp:2, armor:15, move:0, pa:5, weapons:["SW Sniper laser lourd (bleu)"] },
  { name:"SW Clone Officier 501ème", faction:"République", theme:"clone", points:270, hp:2, armor:15, move:0, pa:5, weapons:["SW Pistolet laser (bleu)"] },
  { name:"SW Clone de Coruscant", faction:"République", theme:"clone", points:270, hp:2, armor:15, move:0, pa:5, weapons:["SW Pistolet laser (bleu)"] },
  { name:"SW Clone Airborne de Geonosis", faction:"République", theme:"military", points:270, hp:2, armor:15, move:0, pa:5, weapons:["SW Blaster laser (bleu)"], special:"Largage" },
  { name:"SW Commandant Rex", faction:"République", theme:"metal", points:400, hp:2, armor:12, move:0, pa:5, weapons:["SW Pistolet automatique lourd laser (bleu)"] },
  { name:"SW Commandant Fives", faction:"République", theme:"metal", points:430, hp:2, armor:13, move:0, pa:5, weapons:["SW Pistolet automatique lourd laser (bleu)"], special:"Kit de soin" },

  // ── Séparatistes ──
  { name:"SW Droïde de combat B1", faction:"Séparatistes", theme:"parchment", points:170, hp:2, armor:18, move:0, pa:4, weapons:["SW Fusil laser (rouge)"] },
  { name:"SW Droïde de combat lourd B2", faction:"Séparatistes", theme:"industrial", points:300, hp:3, armor:11, move:-2, pa:4, weapons:["x2 SW Fusils de poing laser (rouge)"] },
  { name:"SW Tri-Droïde", faction:"Séparatistes", theme:"industrial", points:1800, hp:10, armor:6, move:2, pa:4, weapons:["x3 SW Tourelles rotatives laser","x3 SW Rockets laser (usage unique)"] },

  // ── Rebelles ──
  { name:"SW Rebelle (Blaster)", faction:"Rebelles", theme:"rebel", points:180, hp:2, armor:17, move:0, pa:5, weapons:["SW Blaster laser (rouge)"] },
  { name:"SW Rebelle (Fusil)", faction:"Rebelles", theme:"rebel", points:180, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil laser (rouge)"] },
  { name:"SW Rebelle (Pistolet)", faction:"Rebelles", theme:"rebel", points:150, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet laser (rouge)"] },
  { name:"SW Garde Rebelle", faction:"Rebelles", theme:"rebel", points:200, hp:2, armor:16, move:0, pa:5, weapons:["SW Blaster laser (bleu)"] },
  { name:"SW Rebelle Jetpack", faction:"Rebelles", theme:"rebel", points:240, hp:2, armor:17, move:2, pa:5, weapons:["SW Blaster laser (rouge)"], special:"Jetpack / Vol" },
];

// ═══ VÉHICULES (onglet séparé) ═══
var VEHICLES = [
  // ── République ──
  { name:"SW Motojet CRAM", faction:"République", theme:"metal", points:1000, hp:6, armor:12, move:4, pa:5, weapons:["x2 SW Fusils laser de Motojet (bleu)","x2 SW Snipers laser lourds montés (bleu)"], special:"Vol / Poste canonnier" },
  { name:"SW TR-TT", faction:"République", theme:"military", points:1800, hp:8, armor:10, move:1, pa:5, weapons:["SW Blaster à répétition monté (bleu)","SW Canon laser monté (bleu)"], special:"Poste canonnier" },
  { name:"SW Canon anti-char AV-7", faction:"République", theme:"military", points:1600, hp:6, armor:12, move:-3, pa:5, weapons:["SW Canon anti-char lourd monté (bleu)"] },

  // ── Séparatistes ──
  { name:"SW STAP Droïde", faction:"Séparatistes", theme:"industrial", points:650, hp:5, armor:12, move:3, pa:5, weapons:["x2 SW Canons laser STAP (rouge)"], special:"Vol" },
];

// ═══ LOCALSTORAGE ═══
var LS_KEY = "crossblocks_cards";

function saveCards() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(cards));
    flashSave();
  } catch(e) { /* quota exceeded or unavailable */ }
}

function loadCards() {
  try {
    var data = localStorage.getItem(LS_KEY);
    if (data) {
      cards = JSON.parse(data);
      if (!Array.isArray(cards)) cards = [];
      return true;
    }
  } catch(e) { /* parse error */ }
  return false;
}

function flashSave() {
  var el = document.getElementById("save-indicator");
  if (!el) return;
  el.textContent = "💾 Sauvegardé !";
  el.classList.add("flash");
  setTimeout(function() {
    el.textContent = "💾 Sauvegarde auto activée";
    el.classList.remove("flash");
  }, 1200);
}

// ── Export JSON ──
function saveToJSON() {
  if (cards.length === 0) { alert("Aucune carte à exporter."); return; }
  var json = JSON.stringify(cards, null, 2);
  var blob = new Blob([json], { type:"application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "CrossBlocks_cartes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Import JSON ──
function loadFromJSON(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) { alert("Fichier invalide."); return; }
      var mode = cards.length > 0
        ? confirm("Ajouter aux cartes existantes ?\n(OK = ajouter, Annuler = remplacer)")
        : false;
      if (mode) {
        cards = cards.concat(data);
      } else {
        cards = data;
      }
      saveCards();
      displayCards();
      alert(data.length + " carte(s) importée(s) !");
    } catch(err) {
      alert("Erreur de lecture : " + err.message);
    }
  };
  reader.readAsText(file);
  input.value = ""; // reset for re-upload
}

// ═══ GALERIE ═══
var currentGalleryFilter = "all";
var currentGalleryTab = "units"; // "units" or "vehicles"

function switchGalleryTab(tab, btn) {
  currentGalleryTab = tab;
  var btns = document.querySelectorAll(".btn-tab");
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
  if (btn) btn.classList.add("active");

  // Update filter buttons: hide Rebelles for vehicles (no rebel vehicles)
  var filterBtns = document.querySelectorAll(".btn-filter");
  for (var j = 0; j < filterBtns.length; j++) {
    filterBtns[j].style.display = "";
  }

  renderGallery();
}

function renderGallery() {
  var grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";

  var source = currentGalleryTab === "vehicles" ? VEHICLES : GALLERY;

  source.forEach(function(unit, i) {
    if (currentGalleryFilter !== "all" && unit.faction !== currentGalleryFilter) return;

    var fac = CONFIG.factions[unit.faction] || { color:"#888" };
    var el = document.createElement("div");
    el.className = "gallery-card";
    el.setAttribute("data-faction", unit.faction);

    var specialBadge = unit.special
      ? ' <span class="gc-special">' + unit.special + '</span>'
      : '';

    var isVehicle = currentGalleryTab === "vehicles";
    var arrayName = isVehicle ? "VEHICLES" : "GALLERY";

    // Pending badge
    var pendingBadge = unit._pending ? ' <span class="gc-pending">non validé</span>' : '';

    el.innerHTML =
      '<span class="gc-initial" style="background:' + fac.color + '22;color:' + fac.color + '">' + unit.faction.charAt(0) + '</span>' +
      '<div class="gc-info">' +
        '<div class="gc-name">' + unit.name + pendingBadge + '</div>' +
        '<div class="gc-meta">' +
          '<span class="gc-faction" style="background:' + fac.color + '22;color:' + fac.color + '">' + unit.faction + '</span> ' +
          unit.weapons.join(", ") +
          specialBadge +
        '</div>' +
      '</div>' +
      '<span class="gc-pts">' + unit.points + '</span>' +
      '<button class="gc-add" onclick="addFromGallery(\'' + arrayName + '\',' + i + ',this)" title="Ajouter">+</button>';

    grid.appendChild(el);
  });

  if (grid.children.length === 0) {
    grid.innerHTML = '<div class="cards-empty">Aucune unité dans cette catégorie.</div>';
  }
}

function filterGallery(faction, btn) {
  currentGalleryFilter = faction;
  var btns = document.querySelectorAll(".btn-filter");
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
  if (btn) btn.classList.add("active");
  renderGallery();
}

function addFromGallery(arrayName, index, btn) {
  var source = arrayName === "VEHICLES" ? VEHICLES : GALLERY;
  var unit = source[index];
  if (!unit) return;
  cards.push({
    name: unit.name,
    faction: unit.faction,
    theme: unit.theme,
    points: String(unit.points),
    hp: String(unit.hp),
    armor: String(unit.armor),
    move: String(unit.move),
    pa: String(unit.pa),
    weapons: unit.weapons.slice()
  });
  saveCards();
  displayCards();

  // Visual feedback
  if (btn) {
    var card = btn.closest(".gallery-card");
    if (card) card.classList.add("gc-added");
    btn.textContent = "✓";
    btn.style.background = "#40b860";
    setTimeout(function() {
      btn.textContent = "+";
      btn.style.background = "";
      if (card) card.classList.remove("gc-added");
    }, 800);
  }
}

// ── Load gallery unit into editor ──
function loadToEditor(index) {
  var unit = GALLERY[index];
  if (!unit) return;
  document.getElementById("ed-name").value = unit.name;
  document.getElementById("ed-points").value = unit.points;
  document.getElementById("ed-hp").value = unit.hp;
  document.getElementById("ed-armor").value = unit.armor;
  document.getElementById("ed-move").value = unit.move;
  document.getElementById("ed-pa").value = unit.pa;

  // Set faction & theme
  document.getElementById("ed-faction").value = unit.faction;
  document.getElementById("ed-theme").value = unit.theme;

  // Set weapons
  selectedWeapons = unit.weapons.slice();
  var cbs = document.querySelectorAll("#weapon-selector input[type=checkbox]");
  for (var i = 0; i < cbs.length; i++) {
    cbs[i].checked = selectedWeapons.indexOf(cbs[i].value) >= 0;
  }
  updatePreview();
  // Scroll to editor
  document.querySelector(".editor-section").scrollIntoView({ behavior:"smooth" });
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
  populateThemes();
  populateFactions();
  populateWeapons();
  updatePreview();
  // Load community suggestions into live data (pending + approved)
  loadSuggestions();

  renderGallery();
  populateSuggestFactions();
  updateSuggestCount();

  // Load saved cards from localStorage
  if (loadCards()) {
    displayCards();
    var el = document.getElementById("save-indicator");
    if (el) el.textContent = "💾 " + cards.length + " carte(s) restaurée(s) depuis la sauvegarde";
  }
});

function populateThemes() {
  const sel = document.getElementById("ed-theme");
  if (!sel) return;
  sel.innerHTML = "";
  CONFIG.themes.forEach(t => {
    const o = document.createElement("option");
    o.value = t;
    o.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    sel.appendChild(o);
  });
}

function populateFactions() {
  const sel = document.getElementById("ed-faction");
  if (!sel) return;
  sel.innerHTML = "";
  Object.keys(CONFIG.factions).forEach(f => {
    const o = document.createElement("option");
    o.value = f;
    o.textContent = f;
    sel.appendChild(o);
  });
}

function populateWeapons() {
  var grid = document.getElementById("weapon-selector");
  if (!grid) return;
  grid.innerHTML = "";
  var weaponNames = Object.keys(CONFIG.weapons);
  for (var i = 0; i < weaponNames.length; i++) {
    var name = weaponNames[i];
    var w = CONFIG.weapons[name];
    var label = document.createElement("label");
    label.className = "weapon-option";

    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = name;
    cb.onchange = (function(cbRef) { return function() { toggleWeapon(cbRef); }; })(cb);

    var nameSpan = document.createElement("span");
    nameSpan.className = "w-name";
    nameSpan.textContent = name;
    if (w._pending) {
      var badge = document.createElement("span");
      badge.className = "w-pending";
      badge.textContent = "non validé";
      nameSpan.appendChild(badge);
    }

    var statsSpan = document.createElement("span");
    statsSpan.className = "w-stats";
    statsSpan.textContent = w.mun + "d p" + w.pen + " d" + w.dmg;

    label.appendChild(cb);
    label.appendChild(nameSpan);
    label.appendChild(statsSpan);
    grid.appendChild(label);
  }
}

function toggleWeapon(cb) {
  if (cb.checked) {
    selectedWeapons.push(cb.value);
  } else {
    selectedWeapons = selectedWeapons.filter(w => w !== cb.value);
  }
  updatePreview();
}

// ── Live Preview ──
function updatePreview() {
  const card = document.getElementById("card-preview");
  if (!card) return;

  const name = document.getElementById("ed-name").value || "Nom de l'unité";
  const points = document.getElementById("ed-points").value || "0";
  const hp = document.getElementById("ed-hp").value || "0";
  const armor = document.getElementById("ed-armor").value || "0";
  const move = document.getElementById("ed-move").value || "0";
  const pa = document.getElementById("ed-pa").value || "5";
  const theme = document.getElementById("ed-theme").value;
  const faction = document.getElementById("ed-faction").value;
  const fac = CONFIG.factions[faction] || { color:"#888", accent:"#f0c040" };

  // Theme
  card.className = "card theme-" + theme;

  // Header
  const badge = card.querySelector(".card-faction-badge");
  badge.textContent = faction;
  badge.style.borderLeft = "3px solid " + fac.color;
  card.querySelector(".card-points").textContent = "\u2B50 " + points;

  // Name
  card.querySelector(".card-name").textContent = name;

  // Stats
  document.getElementById("pv-hp").textContent = hp;
  document.getElementById("pv-arm").textContent = armor;
  const mv = parseInt(move);
  document.getElementById("pv-move").textContent = (mv >= 0 ? "+" : "") + move;
  document.getElementById("pv-pa").textContent = pa;

  // Weapons
  const wDiv = document.getElementById("pv-weapons");
  if (selectedWeapons.length === 0) {
    wDiv.innerHTML = '<div class="card-no-weapon">Aucune arme sélectionnée</div>';
  } else {
    wDiv.innerHTML = selectedWeapons.map(function(wName) {
      const w = CONFIG.weapons[wName];
      if (!w) return "";
      return '<div class="card-weapon">' +
        '<span class="cw-name">' + wName + '</span>' +
        '<span class="cw-stat">' + w.mun + '\uD83C\uDFB2 P' + w.pen + ' D' + w.dmg + '</span>' +
      '</div>';
    }).join("");
  }
}

// ── Add Card ──
function addCard() {
  var name = document.getElementById("ed-name").value.trim();
  if (!name) { alert("Entrez un nom d'unité !"); return; }

  cards.push({
    name: name,
    faction: document.getElementById("ed-faction").value,
    theme: document.getElementById("ed-theme").value,
    points: document.getElementById("ed-points").value || "0",
    hp: document.getElementById("ed-hp").value || "0",
    armor: document.getElementById("ed-armor").value || "0",
    move: document.getElementById("ed-move").value || "0",
    pa: document.getElementById("ed-pa").value || "5",
    weapons: selectedWeapons.slice() // copy
  });
  saveCards();
  displayCards();
  // Flash feedback
  var btn = document.querySelector(".btn-add");
  btn.textContent = "✓ Ajoutée !";
  btn.style.background = "#208040";
  setTimeout(function() { btn.textContent = "➕ Ajouter la carte"; btn.style.background = ""; }, 800);
}

function clearForm() {
  document.getElementById("ed-name").value = "";
  document.getElementById("ed-points").value = "200";
  document.getElementById("ed-hp").value = "2";
  document.getElementById("ed-armor").value = "15";
  document.getElementById("ed-move").value = "0";
  document.getElementById("ed-pa").value = "5";
  selectedWeapons = [];
  var cbs = document.querySelectorAll("#weapon-selector input[type=checkbox]");
  for (var i = 0; i < cbs.length; i++) cbs[i].checked = false;
  updatePreview();
}

// ── Display Cards ──
function displayCards() {
  var container = document.getElementById("cards-container");
  var countEl = document.getElementById("card-count");
  var exportBtn = document.getElementById("btn-export");
  var clearBtn = document.getElementById("btn-clear-all");

  countEl.textContent = cards.length + " carte(s)";
  exportBtn.disabled = cards.length === 0;
  clearBtn.style.display = cards.length > 0 ? "inline-flex" : "none";

  if (cards.length === 0) {
    container.innerHTML = '<div class="cards-empty">Aucune carte pour l\'instant. Utilisez l\'éditeur ci-dessus pour en créer !</div>';
    return;
  }

  container.innerHTML = "";
  cards.forEach(function(c, i) {
    var fac = CONFIG.factions[c.faction] || { color:"#888", accent:"#f0c040" };
    var mv = parseInt(c.move);

    var wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";

    // Weapons HTML
    var weaponHTML = "";
    if (c.weapons.length === 0) {
      weaponHTML = '<div class="card-no-weapon">Aucune arme</div>';
    } else {
      c.weapons.forEach(function(wName) {
        var w = CONFIG.weapons[wName];
        if (!w) return;
        weaponHTML += '<div class="card-weapon">' +
          '<span class="cw-name">' + wName + '</span>' +
          '<span class="cw-stat">' + w.mun + '\uD83C\uDFB2 P' + w.pen + ' D' + w.dmg + '</span>' +
        '</div>';
      });
    }

    wrapper.innerHTML =
      '<button class="card-delete" onclick="deleteCard(' + i + ')" title="Supprimer">\u2715</button>' +
      '<div class="card theme-' + c.theme + '">' +
        '<div class="card-header">' +
          '<span class="card-faction-badge" style="border-left:3px solid ' + fac.color + '">' + c.faction + '</span>' +
          '<span class="card-points">\u2B50 ' + c.points + '</span>' +
        '</div>' +
        '<h2 class="card-name">' + c.name + '</h2>' +
        '<div class="card-stats">' +
          '<div class="card-stat"><span class="stat-icon">\u2764\uFE0F</span><span class="stat-val">' + c.hp + '</span><span class="stat-label">PV</span></div>' +
          '<div class="card-stat"><span class="stat-icon">\uD83D\uDEE1\uFE0F</span><span class="stat-val">' + c.armor + '</span><span class="stat-label">Armure</span></div>' +
          '<div class="card-stat"><span class="stat-icon">\uD83C\uDFC3</span><span class="stat-val">' + (mv >= 0 ? "+" : "") + c.move + '</span><span class="stat-label">Mouv.</span></div>' +
          '<div class="card-stat"><span class="stat-icon">\u26A1</span><span class="stat-val">' + c.pa + '</span><span class="stat-label">PA</span></div>' +
        '</div>' +
        '<div class="card-weapons">' + weaponHTML + '</div>' +
        '<div class="card-footer">CROSSBLOCKS</div>' +
      '</div>';

    container.appendChild(wrapper);
  });
}

function deleteCard(index) {
  cards.splice(index, 1);
  saveCards();
  displayCards();
}

function clearAllCards() {
  if (confirm("Supprimer toutes les cartes ?")) {
    cards = [];
    saveCards();
    displayCards();
  }
}

// ═══ PDF EXPORT (A6: 105mm × 148mm) ═══
function exportPDF() {
  if (cards.length === 0) return;

  var btn = document.getElementById("btn-export");
  btn.textContent = "\u23F3 Génération...";
  btn.disabled = true;

  setTimeout(function() {
    var jsPDF = window.jspdf.jsPDF;
    var pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:[105, 148] });

    var bgMap = {
      metal:[58,63,72], dark:[22,22,28], military:[58,68,32],
      parchment:[238,224,192], clone:[238,238,242], empire:[14,10,10],
      rebel:[38,30,28], neon:[5,5,10], industrial:[40,40,44], wood:[74,46,20]
    };

    cards.forEach(function(c, i) {
      if (i > 0) pdf.addPage([105, 148], "portrait");

      var bg = bgMap[c.theme] || [30, 30, 40];
      var isLight = (c.theme === "parchment" || c.theme === "clone");
      var txt = isLight ? [30, 20, 10] : [230, 230, 240];
      var acc = isLight ? [170, 110, 20] : [240, 192, 64];
      var dim = isLight ? [120, 100, 60] : [bg[0]*0.55, bg[1]*0.55, bg[2]*0.55];

      // Background
      pdf.setFillColor(bg[0], bg[1], bg[2]);
      pdf.roundedRect(2, 2, 101, 144, 3, 3, "F");

      // Border
      var fac = CONFIG.factions[c.faction] || { color:"#888" };
      var bc = hexToRgb(fac.color);
      pdf.setDrawColor(bc[0], bc[1], bc[2]);
      pdf.setLineWidth(0.8);
      pdf.roundedRect(2, 2, 101, 144, 3, 3, "S");

      // Faction
      pdf.setFontSize(7);
      pdf.setTextColor(txt[0], txt[1], txt[2]);
      pdf.text(c.faction.toUpperCase(), 7, 10);

      // Points
      pdf.setFontSize(11);
      pdf.setTextColor(acc[0], acc[1], acc[2]);
      pdf.text(c.points + " pts", 98, 10, { align:"right" });

      // Name
      pdf.setFontSize(17);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(txt[0], txt[1], txt[2]);
      pdf.text(c.name.toUpperCase(), 52.5, 24, { align:"center", maxWidth:88 });

      // Separator
      pdf.setDrawColor(acc[0], acc[1], acc[2]);
      pdf.setLineWidth(0.4);
      pdf.line(10, 30, 95, 30);

      // Stats boxes
      pdf.setFont(undefined, "normal");
      var stats = [
        { label:"PV", val:c.hp },
        { label:"ARM", val:c.armor },
        { label:"MOV", val:(parseInt(c.move) >= 0 ? "+" : "") + c.move },
        { label:"PA", val:c.pa }
      ];
      var sw = 21, sx = 9;
      stats.forEach(function(s, si) {
        var x = sx + si * sw + si * 2;
        pdf.setFillColor(dim[0], dim[1], dim[2]);
        pdf.roundedRect(x, 34, sw, 16, 2, 2, "F");
        // Value
        pdf.setFontSize(15);
        pdf.setFont(undefined, "bold");
        pdf.setTextColor(acc[0], acc[1], acc[2]);
        pdf.text(String(s.val), x + sw/2, 43.5, { align:"center" });
        // Label
        pdf.setFontSize(6);
        pdf.setFont(undefined, "normal");
        pdf.setTextColor(txt[0], txt[1], txt[2]);
        pdf.text(s.label, x + sw/2, 48.5, { align:"center" });
      });

      // Weapons header
      var y = 58;
      pdf.setFontSize(7);
      pdf.setTextColor(acc[0], acc[1], acc[2]);
      pdf.text("ARMEMENT", 7, y);
      y += 4;

      if (c.weapons.length === 0) {
        pdf.setFontSize(8);
        pdf.setTextColor(dim[0], dim[1], dim[2]);
        pdf.text("Aucune arme", 52.5, y + 4, { align:"center" });
      } else {
        c.weapons.forEach(function(wName) {
          var w = CONFIG.weapons[wName];
          if (!w || y > 128) return;
          // Row bg
          pdf.setFillColor(dim[0], dim[1], dim[2]);
          pdf.roundedRect(7, y, 91, 7.5, 1.5, 1.5, "F");
          // Name
          pdf.setFontSize(9);
          pdf.setFont(undefined, "bold");
          pdf.setTextColor(txt[0], txt[1], txt[2]);
          pdf.text(wName, 10, y + 5);
          // Stats
          pdf.setFontSize(7);
          pdf.setFont(undefined, "normal");
          pdf.setTextColor(acc[0], acc[1], acc[2]);
          var info = w.mun + " des | Pen " + w.pen + " | Dmg " + w.dmg + " | " + w.portee;
          pdf.text(info, 95, y + 5, { align:"right" });
          y += 9;
        });
      }

      // Footer
      pdf.setFontSize(5);
      pdf.setTextColor(dim[0], dim[1], dim[2]);
      pdf.text("CROSSBLOCKS", 52.5, 143, { align:"center" });
    });

    pdf.save("CrossBlocks_cartes.pdf");
    btn.textContent = "\uD83D\uDCC4 Exporter PDF A6";
    btn.disabled = false;
  }, 60);
}

// Helper: hex color to [r,g,b]
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  return [parseInt(hex.substr(0,2),16), parseInt(hex.substr(2,2),16), parseInt(hex.substr(4,2),16)];
}

// ═══ LANCHESTER PRICE CALCULATOR ═══
// Exponential cost based on N² combat power scaling

function calcWeaponDmg(w, targetArm) {
  // Best range damage of a weapon vs target armor
  if (!w) return 0;
  var best = 0;
  var bands = [w.diff]; // simplified: use main diff
  var hitP = Math.max(0, (21 - w.diff) / 20);
  var pen = w.pen || 0;
  var saveP = Math.max(0, (21 - (targetArm + pen)) / 20);
  var failSave = 1 - saveP;
  var dmg = w.dmg;
  if (typeof dmg === "string") {
    // Handle "1-4" style damage
    var parts = dmg.split("-");
    dmg = (parseInt(parts[0]) + parseInt(parts[1])) / 2;
  }
  var mun = w.mun || 1;
  return mun * hitP * failSave * dmg;
}

function calcPrice() {
  var hp = Math.max(1, parseInt(document.getElementById("ed-hp").value) || 1);
  var arm = parseInt(document.getElementById("ed-armor").value) || 15;
  var pa = Math.max(1, parseInt(document.getElementById("ed-pa").value) || 5);
  var move = parseInt(document.getElementById("ed-move").value) || 0;

  var TARGET_ARM = 15; // Reference target: Clone armor
  var REF_PEN = 5;     // Reference attacker penetration

  // ── 1. HP Factor (exponential: Lanchester) ──
  var hpFactor = Math.pow(hp, 1.5);

  // ── 2. Armor → Parade → Effective HP multiplier ──
  var parade = Math.max(0, (21 - (arm + REF_PEN)) / 20);
  var survivalMult;
  if (parade >= 1) {
    survivalMult = 20; // practically invincible cap
  } else if (parade <= 0) {
    survivalMult = 1;  // no save = raw HP
  } else {
    survivalMult = 1 / (1 - parade); // effective HP multiplier
  }

  // ── 3. Weapon DPT (damage per turn) ──
  var nWeapons = selectedWeapons.length;
  var maxFires = Math.floor(pa / 2);
  var nFires = Math.min(nWeapons, maxFires);

  // Calculate each weapon's damage, sort by best
  var wDmgs = [];
  for (var i = 0; i < selectedWeapons.length; i++) {
    var w = CONFIG.weapons[selectedWeapons[i]];
    var d = calcWeaponDmg(w, TARGET_ARM);
    wDmgs.push({ name: selectedWeapons[i], dmg: d, pen: w ? w.pen : 0 });
  }
  wDmgs.sort(function(a, b) { return b.dmg - a.dmg; });

  var dpt = 0;
  var totalPen = 0;
  for (var j = 0; j < nFires; j++) {
    dpt += wDmgs[j].dmg;
    totalPen += Math.max(0, wDmgs[j].pen - 4); // pen premium above baseline
  }

  // Weapon factor: DPT + penetration premium for anti-armor
  var weaponFactor = 1 + Math.pow(dpt, 0.8) * 0.5 + totalPen * 0.06;

  // ── 4. PA / Mobility ──
  var paAfterFire = pa - nFires * 2;
  var mobilityFactor = 1 + paAfterFire * 0.05 + move * 0.03;

  // ── 5. Final price ──
  // BASE calibrated so Clone Ph.2 (2hp,arm15,5PA,fusil) ≈ 200pts
  var BASE = 40;
  var rawPrice = BASE * hpFactor * survivalMult * weaponFactor * mobilityFactor;
  var finalPrice = Math.round(rawPrice / 10) * 10; // round to nearest 10

  // ── Apply to field ──
  document.getElementById("ed-points").value = finalPrice;
  updatePreview();

  // ── Show breakdown ──
  var bk = document.getElementById("price-breakdown");
  bk.style.display = "block";

  // Rating: compare to Clone Ph.2 baseline (~200pts)
  var rating = finalPrice <= 150 ? "Bon marché" :
               finalPrice <= 250 ? "Standard" :
               finalPrice <= 500 ? "Élite" :
               finalPrice <= 1000 ? "Héroïque" : "Titanesque";
  var ratingColor = finalPrice <= 150 ? "#3fb950" :
                    finalPrice <= 250 ? "#58a6ff" :
                    finalPrice <= 500 ? "#f0c040" :
                    finalPrice <= 1000 ? "#f09040" : "#f85149";

  // Lanchester comparison: how many Clones (200pts) would this equal?
  var cloneEquiv = (finalPrice / 200).toFixed(1);
  // But in Lanchester, N clones have N² power, so effective power ratio:
  var nClones = finalPrice / 200;
  var clonePower = Math.pow(Math.max(1, Math.round(nClones)), 2);
  var unitPower = hpFactor * survivalMult * weaponFactor;
  var powerRatio = unitPower / clonePower;
  var powerVerdict = powerRatio > 1.2 ? "OP 🔴" : powerRatio > 0.8 ? "Équilibré ✅" : "Faible 🔵";

  var barPct = Math.min(100, finalPrice / 30);
  var barColor = finalPrice <= 250 ? "#3fb950" : finalPrice <= 500 ? "#f0c040" : "#f85149";

  bk.innerHTML =
    '<div class="price-result">⭐ ' + finalPrice + ' pts</div>' +
    '<div style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;background:' + ratingColor + '22;color:' + ratingColor + ';margin-bottom:8px;">' + rating + '</div>' +
    '<div class="price-row"><span class="pr-label">HP^1.5 (Lanchester)</span><span class="pr-val">' + hp + ' PV → ×' + hpFactor.toFixed(1) + '</span></div>' +
    '<div class="price-row"><span class="pr-label">Parade (arm=' + arm + ' vs pen=5)</span><span class="pr-val ' + (parade > 0.3 ? "pr-high" : parade > 0 ? "pr-mid" : "pr-low") + '">' + Math.round(parade * 100) + '% → ×' + survivalMult.toFixed(2) + '</span></div>' +
    '<div class="price-row"><span class="pr-label">DPT (' + nFires + ' tir(s)/tour vs arm=15)</span><span class="pr-val">' + dpt.toFixed(2) + ' dmg → ×' + weaponFactor.toFixed(2) + '</span></div>' +
    '<div class="price-row"><span class="pr-label">Mobilité (' + paAfterFire + ' PA mvt, MM' + (move >= 0 ? "+" : "") + move + ')</span><span class="pr-val">×' + mobilityFactor.toFixed(2) + '</span></div>' +
    '<div class="price-bar"><div class="price-bar-fill" style="width:' + barPct + '%;background:' + barColor + '"></div></div>' +
    '<div class="price-row" style="margin-top:6px;border:none"><span class="pr-label">≈ ' + cloneEquiv + ' Clones en coût</span><span class="pr-val">' + powerVerdict + '</span></div>' +
    '<div class="price-tip">💡 Formule : Base(70) × HP^1.5 × Survie × Armes × Mobilité — ' +
    'basé sur la loi de Lanchester (N² scaling)</div>';
}

// ═══ COMMUNITY SUGGESTIONS ═══
// Pending = usable locally with "non validé" badge
// Approved = official, no badge
// Rejected = removed entirely
var SG_KEY = "crossblocks_suggestions";

function getSuggestions() {
  try { var d = localStorage.getItem(SG_KEY); return d ? JSON.parse(d) : []; }
  catch(e) { return []; }
}
function saveSuggestions(arr) {
  try { localStorage.setItem(SG_KEY, JSON.stringify(arr)); } catch(e) {}
}

// Load all pending+approved suggestions into live lists
function loadSuggestions() {
  var arr = getSuggestions();
  for (var i = 0; i < arr.length; i++) {
    var s = arr[i];
    if (s.status === "rejected") continue;
    var isPending = s.status === "pending";

    if (s.type === "unit") {
      // Avoid duplicates (check by name)
      var exists = false;
      for (var j = 0; j < GALLERY.length; j++) {
        if (GALLERY[j].name === s.name) { exists = true; break; }
      }
      if (!exists) {
        GALLERY.push({
          name: s.name, faction: s.faction, theme: s.theme || "metal",
          points: s.points, hp: s.hp, armor: s.armor, move: s.move, pa: s.pa,
          weapons: s.weapons, special: s.notes || null,
          _pending: isPending, _sgIndex: i
        });
      }
    } else if (s.type === "weapon") {
      if (!CONFIG.weapons[s.name]) {
        CONFIG.weapons[s.name] = {
          mun: s.mun, diff: s.diff, pen: s.pen, dmg: s.dmg,
          portee: s.portee,
          _pending: isPending, _sgIndex: i
        };
      }
    }
  }
}

function switchSuggestTab(tab, btn) {
  var btns = document.querySelectorAll(".btn-stab");
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
  if (btn) btn.classList.add("active");
  document.getElementById("suggest-unit").style.display = tab === "unit" ? "flex" : "none";
  document.getElementById("suggest-weapon").style.display = tab === "weapon" ? "flex" : "none";
}

function submitSuggestion(type) {
  var sg;
  if (type === "unit") {
    var name = document.getElementById("sg-name").value.trim();
    if (!name) { alert("Entrez un nom d'unité !"); return; }
    sg = {
      type: "unit",
      name: name,
      faction: document.getElementById("sg-faction").value,
      theme: "metal",
      points: parseInt(document.getElementById("sg-pts").value) || 200,
      hp: parseInt(document.getElementById("sg-hp").value) || 2,
      armor: parseInt(document.getElementById("sg-arm").value) || 15,
      move: parseInt(document.getElementById("sg-mm").value) || 0,
      pa: parseInt(document.getElementById("sg-pa").value) || 5,
      weapons: document.getElementById("sg-weapons").value.split(",").map(function(s){ return s.trim(); }).filter(Boolean),
      notes: document.getElementById("sg-notes").value.trim(),
      date: new Date().toISOString().slice(0,10),
      status: "pending"
    };
  } else {
    var wname = document.getElementById("sgw-name").value.trim();
    if (!wname) { alert("Entrez un nom d'arme !"); return; }
    sg = {
      type: "weapon",
      name: wname,
      diff: parseInt(document.getElementById("sgw-diff").value) || 15,
      mun: parseInt(document.getElementById("sgw-mun").value) || 3,
      pen: parseInt(document.getElementById("sgw-pen").value) || 5,
      dmg: parseInt(document.getElementById("sgw-dmg").value) || 1,
      portee: document.getElementById("sgw-portee").value.trim() || "Cat.1",
      notes: document.getElementById("sgw-notes").value.trim(),
      date: new Date().toISOString().slice(0,10),
      status: "pending"
    };
  }

  var arr = getSuggestions();
  arr.push(sg);
  saveSuggestions(arr);

  // Immediately add to live lists (usable locally)
  var idx = arr.length - 1;
  if (sg.type === "unit") {
    GALLERY.push({
      name: sg.name, faction: sg.faction, theme: sg.theme || "metal",
      points: sg.points, hp: sg.hp, armor: sg.armor, move: sg.move, pa: sg.pa,
      weapons: sg.weapons, special: sg.notes || null,
      _pending: true, _sgIndex: idx
    });
    renderGallery();
  } else {
    CONFIG.weapons[sg.name] = {
      mun: sg.mun, diff: sg.diff, pen: sg.pen, dmg: sg.dmg,
      portee: sg.portee, _pending: true, _sgIndex: idx
    };
    populateWeapons();
  }

  updateSuggestCount();
  alert("✅ Proposition ajoutée ! Elle est utilisable immédiatement et sera validée par l'admin.");
}

function updateSuggestCount() {
  var el = document.getElementById("suggest-count");
  if (!el) return;
  var pending = getSuggestions().filter(function(s) { return s.status === "pending"; });
  el.textContent = pending.length > 0 ? pending.length + " proposition(s) en attente de validation" : "";
}

function populateSuggestFactions() {
  var sel = document.getElementById("sg-faction");
  if (!sel) return;
  sel.innerHTML = "";
  var facs = Object.keys(CONFIG.factions);
  for (var i = 0; i < facs.length; i++) {
    var opt = document.createElement("option");
    opt.value = facs[i]; opt.textContent = facs[i];
    sel.appendChild(opt);
  }
}

// ═══ ADMIN: PENDING REVIEW ═══
function renderPending() {
  var container = document.getElementById("admin-pending");
  if (!container) return;
  var arr = getSuggestions();
  var pending = arr.filter(function(s) { return s.status === "pending"; });

  var html = '<h3>Propositions en attente</h3>' +
    '<p class="admin-desc">Les propositions sont utilisables localement. Approuver les rend officielles (badge retiré).</p>';

  if (pending.length === 0) {
    html += '<p style="color:var(--text2);font-size:12px;margin-top:8px">Aucune proposition en attente.</p>';
    container.innerHTML = html;
    return;
  }

  html += '<div class="pending-list">';
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].status !== "pending") continue;
    var s = arr[i];
    if (s.type === "unit") {
      html += '<div class="pending-item">' +
        '<div class="pi-info"><span class="pi-name">' + s.name + '</span> (' + s.faction + ')' +
        '<div class="pi-meta">' + s.points + 'pts | PV:' + s.hp + ' Arm:' + s.armor + '+ PA:' + s.pa +
        ' MM:' + s.move + ' | Armes: ' + s.weapons.join(", ") +
        (s.notes ? ' | ' + s.notes : '') + ' | ' + s.date + '</div></div>' +
        '<button class="btn-approve" onclick="approveSuggestion(' + i + ')">Approuver</button>' +
        '<button class="btn-reject" onclick="rejectSuggestion(' + i + ')">Rejeter</button></div>';
    } else {
      html += '<div class="pending-item">' +
        '<div class="pi-info"><span class="pi-name">' + s.name + '</span>' +
        '<div class="pi-meta">Mun:' + s.mun + ' Diff:' + s.diff + ' Pen:' + s.pen +
        ' Dmg:' + s.dmg + ' | ' + s.portee +
        (s.notes ? ' | ' + s.notes : '') + ' | ' + s.date + '</div></div>' +
        '<button class="btn-approve" onclick="approveSuggestion(' + i + ')">Approuver</button>' +
        '<button class="btn-reject" onclick="rejectSuggestion(' + i + ')">Rejeter</button></div>';
    }
  }
  html += '</div>';
  container.innerHTML = html;
}

function approveSuggestion(index) {
  var arr = getSuggestions();
  var s = arr[index];
  if (!s) return;

  // Update status in localStorage
  arr[index].status = "approved";
  saveSuggestions(arr);

  // Remove _pending flag from live data
  if (s.type === "unit") {
    for (var i = 0; i < GALLERY.length; i++) {
      if (GALLERY[i].name === s.name) { GALLERY[i]._pending = false; break; }
    }
    renderGallery();
  } else {
    if (CONFIG.weapons[s.name]) CONFIG.weapons[s.name]._pending = false;
    populateWeapons();
  }

  renderPending();
  updateSuggestCount();
}

function rejectSuggestion(index) {
  var arr = getSuggestions();
  var s = arr[index];
  if (!s) return;

  // Remove from live data
  if (s.type === "unit") {
    for (var i = GALLERY.length - 1; i >= 0; i--) {
      if (GALLERY[i].name === s.name && GALLERY[i]._sgIndex === index) {
        GALLERY.splice(i, 1); break;
      }
    }
    renderGallery();
  } else {
    if (CONFIG.weapons[s.name] && CONFIG.weapons[s.name]._sgIndex === index) {
      delete CONFIG.weapons[s.name];
    }
    populateWeapons();
  }

  arr[index].status = "rejected";
  saveSuggestions(arr);
  renderPending();
  updateSuggestCount();
}
