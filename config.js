// ═══ CONFIGURATION CROSSBLOCKS ═══

const CONFIG = {

  themes: ["metal","dark","military","parchment","clone","empire","rebel","neon","industrial","wood"],

  weapons: {
    "Fusil blaster":     { mun:3, diff:15, pen:5, dmg:1, portee:"Cat.1/Cat.2", icon:"🔫" },
    "Blaster":           { mun:3, diff:14, pen:5, dmg:1, portee:"Cat.1", icon:"⚡" },
    "Pistolet blaster":  { mun:5, diff:17, pen:4, dmg:1, portee:"Mêlée/Cat.1", icon:"🔫" },
    "Pistolet auto.":    { mun:5, diff:15, pen:4, dmg:2, portee:"Mêlée/Cat.1", icon:"💥" },
    "Fusil sniper":      { mun:1, diff:13, pen:7, dmg:2, portee:"Cat.2/Préc.", icon:"🎯" },
    "Double fusil":      { mun:2, diff:13, pen:6, dmg:1, portee:"Cat.1/Cat.2", icon:"🔫" },
    "x2 Fusils poing":   { mun:4, diff:16, pen:3, dmg:1, portee:"Cat.1/Cat.2", icon:"✊" },
    "x3 Tourelles":      { mun:12, diff:14, pen:3, dmg:1, portee:"Cat.1/Cat.2", icon:"🗼" },
    "x3 Rockets":        { mun:3, diff:11, pen:10, dmg:"1-4", portee:"Cat.2/Préc.", icon:"🚀", once:true },
    "Canon AV-7":        { mun:1, diff:10, pen:10, dmg:4, portee:"Cat.2/Préc.", icon:"💣" },
    "x2 Canons STAP":    { mun:8, diff:12, pen:5, dmg:1, portee:"Cat.1/Cat.2", icon:"⚡" },
    "x2 Snipers montés": { mun:2, diff:13, pen:7, dmg:2, portee:"Cat.2/Préc.", icon:"🎯" },
    "Blaster répéteur":  { mun:6, diff:14, pen:6, dmg:1, portee:"Cat.1/Cat.2", icon:"🔥" },
    "Canon monté":       { mun:2, diff:12, pen:7, dmg:2, portee:"Cat.1/Cat.2", icon:"💥" },
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
