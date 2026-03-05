// ═══ CONFIGURATION CROSSBLOCKS ═══

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    "SW Fusil laser (bleu)":              { mun:3, pen:5, dmg:1, melee:0, cat1:15, cat2:16, catP:0 },
    "SW Fusil laser (rouge)":             { mun:3, pen:4, dmg:1, melee:0, cat1:15, cat2:16, catP:0 },
    "SW Blaster laser (bleu)":            { mun:3, pen:5, dmg:1, melee:0, cat1:14, cat2:17, catP:0 },
    "SW Blaster laser (rouge)":           { mun:3, pen:4, dmg:1, melee:0, cat1:14, cat2:17, catP:0 },
    "SW Pistolet laser (bleu)":           { mun:5, pen:4, dmg:1, melee:17, cat1:17, cat2:0, catP:0 },
    "SW Pistolet laser (rouge)":          { mun:5, pen:3, dmg:1, melee:17, cat1:17, cat2:0, catP:0 },
    "SW Sniper laser lourd (bleu)":       { mun:1, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15 },
    "SW Double fusil laser lourd (bleu)": { mun:2, pen:6, dmg:1, melee:0, cat1:13, cat2:16, catP:0 },
    "SW Pistolet automatique lourd laser (bleu)":{ mun:5, pen:4, dmg:2, melee:15, cat1:15, cat2:0, catP:0 },
    "SW Fusil de poing laser (rouge)":    { mun:2, pen:3, dmg:1, melee:0, cat1:16, cat2:16, catP:0 },
    "x2 SW Fusils de poing laser (rouge)":{ mun:4, pen:3, dmg:1, melee:0, cat1:16, cat2:16, catP:0 },
    "x3 SW Tourelles rotatives laser":    { mun:12, pen:3, dmg:1, melee:0, cat1:14, cat2:14, catP:0 },
    "x3 SW Rockets laser (usage unique)": { mun:3, pen:10, dmg:"1-4", melee:0, cat1:0, cat2:11, catP:11, once:true },
    "SW Canon anti-char lourd monté (bleu)":{ mun:1, pen:10, dmg:4, melee:0, cat1:0, cat2:10, catP:10 },
    "x2 SW Canons laser STAP (rouge)":    { mun:8, pen:5, dmg:1, melee:0, cat1:12, cat2:14, catP:0 },
    "x2 SW Snipers laser lourds montés (bleu)":{ mun:2, pen:7, dmg:2, melee:0, cat1:0, cat2:13, catP:15 },
    "SW Blaster à répétition monté (bleu)":{ mun:6, pen:6, dmg:1, melee:0, cat1:14, cat2:17, catP:0 },
    "SW Canon laser monté (bleu)":        { mun:2, pen:7, dmg:2, melee:0, cat1:12, cat2:14, catP:0 },
    "x2 SW Fusils laser de Motojet (bleu)":{ mun:6, pen:4, dmg:1, melee:0, cat1:15, cat2:15, catP:0 },
  },

  factions: {
    "République":   { color:"#4488dd", accent:"#f0c040" },
    "Séparatistes": { color:"#cc9966", accent:"#ff5555" },
    "Rebelles":     { color:"#dd5544", accent:"#ff8c42" },
    "Empire":       { color:"#cc2222", accent:"#eeeeee" },
    "Neutre":       { color:"#888888", accent:"#f0c040" },
  },

  siteName: "CrossBlocks",

  // ═══ REMOTE SUGGESTIONS (jsonblob.com) ═══
  remoteSuggestionsId: null
};
