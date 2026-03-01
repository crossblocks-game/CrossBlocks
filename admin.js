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

// ═══ BALANCE ANALYSIS — Monte Carlo Micro-Simulation ═══
// Instead of theoretical formulas, we SIMULATE actual fights:
// "N Clones worth X pts" vs "this unit(s) worth X pts"
// Then binary-search the price where win rate ≈ 50%.

// ── D20 roll helper ──
function d20() { return Math.floor(Math.random() * 20) + 1; }

// ── Resolve one fire action ──
// Regular weapon: fires ALL mun shots at once (e.g. tourelles x3 = 12 shots)
// Once weapon (rockets etc): fires 1 shot per fire action, limited total ammo
function resolveShots(w, nShots, targetArm) {
  if (!w) return 0;
  var totalDmg = 0;
  for (var i = 0; i < nShots; i++) {
    var dmg = w.dmg;
    if (typeof dmg === "string") {
      var parts = dmg.split("-");
      dmg = Math.floor(Math.random() * (parseInt(parts[1]) - parseInt(parts[0]) + 1)) + parseInt(parts[0]);
    }
    var hitRoll = d20();
    if (hitRoll < w.diff) continue; // miss
    var saveRoll = d20();
    if (saveRoll >= (targetArm + w.pen)) continue; // saved
    totalDmg += dmg;
  }
  return totalDmg;
}

// ── Simulate one fight: team A vs team B ──
function simFight(teamA, teamB, maxTurns) {
  maxTurns = maxTurns || 15;
  // Deep copy — track remaining ammo for once-weapons
  var a = [], b = [];
  for (var i = 0; i < teamA.length; i++) {
    var ammo = {};
    for (var wi = 0; wi < teamA[i]._wObjs.length; wi++) {
      var ww = teamA[i]._wObjs[wi];
      if (ww && ww.once) ammo[wi] = ww.mun || 1; // e.g. rockets x3 = 3 shots total
    }
    a.push({ hp: teamA[i].hp, arm: teamA[i].armor, pa: teamA[i].pa,
      weapons: teamA[i]._wObjs.slice(), ammo: ammo });
  }
  for (var j = 0; j < teamB.length; j++) {
    var ammo2 = {};
    for (var wj = 0; wj < teamB[j]._wObjs.length; wj++) {
      var ww2 = teamB[j]._wObjs[wj];
      if (ww2 && ww2.once) ammo2[wj] = ww2.mun || 1;
    }
    b.push({ hp: teamB[j].hp, arm: teamB[j].armor, pa: teamB[j].pa,
      weapons: teamB[j]._wObjs.slice(), ammo: ammo2 });
  }

  for (var turn = 0; turn < maxTurns; turn++) {
    var groups = [[a, b], [b, a]];
    for (var g = 0; g < 2; g++) {
      var attackers = groups[g][0];
      var defenders = groups[g][1];
      for (var ai = 0; ai < attackers.length; ai++) {
        var atk = attackers[ai];
        if (atk.hp <= 0) continue;

        // Count alive defenders
        var alive = [];
        for (var di = 0; di < defenders.length; di++) {
          if (defenders[di].hp > 0) alive.push(di);
        }
        if (alive.length === 0) break;

        // Fire actions: floor(pa/2) per turn
        var maxFires = Math.floor(atk.pa / 2);
        for (var fi = 0; fi < maxFires; fi++) {
          // Refresh alive list
          var alive2 = [];
          for (var di2 = 0; di2 < defenders.length; di2++) {
            if (defenders[di2].hp > 0) alive2.push(di2);
          }
          if (alive2.length === 0) break;

          // Pick best available weapon
          // Priority: once-weapons first (use them before they're wasted)
          var bestW = null, bestWi = -1, bestPrio = -1;
          for (var wi2 = 0; wi2 < atk.weapons.length; wi2++) {
            var wc = atk.weapons[wi2];
            if (!wc) continue;
            if (wc.once) {
              // Check remaining ammo
              if ((atk.ammo[wi2] || 0) <= 0) continue;
              // Once-weapons get priority (higher pen usually)
              var prio = 100 + (wc.pen || 0);
              if (prio > bestPrio) { bestW = wc; bestWi = wi2; bestPrio = prio; }
            } else {
              // Regular weapon always available
              var prio2 = wc.pen || 0;
              if (prio2 > bestPrio) { bestW = wc; bestWi = wi2; bestPrio = prio2; }
            }
          }
          if (!bestW) break;

          // Pick target: focus fire on weakest
          var tIdx = alive2[0];
          var minHp = defenders[tIdx].hp;
          for (var ti = 1; ti < alive2.length; ti++) {
            if (defenders[alive2[ti]].hp < minHp) {
              tIdx = alive2[ti];
              minHp = defenders[tIdx].hp;
            }
          }

          // Fire!
          var nShots;
          if (bestW.once) {
            nShots = 1; // 1 rocket/grenade per fire action
            atk.ammo[bestWi]--;
          } else {
            nShots = bestW.mun || 1; // all mun fire at once
          }

          var dmg = resolveShots(bestW, nShots, defenders[tIdx].arm);
          defenders[tIdx].hp -= dmg;
        }
      }
    }

    // Check if one side is wiped
    var aAlive = 0, bAlive = 0;
    for (var ci = 0; ci < a.length; ci++) if (a[ci].hp > 0) aAlive++;
    for (var cj = 0; cj < b.length; cj++) if (b[cj].hp > 0) bAlive++;
    if (aAlive === 0) return -1; // B wins
    if (bAlive === 0) return 1;  // A wins
  }
  // Timeout: count surviving HP
  var aHp = 0, bHp = 0;
  for (var hi = 0; hi < a.length; hi++) aHp += Math.max(0, a[hi].hp);
  for (var hj = 0; hj < b.length; hj++) bHp += Math.max(0, b[hj].hp);
  return aHp > bHp ? 1 : aHp < bHp ? -1 : 0;
}

