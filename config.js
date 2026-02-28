// ═══ CONFIGURATION CROSSBLOCKS ═══

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    "SW Fusil laser (bleu)":              { mun:3, diff:15, pen:5, dmg:1, portee:"Cat.1/Cat.2", icon:"🔫" },
    "SW Fusil laser (rouge)":             { mun:3, diff:15, pen:4, dmg:1, portee:"Cat.1/Cat.2", icon:"🔫" },
    "SW Blaster laser (bleu)":            { mun:3, diff:14, pen:5, dmg:1, portee:"Cat.1", icon:"⚡" },
    "SW Blaster laser (rouge)":           { mun:3, diff:14, pen:4, dmg:1, portee:"Cat.1", icon:"⚡" },
    "SW Pistolet laser (bleu)":           { mun:5, diff:17, pen:4, dmg:1, portee:"Mêlée/Cat.1", icon:"🔫" },
    "SW Pistolet laser (rouge)":          { mun:5, diff:17, pen:3, dmg:1, portee:"Mêlée/Cat.1", icon:"🔫" },
    "SW Sniper laser lourd (bleu)":       { mun:1, diff:13, pen:7, dmg:2, portee:"Cat.2/Préc.", icon:"🎯" },
    "SW Double fusil laser lourd (bleu)": { mun:2, diff:13, pen:6, dmg:1, portee:"Cat.1/Cat.2", icon:"🔫" },
    "SW Pistolet automatique lourd laser (bleu)":{ mun:5, diff:15, pen:4, dmg:2, portee:"Mêlée/Cat.1", icon:"💥" },
    "SW Fusil de poing laser (rouge)":    { mun:2, diff:16, pen:3, dmg:1, portee:"Cat.1/Cat.2", icon:"✊" },
    "x2 SW Fusils de poing laser (rouge)":{ mun:4, diff:16, pen:3, dmg:1, portee:"Cat.1/Cat.2", icon:"✊" },
    "x3 SW Tourelles rotatives laser":    { mun:12, diff:14, pen:3, dmg:1, portee:"Cat.1/Cat.2", icon:"🗼" },
    "x3 SW Rockets laser (usage unique)": { mun:3, diff:11, pen:10, dmg:"1-4", portee:"Cat.2/Préc.", icon:"🚀", once:true },
    "SW Canon anti-char lourd monté (bleu)":{ mun:1, diff:10, pen:10, dmg:4, portee:"Cat.2/Préc.", icon:"💣" },
    "x2 SW Canons laser STAP (rouge)":    { mun:8, diff:12, pen:5, dmg:1, portee:"Cat.1/Cat.2", icon:"⚡" },
    "x2 SW Snipers laser lourds montés (bleu)":{ mun:2, diff:13, pen:7, dmg:2, portee:"Cat.2/Préc.", icon:"🎯" },
    "SW Blaster à répétition monté (bleu)":{ mun:6, diff:14, pen:6, dmg:1, portee:"Cat.1/Cat.2", icon:"🔥" },
    "SW Canon laser monté (bleu)":        { mun:2, diff:12, pen:7, dmg:2, portee:"Cat.1/Cat.2", icon:"💥" },
    "x2 SW Fusils laser de Motojet (bleu)":{ mun:6, diff:15, pen:4, dmg:1, portee:"Cat.1/Cat.2", icon:"🔫" },
  },

  factions: {
    "République":   { color:"#4488dd", accent:"#f0c040" },
    "Séparatistes": { color:"#cc9966", accent:"#ff5555" },
    "Rebelles":     { color:"#dd5544", accent:"#ff8c42" },
    "Empire":       { color:"#cc2222", accent:"#eeeeee" },
    "Neutre":       { color:"#888888", accent:"#f0c040" },
  },

  siteName: "CrossBlocks"
};
