function setTheme(theme){
    document.getElementById("card").className = "card theme-" + theme;
}

const weaponDB = {
    "Blaster": "10 dmg / 30",
    "Rifle": "18 dmg / 40",
    "Rocket": "30 dmg / 60"
};

function addWeapon(){
    const select = document.createElement("select");
    for(let w in weaponDB){
        const o = document.createElement("option");
        o.text = w;
        select.add(o);
    }

    const div = document.createElement("div");
    select.onchange = ()=>{
        div.innerText = weaponDB[select.value];
    };

    document.getElementById("weapons").appendChild(select);
    document.getElementById("weapons").appendChild(div);
}

function addCardToSheet(){
    const card = document.getElementById("card").cloneNode(true);
    document.getElementById("sheet").appendChild(card);
}

function exportSheet(){
    html2pdf().set({
        margin:5,
        filename:"planche_cartes.pdf",
        html2canvas:{scale:2},
        jsPDF:{unit:'mm',format:'a4'}
    }).from(document.getElementById("sheet")).save();
}
