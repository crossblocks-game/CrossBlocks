/* CrossBlocks ArUco - shared database bridge */
(function(){
'use strict';
const BIN_ID='69d5251036566621a889f31c';
const ACCESS_KEY='$2a$10$74Cd9Zz3V7836e.FaYcJK.ngSI/o6TQ87C8EzBy6mtrxCF0nZOeQC';
const BIN_URL='https://api.jsonbin.io/v3/b/'+BIN_ID;

function normalize(d){
 d=d||{};
 d.validated=d.validated||{};
 d.validated.units=Array.isArray(d.validated.units)?d.validated.units:[];
 d.validated.weapons=Array.isArray(d.validated.weapons)?d.validated.weapons:[];
 d.userData=d.userData||{};
 d.aruco=(d.aruco&&typeof d.aruco==='object')?d.aruco:{};
 return d;
}
async function fetchDB(){
 const r=await fetch(BIN_URL+'/latest',{headers:{'X-Access-Key':ACCESS_KEY,'X-Bin-Meta':'false'},cache:'no-store'});
 if(!r.ok) throw new Error('JSONBin HTTP '+r.status);
 return normalize(await r.json());
}
function name(u){return u&&(u.name||u.n||u.unitName||'');}
function allUnits(db){
 const out=[],seen=new Set();
 const add=u=>{const n=name(u);if(n&&!seen.has(n)){seen.add(n);out.push(u)}};
 (db.validated.units||[]).forEach(add);
 Object.values(db.userData||{}).forEach(x=>((x&&x.units)||[]).forEach(add));
 return out;
}
function getMapping(db,id){return (db.aruco||{})[String(Number(id))]||null;}
function getUnitByAruco(db,id){
 const map=getMapping(db,id);
 if(!map)return null;
 return allUnits(db).find(u=>name(u)===map.unitName)||null;
}
const api={BIN_ID,fetchDB,allUnits,getMapping,getUnitByAruco,unitName:name};
window.CrossBlocksAruco=api;
window.CrossBlocksARUCO=api;
window.CBArUco=api;
})();
