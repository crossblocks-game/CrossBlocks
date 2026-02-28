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
    swatch.className = "theme-swatch theme-" + t;
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

// ═══ BALANCE ANALYSIS (Lanchester) + REBALANCER ═══

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

  // Combat power
  var combatPower = lifetime * mobilityBonus;
  var value = unit.points > 0 ? (combatPower / unit.points * 1000) : 0;

  // Raw theoretical price (Lanchester formula)
  var BASE = 40;
  var totalPen = 0;
  for (var k = 0; k < nFires; k++) totalPen += Math.max(0, wDmgs[k].pen - 4);
  var weaponFactor = 1 + Math.pow(dpt, 0.8) * 0.5 + totalPen * 0.06;
  var mobFactor = 1 + paAfterFire * 0.05 + move * 0.03;
  var rawTheoretical = BASE * hpFactor * survivalMult * weaponFactor * mobFactor;

  return {
    effHP: effHP,
    dpt: dpt,
    nFires: nFires,
    paMove: paAfterFire,
    lifetime: lifetime,
    combatPower: combatPower,
    value: value,
    rawTheoretical: rawTheoretical,
    parade: Math.round(parade * 100)
  };
}

// ═══ SMART REBALANCER ═══
// Soft corrections: blend toward theoretical, clamped to ±25% max
// This keeps gameplay intact while fixing the worst outliers

function computeRebalance(source) {
  var results = [];

  // 1. Analyze all units
  for (var i = 0; i < source.length; i++) {
    var u = source[i];
    var a = analyzeUnit(u);
    results.push({ unit: u, analysis: a, index: i });
  }

  // 2. Calibration: anchor on Clone Phase 2 at 200pts
  //    Find ratio between raw theoretical and actual price for the reference unit
  var refUnit = null;
  for (var r = 0; r < results.length; r++) {
    if (results[r].unit.points === 200 && results[r].unit.hp === 2 && results[r].unit.armor === 15) {
      refUnit = results[r]; break;
    }
  }
  // Fallback: use average ratio of all standard infantry (≤300 pts)
  var calibrationRatio = 1;
  if (refUnit && refUnit.analysis.rawTheoretical > 0) {
    calibrationRatio = 200 / refUnit.analysis.rawTheoretical;
  } else {
    var sum = 0, cnt = 0;
    for (var c = 0; c < results.length; c++) {
      if (results[c].unit.points <= 300 && results[c].analysis.rawTheoretical > 0) {
        sum += results[c].unit.points / results[c].analysis.rawTheoretical;
        cnt++;
      }
    }
    if (cnt > 0) calibrationRatio = sum / cnt;
  }

  // 3. Compute suggested prices with soft correction
  for (var s = 0; s < results.length; s++) {
    var res = results[s];
    var currentPts = res.unit.points;
    var theoretical = Math.round(res.analysis.rawTheoretical * calibrationRatio / 10) * 10;

    // Soft blend: move 50% toward theoretical
    var blended = Math.round((currentPts * 0.5 + theoretical * 0.5) / 10) * 10;

    // Clamp: max ±25% change from current
    var maxUp = Math.round(currentPts * 1.25 / 10) * 10;
    var maxDown = Math.round(currentPts * 0.75 / 10) * 10;
    var suggested = Math.max(maxDown, Math.min(maxUp, blended));

    // Round to 10
    suggested = Math.round(suggested / 10) * 10;
    if (suggested < 50) suggested = 50; // minimum price

    var diff = suggested - currentPts;
    var pctDiff = currentPts > 0 ? (diff / currentPts) : 0;

    // Status
    var status, reason;
    if (Math.abs(pctDiff) < 0.05) {
      status = "ok";
      reason = "Équilibré";
    } else if (diff > 0) {
      status = "up";
      reason = "Sous-coté: puissance de feu élevée pour le coût";
      if (res.analysis.effHP > 4) reason = "Sous-coté: trop résistant pour le coût";
      if (res.analysis.dpt > 1.5 && res.analysis.effHP > 3) reason = "Sous-coté: combo dégâts + survie trop fort";
    } else {
      status = "down";
      reason = "Sur-coté: dégâts faibles pour le prix";
      if (res.analysis.parade > 50) reason = "Sur-coté: armure trop faible, meurt vite";
      if (res.analysis.paMove <= 0) reason = "Sur-coté: pas de mobilité restante";
    }

    res.suggested = suggested;
    res.diff = diff;
    res.pctDiff = pctDiff;
    res.status = status;
    res.reason = reason;
    res.theoretical = theoretical;
  }

  return results;
}

