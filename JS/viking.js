/*BUTTON COMMANDS*/
document.getElementById("warStartb").onclick = function () {
       
    startWar();
}

document.getElementById("buttonViking").onclick = function () {
       
    vikingAttackbtn()
}

document.getElementById("buttonSaxon").onclick = function () {
       
    saxonAttackbtn()
}

document.getElementById("formStart").onclick = function () {
       
    startForm()
}

document.getElementById("warStartbf").onclick = function () {
       
    startWarForm()
}
/*END BUTTON COMMANDS*/

// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
        
    }
        attack = function () {
        return this.strength;
        }
        receiveDamage = function (dmg) {
            this.health -= dmg;
            }
    
}

// Viking
class Viking extends Soldier {
        constructor(name, nameID, health, strength) {
        super(health, strength);
        this.name = name;
        this.nameID = nameID;
        }
    receiveDamage = function (dmg) {
        this.health -= dmg;
        return this.health
        // if (this.health > 0){
        //     return `${this.name} has received ${dmg} points of damage`
        // } else {
        //     return `${this.name} has died in act of combat`
        // }
    }
    battleCry = function() {
        return `Odin Owns You All!`
    }
}

// Saxon
class Saxon extends Soldier {
        constructor(name, health, strength) {
        super(health, strength);
        this.name = name;
        }
        receiveDamage = function (dmg) {
           this.health -= dmg;
           return this.health;
    //        if (this.health > 0){
    //            return `A Saxon has received ${dmg} points of damage`
    //        } else {
    //            return `A Saxon has died in combat`
    //        }
        }
}

let vHealth = 0;
let vStrength = 0;
let vName = ''
let vikingNames = [
    'Addam ','Aegon','Aegor ','Aelinor','Aemma ','Aemon','Aemond',
    'Aenar','Aenys','Aerion','AerysII','Alys ','Alysanne','Baelor',
    'Brynden ','Ceryse ','Daemon','Daena','Daenerys ','Daenys',
    'Daeron','Duncan','Dyanna ','Eleana','Elia ','Elinor ','Helaena',
    'Hugh ','Jacaerys ','Jaehaera','Jaehaerys','Jeyne ','Joffrey ',
    'Jon ','Laenor ','Lucerys ','Maegor','Maekar','Maelor','Myriah ',
    'Naerys','Nettles','Rhaegar','Rhaegel','Rhaego','Rhaella','Rhaelle ',
    'Rhaena','Rhaenyra','Rhaenys','Shiera ','Visenya','Viserys','Alton',
    'Cersei','Cynda','Damon','Darlessa ','Dorna','Ellyn ','Genna','Gerion',
    'Gerold','Jaime','Janei','Jason','Joanna','Johanna','Kevan','Lancel',
    'Loren','Lyman','Martyn','Orson','Reginald','Sansa ','Stafford','Tion',
    'TommenII','Tygett','Tyland','Tyrek','Tyrion','Tysha','Tytos','Tywald',
    'Tywin','Willem','Alek','Zac','Alec','Laz','Alejandro','Ryan'
]



class War {
    vikingArmy = [];
    saxonArmy = [];
    addViking(i,vName,vHealth,vStrength,inputType) {
        if(inputType === 'Random'){
        let rHealth = Math.floor(Math.random() * 190) + 60;
        let rStrength = Math.floor(Math.random() * 145) + 5;
        let rName = vikingNames[Math.floor(Math.random() * 93)]
        let rNameID = `viking${i}`
        this.vikingArmy.push(new Viking(rName, rNameID, rHealth, rStrength));
        } else if (inputType === 'Form'){
        let vNameID = `viking${i}`
        this.vikingArmy.push(new Viking(vName, vNameID, vHealth, vStrength));
        }
    };
    addSaxon(i,vHealth,vStrength,inputType) {
        if(inputType === 'Random'){
        let rHealth = Math.floor(Math.random() * 80) + 200;
        let rStrength = Math.floor(Math.random() * 50) + 25;
        this.saxonArmy.push(new Saxon(`saxon${i}`, rHealth, rStrength))
        } else if (inputType === 'Form'){
        this.saxonArmy.push(new Saxon(`saxon${i}`, vHealth, vStrength))
        }
    };
    vikingAttack() {
    let randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    let randomSaxon = this.saxonArmy[randomSaxonIndex];
    let randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    let randomViking = this.vikingArmy[randomVikingIndex];
    let result = randomSaxon.receiveDamage(randomViking.strength);

    if(randomSaxon.health<=0){
    document.querySelector(`#${randomSaxon.name} .tImage`).src ='./img/deadnpc.png';
    document.querySelector(`#${randomSaxon.name} .npcHealth`).innerText = 'DEAD'
    document.querySelector(`#${randomSaxon.name} .npcStr`).innerText = 'DEAD'
    this.saxonArmy.splice(randomSaxonIndex, 1);
    return [randomViking.name, randomSaxon.name, result]
    } else {    
    document.querySelector(`#${randomSaxon.name} .npcHealth`).innerText = result
    return [randomViking.name, randomSaxon.name, result]
    }
    }

