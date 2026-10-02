/*
 * CrossBlocks ArUco database bridge
 * Loaded before any scanner/fiche code.
 */
(function () {
  'use strict';

  const BIN_ID = '69d5251036566621a889f31c4c';
  const ACCESS_KEY = '$2a$10$74Cd9Zz3V7836e.FaYcJK.ngSI/o6TQ87C8EzBy6mtrxCF0nZOeQC';
  const BIN_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;

  function normalize(data) {
    data = data || {};
    if (!data.validated) data.validated = {};
    if (!Array.isArray(data.validated.units)) data.validated.units = [];
    if (!Array.isArray(data.validated.weapons)) data.validated.weapons = [];
    if (!data.userData || typeof data.userData !== 'object') data.userData = {};
    if (!data.aruco || typeof data.aruco !== 'object') data.aruco = {};
    return data;
  }

  async function fetchDB() {
    const response = await fetch(BIN_URL + '/latest?meta=false', {
      method: 'GET',
      headers: {
        'X-Access-Key': ACCESS_KEY,
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });
    if (!response.ok) {
      let details = '';
      try { details = await response.text(); } catch (e) {}
      throw new Error('JSONBin HTTP ' + response.status + (details ? ' — ' + details.slice(0, 180) : ''));
    }
    return normalize(await response.json());
  }

  function unitName(u) {
    return u && (u.name || u.n || u.unitName || '');
  }

  function allUnits(db) {
    const result = [];
    const seen = new Set();

    function add(u) {
      const n = unitName(u);
      if (!n || seen.has(n)) return;
      seen.add(n);
      result.push(u);
    }

    (db.validated.units || []).forEach(add);

    Object.values(db.userData || {}).forEach(user => {
      if (!user) return;
      (user.units || []).forEach(add);
    });

    return result;
  }

  function getMapping(db, id) {
    return (db.aruco || {})[String(Number(id))] || null;
  }

  function getUnitByAruco(db, id) {
    const mapping = getMapping(db, id);
    if (!mapping) return null;
    return allUnits(db).find(u => unitName(u) === mapping.unitName) || null;
  }

  const api = {
    BIN_ID,
    fetchDB,
    normalize,
    allUnits,
    getMapping,
    getUnitByAruco,
    unitName
  };

  window.CrossBlocksAruco = api;
  window.CrossBlocksARUCO = api;
  window.CBArUco = api;

  // Signal for scripts that are loaded dynamically.
  window.dispatchEvent(new Event('crossblocks-aruco-ready'));
})();
