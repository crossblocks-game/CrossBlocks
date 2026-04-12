// ═══ CONFIGURATION CROSSBLOCKS ═══

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    // ─── ARMES BLASTERS (BLEU / REPUBLIQUE) ───────────────────────
    "SW Fusil laser (bleu)":              { mun:3, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:100 },
    "SW Blaster laser (bleu)":            { mun:3, pen:5, dmg:1, melee:0, cat1:14, cat2:17, catP:0,  price:120 },
    "SW Pistolet laser (bleu)":           { mun:5, pen:4, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:100 },
    "SW Sniper laser lourd (bleu)":       { mun:1, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15,  price:140 },
    "SW Double fusil laser lourd (bleu)": { mun:2, pen:6, dmg:1, melee:0, cat1:13, cat2:16, catP:0,  price:100 },
    "SW Pistolet automatique lourd laser (bleu)": { mun:5, pen:4, dmg:2, melee:15, cat1:15, cat2:0, catP:0, price:290 },
    "SW Pistolet DC-15s (Clone)":         { mun:3, pen:5, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:70  },
    "SW Blaster DC-17m ARC":              { mun:3, pen:6, dmg:2, melee:0, cat1:14, cat2:0, catP:15,  price:300 },
    "SW Répéteur Z-6 rotatif":            { mun:8, pen:4, dmg:1, melee:0, cat1:14, cat2:16, catP:0,  price:230 },
    "SW Lance-flamme Clone":              { mun:3, pen:5, dmg:2, melee:13, cat1:15, cat2:0, catP:0,  price:290 },

    // ─── ARMES BLASTERS (ROUGE / SEPARATISTES / EMPIRE) ───────────
    "SW Fusil laser (rouge)":             { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0,  price:90  },
    "SW Blaster laser (rouge)":           { mun:3, pen:4, dmg:1, melee:0, cat1:14, cat2:17, catP:0,  price:110 },
    "SW Pistolet laser (rouge)":          { mun:5, pen:3, dmg:1, melee:17, cat1:17, cat2:0, catP:0,  price:90  },
    "SW Fusil de poing laser (rouge)":    { mun:2, pen:3, dmg:1, melee:0, cat1:16, cat2:16, catP:0,  price:50  },
    "x2 SW Fusils de poing laser (rouge)":{ mun:4, pen:3, dmg:1, melee:0, cat1:16, cat2:16, catP:0,  price:90  },
    "SW DLT-19 Blaster lourd (Empire)":   { mun:5, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0,  price:170 },
    "SW Répéteur T-21 (Scout)":           { mun:4, pen:5, dmg:1, melee:0, cat1:14, cat2:15, catP:0,  price:160 },
    "SW Pistolet SE-14r (Officier)":      { mun:4, pen:4, dmg:1, melee:16, cat1:16, cat2:0, catP:0,  price:110 },
    "SW Sniper IQA-11 (Death Trooper)":   { mun:1, pen:8, dmg:3, melee:0, cat1:0, cat2:13, catP:15,  price:220 },
    "SW Pistolet DL-44 (Solo)":           { mun:5, pen:6, dmg:1, melee:15, cat1:15, cat2:0, catP:0,  price:170 },
    "SW Pistolets WESTAR-35 (Mando)":     { mun:4, pen:5, dmg:1, melee:15, cat1:16, cat2:0, catP:0,  price:150 },
    "SW Carabine EE-3 (Fett)":            { mun:2, pen:6, dmg:2, melee:0, cat1:14, cat2:16, catP:0,  price:170 },
    "SW Blaster Mandalorien":             { mun:4, pen:5, dmg:1, melee:15, cat1:15, cat2:16, catP:0,  price:160 },
    "SW Arbalète Wookiee (Bowcaster)":    { mun:2, pen:7, dmg:3, melee:0, cat1:14, cat2:15, catP:0,  price:270 },

    // ─── ARMES MONTÉES / LOURDES ──────────────────────────────────
    "x3 SW Tourelles rotatives laser":    { mun:12, pen:3, dmg:1, melee:0, cat1:14, cat2:14, catP:0,  price:290 },
    "x2 SW Canons laser STAP (rouge)":    { mun:8, pen:5, dmg:1, melee:0, cat1:12, cat2:14, catP:0,  price:310 },
    "SW Canon anti-char lourd monté (bleu)": { mun:1, pen:10, dmg:4, melee:0, cat1:0, cat2:10, catP:10, price:460 },
    "x2 SW Snipers laser lourds montés (bleu)": { mun:2, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15, price:250 },
    "SW Blaster à répétition monté (bleu)": { mun:6, pen:6, dmg:1, melee:0, cat1:14, cat2:17, catP:0, price:230 },
    "SW Canon laser monté (bleu)":        { mun:2, pen:7, dmg:2, melee:0, cat1:12, cat2:14, catP:0,  price:230 },
    "x2 SW Fusils laser de Motojet (bleu)": { mun:6, pen:4, dmg:1, melee:0, cat1:15, cat2:15, catP:0, price:160 },
    "SW Blaster modulaire B3 (droïde)":   { mun:10, pen:4, dmg:2, melee:0, cat1:15, cat2:16, catP:0, price:480 },

    // ─── EXPLOSIFS (usage unique — malus non récupérable) ─────────
    "x3 SW Rockets laser (usage unique)": { mun:3, pen:10, dmg:"1-4", melee:0, cat1:0, cat2:11, catP:11, once:true, price:540 },
    "SW Détonateur thermique":            { mun:1, pen:8, dmg:3, melee:0, cat1:13, cat2:0, catP:0, once:true, price:140 },
    "SW Roquettes de poignet (Mando)":    { mun:2, pen:9, dmg:2, melee:0, cat1:13, cat2:0, catP:0, once:true, price:180 },
    "SW Lance-détonateurs (Clone)":       { mun:2, pen:9, dmg:3, melee:0, cat1:12, cat2:0, catP:0, once:true, price:300 },

    // ─── ARMES DE MÊLÉE ───────────────────────────────────────────
    "SW Sabre laser (bleu)":              { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:260 },
    "SW Sabre laser (rouge)":             { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:260 },
    "SW Sabre laser (vert)":              { mun:2, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:290 },
    "SW Sabre laser (violet - Windu)":    { mun:3, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:460 },
    "SW Double sabre laser":              { mun:3, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:430 },
    "SW Darksaber":                       { mun:2, pen:9, dmg:3, melee:11, cat1:0, cat2:0, catP:0,   price:490 },
    "SW Sabre courbe (Dooku)":            { mun:2, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:310 },
    "SW 4 Sabres laser (Grievous)":       { mun:5, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0,   price:620 },
    "SW Électro-Bâton (MagnaGuard)":      { mun:3, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0,   price:390 },
    "SW Lame vibrante (Mando)":           { mun:2, pen:6, dmg:2, melee:13, cat1:0, cat2:0, catP:0,   price:210 },

    // ─── POUVOIRS DE LA FORCE ─────────────────────────────────────
    "SW Éclair de Force (Sith)":          { mun:2, pen:8, dmg:2, melee:0, cat1:13, cat2:0, catP:0,   price:220 },
  },

  factions: {
    "République":    { color:"#4488dd", accent:"#f0c040" },
    "Séparatistes":  { color:"#cc9966", accent:"#ff5555" },
    "Rebelles":      { color:"#dd5544", accent:"#ff8c42" },
    "Empire":        { color:"#cc2222", accent:"#eeeeee" },
    "Mandalorien":   { color:"#9966cc", accent:"#f0c040" },
    "Première Ordre":{ color:"#aa1111", accent:"#cccccc" },
    "Résistance":    { color:"#2266cc", accent:"#ff8822" },
    "Côté Obscur":   { color:"#660066", accent:"#ff0000" },
    "Chasseur de primes":{ color:"#886644", accent:"#f0c040" },
    "Neutre":        { color:"#888888", accent:"#f0c040" },
  },

  siteName: "CrossBlocks",
  remoteSuggestionsId: null
};
