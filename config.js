// ═══ CONFIGURATION CROSSBLOCKS ═══
// Armes calibrées pour déploiement à 3C (distance initiale = catP)
// Simulation 30 000 parties : sniper -75%, pist_a overpowered 86%, B2 88%

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    // ━━━━━━━━━━━━━━━━━━ PISTOLETS ━━━━━━━━━━━━━━━━━━
    "SW Pistolet blaster DC-17 (clone bleu)": { mun:5, pen:4, dmg:1, melee:17, cat1:17, cat2:0, catP:0, price:70 },
    "SW Pistolet blaster DC-15s (clone bleu)": { mun:4, pen:4, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:70 },
    "SW Pistolet blaster rebelle (rouge)": { mun:5, pen:3, dmg:1, melee:17, cat1:17, cat2:0, catP:0, price:60 },
    "SW Pistolet blaster SE-14r (empire)": { mun:4, pen:4, dmg:1, melee:16, cat1:15, cat2:0, catP:0, price:80 },
    "SW Pistolet blaster DL-44 (Han Solo)": { mun:4, pen:6, dmg:1, melee:15, cat1:14, cat2:0, catP:0, price:140 },
    "SW Pistolet blaster WESTAR-34 (Mando)": { mun:4, pen:5, dmg:1, melee:15, cat1:15, cat2:0, catP:0, price:110 },
    "SW Pistolet blaster B2 (rouge)": { mun:3, pen:5, dmg:2, melee:16, cat1:15, cat2:0, catP:0, price:160 },
    "SW Pistolet blaster E-5 court (rouge)": { mun:3, pen:3, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:50 },
    "SW Pistolet blaster Naboo S-5 (rouge)": { mun:3, pen:3, dmg:1, melee:17, cat1:16, cat2:0, catP:0, price:50 },
    "SW Pistolet blaster KYD-21 (Zam)": { mun:4, pen:4, dmg:1, melee:16, cat1:15, cat2:0, catP:0, price:80 },
    "SW Pistolet automatique lourd DC-17 (Rex/Fives)": { mun:3, pen:5, dmg:2, melee:15, cat1:14, cat2:0, catP:0, price:200 },
    "SW Lance-flamme": { mun:3, pen:5, dmg:2, melee:13, cat1:15, cat2:0, catP:0, price:280 },

    // ━━━━━━━━━━━━━━━━━━ FUSILS ━━━━━━━━━━━━━━━━━━
    "SW Fusil blaster DC-15a (clone bleu)": { mun:3, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:110 },
    "SW Fusil blaster E-11 (empire)": { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:100 },
    "SW Fusil blaster F-11D (empire ép.7)": { mun:3, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:110 },
    "SW Fusil blaster A280 (rebelle rouge)": { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:17, catP:0, price:100 },
    "SW Fusil blaster EE-3 (Boba Fett)": { mun:2, pen:6, dmg:2, melee:0, cat1:14, cat2:16, catP:0, price:170 },
    "SW Fusil blaster Mandalorien WESTAR-M5": { mun:4, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:150 },
    "SW Fusil blaster E-5 (sep. rouge)": { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:100 },
    "SW Double fusil laser lourd (clone bleu)": { mun:3, pen:6, dmg:1, melee:0, cat1:13, cat2:16, catP:0, price:130 },

    // ━━━━━━━━━━━━━━━━━━ BLASTERS ━━━━━━━━━━━━━━━━━━
    "SW Blaster laser DC-15LE (clone bleu)": { mun:5, pen:5, dmg:1, melee:0, cat1:14, cat2:17, catP:0, price:150 },
    "SW Blaster laser rebelle (rouge)": { mun:3, pen:4, dmg:1, melee:0, cat1:14, cat2:17, catP:0, price:100 },
    "SW Blaster A280 (Cassian)": { mun:3, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0, price:110 },
    "SW Blaster lourd Z-6 répéteur (clone bleu)": { mun:8, pen:4, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:210 },
    "SW Blaster lourd Z-6 répéteur (rebelle rouge)": { mun:8, pen:4, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:210 },
    "SW Blaster lourd DLT-19 (empire)": { mun:5, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:160 },
    "SW Blaster lourd Mandalorien": { mun:6, pen:5, dmg:1, melee:0, cat1:14, cat2:16, catP:0, price:240 },
    "SW Blaster Bowcaster Wookiee (Chewie)": { mun:2, pen:7, dmg:3, melee:0, cat1:14, cat2:15, catP:0, price:260 },

    // ━━━━━━━━━━━━━━━━━━ SNIPERS ━━━━━━━━━━━━━━━━━━
    "SW Sniper laser lourd DC-15LE (clone bleu)": { mun:2, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15, price:200 },
    "SW Sniper blaster impérial E-11s (empire)": { mun:2, pen:6, dmg:2, melee:0, cat1:0, cat2:14, catP:15, price:180 },
    "SW Sniper blaster IQA-11 (Death Trooper)": { mun:2, pen:9, dmg:3, melee:0, cat1:0, cat2:13, catP:14, price:290 },
    "SW Sniper blaster modifié (Crosshair)": { mun:2, pen:10, dmg:3, melee:0, cat1:0, cat2:12, catP:13, price:320 },
    "SW Fusil sniper KYD-21 (Zam Wesell)": { mun:2, pen:6, dmg:2, melee:0, cat1:0, cat2:14, catP:15, price:220 },
    "SW Lance-roquette B2 (usage unique)": { mun:1, pen:9, dmg:3, melee:0, cat1:0, cat2:12, catP:12, price:180, once:true },

    // ━━━━━━━━━━━━━━━━━━ SABRES_LASER ━━━━━━━━━━━━━━━━━━
    "SW Sabre laser (bleu)": { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:250 },
    "SW Sabre laser (vert)": { mun:2, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:270 },
    "SW Sabre laser (rouge)": { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:250 },
    "SW Sabre laser (violet - Mace)": { mun:3, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:430 },
    "SW Sabre laser (blanc - Ahsoka)": { mun:2, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:270 },
    "SW Double sabre laser (Maul)": { mun:3, pen:7, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:400 },
    "SW Sabre courbe (Dooku)": { mun:2, pen:8, dmg:2, melee:11, cat1:0, cat2:0, catP:0, price:290 },
    "SW Darksaber (Mandalorien)": { mun:2, pen:9, dmg:3, melee:11, cat1:0, cat2:0, catP:0, price:460 },
    "SW Électro-bâton (MagnaGuard)": { mun:3, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:370 },
    "SW Bâton Gaderffi (Tusken)": { mun:2, pen:5, dmg:2, melee:13, cat1:0, cat2:0, catP:0, price:140 },
    "SW Bâton de Rey": { mun:2, pen:5, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:160 },
    "SW Couteau vibro (Hunter)": { mun:1, pen:6, dmg:2, melee:13, cat1:0, cat2:0, catP:0, price:130 },
    "SW Lance Vibrolame (Garde Royale)": { mun:2, pen:7, dmg:2, melee:12, cat1:0, cat2:0, catP:0, price:230 },

    // ━━━━━━━━━━━━━━━━━━ SPECIAUX ━━━━━━━━━━━━━━━━━━
    // ⚠ ARMES NON-STANDARDS — à vérifier manuellement
    "SW Fusil blaster DC-17m ARC (clone bleu)": { mun:3, pen:6, dmg:2, melee:0, cat1:14, cat2:0, catP:15, price:270 }, // ⚠ WARNING: catégories non-standards
    "SW Détonateur thermique": { mun:1, pen:8, dmg:3, melee:0, cat1:13, cat2:0, catP:0, price:130, once:true }, // ⚠ WARNING: catégories non-standards
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