function renderBalance() {
  renderBalanceSection(GALLERY, "balance-table", "units");
  renderBalanceSection(VEHICLES, "balance-table-vehicles", "vehicles");
}

function renderBalanceSection(source, containerId, sourceKey) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var results = computeRebalance(source);

  // Count issues
  var issues = results.filter(function(r) { return r.status !== "ok"; }).length;
  var issueText = issues === 0
    ? '<span style="color:#3fb950">Toutes les unités sont équilibrées.</span>'
    : '<span style="color:#f59e0b">' + issues + ' ajustement(s) recommandé(s)</span>';

  var html = '<div style="margin-bottom:8px;font-size:11px">' + issueText + '</div>';

  html += '<table class="bal-table"><thead><tr>' +
    '<th>Nom</th><th>Faction</th><th>Actuel</th>' +
    '<th>PVeff</th><th>DPT</th><th>Théorique</th>' +
    '<th>Conseillé</th><th>Écart</th><th>Diagnostic</th><th></th>' +
    '</tr></thead><tbody>';

  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var u = r.unit;
    var fac = CONFIG.factions[u.faction] || { color: "#888" };

    var statusClass = r.status === "ok" ? "bal-good" : r.status === "up" ? "bal-weak" : "bal-op";
    var arrow = r.diff > 0 ? "▲" : r.diff < 0 ? "▼" : "=";
    var diffStr = r.diff === 0 ? "—" : (r.diff > 0 ? "+" : "") + r.diff;
    var pctStr = Math.abs(r.pctDiff) < 0.01 ? "" : " (" + (r.pctDiff > 0 ? "+" : "") + Math.round(r.pctDiff * 100) + "%)";

    // Apply button (only if diff ≠ 0)
    var applyBtn = r.diff !== 0
      ? '<button class="btn-approve" style="font-size:9px;padding:2px 6px" onclick="applyRebalance(\'' + sourceKey + '\',' + i + ',' + r.suggested + ')">Appliquer</button>'
      : '';

    html += '<tr>' +
      '<td class="bal-name">' + u.name + '</td>' +
      '<td><span style="color:' + fac.color + '">' + u.faction + '</span></td>' +
      '<td class="bal-val">' + u.points + '</td>' +
      '<td>' + r.analysis.effHP.toFixed(1) + '</td>' +
      '<td>' + r.analysis.dpt.toFixed(2) + '</td>' +
      '<td class="bal-val" style="color:#888">' + r.theoretical + '</td>' +
      '<td class="bal-val" style="font-weight:900;color:' + (r.status === "ok" ? "#3fb950" : "#f0c040") + '">' + r.suggested + '</td>' +
      '<td class="bal-val ' + statusClass + '">' + arrow + ' ' + diffStr + pctStr + '</td>' +
      '<td style="font-size:9px;color:' + (r.status === "ok" ? "#3fb950" : "#f59e0b") + '">' + r.reason + '</td>' +
      '<td>' + applyBtn + '</td>' +
      '</tr>';
  }

  html += '</tbody></table>';

  // "Apply all" button
  if (issues > 0) {
    html += '<div style="margin-top:10px;display:flex;gap:8px;align-items:center">' +
      '<button class="btn-approve" style="padding:5px 14px;font-size:11px" onclick="applyAllRebalance(\'' + sourceKey + '\')">Appliquer tout (' + issues + ' changements)</button>' +
      '<span style="font-size:10px;color:var(--text2)">Les points seront modifiés dans la galerie. Max ±25% par unité.</span>' +
      '</div>';
  }

  container.innerHTML = html;
}

function applyRebalance(sourceKey, index, newPrice) {
  var source = sourceKey === "vehicles" ? VEHICLES : GALLERY;
  if (source[index]) {
    var old = source[index].points;
    source[index].points = newPrice;
    renderBalance();
    renderGallery();
  }
}

function applyAllRebalance(sourceKey) {
  var source = sourceKey === "vehicles" ? VEHICLES : GALLERY;
  var results = computeRebalance(source);
  var count = 0;
  for (var i = 0; i < results.length; i++) {
    if (results[i].diff !== 0) {
      source[results[i].index].points = results[i].suggested;
      count++;
    }
  }
  renderBalance();
  renderGallery();
  alert(count + " prix mis à jour.");
}