// ── Build unit data with resolved weapon objects ──
function buildSimUnit(unit) {
  var wObjs = [];
  for (var i = 0; i < unit.weapons.length; i++) {
    var w = CONFIG.weapons[unit.weapons[i]];
    if (w) wObjs.push(w);
  }
  return {
    hp: unit.hp, armor: unit.armor, pa: unit.pa,
    move: unit.move, points: unit.points,
    _wObjs: wObjs
  };
}

// ── Reference unit: Clone Phase 2 ──
function getRefUnit() {
  // Find in GALLERY
  for (var i = 0; i < GALLERY.length; i++) {
    var g = GALLERY[i];
    if (g.hp === 2 && g.armor === 15 && g.pa === 5 && g.points === 200) {
      return buildSimUnit(g);
    }
  }
  // Fallback: manual Clone
  return {
    hp: 2, armor: 15, pa: 5, move: 0, points: 200,
    _wObjs: [CONFIG.weapons["SW Fusil laser (bleu)"] || { mun:3, diff:15, pen:5, dmg:1 }]
  };
}

// ── Win rate: N simulations of "budget in clones" vs "budget in unit" ──
function simWinRate(unit, budget, nSims) {
  var ref = getRefUnit();
  var nClones = Math.max(1, Math.round(budget / ref.points));
  var nUnits = Math.max(1, Math.round(budget / unit.points));

  var teamA = []; // Clones
  for (var i = 0; i < nClones; i++) teamA.push(ref);
  var teamB = []; // Test units
  for (var j = 0; j < nUnits; j++) teamB.push(unit);

  var wins = 0, losses = 0;
  for (var s = 0; s < nSims; s++) {
    var result = simFight(teamA, teamB);
    if (result > 0) wins++;
    else if (result < 0) losses++;
    else { wins += 0.5; losses += 0.5; }
  }
  return { winRate: wins / nSims, nClones: nClones, nUnits: nUnits };
}