    saxonAttack() {
    let randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    let randomSaxon = this.saxonArmy[randomSaxonIndex];
    let randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    let randomViking = this.vikingArmy[randomVikingIndex];
    let result = randomViking.receiveDamage(randomSaxon.strength);
    if(randomViking.health<=0){
        document.querySelector(`#${randomViking.nameID} .tImage`).src ='./img/deadnpc.png';
        document.querySelector(`#${randomViking.nameID} .npcHealth`).innerText = 'DEAD'
        document.querySelector(`#${randomViking.nameID} .npcStr`).innerText = 'DEAD'
      this.vikingArmy.splice(randomVikingIndex, 1);
      return [randomSaxon.name, randomViking.name, result]
    } else {
        document.querySelector(`#${randomViking.nameID} .npcHealth`).innerText = result
    return [randomSaxon.name, randomViking.name, result]
    }
}
    showStatus() {
        if(this.saxonArmy.length === 0){
            return `Vikings have won the war of the century!`
        } else if(this.vikingArmy.length === 0) {
            return `Saxons have fought for their lives and survived another day...`
        } else if(this.saxonArmy.length === 1 && this.vikingArmy.length === 1){
            return `Vikings and Saxons are still in the thick of battle.`
        }
    }
}

let thisWar = new War;// must be declared outside of the functio for us to access it after the function has worked on it.
                      // if redeclared in the function it will always be an "empty war"; array length zero for both armies -Ry

function startWar (){ // adjusted function so that it has a name and can be called like above. We dont' have to do it like this but I 
                      // it might be help be eaiser to know what this fucntion does at a glance if we gave it a name. -Ry
  

    // let thisWar = new War;
    document.getElementById("warStartb").style.display = 'none'
    document.getElementById("formStart").style.display = 'none'
    document.getElementById("buttonViking").style.display = 'block'
    document.getElementById("buttonSaxon").style.display = 'block'
    document.querySelector(`.versus`).style.display = 'flex'
    document.querySelector(`#vikingArmy`).style.display = 'flex'
    document.querySelector(`#saxonArmy`).style.display = 'flex'
    document.getElementById("gameTitle").style.display = 'none'

  

    for (let i=1; i<=5; i++){
    /*Add 5 vikings*/
    let htmlString = `
    <div id="viking${i}" class="tStatus">
        <image class='tImage' src="./img/viking2.png"></image>
        <strong>Name:</strong><span class="npcName"></span>                  
        <strong>Health:</strong><span class="npcHealth"></span>
        <strong>Strength:</strong><span class="npcStr"></span>
    </div>`; 
    let newRow = document.createElement("div");
    newRow.classList.add("npc");
    newRow.innerHTML = htmlString;
    document.getElementById(`vikingArmy`).appendChild(newRow);

    htmlString = `
    <div id="saxon${i}" class="tStatus">
        <image class='tImage' src="./img/saxon.png"></image>
        <strong>Saxon ${i}</strong><span class="npcName"></span>  
        <strong>Health:</strong><span class="npcHealth"></span>
        <strong>Strength:</strong><span class="npcStr"></span>
    </div>`;
    newRow = document.createElement("div");
    newRow.classList.add("npc");
    newRow.innerHTML = htmlString;
    document.getElementById(`saxonArmy`).appendChild(newRow);
  

    thisWar.addViking(i,'','','','Random');

    
        document.querySelector(`#viking${i} .npcName`).innerText = thisWar.vikingArmy[i-1].name;
        document.querySelector(`#viking${i} .npcHealth`).innerText = thisWar.vikingArmy[i-1].health;
        document.querySelector(`#viking${i} .npcStr`).innerText = thisWar.vikingArmy[i-1].strength;
        
    thisWar.addSaxon(i,'','','Random');
        document.querySelector(`#saxon${i} .npcHealth`).innerText = thisWar.saxonArmy[i-1].health;
        document.querySelector(`#saxon${i} .npcStr`).innerText = thisWar.saxonArmy[i-1].strength


}
    console.log(thisWar)
    console.log(thisWar.vikingArmy)
    return thisWar;
    
    }

    function vikingAttackbtn(){
    let x = thisWar.vikingAttack();
    document.getElementById("buttonViking").style.display = 'none'
    document.getElementById("buttonSaxon").style.display = 'block'
    if(thisWar.saxonArmy.length === 0 || thisWar.vikingArmy.length === 0){
        alert(thisWar.showStatus())
        document.getElementById("buttonViking").style.display = 'none'
        document.getElementById("buttonSaxon").style.display = 'none'
    }
    }


    function saxonAttackbtn(){
        let x = thisWar.saxonAttack();
        document.getElementById("buttonViking").style.display = 'block'
        document.getElementById("buttonSaxon").style.display = 'none'   
        if(thisWar.saxonArmy.length === 0 || thisWar.vikingArmy.length === 0){
            alert(thisWar.showStatus())
            document.getElementById("buttonViking").style.display = 'none'
            document.getElementById("buttonSaxon").style.display = 'none'
        }
    }
 
