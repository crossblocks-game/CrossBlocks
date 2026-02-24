let cards=[];
let currentTheme = CONFIG.themes[0];

function setTheme(theme){ currentTheme=theme; }

function addCard(){
    const name=document.getElementById("name").value;
    const points=document.getElementById("points").value;
    const hp=document.getElementById("hp").value;
    const armor=document.getElementById("armor").value;
    const move=document.getElementById("move").value;

    const cardData={name, points, hp, armor, move, theme:currentTheme};
    cards.push(cardData);
    displayCards();
}

function displayCards(){
    const container=document.getElementById("cards-container");
    container.innerHTML="";
    cards.forEach(card=>{
        const div=document.createElement("div");
        div.className="card theme-"+card.theme;
        div.innerHTML=`
            <h2>${card.name}</h2>
            <div class="stat">Points: ${card.points}</div>
            <div class="stat">PV: ${card.hp}</div>
            <div class="stat">Armure: ${card.armor}</div>
            <div class="stat">Mouvement: ${card.move}</div>
        `;
        container.appendChild(div);
    });
}

async function exportPDF(){
    const { jsPDF } = window.jspdf;
    const pdf=new jsPDF({orientation:"portrait", unit:"mm", format:"a6"});
    cards.forEach((card,index)=>{
        if(index>0) pdf.addPage();
        pdf.setFontSize(18);
        pdf.text(card.name,10,20);
        pdf.setFontSize(12);
        pdf.text("Points: "+card.points,10,40);
        pdf.text("PV: "+card.hp,10,50);
        pdf.text("Armure: "+card.armor,10,60);
        pdf.text("Mouvement: "+card.move,10,70);
    });
    pdf.save("CrossBlocks_cards.pdf");
}