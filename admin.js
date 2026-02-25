// ═══ CROSSBLOCKS — Admin Panel ═══

const ADMIN_PASSWORD = "crossblocks123";

function promptAdmin() {
  var pwd = prompt("Mot de passe admin :");
  if (pwd === ADMIN_PASSWORD) openAdmin();
  else if (pwd !== null) alert("Mot de passe incorrect.");
}

function openAdmin() {
  document.getElementById("adminPanel").style.display = "flex";
  renderAdmin();
}

function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
  // Refresh selectors after potential changes
  populateThemes();
  populateWeapons();
  updatePreview();
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

  // Header
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
    nameI.value = wName;
    nameI.style.width = "140px";

    var munI = document.createElement("input");
    munI.type = "number"; munI.value = w.mun; munI.min = 1;
    var diffI = document.createElement("input");
    diffI.type = "number"; diffI.value = w.diff;
    var penI = document.createElement("input");
    penI.type = "number"; penI.value = w.pen;
    var dmgI = document.createElement("input");
    dmgI.value = w.dmg;

    // Update handlers
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