// ── Binary search for fair price ──
// Find price P such that "P pts of clones" vs "P pts of this unit" → ~50% win rate
function findFairPrice(unitTemplate, nSims) {
  nSims = nSims || 150;
  var lo = 50, hi = 3000;
  var bestPrice = unitTemplate.points;
  var bestDiff = 1;

  // Test at several budgets to get robust estimate
  var budgets = [1000, 1500, 2000];

  for (var attempt = 0; attempt < 8; attempt++) {
    var mid = Math.round((lo + hi) / 2 / 10) * 10;
    if (mid < 50) mid = 50;

    // Temporarily set price
    var testUnit = {
      hp: unitTemplate.hp, armor: unitTemplate.armor,
      pa: unitTemplate.pa, move: unitTemplate.move,
      points: mid, _wObjs: unitTemplate._wObjs
    };

    // Average win rate across budgets
    var totalWR = 0;
    for (var b = 0; b < budgets.length; b++) {
      var r = simWinRate(testUnit, budgets[b], Math.round(nSims / budgets.length));
      totalWR += r.winRate;
    }
    var avgWR = totalWR / budgets.length;

    var diff = avgWR - 0.5;
    if (Math.abs(diff) < Math.abs(bestDiff)) {
      bestPrice = mid;
      bestDiff = diff;
    }

    // If clones win too much (>50%), unit is overpriced → lower price
    if (avgWR > 0.55) hi = mid;
    // If clones lose (<50%), unit is underpriced → raise price
    else if (avgWR < 0.45) lo = mid;
    else break; // Close enough
  }

  return { fairPrice: bestPrice, cloneWinRate: 0.5 + bestDiff };
}

// ═══ FULL ANALYSIS ═══

function analyzeUnit(unit) {
  var su = buildSimUnit(unit);

  // Quick theoretical stats for display
  var TARGET_ARM = 15;
  var maxFires = Math.floor(unit.pa / 2);
  var dpt = 0;

  // Simulate ~3 turns of theoretical DPT then average
  // once-weapons: 1 shot/action, limited total ammo (=mun)
  // regular weapons: all mun fire in 1 action, unlimited
  var onceAmmo = {};
  for (var oi = 0; oi < su._wObjs.length; oi++) {
    if (su._wObjs[oi] && su._wObjs[oi].once) onceAmmo[oi] = su._wObjs[oi].mun || 1;
  }

  var totalDmg3turns = 0;
  for (var turn = 0; turn < 3; turn++) {
    for (var fi = 0; fi < maxFires; fi++) {
      var bestDmg = 0, bestIdx = -1, bestOnce = false;
      for (var i = 0; i < su._wObjs.length; i++) {
        var w = su._wObjs[i];
        if (!w) continue;
        var hitP = Math.max(0, (21 - w.diff) / 20);
        var saveP = Math.max(0, (21 - (TARGET_ARM + w.pen)) / 20);
        var dmgVal = w.dmg;
        if (typeof dmgVal === "string") {
          var pp = dmgVal.split("-"); dmgVal = (parseInt(pp[0]) + parseInt(pp[1])) / 2;
        }
        if (w.once) {
          if ((onceAmmo[i] || 0) <= 0) continue;
          // 1 shot per fire action
          var expected = hitP * (1 - saveP) * dmgVal;
          if (expected > bestDmg) { bestDmg = expected; bestIdx = i; bestOnce = true; }
        } else {
          // All mun fire at once
          var expected2 = (w.mun || 1) * hitP * (1 - saveP) * dmgVal;
          if (expected2 > bestDmg) { bestDmg = expected2; bestIdx = i; bestOnce = false; }
        }
      }
      if (bestIdx < 0) break;
      totalDmg3turns += bestDmg;
      if (bestOnce) onceAmmo[bestIdx]--;
    }
  }
  dpt = totalDmg3turns / 3; // average DPT over 3 turns
  var nFires = maxFires;

  // Survival: expected shots to kill (vs ref pen=5 weapons)
  var refHitP = Math.max(0, (21 - 15) / 20); // diff=15
  var refSaveP = Math.max(0, (21 - (unit.armor + 5)) / 20);
  var dmgPerShot = 3 * refHitP * (1 - refSaveP) * 1; // 3 mun, pen 5, dmg 1
  var shotsToKill = dmgPerShot > 0 ? unit.hp / dmgPerShot : 99;

  return {
    dpt: dpt,
    nFires: nFires,
    shotsToKill: shotsToKill,
    paMove: unit.pa - nFires * 2,
    _simUnit: su
  };
}

