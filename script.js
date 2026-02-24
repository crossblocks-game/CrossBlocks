let cards=[]; let currentTheme=CONFIG.themes[0];

function setTheme(theme){ currentTheme=theme; }

function addCard(){
  const name=document.getElementById("name").value;
  const points=document.getElementById("points").value;
  const hp=document.getElementById("hp").value;
  const armor=document.getElementById("armor").value;
  const move=document.getElementById("move").value;
  const card={name,points,hp,armor,move,theme:currentTheme};
  cards.push(card); displayCards();
}

function displayCards(){
  const container=document.getElementById("cards-container");
  container.innerHTML="";
  cards.forEach(c=>{
    const div=document.createElement("div");
    div.className="card theme-"+c.theme;
    div.innerHTML=`
      <h2>${c.name}</h2>
      <div class="stat">Points: ${c.points}</div>
      <div class="stat">PV: ${c.hp}</div>
      <div class="stat">Armure: ${c.armor}</div>
      <div class="stat">Mouvement: ${c.move}</div>
    `;
    container.appendChild(div);
  });
}

function exportPDF(){
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:"portrait", unit:"mm", format:"a6"});
  cards.forEach((c,i)=>{
    if(i>0) pdf.addPage();
    pdf.setFontSize(18); pdf.text(c.name,10,20);
    pdf.setFontSize(12);
    pdf.text("Points: "+c.points,10,40);
    pdf.text("PV: "+c.hp,10,50);
    pdf.text("Armure: "+c.armor,10,60);
    pdf.text("Mouvement: "+c.move,10,70);
  });
  pdf.save("CrossBlocks_cards.pdf");
}