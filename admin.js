// Mot de passe admin simple (à changer)
const ADMIN_PASSWORD = "crossblocks123";

// Données modifiables
let CONFIG = {
    themes: ["Clone","Empire","Rebelle","Droïdes","Jedi","Sith","Neutre","Forêt","Désert","Glace"],
    weapons: {
        "Blaster": {degats:10, portee:30},
        "Fusil lourd": {degats:18, portee:40},
        "Lance-roquettes": {degats:30, portee:60},
        "Sabre laser": {degats:25, portee:1}
    }
};

function promptAdmin(){
    const pwd = prompt("Mot de passe admin ?");
    if(pwd===ADMIN_PASSWORD){
        openAdmin();
    } else {
        alert("Mot de passe incorrect");
    }
}

function openAdmin(){
    document.getElementById("adminPanel").style.display = "block";
    renderAdmin();
}

function closeAdmin(){
    document.getElementById("adminPanel").style.display = "none";
}

function renderAdmin(){
    // Thèmes
    const themeDiv = document.getElementById("adminThemes");
    themeDiv.innerHTML = "";
    CONFIG.themes.forEach((t,i)=>{
        const input = document.createElement("input");
        input.value = t;
        input.onchange = e=>CONFIG.themes[i]=e.target.value;
        themeDiv.appendChild(input);
        themeDiv.appendChild(document.createElement("br"));
    });

    // Armes
    const weaponDiv = document.getElementById("adminWeapons");
    weaponDiv.innerHTML = "";
    Object.keys(CONFIG.weapons).forEach(w=>{
        const nameInput = document.createElement("input");
        nameInput.value = w;
        const dmgInput = document.createElement("input");
        dmgInput.type = "number";
        dmgInput.value = CONFIG.weapons[w].degats;
        const rangeInput = document.createElement("input");
        rangeInput.type = "number";
        rangeInput.value = CONFIG.weapons[w].portee;

        nameInput.onchange = e=>{
            const obj = CONFIG.weapons[w];
            delete CONFIG.weapons[w];
            CONFIG.weapons[e.target.value]=obj;
        };
        dmgInput.onchange = e=>CONFIG.weapons[nameInput.value].degats=parseInt(e.target.value);
        rangeInput.onchange = e=>CONFIG.weapons[nameInput.value].portee=parseInt(e.target.value);

        weaponDiv.appendChild(nameInput);
        weaponDiv.appendChild(dmgInput);
        weaponDiv.appendChild(rangeInput);
        weaponDiv.appendChild(document.createElement("br"));
    });
}
