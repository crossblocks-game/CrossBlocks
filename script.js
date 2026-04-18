// ═══ CROSSBLOCKS — Script principal ═══

let cards = [];
let selectedWeapons = [];

// ═══ GALERIE D'UNITÉS PRÉ-FAITES (d'après les règles officielles) ═══
var GALLERY = [
  { name:"SW Clone Trooper Phase 1 (7163, 75372)", faction:"République", theme:"clone", points:190, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Trooper Phase 2 (75280, 75345, 75372)", faction:"République", theme:"clone", points:200, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Trooper 501ème Légion (75280, 75345)", faction:"République", theme:"clone", points:210, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Jet Trooper 501ème (75280)", faction:"République", theme:"clone", points:270, hp:2, armor:15, move:2, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Heavy Trooper 501ème (75280, 75345)", faction:"République", theme:"military", points:280, hp:2, armor:14, move:0, pa:5, weapons:["SW Répéteur Z-6 rotatif (bleu)"] },
  { name:"SW Clone Trooper 212ème Bataillon (75036, 75261, 75350)", faction:"République", theme:"military", points:200, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Trooper 41ème Corps d'élite (75035, 75234)", faction:"République", theme:"military", points:210, hp:2, armor:14, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Trooper Kashyyyk (75035)", faction:"République", theme:"military", points:220, hp:2, armor:14, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)", "SW Pistolet blaster DC-15s (bleu)"] },
  { name:"SW Clone Trooper Géonosis Phase 2 (75234, 75283)", faction:"République", theme:"clone", points:230, hp:2, armor:15, move:0, pa:5, weapons:["SW Blaster DC-15LE (bleu)"] },
  { name:"SW Clone Parachutiste Géonosis (75234)", faction:"République", theme:"military", points:240, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Shock Trooper — Garde de Coruscant (75372, 75370)", faction:"République", theme:"clone", points:250, hp:2, armor:14, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)"] },
  { name:"SW Clone Shadow Trooper (75370)", faction:"République", theme:"metal", points:230, hp:2, armor:14, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)", "SW Pistolet blaster DC-15s (bleu)"] },
  { name:"SW Clone Scout Trooper Phase 2 (75035, 75234)", faction:"République", theme:"military", points:260, hp:2, armor:15, move:0, pa:5, weapons:["SW Sniper blaster DC-15LE (bleu)"] },
  { name:"SW Clone Pilote de Gunship (75021, 75309)", faction:"République", theme:"clone", points:190, hp:2, armor:15, move:0, pa:5, weapons:["SW Pistolet blaster DC-15s (bleu)"] },
  { name:"SW Clone Médecin Kix — 501ème (75021)", faction:"République", theme:"clone", points:250, hp:2, armor:15, move:0, pa:5, weapons:["SW Pistolet blaster DC-15s (bleu)"] },
  { name:"SW Clone Heavy Gunner (75345, 75372)", faction:"République", theme:"military", points:290, hp:2, armor:15, move:0, pa:5, weapons:["SW Répéteur Z-6 rotatif (bleu)"] },
  { name:"SW Clone Flame Trooper (75182)", faction:"République", theme:"military", points:340, hp:2, armor:15, move:0, pa:5, weapons:["SW Lance-flamme Clone (bleu)"] },
  { name:"SW Commandant Rex — 501ème (75012, 75157, 75391)", faction:"République", theme:"metal", points:400, hp:2, armor:12, move:0, pa:5, weapons:["SW Pistolet blaster DC-17 (bleu)", "SW Pistolet blaster DC-17 (bleu)"] },
  { name:"SW ARC Trooper Fives — 501ème (75387)", faction:"République", theme:"metal", points:430, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)", "SW Pistolet blaster DC-17 (bleu)"] },
  { name:"SW ARC Trooper Jesse — 501ème (75387)", faction:"République", theme:"metal", points:420, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)"] },
  { name:"SW ARC Trooper Phase 1 (75012)", faction:"République", theme:"metal", points:400, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)", "SW Pistolet blaster DC-17 (bleu)"] },
  { name:"SW ARC Trooper Phase 2 (75012)", faction:"République", theme:"metal", points:420, hp:2, armor:12, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)", "SW Pistolet blaster DC-17 (bleu)"] },
  { name:"SW Clone Commando RC (75035)", faction:"République", theme:"metal", points:440, hp:2, armor:12, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)"] },
  { name:"SW Commandant Cody — 212ème Bataillon (75036, 75261, 75350)", faction:"République", theme:"metal", points:460, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)"] },
  { name:"SW Commandant Wolffe — 104ème Bataillon (75157)", faction:"République", theme:"metal", points:420, hp:2, armor:13, move:0, pa:5, weapons:["SW Pistolet blaster DC-17 (bleu)", "SW Pistolet blaster DC-17 (bleu)"] },
  { name:"SW Commandant Gree — 41ème Corps (75035, 75234)", faction:"République", theme:"metal", points:380, hp:2, armor:13, move:0, pa:5, weapons:["SW Sniper blaster DC-15LE (bleu)"] },
  { name:"SW Commandant Bly — 327ème Corps (75182)", faction:"République", theme:"metal", points:380, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil blaster DC-15a (bleu)", "SW Pistolet blaster DC-15s (bleu)"] },
  { name:"SW Obi-Wan Kenobi — Padawan (75269)", faction:"République", theme:"metal", points:450, hp:2, armor:14, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Obi-Wan Kenobi — Maître Jedi (75333, 75354, 75261)", faction:"République", theme:"metal", points:510, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Obi-Wan Kenobi — A New Hope (75159, 75192)", faction:"Rebelles", theme:"metal", points:470, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Anakin Skywalker — Padawan (75269, 75333)", faction:"République", theme:"metal", points:450, hp:2, armor:14, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Anakin Skywalker — Héros de la République (75333)", faction:"République", theme:"metal", points:570, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Ahsoka Tano — Clone Wars (75333, 75401)", faction:"République", theme:"metal", points:540, hp:2, armor:14, move:0, pa:5, weapons:["SW Sabre laser (bleu)", "SW Sabre laser (blanc)"] },
  { name:"SW Ahsoka Tano — Rebelles (75403)", faction:"Rebelles", theme:"metal", points:570, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (blanc)", "SW Sabre laser (blanc)"] },
  { name:"SW Maître Yoda (75255, 75360, 75168)", faction:"République", theme:"metal", points:630, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (vert)"] },
  { name:"SW Mace Windu — Maître du Conseil (75342, 75019)", faction:"République", theme:"metal", points:680, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (violet - Windu)"] },
  { name:"SW Qui-Gon Jinn (75383, 7961)", faction:"République", theme:"metal", points:490, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (vert)"] },
  { name:"SW Ki-Adi-Mundi (75342)", faction:"République", theme:"metal", points:460, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Plo Koon (7676, 75293)", faction:"République", theme:"metal", points:460, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Aayla Secura (75234, 75283)", faction:"République", theme:"metal", points:450, hp:2, armor:14, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Kit Fisto (9525)", faction:"République", theme:"metal", points:480, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (vert)"] },
  { name:"SW Shaak Ti (75019)", faction:"République", theme:"metal", points:460, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Luminara Unduli (75019)", faction:"République", theme:"metal", points:470, hp:2, armor:14, move:0, pa:5, weapons:["SW Sabre laser (vert)"] },
  { name:"SW Barriss Offee (75019)", faction:"République", theme:"metal", points:440, hp:2, armor:14, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Luke Skywalker — Ferme de Tatooine (75290, 75301)", faction:"Rebelles", theme:"rebel", points:300, hp:2, armor:16, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Luke Skywalker — Pilote X-Wing (75355, 75301)", faction:"Rebelles", theme:"rebel", points:370, hp:2, armor:16, move:0, pa:5, weapons:["SW Sabre laser (bleu)", "SW Pistolet blaster DL-44 (rouge)"] },
  { name:"SW Luke Skywalker — Jedi (75093, 75159)", faction:"Rebelles", theme:"metal", points:590, hp:2, armor:13, move:0, pa:5, weapons:["SW Sabre laser (vert)"] },
  { name:"SW Darth Maul — Apprenti Sith (75310, 75169, 9526)", faction:"Côté Obscur", theme:"dark", points:730, hp:2, armor:12, move:0, pa:5, weapons:["SW Double sabre laser (rouge)"] },
  { name:"SW Darth Sidious / Palpatine (75093, 9526)", faction:"Côté Obscur", theme:"dark", points:830, hp:2, armor:12, move:0, pa:5, weapons:["SW Sabre laser (rouge)", "SW Éclair de Force (Sith)"] },
  { name:"SW Général Grievous — Cmdt Séparatiste (75040, 75233, 75286)", faction:"Côté Obscur", theme:"industrial", points:810, hp:3, armor:10, move:0, pa:5, weapons:["SW Sabre laser (bleu)", "SW Sabre laser (vert)", "SW Sabre laser (rouge)", "SW Sabre laser (bleu)"] },
  { name:"SW Asajj Ventress — Assassin Sith (7957)", faction:"Côté Obscur", theme:"dark", points:670, hp:2, armor:12, move:0, pa:5, weapons:["SW Sabre laser (rouge)", "SW Sabre laser (rouge)"] },
  { name:"SW Comte Dooku — Seigneur Sith (75310, 75017)", faction:"Côté Obscur", theme:"dark", points:630, hp:2, armor:12, move:0, pa:5, weapons:["SW Sabre courbe (rouge - Dooku)"] },
  { name:"SW Droïde de combat B1 (75372, 75283, 75373)", faction:"Séparatistes", theme:"parchment", points:170, hp:2, armor:18, move:0, pa:4, weapons:["SW Fusil blaster E-5 (rouge)"] },
  { name:"SW Droïde B1 Commandant orange (75283)", faction:"Séparatistes", theme:"parchment", points:170, hp:2, armor:18, move:0, pa:4, weapons:["SW Fusil blaster E-5 (rouge)"] },
  { name:"SW Droïde B1 de Sécurité rouge (75373)", faction:"Séparatistes", theme:"parchment", points:155, hp:2, armor:18, move:0, pa:4, weapons:["SW Fusil blaster E-5 (rouge)"] },
  { name:"SW Droïde B1 Pilote (75283)", faction:"Séparatistes", theme:"parchment", points:150, hp:2, armor:18, move:0, pa:4, weapons:["SW Pistolet blaster E-5 court (rouge)"] },
  { name:"SW Droïde de combat lourd B2 (75283, 75241)", faction:"Séparatistes", theme:"industrial", points:300, hp:3, armor:11, move:-2, pa:4, weapons:["SW Pistolet blaster B2 (rouge)", "SW Pistolet blaster B2 (rouge)"] },
  { name:"SW Droïde B2-HA Roquette (75283)", faction:"Séparatistes", theme:"industrial", points:420, hp:3, armor:11, move:-2, pa:4, weapons:["SW Pistolet blaster B2 (rouge)", "SW Lance-roquette B2 (usage unique)"] },
  { name:"SW Droïde Destroyer Droideka (75233, 75386)", faction:"Séparatistes", theme:"industrial", points:530, hp:4, armor:9, move:1, pa:4, weapons:["SW Répéteur Z-6 rotatif (rouge)"] },
  { name:"SW MagnaGuard IG-100 (75233, 75040)", faction:"Séparatistes", theme:"industrial", points:570, hp:3, armor:11, move:0, pa:5, weapons:["SW Électro-Bâton (MagnaGuard)", "SW Électro-Bâton (MagnaGuard)"] },
  { name:"SW Guerrier Géonosis ailé (75234, 7959)", faction:"Séparatistes", theme:"parchment", points:160, hp:2, armor:18, move:2, pa:4, weapons:["SW Pistolet sonique géonosis"] },
  { name:"SW Guerrier Géonosis Elite (75234)", faction:"Séparatistes", theme:"parchment", points:190, hp:2, armor:17, move:2, pa:4, weapons:["SW Fusil sonique géonosis"] },
  { name:"SW Tri-Droïde de combat (75233)", faction:"Séparatistes", theme:"industrial", points:1800, hp:10, armor:6, move:2, pa:4, weapons:["SW Répéteur Z-6 rotatif (rouge)", "SW Répéteur Z-6 rotatif (rouge)", "SW Répéteur Z-6 rotatif (rouge)"] },
  { name:"SW Stormtrooper — Légion Blanche (75387, 75159, 75290)", faction:"Empire", theme:"empire", points:180, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster E-11 (empire)"] },
  { name:"SW Stormtrooper Lourd (75159, 75221)", faction:"Empire", theme:"empire", points:250, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil lourd DLT-19 (empire)"] },
  { name:"SW Scout Trooper (75332, 75311, 75292)", faction:"Empire", theme:"empire", points:230, hp:2, armor:16, move:0, pa:5, weapons:["SW Sniper blaster impérial (empire)"] },
  { name:"SW Snowtrooper — Hoth (75320, 75098)", faction:"Empire", theme:"empire", points:200, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster E-11 (empire)"] },
  { name:"SW Sandtrooper — Tatooine (75290)", faction:"Empire", theme:"empire", points:230, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil lourd DLT-19 (empire)"] },
  { name:"SW Death Star Trooper (75159, 75246)", faction:"Empire", theme:"empire", points:190, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster E-11 (empire)"] },
  { name:"SW Shadow Trooper Impérial (75311)", faction:"Empire", theme:"empire", points:210, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster E-11 (empire)"] },
  { name:"SW Shoretrooper — Scarif (75171)", faction:"Empire", theme:"empire", points:200, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster E-11 (empire)"] },
  { name:"SW TIE Pilot (75300, 75221)", faction:"Empire", theme:"empire", points:190, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster E-11 (empire)"] },
  { name:"SW Officier Impérial (75159, 75322)", faction:"Empire", theme:"empire", points:210, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster SE-14r (empire)"] },
  { name:"SW Death Trooper DT-Unit (75346, 75254)", faction:"Empire", theme:"dark", points:310, hp:2, armor:14, move:0, pa:5, weapons:["SW Sniper blaster IQA-11 (empire)"] },
  { name:"SW Range Trooper — Solo (75217)", faction:"Empire", theme:"empire", points:250, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil lourd DLT-19 (empire)"] },
  { name:"SW Mudtrooper — Solo (75217)", faction:"Empire", theme:"empire", points:170, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster E-11 (empire)"] },
  { name:"SW Garde Royal de Palpatine (75093, 75159)", faction:"Empire", theme:"dark", points:320, hp:2, armor:14, move:0, pa:5, weapons:["SW Lance-Vibrolame (Garde Royal)"] },
  { name:"SW Dark Trooper Phase 3 (75324)", faction:"Empire", theme:"dark", points:420, hp:3, armor:10, move:0, pa:5, weapons:["SW Blaster répéteur Dark Trooper"] },
  { name:"SW Incinerator Stormtrooper (75315)", faction:"Empire", theme:"empire", points:360, hp:2, armor:15, move:0, pa:5, weapons:["SW Lance-flamme Clone (empire)"] },
  { name:"SW ISB Agent Impérial (75387)", faction:"Empire", theme:"empire", points:200, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster SE-14r (empire)"] },
  { name:"SW Darth Vader — Seigneur Sith (75304, 75271, 75093)", faction:"Empire", theme:"dark", points:730, hp:3, armor:11, move:0, pa:5, weapons:["SW Sabre laser (rouge)"] },
  { name:"SW Grand Moff Tarkin (75324)", faction:"Empire", theme:"dark", points:250, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster SE-14r (empire)"] },
  { name:"SW Directeur Krennic (75171)", faction:"Empire", theme:"dark", points:290, hp:2, armor:15, move:0, pa:5, weapons:["SW Pistolet blaster SE-14r (empire)"] },
  { name:"SW Moff Gideon (75325, 75315)", faction:"Empire", theme:"dark", points:390, hp:2, armor:13, move:0, pa:5, weapons:["SW Pistolet blaster SE-14r (empire)", "SW Darksaber (Mandalorien)"] },
  { name:"SW Soldat Rebelle — Base (75261, 75387)", faction:"Rebelles", theme:"rebel", points:180, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Trooper Rebelle à Blaster (75267)", faction:"Rebelles", theme:"rebel", points:180, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Soldat Rebelle Pistolet (75164)", faction:"Rebelles", theme:"rebel", points:150, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Garde Rebelle (75159)", faction:"Rebelles", theme:"rebel", points:200, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Soldat Rebelle Jetpack (75164)", faction:"Rebelles", theme:"rebel", points:240, hp:2, armor:17, move:2, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Soldat de Hoth (75098, 75259)", faction:"Rebelles", theme:"rebel", points:180, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Commando Rebelle — Endor (75094)", faction:"Rebelles", theme:"rebel", points:190, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Soldat de Scarif — Rogue One (75171)", faction:"Rebelles", theme:"rebel", points:190, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Han Solo — Contrebandier (75290, 75375)", faction:"Rebelles", theme:"rebel", points:330, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster DL-44 (rouge)"] },
  { name:"SW Han Solo — Tenue Hoth (75259, 75098)", faction:"Rebelles", theme:"rebel", points:340, hp:2, armor:15, move:0, pa:5, weapons:["SW Pistolet blaster DL-44 (rouge)"] },
  { name:"SW Princesse Leia — Commandante (75159, 75246)", faction:"Rebelles", theme:"rebel", points:290, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Chewbacca — Wookiee (75375, 75257)", faction:"Rebelles", theme:"rebel", points:410, hp:3, armor:15, move:0, pa:5, weapons:["SW Arbalète Bowcaster (Wookiee)"] },
  { name:"SW Lando Calrissian (75243, 75257)", faction:"Rebelles", theme:"rebel", points:280, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Cassian Andor — Agent Fulcrum (75399, 75387)", faction:"Rebelles", theme:"rebel", points:310, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)", "SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Jyn Erso — Rogue One (75172)", faction:"Rebelles", theme:"rebel", points:290, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)", "SW Matraque de trooper (improv)"] },
  { name:"SW K-2SO — Droïde rebelle (75399)", faction:"Rebelles", theme:"industrial", points:260, hp:3, armor:15, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Amiral Ackbar (75246)", faction:"Rebelles", theme:"rebel", points:250, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Le Mandalorien Din Djarin (75292, 75336)", faction:"Mandalorien", theme:"metal", points:500, hp:2, armor:11, move:2, pa:5, weapons:["SW Pistolet blaster WESTAR (Mando)", "SW Fusil blaster Mandalorien"] },
  { name:"SW Bo-Katan Kryze — Nite Owls (75373, 75374)", faction:"Mandalorien", theme:"metal", points:640, hp:2, armor:11, move:2, pa:5, weapons:["SW Darksaber (Mandalorien)", "SW Pistolet blaster WESTAR (Mando)"] },
  { name:"SW Jango Fett — Chasseur de primes (75191, 8097)", faction:"Mandalorien", theme:"metal", points:570, hp:2, armor:11, move:2, pa:5, weapons:["SW Pistolet blaster WESTAR (Mando)", "SW Pistolet blaster WESTAR (Mando)"] },
  { name:"SW Boba Fett — Jeune Clone (9496, 7930)", faction:"Chasseur de primes", theme:"metal", points:380, hp:2, armor:12, move:0, pa:5, weapons:["SW Fusil blaster EE-3 (Fett)"] },
  { name:"SW Boba Fett — Armure Beskar (75312, 75334)", faction:"Chasseur de primes", theme:"metal", points:550, hp:2, armor:11, move:2, pa:5, weapons:["SW Fusil blaster EE-3 (Fett)"] },
  { name:"SW Pré Vizsla — Clan Vizsla (7914, 75310)", faction:"Mandalorien", theme:"metal", points:490, hp:2, armor:11, move:2, pa:5, weapons:["SW Darksaber (Mandalorien)", "SW Pistolet blaster Mandalorien"] },
  { name:"SW Guerrier Mandalorien de base (75373)", faction:"Mandalorien", theme:"metal", points:280, hp:2, armor:12, move:0, pa:5, weapons:["SW Pistolet blaster Mandalorien"] },
  { name:"SW Guerrier Mandalorien Jetpack (75373)", faction:"Mandalorien", theme:"metal", points:340, hp:2, armor:12, move:2, pa:5, weapons:["SW Fusil blaster Mandalorien"] },
  { name:"SW Paz Vizsla — Clan Vizsla lourd (75374)", faction:"Mandalorien", theme:"metal", points:480, hp:2, armor:11, move:0, pa:5, weapons:["SW Répéteur lourd Mandalorien"] },
  { name:"SW Fennec Shand — Tireuse d'élite (75326, 75312)", faction:"Chasseur de primes", theme:"metal", points:350, hp:2, armor:14, move:0, pa:5, weapons:["SW Sniper blaster IQA-11 (empire)"] },
  { name:"SW Stormtrooper Première Ordre (75103, 75325, 75264)", faction:"Première Ordre", theme:"empire", points:200, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster F-11D (empire)"] },
  { name:"SW Flametrooper Première Ordre (75132)", faction:"Première Ordre", theme:"empire", points:310, hp:2, armor:15, move:0, pa:5, weapons:["SW Lance-flamme Clone (empire)"] },
  { name:"SW Snowtrooper Première Ordre (75132, 75320)", faction:"Première Ordre", theme:"empire", points:210, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster F-11D (empire)"] },
  { name:"SW Executioner Stormtrooper (75179)", faction:"Première Ordre", theme:"dark", points:310, hp:2, armor:15, move:0, pa:5, weapons:["SW Lance-plasma vibro (Executioner)"] },
  { name:"SW Capitaine Phasma (75103, 75104)", faction:"Première Ordre", theme:"metal", points:400, hp:2, armor:12, move:0, pa:5, weapons:["SW Fusil lourd DLT-19 (empire)"] },
  { name:"SW Général Hux (75104)", faction:"Première Ordre", theme:"empire", points:260, hp:2, armor:15, move:0, pa:5, weapons:["SW Pistolet blaster SE-14r (empire)"] },
  { name:"SW Kylo Ren — Chevalier de Ren (75104, 75264)", faction:"Première Ordre", theme:"dark", points:680, hp:2, armor:12, move:0, pa:5, weapons:["SW Sabre laser (rouge)"] },
  { name:"SW Rey — Jakku (75099, 75225)", faction:"Résistance", theme:"rebel", points:390, hp:2, armor:16, move:0, pa:5, weapons:["SW Bâton de combat Rey"] },
  { name:"SW Rey — Jedi des Sables (75249)", faction:"Résistance", theme:"metal", points:550, hp:2, armor:15, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Finn (75104)", faction:"Résistance", theme:"rebel", points:270, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster F-11D (empire)"] },
  { name:"SW Poe Dameron (75273)", faction:"Résistance", theme:"rebel", points:280, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Rose Tico (75200)", faction:"Résistance", theme:"rebel", points:220, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW IG-88 — Droïde assassin (6209, 9496)", faction:"Chasseur de primes", theme:"industrial", points:470, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil lourd DLT-19 (empire)", "SW Répéteur Z-6 rotatif (rouge)"] },
  { name:"SW IG-11 — Mandalore (75292, 75336)", faction:"Chasseur de primes", theme:"industrial", points:470, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil lourd DLT-19 (empire)", "SW Répéteur Z-6 rotatif (rouge)"] },
  { name:"SW Bossk — Trandoshan (75167, 9496)", faction:"Chasseur de primes", theme:"parchment", points:320, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster Relby V-10 (Bossk)"] },
  { name:"SW Dengar — Mercenaire (9496)", faction:"Chasseur de primes", theme:"rebel", points:270, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil lourd DLT-19 (empire)"] },
  { name:"SW 4-LOM — Droïde chasseur (9496)", faction:"Chasseur de primes", theme:"industrial", points:270, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Zam Wesell — Changeforme (7133)", faction:"Chasseur de primes", theme:"metal", points:360, hp:2, armor:15, move:0, pa:5, weapons:["SW Fusil sniper KYD-21 (Zam)", "SW Pistolet blaster KYD-21 (Zam)"] },
  { name:"SW Greedo — Rodien (75290, 4501)", faction:"Chasseur de primes", theme:"parchment", points:210, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet blaster Rodien (rouge)"] },
  { name:"SW Cad Bane — Chasseur Duros (75323, 7930)", faction:"Chasseur de primes", theme:"metal", points:410, hp:2, armor:14, move:1, pa:5, weapons:["SW Pistolet blaster WESTAR (Mando)", "SW Pistolet blaster WESTAR (Mando)"] },
  { name:"SW Embo — Kyuzo (7930)", faction:"Chasseur de primes", theme:"metal", points:310, hp:2, armor:14, move:0, pa:5, weapons:["SW Arbalète Bowcaster (Wookiee)"] },
  { name:"SW Hunter — Bad Batch (75314)", faction:"République", theme:"metal", points:430, hp:2, armor:12, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)", "SW Couteau vibro Hunter"] },
  { name:"SW Crosshair — Bad Batch (75314)", faction:"République", theme:"military", points:460, hp:2, armor:12, move:0, pa:5, weapons:["SW Sniper blaster modifié Crosshair"] },
  { name:"SW Tech — Bad Batch (75314)", faction:"République", theme:"metal", points:330, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)"] },
  { name:"SW Wrecker — Bad Batch (75314, 75323)", faction:"République", theme:"metal", points:490, hp:3, armor:11, move:0, pa:5, weapons:["SW Répéteur Z-6 rotatif (bleu)"] },
  { name:"SW Echo — Bad Batch (75314)", faction:"République", theme:"metal", points:390, hp:2, armor:13, move:0, pa:5, weapons:["SW Fusil blaster DC-17m ARC (bleu)"] },
  { name:"SW Ezra Bridger — Rebelles TV (75170, 75090)", faction:"Rebelles", theme:"rebel", points:390, hp:2, armor:15, move:0, pa:5, weapons:["SW Sabre laser (bleu)", "SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Kanan Jarrus — Chevalier Jedi (75170)", faction:"Rebelles", theme:"metal", points:470, hp:2, armor:14, move:0, pa:5, weapons:["SW Sabre laser (bleu)"] },
  { name:"SW Hera Syndulla — Pilote du Ghost (75053)", faction:"Rebelles", theme:"rebel", points:280, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Sabine Wren — Mandalorien Rebelle (75090, 75053)", faction:"Rebelles", theme:"metal", points:370, hp:2, armor:13, move:2, pa:5, weapons:["SW Pistolet blaster WESTAR (Mando)", "SW Pistolet blaster WESTAR (Mando)"] },
  { name:"SW Reine Amidala — Naboo (7171, 9499)", faction:"Rebelles", theme:"rebel", points:250, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Padmé Amidala — Géonosis (75021, 7163)", faction:"Rebelles", theme:"rebel", points:260, hp:2, armor:16, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Garde de Sécurité Naboo (7171)", faction:"Rebelles", theme:"rebel", points:180, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster naboo S-5 (rouge)"] },
  { name:"SW Pilote Naboo (7141, 75258)", faction:"Rebelles", theme:"rebel", points:170, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet blaster naboo (rouge)"] },
  { name:"SW Tusken Raider — Tatooine (75271, 75290)", faction:"Neutre", theme:"parchment", points:130, hp:2, armor:18, move:0, pa:4, weapons:["SW Bâton Gaderffi (Tusken)"] },
  { name:"SW Guerrier Ewok — Endor (75094)", faction:"Rebelles", theme:"wood", points:120, hp:2, armor:19, move:0, pa:4, weapons:["SW Lancepierre Ewok"] },
  { name:"SW Garde Gamorrean — Jabba (75290, 6210)", faction:"Neutre", theme:"industrial", points:200, hp:2, armor:16, move:0, pa:4, weapons:["SW Hache vibro Gamorrean"] },
  { name:"SW C-3PO — Droïde de protocole (75290, 75192)", faction:"Neutre", theme:"parchment", points:80, hp:1, armor:19, move:0, pa:3, weapons:[] },
  { name:"SW R2-D2 — Droïde astromech (75192, 75290)", faction:"Neutre", theme:"industrial", points:110, hp:2, armor:17, move:0, pa:3, weapons:[] },

  { name:"SW Bib Fortuna — Majordome de Jabba (4475, 4480, 6210)", faction:"Neutre", theme:"parchment", points:140, hp:2, armor:18, move:0, pa:3, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW AT-AT Driver — Pilote Marcheur Impérial (4483)", faction:"Empire", theme:"empire", points:190, hp:2, armor:16, move:0, pa:4, weapons:["SW Pistolet blaster SE-14r (empire)"] },
  { name:"SW Zev Senesca — Pilote Snowspeeder (4500)", faction:"Rebelles", theme:"rebel", points:190, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Dack Ralter — Artilleur Snowspeeder (4500)", faction:"Rebelles", theme:"rebel", points:170, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Ponda Baba — Cantina de Mos Eisley (4501)", faction:"Neutre", theme:"parchment", points:130, hp:2, armor:18, move:0, pa:4, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Dr. Evazan — Cantina de Mos Eisley (4501)", faction:"Neutre", theme:"parchment", points:130, hp:2, armor:18, move:0, pa:4, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Pilote V-wing — Chasseur de la République (6205)", faction:"République", theme:"clone", points:180, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster DC-15s (bleu)"] },
  { name:"SW Pilote A-wing — Alliance Rebelle (6207)", faction:"Rebelles", theme:"rebel", points:190, hp:2, armor:17, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Pilote B-wing — Alliance Rebelle (6208)", faction:"Rebelles", theme:"rebel", points:190, hp:2, armor:17, move:0, pa:5, weapons:["SW Fusil blaster rebelle (rouge)"] },
  { name:"SW Princesse Leia — Tenue d'esclave (6210)", faction:"Rebelles", theme:"rebel", points:280, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Lando Calrissian — Garde de Jabba (6210)", faction:"Rebelles", theme:"rebel", points:270, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster rebelle (rouge)"] },
  { name:"SW Saelt-Marae (Yak Face) — Cour de Jabba (6210)", faction:"Neutre", theme:"parchment", points:120, hp:2, armor:19, move:0, pa:3, weapons:[] },
  { name:"SW Moff Jerjerrod — Commandant de l'Étoile Noire (6211)", faction:"Empire", theme:"dark", points:230, hp:2, armor:16, move:0, pa:5, weapons:["SW Pistolet blaster SE-14r (empire)"] },
];

// ═══ VÉHICULES (onglet séparé) ═══
var VEHICLES = [
 // ── République ──
 { name:"SW Motojet CRAM", faction:"République", theme:"metal", points:1000, hp:6, armor:12, move:4, pa:5, weapons:["x2 SW Fusils laser de Motojet (bleu)","x2 SW Snipers laser lourds montés (bleu)"] },
 { name:"SW TR-TT", faction:"République", theme:"military", points:1800, hp:8, armor:10, move:1, pa:5, weapons:["SW Blaster à répétition monté (bleu)","SW Canon laser monté (bleu)"] },
 { name:"SW Canon anti-char AV-7", faction:"République", theme:"military", points:1600, hp:6, armor:12, move:-3, pa:5, weapons:["SW Canon anti-char lourd monté (bleu)"] },

 // ── Séparatistes ──
 { name:"SW STAP Droïde", faction:"Séparatistes", theme:"industrial", points:650, hp:5, armor:12, move:3, pa:5, weapons:["x2 SW Canons laser STAP (rouge)"] },
];

// ═══ LOCALSTORAGE ═══
var LS_KEY = "crossblocks_cards";

function saveCards() {
 try {
 localStorage.setItem(LS_KEY, JSON.stringify(cards));
 flashSave();
 } catch(e) { /* quota exceeded or unavailable */ }
}

function loadCards() {
 try {
 var data = localStorage.getItem(LS_KEY);
 if (data) {
 cards = JSON.parse(data);
 if (!Array.isArray(cards)) cards = [];
 return true;
 }
 } catch(e) { /* parse error */ }
 return false;
}

function flashSave() {
 var el = document.getElementById("save-indicator");
 if (!el) return;
 el.textContent = " Sauvegardé !";
 el.classList.add("flash");
 setTimeout(function() {
 el.textContent = " Sauvegarde auto activée";
 el.classList.remove("flash");
 }, 1200);
}

// ── Export JSON ──
function saveToJSON() {
 if (cards.length === 0) { alert("Aucune carte à exporter."); return; }
 var json = JSON.stringify(cards, null, 2);
 var blob = new Blob([json], { type:"application/json" });
 var url = URL.createObjectURL(blob);
 var a = document.createElement("a");
 a.href = url;
 a.download = "CrossBlocks_cartes.json";
 a.click();
 URL.revokeObjectURL(url);
}

// ── Import JSON ──
function loadFromJSON(input) {
 var file = input.files[0];
 if (!file) return;
 var reader = new FileReader();
 reader.onload = function(e) {
 try {
 var data = JSON.parse(e.target.result);
 if (!Array.isArray(data)) { alert("Fichier invalide."); return; }
 var mode = cards.length > 0
 ? confirm("Ajouter aux cartes existantes ?\n(OK = ajouter, Annuler = remplacer)")
 : false;
 if (mode) {
 cards = cards.concat(data);
 } else {
 cards = data;
 }
 saveCards();
 displayCards();
 alert(data.length + " carte(s) importée(s) !");
 } catch(err) {
 alert("Erreur de lecture : " + err.message);
 }
 };
 reader.readAsText(file);
 input.value = ""; // reset for re-upload
}

// ═══ GALERIE ═══
var currentGalleryFilter = "all";
var currentGallerySearch = "";
var currentGalleryTab = "units"; // "units" or "vehicles"

function switchGalleryTab(tab, btn) {
 currentGalleryTab = tab;
 var btns = document.querySelectorAll(".btn-tab");
 for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
 if (btn) btn.classList.add("active");

 // Update filter buttons: hide Rebelles for vehicles (no rebel vehicles)
 var filterBtns = document.querySelectorAll(".btn-filter");
 for (var j = 0; j < filterBtns.length; j++) {
 filterBtns[j].style.display = "";
 }

 renderGallery();
}

function renderGallery() {
 var grid = document.getElementById("gallery-grid");
 if (!grid) return;
 grid.innerHTML = "";

 var source = currentGalleryTab === "vehicles" ? VEHICLES : GALLERY;

 source.forEach(function(unit, i) {
 if (currentGalleryFilter !== "all" && unit.faction !== currentGalleryFilter) return;
    // Search filter: name or set number
    if (currentGallerySearch) {
      var q = currentGallerySearch.toLowerCase();
      var nm = (unit.name||"").toLowerCase();
      // Match name, set numbers, faction, or special rule
      var _sr = (typeof CB!=="undefined"&&CB.getSpecialRules)?(CB.getSpecialRules()[unit.name]||""):"";
      var haystack = nm + " " + (unit.faction||"").toLowerCase() + " " + _sr.toLowerCase() + " " + (unit.special||"").toLowerCase();
      if (haystack.indexOf(q) < 0) return;
    }

 var fac = CONFIG.factions[unit.faction] || { color:"#888" };
 var el = document.createElement("div");
 el.className = "gallery-card";
 el.setAttribute("data-faction", unit.faction);

 // Overlay specialRules from server cache over built-in unit.special
 var _ruleFromServer = (typeof CB !== 'undefined' && CB.getSpecialRules) ? (CB.getSpecialRules()[unit.name] || '') : '';
 var _effectiveSpecial = _ruleFromServer || unit.special || '';
 var specialBadge = _effectiveSpecial
  ? ' <span class="gc-special">' + _effectiveSpecial + '</span>'
  : '';

 var isVehicle = currentGalleryTab === "vehicles";
 var arrayName = isVehicle ? "VEHICLES" : "GALLERY";

 // Pending badge
 var pendingBadge = unit._pending ? ' <span class="gc-pending">non validé</span>' : '';

 el.innerHTML =
 '<span class="gc-initial" style="background:' + fac.color + '22;color:' + fac.color + '">' + unit.faction.charAt(0) + '</span>' +
 '<div class="gc-info">' +
 '<div class="gc-name">' + unit.name + pendingBadge + '</div>' +
 '<div class="gc-meta">' +
 '<span class="gc-faction" style="background:' + fac.color + '22;color:' + fac.color + '">' + unit.faction + '</span> ' +
 unit.weapons.join(", ") +
 specialBadge +
 '</div>' +
 '</div>' +
 '<span class="gc-pts">' + unit.points + '</span>' +
 '<button class="gc-add" onclick="addFromGallery(\'' + arrayName + '\',' + i + ',this)" title="Ajouter">+</button>';

 grid.appendChild(el);
 });

 if (grid.children.length === 0) {
 grid.innerHTML = '<div class="cards-empty">Aucune unité dans cette catégorie.</div>';
 }
}

// ── BARRE DE RECHERCHE GALERIE ──────────────────────────────
function gallerySearch(q) {
  currentGallerySearch = (q || "").trim();
  // Reset search clears filter active state for visual consistency
  var searchInput = document.getElementById("gallery-search");
  if (searchInput && searchInput.value !== currentGallerySearch) {
    searchInput.value = currentGallerySearch;
  }
  renderGallery();
}

function filterGallery(faction, btn) {
 currentGalleryFilter = faction;
 var btns = document.querySelectorAll(".btn-filter");
 for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
 if (btn) btn.classList.add("active");
 renderGallery();
}

function addFromGallery(arrayName, index, btn) {
 var source = arrayName === "VEHICLES" ? VEHICLES : GALLERY;
 var unit = source[index];
 if (!unit) return;
 cards.push({
 name: unit.name,
 faction: unit.faction,
 theme: unit.theme,
 points: String(unit.points),
 hp: String(unit.hp),
 armor: String(unit.armor),
 move: String(unit.move),
 pa: String(unit.pa),
 weapons: unit.weapons.slice()
 });
 saveCards();
 displayCards();

 // Visual feedback
 if (btn) {
 var card = btn.closest(".gallery-card");
 if (card) card.classList.add("gc-added");
 btn.textContent = "";
 btn.style.background = "#40b860";
 setTimeout(function() {
 btn.textContent = "+";
 btn.style.background = "";
 if (card) card.classList.remove("gc-added");
 }, 800);
 }
}

// ── Load gallery unit into editor ──
function loadToEditor(index) {
 var unit = GALLERY[index];
 if (!unit) return;
 document.getElementById("ed-name").value = unit.name;
 document.getElementById("ed-points").value = unit.points;
 document.getElementById("ed-hp").value = unit.hp;
 document.getElementById("ed-armor").value = unit.armor;
 document.getElementById("ed-move").value = unit.move;
 document.getElementById("ed-pa").value = unit.pa;

 // Set faction & theme
 document.getElementById("ed-faction").value = unit.faction;
 document.getElementById("ed-theme").value = unit.theme;

 // Set weapons
 selectedWeapons = unit.weapons.slice();
 refreshWeaponCounters();
 updatePreview();
 // Scroll to editor
 document.querySelector(".editor-section").scrollIntoView({ behavior:"smooth" });
}

// ── Init ──
document.addEventListener("DOMContentLoaded", function() {
 populateThemes();
 populateFactions();
 populateWeapons();
 updatePreview();
 // Load community suggestions into live data (pending + approved)
 loadSuggestions();

 renderGallery();
 populateSuggestFactions();
 updateSuggestCount();

 // Load saved cards from localStorage
 if (loadCards()) {
 displayCards();
 var el = document.getElementById("save-indicator");
 if (el) el.textContent = " " + cards.length + " carte(s) restaurée(s) depuis la sauvegarde";
 }
});

function populateThemes() {
 const sel = document.getElementById("ed-theme");
 if (!sel) return;
 sel.innerHTML = "";
 CONFIG.themes.forEach(t => {
 const o = document.createElement("option");
 o.value = t;
 o.textContent = t.charAt(0).toUpperCase() + t.slice(1);
 sel.appendChild(o);
 });
}

function populateFactions() {
 const sel = document.getElementById("ed-faction");
 if (!sel) return;
 sel.innerHTML = "";
 Object.keys(CONFIG.factions).forEach(f => {
 const o = document.createElement("option");
 o.value = f;
 o.textContent = f;
 sel.appendChild(o);
 });
}

function populateWeapons() {
 var grid = document.getElementById("weapon-selector");
 if (!grid) return;
 grid.innerHTML = "";
 // Header row
 var hdr = document.createElement("div");
 hdr.className = "weapon-option w-header";
 hdr.innerHTML = '<span class="w-name" style="font-size:8px;opacity:.6">Arme</span>' +
 '<span class="w-stats" style="font-size:7px;opacity:.6">Stats</span>' +
 '<span class="w-range"><span class="wr-v" style="opacity:.6;color:#8b949e">Mel</span>' +
 '<span class="wr-v" style="opacity:.6;color:#8b949e">C1</span>' +
 '<span class="wr-v" style="opacity:.6;color:#8b949e">C2</span>' +
 '<span class="wr-v" style="opacity:.6;color:#8b949e">CP</span></span>' +
 '<span class="w-counter" style="font-size:7px;opacity:.6;justify-content:center">Qté</span>';
 grid.appendChild(hdr);
 var weaponNames = Object.keys(CONFIG.weapons);
 for (var i = 0; i < weaponNames.length; i++) {
 var name = weaponNames[i];
 var w = CONFIG.weapons[name];
 var row = document.createElement("div");
 row.className = "weapon-option";
 row.setAttribute("data-weapon", name);

 var nameSpan = document.createElement("span");
 nameSpan.className = "w-name";
 nameSpan.textContent = name;
 if (w._pending) {
 var badge = document.createElement("span");
 badge.className = "w-pending";
 badge.textContent = "non valid\u00e9";
 nameSpan.appendChild(badge);
 }

 var statsSpan = document.createElement("span");
 statsSpan.className = "w-stats";
 statsSpan.textContent = w.mun + "d p" + w.pen + " d" + w.dmg;

 var rangeSpan = document.createElement("span");
 rangeSpan.className = "w-range";
 var mel = w.melee ? w.melee : "x";
 var c1 = w.cat1 ? w.cat1 : "x";
 var c2 = w.cat2 ? w.cat2 : "x";
 var cP = w.catP ? w.catP : "x";
 rangeSpan.innerHTML = '<span class="wr-v' + (mel==="x"?" wr-x":"") + '">' + mel + '</span>' +
 '<span class="wr-v' + (c1==="x"?" wr-x":"") + '">' + c1 + '</span>' +
 '<span class="wr-v' + (c2==="x"?" wr-x":"") + '">' + c2 + '</span>' +
 '<span class="wr-v' + (cP==="x"?" wr-x":"") + '">' + cP + '</span>';

 var ctrWrap = document.createElement("span");
 ctrWrap.className = "w-counter";

 var btnMinus = document.createElement("button");
 btnMinus.type = "button";
 btnMinus.textContent = "\u2212";
 btnMinus.className = "w-btn w-btn-minus";
 btnMinus.onclick = (function(n) { return function() { changeWeaponCount(n, -1); }; })(name);

 var countSpan = document.createElement("span");
 countSpan.className = "w-count";
 countSpan.id = "wcount-" + name.replace(/[^a-zA-Z0-9]/g, "_");
 countSpan.textContent = "0";

 var btnPlus = document.createElement("button");
 btnPlus.type = "button";
 btnPlus.textContent = "+";
 btnPlus.className = "w-btn w-btn-plus";
 btnPlus.onclick = (function(n) { return function() { changeWeaponCount(n, 1); }; })(name);

 ctrWrap.appendChild(btnMinus);
 ctrWrap.appendChild(countSpan);
 ctrWrap.appendChild(btnPlus);

 row.appendChild(nameSpan);
 row.appendChild(statsSpan);
 row.appendChild(rangeSpan);
 row.appendChild(ctrWrap);
 grid.appendChild(row);
 }
}

function getWeaponCount(name) {
 return selectedWeapons.filter(function(w) { return w === name; }).length;
}

function changeWeaponCount(name, delta) {
 var cur = getWeaponCount(name);
 var next = Math.max(0, cur + delta);
 // Rebuild selectedWeapons: remove all of this weapon, add 'next' copies
 selectedWeapons = selectedWeapons.filter(function(w) { return w !== name; });
 for (var i = 0; i < next; i++) selectedWeapons.push(name);
 refreshWeaponCounters();
 updatePreview();
}

function refreshWeaponCounters() {
 var weaponNames = Object.keys(CONFIG.weapons);
 for (var i = 0; i < weaponNames.length; i++) {
 var name = weaponNames[i];
 var el = document.getElementById("wcount-" + name.replace(/[^a-zA-Z0-9]/g, "_"));
 if (el) {
 var ct = getWeaponCount(name);
 el.textContent = ct;
 el.style.color = ct > 0 ? "#f0c040" : "#555";
 el.style.fontWeight = ct > 0 ? "700" : "400";
 // Highlight row
 var row = el.closest(".weapon-option");
 if (row) row.style.borderColor = ct > 0 ? "#f0c040" : "#30363d";
 }
 }
}

// ── Live Preview ──
function updatePreview() {
 const card = document.getElementById("card-preview");
 if (!card) return;

 const name = document.getElementById("ed-name").value || "Nom de l'unité";
 const points = document.getElementById("ed-points").value || "0";
 const hp = document.getElementById("ed-hp").value || "0";
 const armor = document.getElementById("ed-armor").value || "0";
 const move = document.getElementById("ed-move").value || "0";
 const pa = document.getElementById("ed-pa").value || "5";
 const theme = document.getElementById("ed-theme").value;
 const faction = document.getElementById("ed-faction").value;
 const fac = CONFIG.factions[faction] || { color:"#888", accent:"#f0c040" };

 // Theme
 card.className = "card theme-" + theme;

 // Header
 const badge = card.querySelector(".card-faction-badge");
 badge.textContent = faction;
 badge.style.borderLeft = "3px solid " + fac.color;
 card.querySelector(".card-points").textContent = "\u2B50 " + points;

 // Name
 card.querySelector(".card-name").textContent = name;

 // Stats
 document.getElementById("pv-hp").textContent = hp;
 document.getElementById("pv-arm").textContent = armor;
 const mv = parseInt(move);
 document.getElementById("pv-move").textContent = (mv >= 0 ? "+" : "") + move;
 document.getElementById("pv-pa").textContent = pa;

 // Weapons
 const wDiv = document.getElementById("pv-weapons");
 if (selectedWeapons.length === 0) {
 wDiv.innerHTML = '<div class="card-no-weapon">Aucune arme sélectionnée</div>';
 } else {
 wDiv.innerHTML = selectedWeapons.map(function(wName) {
 const w = CONFIG.weapons[wName];
 if (!w) return "";
 var mel = w.melee ? w.melee : "x";
 var c1 = w.cat1 ? w.cat1 : "x";
 var c2 = w.cat2 ? w.cat2 : "x";
 var cP = w.catP ? w.catP : "x";
 return '<div class="card-weapon">' +
 '<div class="cw-top"><span class="cw-name">' + wName + '</span>' +
 '<span class="cw-stat">' + w.mun + 'd P' + w.pen + ' D' + w.dmg + '</span></div>' +
 '<table class="cw-range"><tr>' +
 '<td class="cw-rh">Mel</td><td class="cw-rh">C1</td><td class="cw-rh">C2</td><td class="cw-rh">CP</td>' +
 '</tr><tr>' +
 '<td class="cw-rv' + (mel === "x" ? " cw-rx" : "") + '">' + mel + '</td>' +
 '<td class="cw-rv' + (c1 === "x" ? " cw-rx" : "") + '">' + c1 + '</td>' +
 '<td class="cw-rv' + (c2 === "x" ? " cw-rx" : "") + '">' + c2 + '</td>' +
 '<td class="cw-rv' + (cP === "x" ? " cw-rx" : "") + '">' + cP + '</td>' +
 '</tr></table></div>';
 }).join("");
 }
}

// ── Add Card ──
function addCard() {
 var name = document.getElementById("ed-name").value.trim();
 if (!name) { alert("Entrez un nom d'unité !"); return; }

 cards.push({
 name: name,
 faction: document.getElementById("ed-faction").value,
 theme: document.getElementById("ed-theme").value,
 points: document.getElementById("ed-points").value || "0",
 hp: document.getElementById("ed-hp").value || "0",
 armor: document.getElementById("ed-armor").value || "0",
 move: document.getElementById("ed-move").value || "0",
 pa: document.getElementById("ed-pa").value || "5",
 weapons: selectedWeapons.slice() // copy
 });
 saveCards();
 displayCards();
 // Flash feedback
 var btn = document.querySelector(".btn-add");
 btn.textContent = " Ajoutée !";
 btn.style.background = "#208040";
 setTimeout(function() { btn.textContent = " Ajouter la carte"; btn.style.background = ""; }, 800);
}

function clearForm() {
 document.getElementById("ed-name").value = "";
 document.getElementById("ed-points").value = "200";
 document.getElementById("ed-hp").value = "2";
 document.getElementById("ed-armor").value = "15";
 document.getElementById("ed-move").value = "0";
 document.getElementById("ed-pa").value = "5";
 selectedWeapons = [];
 refreshWeaponCounters();
 updatePreview();
}

// ── Display Cards ──
function displayCards() {
 var container = document.getElementById("cards-container");
 var countEl = document.getElementById("card-count");
 var exportBtn = document.getElementById("btn-export");
 var clearBtn = document.getElementById("btn-clear-all");
 var totalEl = document.getElementById("army-total");

 countEl.textContent = cards.length + " carte(s)";
 exportBtn.disabled = cards.length === 0;
 clearBtn.style.display = cards.length > 0 ? "inline-flex" : "none";

 // Army total
 var total = 0;
 for (var t = 0; t < cards.length; t++) total += parseInt(cards[t].points) || 0;
 if (totalEl) totalEl.textContent = cards.length > 0 ? total + " pts" : "";

 if (cards.length === 0) {
 container.innerHTML = '<div class="cards-empty">Aucune carte pour l\'instant. Utilisez l\'éditeur ci-dessus pour en créer !</div>';
 return;
 }

 container.innerHTML = "";
 cards.forEach(function(c, i) {
 var fac = CONFIG.factions[c.faction] || { color:"#888", accent:"#f0c040" };
 var mv = parseInt(c.move);

 var wrapper = document.createElement("div");
 wrapper.className = "card-wrapper";

 // Weapons HTML
 var weaponHTML = "";
 if (c.weapons.length === 0) {
 weaponHTML = '<div class="card-no-weapon">Aucune arme</div>';
 } else {
 c.weapons.forEach(function(wName) {
 var w = CONFIG.weapons[wName];
 if (!w) return;
 var mel = w.melee ? w.melee : "x";
 var c1 = w.cat1 ? w.cat1 : "x";
 var c2 = w.cat2 ? w.cat2 : "x";
 var cP = w.catP ? w.catP : "x";
 weaponHTML += '<div class="card-weapon">' +
 '<div class="cw-top"><span class="cw-name">' + wName + '</span>' +
 '<span class="cw-stat">' + w.mun + 'd P' + w.pen + ' D' + w.dmg + '</span></div>' +
 '<table class="cw-range"><tr>' +
 '<td class="cw-rh">Mel</td><td class="cw-rh">C1</td><td class="cw-rh">C2</td><td class="cw-rh">CP</td>' +
 '</tr><tr>' +
 '<td class="cw-rv' + (mel === "x" ? " cw-rx" : "") + '">' + mel + '</td>' +
 '<td class="cw-rv' + (c1 === "x" ? " cw-rx" : "") + '">' + c1 + '</td>' +
 '<td class="cw-rv' + (c2 === "x" ? " cw-rx" : "") + '">' + c2 + '</td>' +
 '<td class="cw-rv' + (cP === "x" ? " cw-rx" : "") + '">' + cP + '</td>' +
 '</tr></table></div>';
 });
 }

 wrapper.innerHTML =
 '<button class="card-delete" onclick="deleteCard(' + i + ')" title="Supprimer">\u2715</button>' +
 '<div class="card theme-' + c.theme + '">' +
 '<div class="card-header">' +
 '<span class="card-faction-badge" style="border-left:3px solid ' + fac.color + '">' + c.faction + '</span>' +
 '<span class="card-points">\u2B50 ' + c.points + '</span>' +
 '</div>' +
 '<h2 class="card-name">' + c.name + '</h2>' +
 '<div class="card-stats">' +
 '<div class="card-stat"><span class="stat-icon">\u2764\uFE0F</span><span class="stat-val">' + c.hp + '</span><span class="stat-label">PV</span></div>' +
 '<div class="card-stat"><span class="stat-icon">\uD83D\uDEE1\uFE0F</span><span class="stat-val">' + c.armor + '</span><span class="stat-label">Armure</span></div>' +
 '<div class="card-stat"><span class="stat-icon">\uD83C\uDFC3</span><span class="stat-val">' + (mv >= 0 ? "+" : "") + c.move + '</span><span class="stat-label">Mouv.</span></div>' +
 '<div class="card-stat"><span class="stat-icon">\u26A1</span><span class="stat-val">' + c.pa + '</span><span class="stat-label">PA</span></div>' +
 '</div>' +
 '<div class="card-weapons">' + weaponHTML + '</div>' +
 '<div class="card-footer">CROSSBLOCKS</div>' +
 '</div>';

 container.appendChild(wrapper);
 });
}

function deleteCard(index) {
 cards.splice(index, 1);
 saveCards();
 displayCards();
}

function clearAllCards() {
 if (confirm("Supprimer toutes les cartes ?")) {
 cards = [];
 saveCards();
 displayCards();
 }
}

// ═══ PDF EXPORT (A6: 105mm × 148mm) ═══
function exportPDF() {
 if (cards.length === 0) return;

 var btn = document.getElementById("btn-export");
 btn.textContent = "\u23F3 Génération...";
 btn.disabled = true;

 setTimeout(function() {
 var jsPDF = window.jspdf.jsPDF;
 var pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:[105, 148] });

 var bgMap = {
 metal:[58,63,72], dark:[22,22,28], military:[58,68,32],
 parchment:[238,224,192], clone:[238,238,242], empire:[14,10,10],
 rebel:[38,30,28], neon:[5,5,10], industrial:[40,40,44], wood:[74,46,20]
 };

 // ═══ PAGE 1: ARMY SUMMARY ═══
 pdf.setFillColor(18, 18, 26);
 pdf.rect(0, 0, 105, 148, "F");
 pdf.setDrawColor(240, 192, 64);
 pdf.setLineWidth(1);
 pdf.roundedRect(3, 3, 99, 142, 3, 3, "S");

 // Title
 pdf.setFontSize(18);
 pdf.setFont(undefined, "bold");
 pdf.setTextColor(240, 192, 64);
 pdf.text("CROSSBLOCKS", 52.5, 16, { align:"center" });
 pdf.setFontSize(10);
 pdf.setFont(undefined, "normal");
 pdf.setTextColor(200, 200, 210);
 pdf.text("Récapitulatif d'armée", 52.5, 23, { align:"center" });

 // Separator
 pdf.setDrawColor(240, 192, 64);
 pdf.setLineWidth(0.3);
 pdf.line(10, 27, 95, 27);

 // Army total
 var armyTotal = 0;
 for (var t = 0; t < cards.length; t++) armyTotal += parseInt(cards[t].points) || 0;
 pdf.setFontSize(24);
 pdf.setFont(undefined, "bold");
 pdf.setTextColor(240, 192, 64);
 pdf.text(armyTotal + " pts", 52.5, 38, { align:"center" });

 pdf.setFontSize(8);
 pdf.setFont(undefined, "normal");
 pdf.setTextColor(140, 140, 160);
 pdf.text(cards.length + " unité(s)", 52.5, 43, { align:"center" });

 // Unit list
 var y = 52;
 pdf.setFontSize(7);
 pdf.setTextColor(240, 192, 64);
 pdf.text("COMPOSITION", 10, y);
 y += 5;

 // Group by faction
 var factionGroups = {};
 cards.forEach(function(c) {
 if (!factionGroups[c.faction]) factionGroups[c.faction] = [];
 factionGroups[c.faction].push(c);
 });

 Object.keys(factionGroups).forEach(function(faction) {
 var group = factionGroups[faction];
 var fac = CONFIG.factions[faction] || { color:"#888" };
 var fc = hexToRgb(fac.color);

 // Faction header
 pdf.setFillColor(fc[0], fc[1], fc[2]);
 pdf.roundedRect(8, y - 3, 3, 3, 0.5, 0.5, "F");
 pdf.setFontSize(8);
 pdf.setFont(undefined, "bold");
 pdf.setTextColor(fc[0], fc[1], fc[2]);
 pdf.text(faction.toUpperCase(), 14, y);

 var factionTotal = 0;
 for (var ft = 0; ft < group.length; ft++) factionTotal += parseInt(group[ft].points) || 0;
 pdf.setFont(undefined, "normal");
 pdf.setFontSize(7);
 pdf.setTextColor(140, 140, 160);
 pdf.text(factionTotal + " pts", 95, y, { align:"right" });
 y += 5;

 group.forEach(function(c) {
 if (y > 130) return;
 pdf.setFontSize(7);
 pdf.setFont(undefined, "normal");
 pdf.setTextColor(200, 200, 210);
 pdf.text(c.name, 12, y);

 pdf.setTextColor(240, 192, 64);
 pdf.text(c.points + " pts", 95, y, { align:"right" });

 // Weapon names small
 if (c.weapons.length > 0 && y < 126) {
 y += 3;
 pdf.setFontSize(5);
 pdf.setTextColor(100, 100, 120);
 pdf.text(c.weapons.join(", "), 14, y, { maxWidth:78 });
 }
 y += 4;
 });
 y += 2;
 });

 // Date
 pdf.setFontSize(5);
 pdf.setTextColor(80, 80, 100);
 pdf.text(new Date().toLocaleDateString("fr-FR"), 52.5, 142, { align:"center" });

 // ═══ UNIT CARDS ═══
 cards.forEach(function(c, i) {
 pdf.addPage([105, 148], "portrait");

 var bg = bgMap[c.theme] || [30, 30, 40];
 var isLight = (c.theme === "parchment" || c.theme === "clone");
 var txt = isLight ? [30, 20, 10] : [230, 230, 240];
 var acc = isLight ? [170, 110, 20] : [240, 192, 64];
 var dim = isLight ? [120, 100, 60] : [bg[0]*0.55, bg[1]*0.55, bg[2]*0.55];

 // Background
 pdf.setFillColor(bg[0], bg[1], bg[2]);
 pdf.roundedRect(2, 2, 101, 144, 3, 3, "F");

 // Border
 var fac = CONFIG.factions[c.faction] || { color:"#888" };
 var bc = hexToRgb(fac.color);
 pdf.setDrawColor(bc[0], bc[1], bc[2]);
 pdf.setLineWidth(0.8);
 pdf.roundedRect(2, 2, 101, 144, 3, 3, "S");

 // Faction
 pdf.setFontSize(7);
 pdf.setTextColor(txt[0], txt[1], txt[2]);
 pdf.text(c.faction.toUpperCase(), 7, 10);

 // Points
 pdf.setFontSize(11);
 pdf.setTextColor(acc[0], acc[1], acc[2]);
 pdf.text(c.points + " pts", 98, 10, { align:"right" });

 // Name
 pdf.setFontSize(17);
 pdf.setFont(undefined, "bold");
 pdf.setTextColor(txt[0], txt[1], txt[2]);
 pdf.text(c.name.toUpperCase(), 52.5, 24, { align:"center", maxWidth:88 });

 // Separator
 pdf.setDrawColor(acc[0], acc[1], acc[2]);
 pdf.setLineWidth(0.4);
 pdf.line(10, 30, 95, 30);

 // Stats boxes
 pdf.setFont(undefined, "normal");
 var stats = [
 { label:"PV", val:c.hp },
 { label:"ARM", val:c.armor },
 { label:"MOV", val:(parseInt(c.move) >= 0 ? "+" : "") + c.move },
 { label:"PA", val:c.pa }
 ];
 var sw = 21, sx = 9;
 stats.forEach(function(s, si) {
 var x = sx + si * sw + si * 2;
 pdf.setFillColor(dim[0], dim[1], dim[2]);
 pdf.roundedRect(x, 34, sw, 16, 2, 2, "F");
 pdf.setFontSize(15);
 pdf.setFont(undefined, "bold");
 pdf.setTextColor(acc[0], acc[1], acc[2]);
 pdf.text(String(s.val), x + sw/2, 43.5, { align:"center" });
 pdf.setFontSize(6);
 pdf.setFont(undefined, "normal");
 pdf.setTextColor(txt[0], txt[1], txt[2]);
 pdf.text(s.label, x + sw/2, 48.5, { align:"center" });
 });

 // Weapons
 var wy = 58;
 pdf.setFontSize(7);
 pdf.setTextColor(acc[0], acc[1], acc[2]);
 pdf.text("ARMEMENT", 7, wy);
 wy += 4;

 if (c.weapons.length === 0) {
 pdf.setFontSize(8);
 pdf.setTextColor(dim[0], dim[1], dim[2]);
 pdf.text("Aucune arme", 52.5, wy + 4, { align:"center" });
 } else {
 c.weapons.forEach(function(wName) {
 var w = CONFIG.weapons[wName];
 if (!w || wy > 128) return;
 pdf.setFillColor(dim[0], dim[1], dim[2]);
 pdf.roundedRect(7, wy, 91, 7.5, 1.5, 1.5, "F");
 pdf.setFontSize(9);
 pdf.setFont(undefined, "bold");
 pdf.setTextColor(txt[0], txt[1], txt[2]);
 pdf.text(wName, 10, wy + 5);
 pdf.setFontSize(7);
 pdf.setFont(undefined, "normal");
 pdf.setTextColor(acc[0], acc[1], acc[2]);
 var info = w.mun + " des | Pen " + w.pen + " | Dmg " + w.dmg + " | " + w.portee;
 pdf.text(info, 95, wy + 5, { align:"right" });
 wy += 9;
 });
 }

 // Footer with card number
 pdf.setFontSize(5);
 pdf.setTextColor(dim[0], dim[1], dim[2]);
 pdf.text("CROSSBLOCKS — " + (i + 1) + "/" + cards.length + " — " + armyTotal + " pts total", 52.5, 143, { align:"center" });
 });

 pdf.save("CrossBlocks_armee.pdf");
 btn.textContent = "\uD83D\uDCC4 Exporter PDF";
 btn.disabled = false;
 }, 60);
}

// Helper: hex color to [r,g,b]
function hexToRgb(hex) {
 hex = hex.replace("#", "");
 if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
 return [parseInt(hex.substr(0,2),16), parseInt(hex.substr(2,2),16), parseInt(hex.substr(4,2),16)];
}

// ═══ LANCHESTER PRICE CALCULATOR ═══
// Exponential cost based on N² combat power scaling

function calcWeaponDmg(w, targetArm) {
 // Best range damage of a weapon vs target armor
 if (!w) return 0;
 var best = 0;
 var bands = [w.diff]; // simplified: use main diff
 var hitP = Math.max(0, (21 - w.diff) / 20);
 var pen = w.pen || 0;
 var saveP = Math.max(0, (21 - (targetArm + pen)) / 20);
 var failSave = 1 - saveP;
 var dmg = w.dmg;
 if (typeof dmg === "string") {
 // Handle "1-4" style damage
 var parts = dmg.split("-");
 dmg = (parseInt(parts[0]) + parseInt(parts[1])) / 2;
 }
 var mun = w.mun || 1;
 return mun * hitP * failSave * dmg;
}

function calcPrice() {
 var hp = Math.max(1, parseInt(document.getElementById("ed-hp").value) || 1);
 var arm = parseInt(document.getElementById("ed-armor").value) || 15;
 var pa = Math.max(1, parseInt(document.getElementById("ed-pa").value) || 5);
 var move = parseInt(document.getElementById("ed-move").value) || 0;

 var TARGET_ARM = 15; // Reference target: Clone armor
 var REF_PEN = 5; // Reference attacker penetration

 // ── 1. HP Factor (exponential: Lanchester) ──
 var hpFactor = Math.pow(hp, 1.5);

 // ── 2. Armor → Parade → Effective HP multiplier ──
 var parade = Math.max(0, (21 - (arm + REF_PEN)) / 20);
 var survivalMult;
 if (parade >= 1) {
 survivalMult = 20; // practically invincible cap
 } else if (parade <= 0) {
 survivalMult = 1; // no save = raw HP
 } else {
 survivalMult = 1 / (1 - parade); // effective HP multiplier
 }

 // ── 3. Weapon DPT (damage per turn) ──
 var nWeapons = selectedWeapons.length;
 var maxFires = Math.floor(pa / 2);
 var nFires = Math.min(nWeapons, maxFires);

 // Calculate each weapon's damage, sort by best
 var wDmgs = [];
 for (var i = 0; i < selectedWeapons.length; i++) {
 var w = CONFIG.weapons[selectedWeapons[i]];
 var d = calcWeaponDmg(w, TARGET_ARM);
 wDmgs.push({ name: selectedWeapons[i], dmg: d, pen: w ? w.pen : 0 });
 }
 wDmgs.sort(function(a, b) { return b.dmg - a.dmg; });

 var dpt = 0;
 var totalPen = 0;
 for (var j = 0; j < nFires; j++) {
 dpt += wDmgs[j].dmg;
 totalPen += Math.max(0, wDmgs[j].pen - 4); // pen premium above baseline
 }

 // Weapon factor: DPT + penetration premium for anti-armor
 var weaponFactor = 1 + Math.pow(dpt, 0.8) * 0.5 + totalPen * 0.06;

 // ── 4. PA / Mobility ──
 var paAfterFire = pa - nFires * 2;
 var mobilityFactor = 1 + paAfterFire * 0.05 + move * 0.03;

 // ── 5. Final price ──
 // BASE calibrated so Clone Ph.2 (2hp,arm15,5PA,fusil) ≈ 200pts
 var BASE = 40;
 var rawPrice = BASE * hpFactor * survivalMult * weaponFactor * mobilityFactor;
 var finalPrice = Math.round(rawPrice / 10) * 10; // round to nearest 10

 // ── Apply to field ──
 document.getElementById("ed-points").value = finalPrice;
 updatePreview();

 // ── Show breakdown ──
 var bk = document.getElementById("price-breakdown");
 bk.style.display = "block";

 // Rating: compare to Clone Ph.2 baseline (~200pts)
 var rating = finalPrice <= 150 ? "Bon marché" :
 finalPrice <= 250 ? "Standard" :
 finalPrice <= 500 ? "Élite" :
 finalPrice <= 1000 ? "Héroïque" : "Titanesque";
 var ratingColor = finalPrice <= 150 ? "#3fb950" :
 finalPrice <= 250 ? "#58a6ff" :
 finalPrice <= 500 ? "#f0c040" :
 finalPrice <= 1000 ? "#f09040" : "#f85149";

 // Lanchester comparison: how many Clones (200pts) would this equal?
 var cloneEquiv = (finalPrice / 200).toFixed(1);
 // But in Lanchester, N clones have N² power, so effective power ratio:
 var nClones = finalPrice / 200;
 var clonePower = Math.pow(Math.max(1, Math.round(nClones)), 2);
 var unitPower = hpFactor * survivalMult * weaponFactor;
 var powerRatio = unitPower / clonePower;
 var powerVerdict = powerRatio > 1.2 ? "OP " : powerRatio > 0.8 ? "Équilibré " : "Faible ";

 var barPct = Math.min(100, finalPrice / 30);
 var barColor = finalPrice <= 250 ? "#3fb950" : finalPrice <= 500 ? "#f0c040" : "#f85149";

 bk.innerHTML =
 '<div class="price-result"> ' + finalPrice + ' pts</div>' +
 '<div style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;background:' + ratingColor + '22;color:' + ratingColor + ';margin-bottom:8px;">' + rating + '</div>' +
 '<div class="price-row"><span class="pr-label">HP^1.5 (Lanchester)</span><span class="pr-val">' + hp + ' PV → ×' + hpFactor.toFixed(1) + '</span></div>' +
 '<div class="price-row"><span class="pr-label">Parade (arm=' + arm + ' vs pen=5)</span><span class="pr-val ' + (parade > 0.3 ? "pr-high" : parade > 0 ? "pr-mid" : "pr-low") + '">' + Math.round(parade * 100) + '% → ×' + survivalMult.toFixed(2) + '</span></div>' +
 '<div class="price-row"><span class="pr-label">DPT (' + nFires + ' tir(s)/tour vs arm=15)</span><span class="pr-val">' + dpt.toFixed(2) + ' dmg → ×' + weaponFactor.toFixed(2) + '</span></div>' +
 '<div class="price-row"><span class="pr-label">Mobilité (' + paAfterFire + ' PA mvt, MM' + (move >= 0 ? "+" : "") + move + ')</span><span class="pr-val">×' + mobilityFactor.toFixed(2) + '</span></div>' +
 '<div class="price-bar"><div class="price-bar-fill" style="width:' + barPct + '%;background:' + barColor + '"></div></div>' +
 '<div class="price-row" style="margin-top:6px;border:none"><span class="pr-label">≈ ' + cloneEquiv + ' Clones en coût</span><span class="pr-val">' + powerVerdict + '</span></div>' +
 '<div class="price-tip"> Formule : Base(70) × HP^1.5 × Survie × Armes × Mobilité — ' +
 'basé sur la loi de Lanchester (N² scaling)</div>';
}

// ═══ COMMUNITY SUGGESTIONS ═══
// Local + Remote (jsonblob.com) support
// Pending = usable locally with "non validé" badge
// Approved = official, no badge
// Rejected = removed entirely

var SG_KEY = "crossblocks_suggestions";
var _remoteLoaded = false;

function getRemoteUrl() {
 // Check config.js first, then localStorage fallback
 var id = CONFIG.remoteSuggestionsId;
 if (!id) {
 try { id = localStorage.getItem("crossblocks_remote_id"); } catch(e) {}
 }
 return id ? "https://jsonblob.com/api/jsonBlob/" + id : null;
}

function getRemoteId() {
 var id = CONFIG.remoteSuggestionsId;
 if (!id) {
 try { id = localStorage.getItem("crossblocks_remote_id"); } catch(e) {}
 }
 return id || null;
}

function setupRemoteSync() {
 var statusEl = document.getElementById("sync-status");
 if (statusEl) statusEl.textContent = " Création...";

 fetch("https://jsonblob.com/api/jsonBlob", {
 method: "POST",
 headers: { "Content-Type":"application/json", "Accept":"application/json" },
 body: "[]"
 })
 .then(function(r) {
 // Get blob ID from Location header
 var loc = r.headers.get("Location") || "";
 var id = loc.split("/").pop();
 if (id && id.length > 5) {
 try { localStorage.setItem("crossblocks_remote_id", id); } catch(e) {}
 // Push current local suggestions to remote
 var arr = getSuggestions();
 if (arr.length > 0) {
 pushRemoteSuggestions(arr, function() {});
 }
 renderSyncStatus();
 alert(" Sync distante activée !\n\nID: " + id + "\n\nPour rendre permanent, ajoutez dans config.js :\nremoteSuggestionsId: \"" + id + "\"");
 } else {
 if (statusEl) statusEl.textContent = " Erreur";
 }
 })
 .catch(function() {
 if (statusEl) statusEl.textContent = " Erreur réseau";
 });
}

function manualRemoteId() {
 var id = prompt("Collez l'ID de synchronisation :");
 if (id && id.trim().length > 5) {
 try { localStorage.setItem("crossblocks_remote_id", id.trim()); } catch(e) {}
 // Sync now
 fetchRemoteSuggestions(function(remote) {
 if (remote) {
 var local = getSuggestions();
 var merged = mergeSuggestions(local, remote);
 saveSuggestions(merged);
 clearInjectedSuggestions();
 injectSuggestions(merged);
 renderGallery();
 populateWeapons();
 }
 renderSyncStatus();
 renderPending();
 });
 alert(" ID enregistré. Synchronisation en cours...");
 }
}

function forceSyncNow() {
 var statusEl = document.getElementById("sync-status");
 if (statusEl) statusEl.textContent = " Sync...";

 fetchRemoteSuggestions(function(remote) {
 if (remote) {
 var local = getSuggestions();
 var merged = mergeSuggestions(local, remote);
 saveSuggestions(merged);
 clearInjectedSuggestions();
 injectSuggestions(merged);
 renderGallery();
 populateWeapons();
 renderPending();
 if (statusEl) statusEl.textContent = " Synchronisé (" + merged.length + " items)";
 } else {
 if (statusEl) statusEl.textContent = " Échec";
 }
 });
}

function renderSyncStatus() {
 var box = document.getElementById("sync-controls");
 if (!box) return;
 var id = getRemoteId();
 var statusEl = document.getElementById("sync-status");

 if (id) {
 if (statusEl) { statusEl.textContent = " Connecté"; statusEl.style.color = "#3fb950"; }
 box.innerHTML =
 '<div style="font-size:10px;color:#ccc;margin-bottom:6px">ID: <code style="background:#161b22;padding:2px 5px;border-radius:3px;user-select:all">' + id + '</code></div>' +
 '<div style="display:flex;gap:6px">' +
 '<button class="btn" style="font-size:10px;padding:3px 10px" onclick="forceSyncNow()"> Sync maintenant</button>' +
 '<button class="btn" style="font-size:10px;padding:3px 10px" onclick="manualRemoteId()"> Changer ID</button>' +
 '</div>';
 } else {
 if (statusEl) { statusEl.textContent = " Non configuré"; statusEl.style.color = "#f59e0b"; }
 box.innerHTML =
 '<div style="display:flex;gap:6px">' +
 '<button class="btn btn-approve" style="font-size:10px;padding:4px 12px" onclick="setupRemoteSync()"> Activer la sync distante</button>' +
 '<button class="btn" style="font-size:10px;padding:4px 12px" onclick="manualRemoteId()"> J\'ai déjà un ID</button>' +
 '</div>';
 }
}

function getSuggestions() {
 try { var d = localStorage.getItem(SG_KEY); return d ? JSON.parse(d) : []; }
 catch(e) { return []; }
}
function saveSuggestions(arr) {
 try { localStorage.setItem(SG_KEY, JSON.stringify(arr)); } catch(e) {}
}

// ── Remote fetch/push ──
function fetchRemoteSuggestions(callback) {
 var url = getRemoteUrl();
 if (!url) { if (callback) callback(null); return; }
 fetch(url, { headers: { "Content-Type":"application/json", "Accept":"application/json" } })
 .then(function(r) { return r.ok ? r.json() : null; })
 .then(function(data) { if (callback) callback(Array.isArray(data) ? data : null); })
 .catch(function() { if (callback) callback(null); });
}

function pushRemoteSuggestions(arr, callback) {
 var url = getRemoteUrl();
 if (!url) { if (callback) callback(false); return; }
 fetch(url, {
 method: "PUT",
 headers: { "Content-Type":"application/json", "Accept":"application/json" },
 body: JSON.stringify(arr)
 })
 .then(function(r) { if (callback) callback(r.ok); })
 .catch(function() { if (callback) callback(false); });
}

// Merge remote into local (remote wins on conflict by name+type)
function mergeSuggestions(local, remote) {
 if (!remote) return local;
 var merged = local.slice();
 var localKeys = {};
 for (var i = 0; i < local.length; i++) {
 localKeys[local[i].type + ":" + local[i].name] = i;
 }
 for (var j = 0; j < remote.length; j++) {
 var key = remote[j].type + ":" + remote[j].name;
 if (key in localKeys) {
 // Remote wins (admin may have approved/rejected from another device)
 merged[localKeys[key]] = remote[j];
 } else {
 merged.push(remote[j]);
 }
 }
 return merged;
}

// Load all pending+approved suggestions into live lists
function loadSuggestions() {
 var local = getSuggestions();
 injectSuggestions(local);

 // Fetch remote and merge
 fetchRemoteSuggestions(function(remote) {
 if (remote) {
 var merged = mergeSuggestions(local, remote);
 saveSuggestions(merged);
 // Re-inject (clear old injected items first)
 clearInjectedSuggestions();
 injectSuggestions(merged);
 renderGallery();
 populateWeapons();
 updatePreview();
 _remoteLoaded = true;
 }
 });

 updateSuggestCount();
}

function clearInjectedSuggestions() {
 // Remove suggestion-injected items from GALLERY
 for (var i = GALLERY.length - 1; i >= 0; i--) {
 if (GALLERY[i]._sgIndex !== undefined) GALLERY.splice(i, 1);
 }
 // Remove from CONFIG.weapons
 var keys = Object.keys(CONFIG.weapons);
 for (var j = 0; j < keys.length; j++) {
 if (CONFIG.weapons[keys[j]]._sgIndex !== undefined) delete CONFIG.weapons[keys[j]];
 }
}

function injectSuggestions(arr) {
 for (var i = 0; i < arr.length; i++) {
 var s = arr[i];
 if (s.status === "rejected") continue;
 var isPending = s.status === "pending";

 if (s.type === "unit") {
 var exists = false;
 for (var j = 0; j < GALLERY.length; j++) {
 if (GALLERY[j].name === s.name) { exists = true; break; }
 }
 if (!exists) {
 GALLERY.push({
 name: s.name, faction: s.faction, theme: s.theme || "metal",
 points: s.points, hp: s.hp, armor: s.armor, move: s.move, pa: s.pa,
 weapons: s.weapons, special: s.notes || null,
 _pending: isPending, _sgIndex: i
 });
 }
 } else if (s.type === "weapon") {
 if (!CONFIG.weapons[s.name]) {
 CONFIG.weapons[s.name] = {
 mun: s.mun, diff: s.diff, pen: s.pen, dmg: s.dmg,
 portee: s.portee,
 _pending: isPending, _sgIndex: i
 };
 }
 }
 }
}

function switchSuggestTab(tab, btn) {
 var btns = document.querySelectorAll(".btn-stab");
 for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
 if (btn) btn.classList.add("active");
 document.getElementById("suggest-unit").style.display = tab === "unit" ? "flex" : "none";
 document.getElementById("suggest-weapon").style.display = tab === "weapon" ? "flex" : "none";
}

function submitSuggestion(type) {
 var sg;
 if (type === "unit") {
 var name = document.getElementById("sg-name").value.trim();
 if (!name) { alert("Entrez un nom d'unité !"); return; }
 sg = {
 type: "unit", name: name,
 faction: document.getElementById("sg-faction").value,
 theme: "metal",
 points: parseInt(document.getElementById("sg-pts").value) || 200,
 hp: parseInt(document.getElementById("sg-hp").value) || 2,
 armor: parseInt(document.getElementById("sg-arm").value) || 15,
 move: parseInt(document.getElementById("sg-mm").value) || 0,
 pa: parseInt(document.getElementById("sg-pa").value) || 5,
 weapons: document.getElementById("sg-weapons").value.split(",").map(function(s){ return s.trim(); }).filter(Boolean),
 notes: document.getElementById("sg-notes").value.trim(),
 date: new Date().toISOString().slice(0,10),
 status: "pending"
 };
 } else {
 var wname = document.getElementById("sgw-name").value.trim();
 if (!wname) { alert("Entrez un nom d'arme !"); return; }
 sg = {
 type: "weapon", name: wname,
 diff: parseInt(document.getElementById("sgw-diff").value) || 15,
 mun: parseInt(document.getElementById("sgw-mun").value) || 3,
 pen: parseInt(document.getElementById("sgw-pen").value) || 5,
 dmg: parseInt(document.getElementById("sgw-dmg").value) || 1,
 portee: document.getElementById("sgw-portee").value.trim() || "Cat.1",
 notes: document.getElementById("sgw-notes").value.trim(),
 date: new Date().toISOString().slice(0,10),
 status: "pending"
 };
 }

 var arr = getSuggestions();
 arr.push(sg);
 saveSuggestions(arr);

 // Push to remote
 pushRemoteSuggestions(arr, function(ok) {
 if (!ok && getRemoteUrl()) console.warn("Échec sync distante, sauvé localement");
 });

 // Immediately add to live lists
 var idx = arr.length - 1;
 if (sg.type === "unit") {
 GALLERY.push({
 name: sg.name, faction: sg.faction, theme: sg.theme || "metal",
 points: sg.points, hp: sg.hp, armor: sg.armor, move: sg.move, pa: sg.pa,
 weapons: sg.weapons, special: sg.notes || null,
 _pending: true, _sgIndex: idx
 });
 renderGallery();
 } else {
 CONFIG.weapons[sg.name] = {
 mun: sg.mun, diff: sg.diff, pen: sg.pen, dmg: sg.dmg,
 portee: sg.portee, _pending: true, _sgIndex: idx
 };
 populateWeapons();
 }

 updateSuggestCount();
 alert(" Proposition ajoutée ! Elle est synchronisée en ligne et sera validée par l'admin.");
}

function updateSuggestCount() {
 var el = document.getElementById("suggest-count");
 if (!el) return;
 var pending = getSuggestions().filter(function(s) { return s.status === "pending"; });
 el.textContent = pending.length > 0 ? pending.length + " proposition(s) en attente de validation" : "";
 // Show remote status
 var remEl = document.getElementById("suggest-remote-status");
 if (remEl) {
 remEl.textContent = getRemoteId() ? " Synchronisation distante active" : " Mode local uniquement";
 remEl.style.color = getRemoteId() ? "#3fb950" : "#f59e0b";
 }
}

function populateSuggestFactions() {
 var sel = document.getElementById("sg-faction");
 if (!sel) return;
 sel.innerHTML = "";
 var facs = Object.keys(CONFIG.factions);
 for (var i = 0; i < facs.length; i++) {
 var opt = document.createElement("option");
 opt.value = facs[i]; opt.textContent = facs[i];
 sel.appendChild(opt);
 }
}

// ═══ ADMIN: PENDING REVIEW ═══
function renderPending() {
 // Render sync status first
 renderSyncStatus();

 var container = document.getElementById("pending-list-area");
 if (!container) return;
 var arr = getSuggestions();
 var pending = arr.filter(function(s) { return s.status === "pending"; });

 var html = '';

 if (pending.length === 0) {
 html += '<p style="color:var(--text2);font-size:12px;margin-top:8px">Aucune proposition en attente.</p>';
 container.innerHTML = html;
 return;
 }

 html += '<div class="pending-list">';
 for (var i = 0; i < arr.length; i++) {
 if (arr[i].status !== "pending") continue;
 var s = arr[i];
 if (s.type === "unit") {
 html += '<div class="pending-item">' +
 '<div class="pi-info"><span class="pi-name">' + s.name + '</span> (' + s.faction + ')' +
 '<div class="pi-meta">' + s.points + 'pts | PV:' + s.hp + ' Arm:' + s.armor + '+ PA:' + s.pa +
 ' MM:' + s.move + ' | Armes: ' + s.weapons.join(", ") +
 (s.notes ? ' | ' + s.notes : '') + ' | ' + s.date + '</div></div>' +
 '<button class="btn-approve" onclick="approveSuggestion(' + i + ')">Approuver</button>' +
 '<button class="btn-reject" onclick="rejectSuggestion(' + i + ')">Rejeter</button></div>';
 } else {
 html += '<div class="pending-item">' +
 '<div class="pi-info"><span class="pi-name">' + s.name + '</span>' +
 '<div class="pi-meta">Mun:' + s.mun + ' Diff:' + s.diff + ' Pen:' + s.pen +
 ' Dmg:' + s.dmg + ' | ' + s.portee +
 (s.notes ? ' | ' + s.notes : '') + ' | ' + s.date + '</div></div>' +
 '<button class="btn-approve" onclick="approveSuggestion(' + i + ')">Approuver</button>' +
 '<button class="btn-reject" onclick="rejectSuggestion(' + i + ')">Rejeter</button></div>';
 }
 }
 html += '</div>';
 container.innerHTML = html;
}

function approveSuggestion(index) {
 var arr = getSuggestions();
 var s = arr[index];
 if (!s) return;

 arr[index].status = "approved";
 saveSuggestions(arr);

 // Push to remote
 pushRemoteSuggestions(arr, function(ok) {
 if (ok) console.log(" Sync distante OK");
 else if (getRemoteUrl()) console.warn(" Échec sync distante");
 });

 // Remove _pending flag from live data
 if (s.type === "unit") {
 for (var i = 0; i < GALLERY.length; i++) {
 if (GALLERY[i].name === s.name) { GALLERY[i]._pending = false; break; }
 }
 renderGallery();
 } else {
 if (CONFIG.weapons[s.name]) CONFIG.weapons[s.name]._pending = false;
 populateWeapons();
 }

 renderPending();
 updateSuggestCount();
}

function rejectSuggestion(index) {
 var arr = getSuggestions();
 var s = arr[index];
 if (!s) return;

 // Remove from live data
 if (s.type === "unit") {
 for (var i = GALLERY.length - 1; i >= 0; i--) {
 if (GALLERY[i].name === s.name && GALLERY[i]._sgIndex === index) {
 GALLERY.splice(i, 1); break;
 }
 }
 renderGallery();
 } else {
 if (CONFIG.weapons[s.name] && CONFIG.weapons[s.name]._sgIndex === index) {
 delete CONFIG.weapons[s.name];
 }
 populateWeapons();
 }

 arr[index].status = "rejected";
 saveSuggestions(arr);

 // Push to remote
 pushRemoteSuggestions(arr, function(ok) {
 if (ok) console.log(" Sync distante OK");
 else if (getRemoteUrl()) console.warn(" Échec sync distante");
 });

 renderPending();
 updateSuggestCount();
}
