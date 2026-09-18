/**
 * crossblocks-scan-data.js
 * ---------------------------------------------------------
 * Catalogue des figurines indexé par ID de marqueur ArUco.
 * Utilisé par scan-figurine.html et fiche-figurine.html.
 *
 * === À BRANCHER SUR LES VRAIES DONNÉES ===
 * Ce fichier contient des données de démo (3 figurines) pour que
 * le scanner fonctionne immédiatement. Pour le connecter au vrai
 * catalogue (UDEFS / WEAPS dans game.html, ou config.js) :
 *
 *   1. Ajoute un champ `arucoId` à chaque figurine existante dans
 *      UDEFS (ou dans la source de données du site), correspondant
 *      au numéro imprimé/collé sur le socle de la figurine physique.
 *   2. Remplace la fonction getFigurineByArucoId() tout en bas par
 *      une recherche dans ton objet UDEFS réel, en gardant le même
 *      format de retour (voir le schéma ci-dessous) — ou adapte
 *      directement fiche-figurine.html pour lire tes champs à toi
 *      (pv, actions, armure, armes...) sous leurs vrais noms.
 *
 * Schéma attendu pour chaque figurine :
 * {
 *   arucoId: number,        // ID du marqueur ArUco (dictionnaire 4x4_50 conseillé, 0-49)
 *   nom: string,
 *   faction: string,
 *   emoji: string,          // ou remplace par `image: "url.png"` si tu as des visuels
 *   points: number,         // coût en points d'armée
 *   pv: number,              // points de vie
 *   pa: number,              // points d'action par tour
 *   mm: number,              // mouvement max (en cases/cm)
 *   armure: { nom: string, valeur: number },
 *   armes: [
 *     { nom: string, degats: number, portee: number, cadence: string, special: string }
 *   ],
 *   competences: [string]    // actions/capacités spéciales
 * }
 */

const CB_FIGURINES = [
  {
    arucoId: 1,
    nom: "Éclaireur Impérial",
    faction: "Empire Galactique",
    emoji: "🎯",
    points: 10,
    pv: 3,
    pa: 3,
    mm: 8,
    armure: { nom: "Armure légère", valeur: 10 },
    armes: [
      { nom: "Blaster de précision", degats: 2, portee: 30, cadence: "1 tir/action", special: "Ignore le camouflage" }
    ],
    competences: ["Repérage : révèle les figurines cachées en LDV", "Repli rapide"]
  },
  {
    arucoId: 2,
    nom: "Stormtrooper",
    faction: "Empire Galactique",
    emoji: "🪖",
    points: 12,
    pv: 4,
    pa: 3,
    mm: 6,
    armure: { nom: "Armure Stormtrooper", valeur: 14 },
    armes: [
      { nom: "E-11 Blaster Rifle", degats: 2, portee: 24, cadence: "1 tir/action", special: "" }
    ],
    competences: ["Tir groupé (escouade)"]
  },
  {
    arucoId: 3,
    nom: "Spécialiste Armes Lourdes",
    faction: "Empire Galactique",
    emoji: "💥",
    points: 22,
    pv: 5,
    pa: 2,
    mm: 4,
    armure: { nom: "Armure renforcée", valeur: 16 },
    armes: [
      { nom: "Lance-roquettes", degats: 5, portee: 20, cadence: "1 tir/2 actions", special: "Dégâts de zone (rayon 1)" },
      { nom: "Pistolet blaster", degats: 1, portee: 10, cadence: "1 tir/action", special: "Arme de secours" }
    ],
    competences: ["Position fixe : +2 armure si immobile ce tour"]
  }
];

/**
 * Recherche une figurine par ID de marqueur ArUco.
 * Remplace ce corps de fonction par une recherche dans tes vraies
 * données (UDEFS) le jour où tu branches le catalogue réel.
 */
function getFigurineByArucoId(arucoId) {
  return CB_FIGURINES.find((f) => f.arucoId === Number(arucoId)) || null;
}
