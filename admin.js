// ═══ CROSSBLOCKS — Admin Panel ═══

const ADMIN_PASSWORD = "crossblocks123";
var isAdmin = false;

function promptAdmin() {
  if (isAdmin) { openAdmin(); return; }
  var pwd = prompt("Mot de passe admin :");
  if (pwd === ADMIN_PASSWORD) {
    isAdmin = true;
    var btn = document.getElementById("admin-btn");
    if (btn) { btn.textContent = "🔓 Admin"; btn.style.borderColor = "var(--accent)"; btn.style.color = "var(--accent)"; }
    openAdmin();
  }
  else if (pwd !== null) alert("Mot de passe incorrect.");
}

function openAdmin() {
  document.getElementById("adminPanel").style.display = "flex";
  // Show balance tab only in admin mode
  var balTab = document.getElementById("admin-bal-tab");
  if (balTab) balTab.style.display = isAdmin ? "inline-flex" : "none";
  renderAdmin();
  renderPending();
  if (isAdmin) renderBalance();
}

function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
  populateThemes();
  populateWeapons();
  updatePreview();
}

function switchAdminTab(tab, btn) {
  // Toggle tabs
  var btns = document.querySelectorAll(".btn-admtab");
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
  if (btn) btn.classList.add("active");

  document.getElementById("admin-config").style.display = tab === "config" ? "block" : "none";
  document.getElementById("admin-pending").style.display = tab === "pending" ? "block" : "none";
  document.getElementById("admin-balance").style.display = tab === "balance" ? "block" : "none";

  if (tab === "pending") renderPending();
  if (tab === "balance") renderBalance();
}

function renderAdmin() {
  // ── Themes ──
  var themeDiv = document.getElementById("adminThemes");
  themeDiv.innerHTML = "";
  CONFIG.themes.forEach(function(t, i) {
    var row = document.createElement("div");
    row.style.cssText = "display:flex; align-items:center; gap:6px; margin:3px 0;";

    var swatch = document.createElement("div");
    swatch.className = "card theme-" + t;
    swatch.style.cssText = "width:18px; height:18px; border-radius:4px; flex-shrink:0;";
    row.appendChild(swatch);

    var input = document.createElement("input");
    input.value = t;
    input.style.width = "140px";
    input.onchange = function(e) { CONFIG.themes[i] = e.target.value; };
    row.appendChild(input);

    themeDiv.appendChild(row);
  });

  // ── Weapons ──
  var weaponDiv = document.getElementById("adminWeapons");
  weaponDiv.innerHTML = "";

  var header = document.createElement("div");
  header.className = "admin-weapon-row";
  header.style.background = "transparent";
  header.innerHTML =
    '<span style="width:140px;font-size:10px;color:var(--accent)">Nom</span>' +
    '<span style="width:60px;font-size:10px;color:var(--accent)">Mun</span>' +
    '<span style="width:60px;font-size:10px;color:var(--accent)">Diff</span>' +
    '<span style="width:60px;font-size:10px;color:var(--accent)">Pen</span>' +
    '<span style="width:60px;font-size:10px;color:var(--accent)">Dmg</span>';
  weaponDiv.appendChild(header);

  Object.keys(CONFIG.weapons).forEach(function(wName) {
    var w = CONFIG.weapons[wName];
    var row = document.createElement("div");
    row.className = "admin-weapon-row";

    var nameI = document.createElement("input");
    nameI.value = wName; nameI.style.width = "140px";
    var munI = document.createElement("input");
    munI.type = "number"; munI.value = w.mun; munI.min = 1;
    var diffI = document.createElement("input");
    diffI.type = "number"; diffI.value = w.diff;
    var penI = document.createElement("input");
    penI.type = "number"; penI.value = w.pen;
    var dmgI = document.createElement("input");
    dmgI.value = w.dmg;

    nameI.onchange = function() {
      var obj = CONFIG.weapons[wName];
      delete CONFIG.weapons[wName];
      wName = nameI.value;
      CONFIG.weapons[wName] = obj;
    };
    munI.onchange = function() { CONFIG.weapons[wName].mun = parseInt(munI.value); };
    diffI.onchange = function() { CONFIG.weapons[wName].diff = parseInt(diffI.value); };
    penI.onchange = function() { CONFIG.weapons[wName].pen = parseInt(penI.value); };
    dmgI.onchange = function() {
      var v = parseInt(dmgI.value);
      CONFIG.weapons[wName].dmg = isNaN(v) ? dmgI.value : v;
    };

    row.appendChild(nameI);
    row.appendChild(munI);
    row.appendChild(diffI);
    row.appendChild(penI);
    row.appendChild(dmgI);
    weaponDiv.appendChild(row);
  });
}

// ═══ BALANCE ANALYSIS (Lanchester) ═══