function computeRebalance(source) {
  var results = [];
  var SIM_COUNT = 300; // sims per unit

  // 1. Analyze all units + find fair prices
  for (var i = 0; i < source.length; i++) {
    var u = source[i];
    var a = analyzeUnit(u);
    var mc = findFairPrice(a._simUnit, SIM_COUNT);
    results.push({ unit: u, analysis: a, index: i, rawFair: mc.fairPrice, cloneWR: mc.cloneWinRate });
  }

  // 2. Calibration: find Clone Phase 2 and scale so its fair price = 200
  var cloneRawFair = null;
  for (var c = 0; c < results.length; c++) {
    var cu = results[c].unit;
    if (cu.hp === 2 && cu.armor === 15 && cu.pa === 5 && cu.points === 200) {
      cloneRawFair = results[c].rawFair;
      break;
    }
  }
  var calRatio = (cloneRawFair && cloneRawFair > 0) ? (200 / cloneRawFair) : 1;

  // 3. Apply calibration and compute suggestions
  for (var s = 0; s < results.length; s++) {
    var res = results[s];
    var fairPrice = Math.round(res.rawFair * calRatio / 10) * 10;
    if (fairPrice < 50) fairPrice = 50;
    res.fairPrice = fairPrice;

    // Clamp to ±30% of current price
    var currentPts = res.unit.points;
    var maxUp = Math.round(currentPts * 1.30 / 10) * 10;
    var maxDown = Math.round(currentPts * 0.70 / 10) * 10;
    var suggested = Math.max(maxDown, Math.min(maxUp, fairPrice));
    suggested = Math.round(suggested / 10) * 10;
    if (suggested < 50) suggested = 50;

    var diff = suggested - currentPts;
    var pctDiff = currentPts > 0 ? diff / currentPts : 0;

    // Status & reason
    var status, reason;
    var clWR = res.cloneWR;
    if (Math.abs(pctDiff) < 0.05) {
      status = "ok";
      reason = "Équilibré (sim ~" + Math.round(clWR * 100) + "% WR)";
    } else if (diff > 0) {
      status = "up";
      if (res.analysis.dpt > 2) reason = "Sous-coté: DPT élevé (" + res.analysis.dpt.toFixed(1) + ")";
      else if (res.analysis.shotsToKill > 5) reason = "Sous-coté: trop résistant (" + res.analysis.shotsToKill.toFixed(0) + " tirs)";
      else reason = "Sous-coté: bat les clones à budget égal";
    } else {
      status = "down";
      if (res.analysis.shotsToKill < 2) reason = "Sur-coté: trop fragile (" + res.analysis.shotsToKill.toFixed(1) + " tirs)";
      else if (res.analysis.dpt < 0.3) reason = "Sur-coté: DPT faible (" + res.analysis.dpt.toFixed(2) + ")";
      else reason = "Sur-coté: perd vs clones à budget égal";
    }

    res.suggested = suggested;
    res.diff = diff;
    res.pctDiff = pctDiff;
    res.status = status;
    res.reason = reason;
  }

  return results;
}

function renderBalance() {
  var container = document.getElementById("balance-table");
  var vContainer = document.getElementById("balance-table-vehicles");
  if (container) container.innerHTML = '<div style="color:#f0c040;font-size:11px;padding:8px">⏳ Simulation en cours (Monte Carlo)...</div>';
  if (vContainer) vContainer.innerHTML = '';

  // Run async to not freeze UI
  setTimeout(function() {
    renderBalanceSection(GALLERY, "balance-table", "units");
    renderBalanceSection(VEHICLES, "balance-table-vehicles", "vehicles");
  }, 50);
}

