let cards = [];
let currentTheme = CONFIG.themes[0];

function setTheme(theme){
    currentTheme = theme;
}

function addCard(){
    const name = document.getElementById("name").value;
    const points = document.getElementById("points").value;
    const hp = document.getElementById("hp").value;
    const armor = document.getElementById("armor").value;
    const move = document.getElementById("move").value;

    const cardData = {name, points, hp, armor, move, theme:currentTheme};
    cards.push(cardData);

    displayCards();
}

function displayCards(){
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    cards.forEach(card=>{
        const div = document.createElement("div");
        div.className = "card theme1"; // placeholder
        div.style.background = card.theme.includes("Empire") ? "#333" : "#eee"; // simple example
        div.innerHTML = `
            <h2>${card.name}</h2>
            <div>Points: ${card.points}</div>
            <div>PV: ${card.hp}</div>
            <div>Armure: ${card.armor}</div>
            <div>Mouvement: ${card.move}</div>
        `;
        container.appendChild(div);
    });
}
