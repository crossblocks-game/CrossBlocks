// ═══ CONFIGURATION CROSSBLOCKS ═══

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    "SW Fusil laser (bleu)":              { mun:3, diff:15, pen:5, dmg:1, portee:"Cat.1/Cat.2" },
    "SW Fusil laser (rouge)":             { mun:3, diff:15, pen:4, dmg:1, portee:"Cat.1/Cat.2" },
    "SW Blaster laser (bleu)":            { mun:3, diff:14, pen:5, dmg:1, portee:"Cat.1" },
    "SW Blaster laser (rouge)":           { mun:3, diff:14, pen:4, dmg:1, portee:"Cat.1" },
    "SW Pistolet laser (bleu)":           { mun:5, diff:17, pen:4, dmg:1, portee:"Mêlée/Cat.1" },
    "SW Pistolet laser (rouge)":          { mun:5, diff:17, pen:3, dmg:1, portee:"Mêlée/Cat.1" },
    "SW Sniper laser lourd (bleu)":       { mun:1, diff:13, pen:7, dmg:2, portee:"Cat.2/Préc." },
    "SW Double fusil laser lourd (bleu)": { mun:2, diff:13, pen:6, dmg:1, portee:"Cat.1/Cat.2" },
    "SW Pistolet automatique lourd laser (bleu)":{ mun:5, diff:15, pen:4, dmg:2, portee:"Mêlée/Cat.1" },
    "SW Fusil de poing laser (rouge)":    { mun:2, diff:16, pen:3, dmg:1, portee:"Cat.1/Cat.2" },
    "x2 SW Fusils de poing laser (rouge)":{ mun:4, diff:16, pen:3, dmg:1, portee:"Cat.1/Cat.2" },
    "x3 SW Tourelles rotatives laser":    { mun:12, diff:14, pen:3, dmg:1, portee:"Cat.1/Cat.2" },
    "x3 SW Rockets laser (usage unique)": { mun:3, diff:11, pen:10, dmg:"1-4", portee:"Cat.2/Préc.", once:true },
    "SW Canon anti-char lourd monté (bleu)":{ mun:1, diff:10, pen:10, dmg:4, portee:"Cat.2/Préc." },
    "x2 SW Canons laser STAP (rouge)":    { mun:8, diff:12, pen:5, dmg:1, portee:"Cat.1/Cat.2" },
    "x2 SW Snipers laser lourds montés (bleu)":{ mun:2, diff:13, pen:7, dmg:2, portee:"Cat.2/Préc." },
    "SW Blaster à répétition monté (bleu)":{ mun:6, diff:14, pen:6, dmg:1, portee:"Cat.1/Cat.2" },
    "SW Canon laser monté (bleu)":        { mun:2, diff:12, pen:7, dmg:2, portee:"Cat.1/Cat.2" },
    "x2 SW Fusils laser de Motojet (bleu)":{ mun:6, diff:15, pen:4, dmg:1, portee:"Cat.1/Cat.2" },
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
