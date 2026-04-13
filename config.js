// ═══ CONFIGURATION CROSSBLOCKS ═══
// Armes : X1 uniquement — pistolet=petit LEGO, fusil=moyen, sniper=long, blaster=tire physiquement

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    // ── PISTOLETS (petits éléments LEGO) ──────────────────────────────
    "SW Pistolet blaster DC-15s (bleu)":       { mun:3, pen:4, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:80  },
    "SW Pistolet blaster DC-17 (bleu)":        { mun:4, pen:5, dmg:1, melee:16, cat1:16, cat2:0, catP:0,  price:110 },
    "SW Pistolet blaster rebelle (rouge)":     { mun:4, pen:4, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:90  },
    "SW Pistolet blaster SE-14r (empire)":     { mun:4, pen:4, dmg:1, melee:16, cat1:16, cat2:0, catP:0,  price:100 },
    "SW Pistolet blaster DL-44 (rouge)":       { mun:5, pen:6, dmg:1, melee:15, cat1:15, cat2:0, catP:0,  price:180 },
    "SW Pistolet blaster WESTAR (Mando)":      { mun:4, pen:5, dmg:1, melee:15, cat1:16, cat2:0, catP:0,  price:150 },
    "SW Pistolet blaster Mandalorien":         { mun:4, pen:5, dmg:1, melee:15, cat1:15, cat2:16, catP:0,  price:160 },
    "SW Pistolet blaster B2 (rouge)":          { mun:3, pen:5, dmg:2, melee:16, cat1:16, cat2:0, catP:0,  price:200 },
    "SW Pistolet blaster E-5 court (rouge)":   { mun:3, pen:3, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:70  },
    "SW Pistolet blaster naboo (rouge)":       { mun:3, pen:3, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:70  },
    "SW Pistolet blaster Rodien (rouge)":      { mun:3, pen:4, dmg:1, melee:17, cat1:16, cat2:0, catP:0,  price:80  },
    "SW Pistolet blaster KYD-21 (Zam)":        { mun:4, pen:4, dmg:1, melee:16, cat1:16, cat2:0, catP:0,  price:100 },
    "SW Pistolet sonique géonosis":            { mun:3, pen:3, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:70  },

    // ── FUSILS (armes moyennes LEGO) ──────────────────────────────────
    "SW Fusil blaster DC-15a (bleu)":          { mun:3, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:110 },
    "SW Fusil blaster DC-17m ARC (bleu)":      { mun:3, pen:6, dmg:2, melee:0, cat1:14, cat2:0, catP:15,  price:290 },
    "SW Fusil blaster E-11 (empire)":          { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:100 },
    "SW Fusil blaster F-11D (empire)":         { mun:3, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0,  price:110 },
    "SW Fusil blaster rebelle (rouge)":        { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:17, catP:0,  price:100 },
    "SW Fusil blaster EE-3 (Fett)":            { mun:2, pen:6, dmg:2, melee:0, cat1:14, cat2:16, catP:0,  price:180 },
    "SW Fusil blaster Mandalorien":            { mun:4, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:160 },
    "SW Fusil blaster E-5 (rouge)":            { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:100 },
    "SW Fusil blaster Relby V-10 (Bossk)":     { mun:3, pen:5, dmg:2, melee:0, cat1:14, cat2:0, catP:15,  price:260 },
    "SW Fusil blaster naboo S-5 (rouge)":      { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:100 },
    "SW Fusil sniper KYD-21 (Zam)":            { mun:2, pen:6, dmg:2, melee:0, cat1:0, cat2:14, catP:15,  price:240 },
    "SW Fusil sonique géonosis":               { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:100 },

    // ── SNIPERS (longues armes LEGO) ──────────────────────────────────
    "SW Sniper blaster DC-15LE (bleu)":        { mun:1, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15,  price:150 },
    "SW Sniper blaster impérial (empire)":     { mun:1, pen:6, dmg:2, melee:0, cat1:0, cat2:14, catP:15,  price:140 },
    "SW Sniper blaster IQA-11 (empire)":       { mun:1, pen:9, dmg:3, melee:0, cat1:0, cat2:13, catP:14,  price:230 },
    "SW Sniper blaster modifié Crosshair":     { mun:1, pen:10, dmg:3, melee:0, cat1:0, cat2:12, catP:13, price:280 },

    // ── BLASTERS LOURDS (tirent des pièces LEGO) ──────────────────────
    "SW Fusil lourd DLT-19 (empire)":          { mun:5, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0,  price:170 },
    "SW Blaster DC-15LE (bleu)":               { mun:5, pen:5, dmg:1, melee:0, cat1:14, cat2:17, catP:0,  price:160 },
    "SW Blaster répéteur Dark Trooper":        { mun:6, pen:6, dmg:2, melee:0, cat1:13, cat2:16, catP:0,  price:380 },

    // ── RÉPÉTEURS ─────────────────────────────────────────────────────
    "SW Répéteur Z-6 rotatif (bleu)":          { mun:8, pen:4, dmg:1, melee:0, cat1:14, cat2:16, catP:0,  price:220 },
    "SW Répéteur Z-6 rotatif (rouge)":         { mun:8, pen:4, dmg:1, melee:0, cat1:14, cat2:16, catP:0,  price:220 },
    "SW Répéteur lourd Mandalorien":           { mun:6, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0,  price:250 },

    // ── ARMES SPÉCIALES / LANCER / EXPLOSIFS ──────────────────────────
    "SW Lance-flamme Clone (bleu)":            { mun:3, pen:5, dmg:2, melee:13, cat1:15, cat2:0, catP:0,  price:300 },
    "SW Lance-flamme Clone (empire)":          { mun:3, pen:5, dmg:2, melee:13, cat1:15, cat2:0, catP:0,  price:300 },
    "SW Lance-roquette B2 (usage unique)":     { mun:1, pen:9, dmg:3, melee:0, cat1:0, cat2:12, catP:12, once:true, price:200 },
    "SW Arbalète Bowcaster (Wookiee)":         { mun:2, pen:7, dmg:3, melee:0, cat1:14, cat2:15, catP:0,  price:280 },
    "SW Détonateur thermique (once)":          { mun:1, pen:8, dmg:3, melee:0, cat1:13, cat2:0, catP:0, once:true, price:150 },

    // ── MÊLÉE / CORPS-À-CORPS ─────────────────────────────────────────
    "SW Sabre laser (bleu)":                   { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:270 },
    "SW Sabre laser (rouge)":                  { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:270 },
    "SW Sabre laser (vert)":                   { mun:2, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:300 },
    "SW Sabre laser (blanc)":                  { mun:2, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:300 },
    "SW Sabre laser (violet - Windu)":         { mun:3, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:470 },
    "SW Double sabre laser (rouge)":           { mun:3, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:440 },
    "SW Darksaber (Mandalorien)":              { mun:2, pen:9, dmg:3, melee:11, cat1:0, cat2:0, catP:0,   price:500 },
    "SW Sabre courbe (rouge - Dooku)":         { mun:2, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:320 },
    "SW Électro-Bâton (MagnaGuard)":           { mun:3, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:400 },
    "SW Bâton Gaderffi (Tusken)":              { mun:2, pen:5, dmg:2, melee:13, cat1:0, cat2:0, catP:0,   price:160 },
    "SW Hache vibro Gamorrean":                { mun:2, pen:6, dmg:2, melee:13, cat1:0, cat2:0, catP:0,   price:200 },
    "SW Bâton de combat Rey":                  { mun:2, pen:5, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:180 },
    "SW Couteau vibro Hunter":                 { mun:1, pen:6, dmg:2, melee:13, cat1:0, cat2:0, catP:0,   price:150 },
    "SW Lance-Vibrolame (Garde Royal)":        { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:250 },
    "SW Lance-plasma vibro (Executioner)":     { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:250 },
    "SW Lancepierre Ewok":                     { mun:4, pen:2, dmg:1, melee:15, cat1:16, cat2:0, catP:0,  price:50  },
    "SW Matraque de trooper (improv)":         { mun:2, pen:4, dmg:2, melee:14, cat1:0, cat2:0, catP:0,   price:130 },

    // ── POUVOIRS DE LA FORCE ──────────────────────────────────────────
    "SW Éclair de Force (Sith)":               { mun:2, pen:8, dmg:2, melee:0, cat1:13, cat2:0, catP:0,   price:230 },
  },

  factions: {
    "République":          { color:"#4488dd", accent:"#f0c040" },
    "Séparatistes":        { color:"#cc9966", accent:"#ff5555" },
    "Rebelles":            { color:"#dd5544", accent:"#ff8c42" },
    "Empire":              { color:"#cc2222", accent:"#eeeeee" },
    "Mandalorien":         { color:"#9966cc", accent:"#f0c040" },
    "Première Ordre":      { color:"#aa1111", accent:"#cccccc" },
    "Résistance":          { color:"#2266cc", accent:"#ff8822" },
    "Côté Obscur":         { color:"#660066", accent:"#ff0000" },
    "Chasseur de primes":  { color:"#886644", accent:"#f0c040" },
    "Neutre":              { color:"#888888", accent:"#f0c040" },
  },

  siteName: "CrossBlocks",
  remoteSuggestionsId: null
};