function startForm(){

    document.getElementById("warStartb").style.display = 'none'
    document.getElementById("formStart").style.display = 'none'
    document.getElementById("warStartbf").style.display = 'block'
    document.querySelector(`#vikingArmy`).style.display = 'flex'
    document.querySelector(`#saxonArmy`).style.display = 'flex'

    for (let i=1; i<=5; i++){
        /*Add 5 vikings*/
        let htmlString = `
        <h2>Viking ${i}</h2>
        <div class="inputData">
            <label>Name</label>
            <input type="text" class="npcName" value="${i}">
        </div>
        <div class="inputData">
            <label>Health</label>
            <input type="text" class="npcHealth" value="100">
        </div>
        <div class="inputData">
            <label>Strenght</label>
            <input type="text" class="npcStr" value="100">
        </div>` 
        let newRow = document.createElement("div");
        newRow.setAttribute(`id`,`viking${i}`)
        newRow.classList.add("inputHead");
        newRow.innerHTML = htmlString;
        document.getElementById(`vikingArmy`).appendChild(newRow);
    
        htmlString = `
            <h2>Saxon ${i}</h2>
            <div class="inputData">
                <label>Name</label>
                <input type="text" class="npcName" value="Saxon ${i}" readonly>
            </div> 
            <div class="inputData">
                <label>Health</label>
                <input type="text" class="npcHealth" value="100">
            </div>
            <div class="inputData">
                <label>Strenght</label>
                <input type="text" class="npcStr" value="100">
            </div>`
        newRow = document.createElement("div");
        newRow.setAttribute(`id`,`saxon${i}`)
        newRow.classList.add("inputHead");
        newRow.innerHTML = htmlString;
        document.getElementById(`saxonArmy`).appendChild(newRow);

    }
}

function startWarForm(){
    document.getElementById("warStartb").style.display = 'none'
    document.getElementById("warStartbf").style.display = 'none'
    document.getElementById("formStart").style.display = 'none'
    document.getElementById("buttonViking").style.display = 'block'
    document.getElementById("buttonSaxon").style.display = 'block'
    document.querySelector(`.versus`).style.display = 'flex'
    document.querySelector(`#vikingArmy`).style.display = 'flex'
    document.querySelector(`#saxonArmy`).style.display = 'flex'
    document.getElementById("gameTitle").style.display = 'none'

    for (let i=1; i<=5; i++){

        let vName = document.querySelector(`#viking${i} .npcName`).value;
        let vHealth = document.querySelector(`#viking${i} .npcHealth`).value;
        let vStr = document.querySelector(`#viking${i} .npcStr`).value;
    
        thisWar.addViking(i,vName,vHealth,vStr,'Form');

        vHealth = document.querySelector(`#saxon${i} .npcHealth`).value;
        vStr = document.querySelector(`#saxon${i} .npcStr`).value;
        thisWar.addSaxon(i,vHealth,vStr,'Form');
    }

    document.getElementById(`vikingArmy`).innerHTML = "<h1>Viking Army</h1>"
    document.getElementById(`saxonArmy`).innerHTML = "<h1>Saxon Army</h1>"

    document

    for (let i=1; i<=5; i++){
    /*Add 5 vikings*/
    let htmlString = `
    <div id="viking${i}" class="tStatus">
        <image class='tImage' src="./img/viking2.png"></image>
        <strong>Name:</strong><span class="npcName"></span>                  
        <strong>Health:</strong><span class="npcHealth"></span>
        <strong>Strength:</strong><span class="npcStr"></span>
    </div>`; 
    let newRow = document.createElement("div");
    newRow.classList.add("npc");
    newRow.innerHTML = htmlString;
    document.getElementById(`vikingArmy`).appendChild(newRow);

    htmlString = `
    <div id="saxon${i}" class="tStatus">
        <image class='tImage' src="./img/saxon.png"></image>
        <strong>Saxon ${i}</strong><span class="npcName"></span>  
        <strong>Health:</strong><span class="npcHealth"></span>
        <strong>Strength:</strong><span class="npcStr"></span>
    </div>`;
    newRow = document.createElement("div");
    newRow.classList.add("npc");
    newRow.innerHTML = htmlString;
    document.getElementById(`saxonArmy`).appendChild(newRow);
      
        document.querySelector(`#viking${i} .npcName`).innerText = thisWar.vikingArmy[i-1].name;
        document.querySelector(`#viking${i} .npcHealth`).innerText = thisWar.vikingArmy[i-1].health;
        document.querySelector(`#viking${i} .npcStr`).innerText = thisWar.vikingArmy[i-1].strength;

        document.querySelector(`#saxon${i} .npcHealth`).innerText = thisWar.saxonArmy[i-1].health;
        document.querySelector(`#saxon${i} .npcStr`).innerText = thisWar.saxonArmy[i-1].strength


}

    console.log(thisWar)
    console.log(thisWar.vikingArmy)
    return thisWar;
    
    }