function balWeaponDmg(w, targetArm) {
  if (!w) return 0;
  var hitP = Math.max(0, (21 - w.diff) / 20);
  var saveP = Math.max(0, (21 - (targetArm + w.pen)) / 20);
  var dmg = w.dmg;
  if (typeof dmg === "string") {
    var parts = dmg.split("-");
    dmg = (parseInt(parts[0]) + parseInt(parts[1])) / 2;
  }
  return (w.mun || 1) * hitP * (1 - saveP) * dmg;
}

function analyzeUnit(unit) {
  var TARGET_ARM = 15;
  var REF_PEN = 5;

  var hp = unit.hp;
  var arm = unit.armor;
  var pa = unit.pa;
  var move = unit.move;

  // Effective HP
  var hpFactor = Math.pow(hp, 1.5);
  var parade = Math.max(0, (21 - (arm + REF_PEN)) / 20);
  var survivalMult = parade >= 1 ? 20 : parade <= 0 ? 1 : 1 / (1 - parade);
  var effHP = hp * survivalMult;

  // DPT
  var maxFires = Math.floor(pa / 2);
  var nFires = Math.min(unit.weapons.length, maxFires);
  var wDmgs = [];
  for (var i = 0; i < unit.weapons.length; i++) {
    var w = CONFIG.weapons[unit.weapons[i]];
    wDmgs.push({ dmg: balWeaponDmg(w, TARGET_ARM), pen: w ? w.pen : 0 });
  }
  wDmgs.sort(function(a, b) { return b.dmg - a.dmg; });

  var dpt = 0;
  for (var j = 0; j < nFires; j++) dpt += wDmgs[j].dmg;

  // Lifetime damage
  var lifetime = dpt * effHP;

  // PA after fire
  var paAfterFire = pa - nFires * 2;
  var mobilityBonus = 1 + paAfterFire * 0.05 + move * 0.03;

  // Value = combat power / cost
  var combatPower = lifetime * mobilityBonus;
  var value = unit.points > 0 ? (combatPower / unit.points * 1000) : 0;

  // Suggested price (same formula as calcPrice)
  var BASE = 40;
  var totalPen = 0;
  for (var k = 0; k < nFires; k++) totalPen += Math.max(0, wDmgs[k].pen - 4);
  var weaponFactor = 1 + Math.pow(dpt, 0.8) * 0.5 + totalPen * 0.06;
  var mobFactor = 1 + paAfterFire * 0.05 + move * 0.03;
  var suggestedPrice = Math.round((BASE * hpFactor * survivalMult * weaponFactor * mobFactor) / 10) * 10;

  return {
    effHP: effHP.toFixed(1),
    dpt: dpt.toFixed(2),
    nFires: nFires,
    paMove: paAfterFire,
    lifetime: lifetime.toFixed(1),
    value: value.toFixed(1),
    suggested: suggestedPrice,
    diff: suggestedPrice - unit.points,
    parade: Math.round(parade * 100)
  };
}

function renderBalance() {
  renderBalanceTable(GALLERY, "balance-table");
  renderBalanceTable(VEHICLES, "balance-table-vehicles");
}

function renderBalanceTable(source, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var html = '<table class="bal-table"><thead><tr>' +
    '<th>Nom</th><th>Faction</th><th>Pts</th><th>PVeff</th>' +
    '<th>DPT</th><th>Tirs</th><th>PA mvt</th>' +
    '<th>Prix suggéré</th><th>Écart</th><th>Ratio</th>' +
    '</tr></thead><tbody>';

  for (var i = 0; i < source.length; i++) {
    var u = source[i];
    var a = analyzeUnit(u);
    var fac = CONFIG.factions[u.faction] || { color: "#888" };

    // Rating
    var absDiff = Math.abs(a.diff);
    var pctDiff = u.points > 0 ? a.diff / u.points : 0;
    var ratingClass, ratingLabel;
    if (pctDiff > 0.3) { ratingClass = "bal-weak"; ratingLabel = "sous-coté"; }
    else if (pctDiff < -0.3) { ratingClass = "bal-op"; ratingLabel = "OP"; }
    else { ratingClass = "bal-good"; ratingLabel = "OK"; }

    html += '<tr>' +
      '<td class="bal-name">' + u.icon + ' ' + u.name + '</td>' +
      '<td><span style="color:' + fac.color + '">' + u.faction + '</span></td>' +
      '<td class="bal-val">' + u.points + '</td>' +
      '<td>' + a.effHP + '</td>' +
      '<td>' + a.dpt + '</td>' +
      '<td>' + a.nFires + '</td>' +
      '<td>' + a.paMove + '</td>' +
      '<td class="bal-val">' + a.suggested + '</td>' +
      '<td class="bal-val ' + ratingClass + '">' + (a.diff > 0 ? "+" : "") + a.diff + '</td>' +
      '<td class="' + ratingClass + '">' + ratingLabel + '</td>' +
      '</tr>';
  }

  html += '</tbody></table>';
  container.innerHTML = html;
}
