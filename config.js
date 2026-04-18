// ═══ CONFIGURATION CROSSBLOCKS ═══
// Armes calibrées pour déploiement à 3C (distance initiale = catP)
// Simulation 30 000 parties : sniper -75%, pist_a overpowered 86%, B2 88%

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    // ── PISTOLETS ─ portée melee+cat1 uniquement ─────────────────────────────
    // Ne tirent PAS au T1 (déploiement en catP). Prix réduit en conséquence.
    "SW Pistolet blaster DC-15s (bleu)":  { mun:4, pen:4, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:70  },
    "SW Pistolet blaster DC-17 (bleu)":   { mun:4, pen:5, dmg:1, melee:16, cat1:15, cat2:0, catP:0, price:90  },
    "SW Pistolet blaster rebelle (rouge)": { mun:4, pen:4, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:70  },
    "SW Pistolet blaster SE-14r (empire)": { mun:4, pen:4, dmg:1, melee:16, cat1:15, cat2:0, catP:0, price:80  },
    "SW Pistolet blaster DL-44 (rouge)":  { mun:4, pen:6, dmg:1, melee:15, cat1:14, cat2:0, catP:0, price:140 },
    "SW Pistolet blaster WESTAR (Mando)": { mun:4, pen:5, dmg:1, melee:15, cat1:15, cat2:0, catP:0, price:110 },
    "SW Pistolet blaster Mandalorien":    { mun:4, pen:5, dmg:1, melee:15, cat1:14, cat2:0, catP:0, price:120 },
    "SW Pistolet blaster B2 (rouge)":     { mun:3, pen:5, dmg:2, melee:16, cat1:15, cat2:0, catP:0, price:160 },
    "SW Pistolet blaster E-5 court (rouge)": { mun:3, pen:3, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:50  },
    "SW Pistolet blaster naboo (rouge)":  { mun:3, pen:3, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:50  },
    "SW Pistolet blaster Rodien (rouge)": { mun:3, pen:4, dmg:1, melee:17, cat1:15, cat2:0, catP:0, price:60  },
    "SW Pistolet blaster KYD-21 (Zam)":   { mun:4, pen:4, dmg:1, melee:16, cat1:15, cat2:0, catP:0, price:80  },
    "SW Pistolet sonique géonosis":       { mun:3, pen:3, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:50  },

    // ── PISTOLET AUTO (NERFÉ) ─ 5mun×2dmg était trop fort (86% sim) ─────────
    // NERF: mun 5→3. DPS réduit de 3× à ~2×. Rex/Fives = spécialistes dangereux.
    "SW Pistolet automatique lourd laser (bleu)": { mun:3, pen:5, dmg:2, melee:15, cat1:14, cat2:0, catP:0, price:200 },

    // ── FUSILS ─ portée cat1+cat2 ─ armes T2-T3 idéales ─────────────────────
    "SW Fusil blaster DC-15a (bleu)":     { mun:3, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:110 },
    "SW Fusil blaster E-11 (empire)":     { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:100 },
    "SW Fusil blaster F-11D (empire)":    { mun:3, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:110 },
    "SW Fusil blaster rebelle (rouge)":   { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:17, catP:0, price:100 },
    "SW Fusil blaster EE-3 (Fett)":       { mun:2, pen:6, dmg:2, melee:0, cat1:14, cat2:16, catP:0, price:170 },
    "SW Fusil blaster Mandalorien":       { mun:4, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:150 },
    "SW Fusil blaster E-5 (rouge)":       { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:100 },
    "SW Fusil blaster Relby V-10 (Bossk)":{ mun:3, pen:5, dmg:2, melee:0, cat1:14, cat2:0, catP:15, price:230 },
    "SW Fusil blaster naboo S-5 (rouge)": { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:100 },
    "SW Fusil sniper KYD-21 (Zam)":       { mun:2, pen:6, dmg:2, melee:0, cat1:0, cat2:14, catP:15, price:220 },
    "SW Fusil sonique géonosis":          { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:100 },
    "SW Fusil lourd DLT-19 (empire)":     { mun:5, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:160 },
    "SW Blaster DC-15LE (bleu)":          { mun:5, pen:5, dmg:1, melee:0, cat1:14, cat2:17, catP:0, price:150 },
    "SW Blaster répéteur Dark Trooper":   { mun:6, pen:6, dmg:2, melee:0, cat1:13, cat2:16, catP:0, price:360 },

    // ── FUSIL DC-17m ARC ─ polyvalent cat1+catP ───────────────────────────────
    // Avantage : tire aussi au T1 (catP). Prix légèrement augmenté.
    "SW Fusil blaster DC-17m ARC (bleu)": { mun:3, pen:6, dmg:2, melee:0, cat1:14, cat2:0, catP:15, price:270 },

    // ── SNIPERS (BUFFÉS) ─ catP = la seule arme T1. Cruciale mais fragile ─────
    // BUFF: mun 1→2 pour la compétitivité. catP = tirent au tour 1.
    // Prix augmenté pour refléter l'avantage d'ouverture.
    "SW Sniper blaster DC-15LE (bleu)":   { mun:2, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15, price:200 },
    "SW Sniper blaster impérial (empire)":{ mun:2, pen:6, dmg:2, melee:0, cat1:0, cat2:14, catP:15, price:180 },
    "SW Sniper blaster IQA-11 (empire)":  { mun:2, pen:9, dmg:3, melee:0, cat1:0, cat2:13, catP:14, price:290 },
    "SW Sniper blaster modifié Crosshair":{ mun:2, pen:10,dmg:3, melee:0, cat1:0, cat2:12, catP:13, price:320 },

    // ── DOUBLE FUSIL (BUFFÉ) ─ cat1+catP ─ 2mun était insuffisant ────────────
    // BUFF: mun 2→3. Confirme son rôle de fusil polyvalent.
    "SW Double fusil laser lourd (bleu)": { mun:3, pen:6, dmg:1, melee:0, cat1:13, cat2:16, catP:0, price:130 },

    // ── RÉPÉTEURS ─────────────────────────────────────────────────────────────
    "SW Répéteur Z-6 rotatif (bleu)":     { mun:8, pen:4, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:210 },
    "SW Répéteur Z-6 rotatif (rouge)":    { mun:8, pen:4, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:210 },
    "SW Répéteur lourd Mandalorien":      { mun:6, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:240 },

    // ── ARMES SPÉCIALES ───────────────────────────────────────────────────────
    "SW Lance-flamme Clone (bleu)":       { mun:3, pen:5, dmg:2, melee:13, cat1:15, cat2:0, catP:0, price:280 },
    "SW Lance-flamme Clone (empire)":     { mun:3, pen:5, dmg:2, melee:13, cat1:15, cat2:0, catP:0, price:280 },
    "SW Lance-roquette B2 (usage unique)":{ mun:1, pen:9, dmg:3, melee:0, cat1:0, cat2:12, catP:12, once:true, price:180 },
    "SW Arbalète Bowcaster (Wookiee)":    { mun:2, pen:7, dmg:3, melee:0, cat1:14, cat2:15, catP:0,  price:260 },
    "SW Détonateur thermique (once)":     { mun:1, pen:8, dmg:3, melee:0, cat1:13, cat2:0, catP:0, once:true, price:130 },

    // ── MÊLÉE / SABRES ────────────────────────────────────────────────────────
    // Désavantagés au T1 (pas de tir à distance). Prix modérés.
    "SW Sabre laser (bleu)":              { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:250 },
    "SW Sabre laser (rouge)":             { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:250 },
    "SW Sabre laser (vert)":              { mun:2, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:270 },
    "SW Sabre laser (blanc)":             { mun:2, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:270 },
    "SW Sabre laser (violet - Windu)":    { mun:3, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:430 },
    "SW Double sabre laser (rouge)":      { mun:3, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:400 },
    "SW Darksaber (Mandalorien)":         { mun:2, pen:9, dmg:3, melee:11, cat1:0, cat2:0, catP:0, price:460 },
    "SW Sabre courbe (rouge - Dooku)":    { mun:2, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:290 },
    "SW Électro-Bâton (MagnaGuard)":      { mun:3, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:370 },
    "SW Bâton Gaderffi (Tusken)":         { mun:2, pen:5, dmg:2, melee:13, cat1:0, cat2:0, catP:0, price:140 },
    "SW Hache vibro Gamorrean":           { mun:2, pen:6, dmg:2, melee:13, cat1:0, cat2:0, catP:0, price:180 },
    "SW Bâton de combat Rey":             { mun:2, pen:5, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:160 },
    "SW Couteau vibro Hunter":            { mun:1, pen:6, dmg:2, melee:13, cat1:0, cat2:0, catP:0, price:130 },
    "SW Lance-Vibrolame (Garde Royal)":   { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:230 },
    "SW Lance-plasma vibro (Executioner)":{ mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:230 },
    "SW Lancepierre Ewok":                { mun:4, pen:2, dmg:1, melee:15, cat1:16, cat2:0, catP:0, price:40  },
    "SW Matraque de trooper (improv)":    { mun:2, pen:4, dmg:2, melee:14, cat1:0, cat2:0, catP:0, price:110 },

    // ── ARMES MONTÉES (VÉHICULES) ─────────────────────────────────────────────
    "SW Canon anti-char lourd monté (bleu)": { mun:1, pen:10, dmg:4, melee:0, cat1:0, cat2:10, catP:10, price:450 },
    "x2 SW Snipers laser lourds montés (bleu)": { mun:2, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15, price:240 },
    "SW Blaster à répétition monté (bleu)": { mun:6, pen:6, dmg:1, melee:0, cat1:14, cat2:17, catP:0, price:220 },
    "SW Canon laser monté (bleu)":        { mun:2, pen:7, dmg:2, melee:0, cat1:12, cat2:14, catP:0, price:220 },
    "x2 SW Fusils laser de Motojet (bleu)": { mun:6, pen:4, dmg:1, melee:0, cat1:15, cat2:15, catP:0, price:150 },
    "x2 SW Canons laser STAP (rouge)":    { mun:8, pen:5, dmg:1, melee:0, cat1:12, cat2:14, catP:0, price:290 },

    // ── EXPLOSIFS MONTÉS ──────────────────────────────────────────────────────
    "x3 SW Tourelles rotatives laser":    { mun:12, pen:3, dmg:1, melee:0, cat1:14, cat2:14, catP:0, price:270 },
    "x3 SW Rockets laser (usage unique)": { mun:3, pen:10, dmg:"1-4", melee:0, cat1:0, cat2:11, catP:11, once:true, price:490 },

    // ── FORCE ─────────────────────────────────────────────────────────────────
    "SW Éclair de Force (Sith)":          { mun:2, pen:8, dmg:2, melee:0, cat1:13, cat2:0, catP:0, price:210 },
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
