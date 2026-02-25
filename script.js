// ═══ CROSSBLOCKS — Script principal ═══

let cards = [];
let selectedWeapons = [];

// ── Init ──
document.addEventListener("DOMContentLoaded", () => {
  populateThemes();
  populateFactions();
  populateWeapons();
  updatePreview();
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
  const grid = document.getElementById("weapon-selector");
  if (!grid) return;
  grid.innerHTML = "";
  Object.entries(CONFIG.weapons).forEach(([name, w]) => {
    const label = document.createElement("label");
    label.className = "weapon-option";
    label.innerHTML =
      '<input type="checkbox" value="' + name + '" onchange="toggleWeapon(this)">' +
      '<span class="w-name">' + w.icon + ' ' + name + '</span>' +
      '<span class="w-stats">' + w.mun + 'd p' + w.pen + ' d' + w.dmg + '</span>';
    grid.appendChild(label);
  });
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
        '<span class="cw-icon">' + w.icon + '</span>' +
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
          '<span class="cw-icon">' + w.icon + '</span>' +
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
  displayCards();
}

function clearAllCards() {
  if (confirm("Supprimer toutes les cartes ?")) {
    cards = [];
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
