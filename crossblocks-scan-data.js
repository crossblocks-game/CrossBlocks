(function(){'use strict';
const BIN_ID='69d5251036566621a889f31c';
const ACCESS_KEY='$2a$10$74Cd9Zz3V7836e.FaYcJK.ngSI/o6TQ87C8EzBy6mtrxCF0nZOeQC';
const BIN_URL='https://api.jsonbin.io/v3/b/'+BIN_ID;
function norm(d){d=d||{};d.validated=d.validated||{};d.validated.units=d.validated.units||[];d.validated.weapons=d.validated.weapons||[];d.userData=d.userData||{};d.aruco=d.aruco||{};return d;}
async function fetchDB(){try{const r=await fetch(BIN_URL+'/latest',{headers:{'X-Access-Key':ACCESS_KEY,'X-Bin-Meta':'false'},cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);return norm(await r.json());}catch(e){console.error('CrossBlocksAruco:',e);return null;}}
function allUnits(db){const out=[],seen=new Set(),add=(u,s)=>{const n=u&&(u.name||u.n);if(n&&!seen.has(n)){seen.add(n);out.push({unit:u,name:n,source:s||''});}};(db.validated.units||[]).forEach(u=>add(u,'validée'));Object.keys(db.userData||{}).forEach(l=>((db.userData[l]||{}).units||[]).forEach(u=>add(u,l)));return out;}
function findUnit(db,n){const x=allUnits(db).find(x=>x.name===String(n));return x?x.unit:null;}
function unitFor(db,id){const m=(db.aruco||{})[String(Number(id))];return m?findUnit(db,m.unitName):null;}
function allWeapons(db){const out=[],seen=new Set(),add=w=>{const n=w&&(w.n||w.name);if(n&&!seen.has(n)){seen.add(n);out.push(w);}};[{n:'Fusil bleu',melee:0,cat1:15,cat2:16,catP:0,mun:3,pen:5,dmg:1},{n:'Fusil rouge',melee:0,cat1:15,cat2:16,catP:0,mun:3,pen:4,dmg:1}].forEach(add);(db.validated.weapons||[]).forEach(add);Object.keys(db.userData||{}).forEach(l=>((db.userData[l]||{}).weapons||[]).forEach(add));return out;}
function weaponFor(db,w){if(w&&typeof w==='object')return w;return allWeapons(db).find(x=>(x.n||x.name)===String(w))||null;}
window.CrossBlocksAruco={BIN_ID,fetchDB,allUnits,findUnit,unitFor,allWeapons,weaponFor};
window.CrossBlocksARUCO=window.CrossBlocksAruco;
})();