function renderBalanceSection(source, containerId, sourceKey) {
  var container = document.getElementById(containerId);
  if (!container) return;
  if (source.length === 0) { container.innerHTML = '<div style="color:#888;font-size:10px">Aucune unité</div>'; return; }

  var results = computeRebalance(source);

  var issues = results.filter(function(r) { return r.status !== "ok"; }).length;
  var issueText = issues === 0
    ? '<span style="color:#3fb950">Toutes les unités sont équilibrées.</span>'
    : '<span style="color:#f59e0b">' + issues + ' ajustement(s) recommandé(s)</span>';

  var html = '<div style="margin-bottom:6px;font-size:10px">' + issueText +
    ' <span style="color:#555;font-size:9px">(150 simulations/unité vs Clones Ph2)</span></div>';

  html += '<table class="bal-table"><thead><tr>' +
    '<th>Nom</th><th>Faction</th><th>Actuel</th>' +
    '<th>DPT</th><th>Survie</th><th>Clone WR</th>' +
    '<th>Prix juste</th><th>Conseillé</th><th>Diagnostic</th><th></th>' +
    '</tr></thead><tbody>';

  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var u = r.unit;
    var fac = CONFIG.factions[u.faction] || { color: "#888" };

    var statusClass = r.status === "ok" ? "bal-good" : r.status === "up" ? "bal-weak" : "bal-op";
    var arrow = r.diff > 0 ? "▲" : r.diff < 0 ? "▼" : "=";
    var diffStr = r.diff === 0 ? "—" : (r.diff > 0 ? "+" : "") + r.diff;

    // WR color
    var wrPct = Math.round(r.cloneWR * 100);
    var wrColor = wrPct > 55 ? "#f85149" : wrPct < 45 ? "#58a6ff" : "#3fb950";

    var applyBtn = r.diff !== 0
      ? '<button class="btn-approve" style="font-size:9px;padding:2px 6px" onclick="applyRebalance(\'' + sourceKey + '\',' + i + ',' + r.suggested + ')">Appliquer</button>'
      : '';

    html += '<tr>' +
      '<td class="bal-name">' + u.name + '</td>' +
      '<td><span style="color:' + fac.color + '">' + u.faction + '</span></td>' +
      '<td class="bal-val">' + u.points + '</td>' +
      '<td>' + r.analysis.dpt.toFixed(1) + '</td>' +
      '<td>' + r.analysis.shotsToKill.toFixed(1) + ' tirs</td>' +
      '<td style="color:' + wrColor + ';font-weight:700">' + wrPct + '%</td>' +
      '<td class="bal-val" style="color:#888">' + r.fairPrice + '</td>' +
      '<td class="bal-val" style="font-weight:900;color:' + (r.status === "ok" ? "#3fb950" : "#f0c040") + '">' + r.suggested + '</td>' +
      '<td style="font-size:9px;color:' + (r.status === "ok" ? "#3fb950" : "#f59e0b") + '">' + r.reason + '</td>' +
      '<td>' + applyBtn + '</td>' +
      '</tr>';
  }

  html += '</tbody></table>';

  if (issues > 0) {
    html += '<div style="margin-top:10px;display:flex;gap:8px;align-items:center">' +
      '<button class="btn-approve" style="padding:5px 14px;font-size:11px" onclick="applyAllRebalance(\'' + sourceKey + '\')">Appliquer tout (' + issues + ')</button>' +
      '<span style="font-size:9px;color:var(--text2)">Max ±30% par unité. Basé sur Monte Carlo vs Clone Phase 2.</span>' +
      '</div>';
  }

  container.innerHTML = html;
}

function applyRebalance(sourceKey, index, newPrice) {
  var source = sourceKey === "vehicles" ? VEHICLES : GALLERY;
  if (source[index]) {
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
