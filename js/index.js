let mouseX;
let mouseY
var jelly = 0;
var round = 1;
var roundMAX = 10;
var firstDeath = true;
var battleActive = true;
var currentObjective = "Clear Round 10"
var beatFirst10Rounds  = false;
var questActive = false;
var randEnemy = new enemyCreation(
    "warped",
    3,
    false,
    3000
)
var frayedTreasureBag = 0;
var patchedTreasureBag = 0;
var robustTreasureBag = 0;
var battleLocation  = "Sun Plains";

let playerTap = {
    damage: 1,
    damageType: 'physical',
    critChance: 10,
    critMultiplier: 1.2
}

const displayNames ={
    jelly: "Jelly",
    salvageShards: "Salvage Shards",
    frayedTreasureBag: "Frayed Treasure Bag",
    patchedTreasureBag: "Patched Treasure Bag",
    robustTreasureBag: "Robust Treasure Bag",
    unidentifiedEssence: "Unidentified Essence",
    blobby: "Blobby",
    slimeBlob: "Slime Blob",
    "SunPlains": "Sun Plains",
    "SlimyWood": "Slimy Woods",
    sunpetals: "Sun petals"
}

let blobBits = {
    blobby: 0,
    slimeBlob: 0
}

let materials = {
    unidentifiedEssence:0,
    salvageShards:0,
    sunPetals: 0
}

let locationStats = { 
    "SunPlains": {unlocked:true, cleared: false},
    "SlimyWoods": {unlocked:false, cleared: false}
}


let UnlockedCuriosList = [curios.smoothStone]
let curiosArr = []


//create sweetalert toast
var toastTimer  = 3000
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: toastTimer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  function welcome(){
   
    $("#enemyStatsDisplay").html("Tutorial Enemy")
    
    randEnemy = tutorialEnemy
    Toast.fire({
        icon: "info",
        timer: toastTimer,
        title: "Hey there!"
      }).then((result) => {
        //adjust the time for a lengther text
        toastTimer = 4000
        Toast.fire({
            icon: "info",
            timer: toastTimer,
            title: "Why don't you help Blobby out by tapping that warped enemy!"
          });
          //rest to default time
          toastTimer = 3000
      })
      
  }

  function welcome2(){
    Toast.fire({
        icon: "info",
        title: "Phew! Blobby will continue to attack enemies, but keep it safe by helping it out!"
      })
  }

function tapEnemy(){
    let dmgDone  =calcPlayerTapDamage()
    randEnemy.curhealth-= dmgDone
    generateDamageNumbers(dmgDone)
    
}

function generateDamageNumbers(damage){
    let enemyBounding = document.getElementById("enemyDisplayDiv")
    const rect = enemyBounding.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;

    let dmgNum = document.createElement("div")
    dmgNum.classList.add("damage-number")
    dmgNum.textContent = damage
    let randx = randNum(1,50)
    let randy = randNum(-25,25)
    dmgNum.style.left = `${x-randy}px`;
    dmgNum.style.top = `${y-randx}px`;
    enemyBounding.appendChild(dmgNum)
    setTimeout(() => {
        dmgNum.remove();
      }, 1000);
}

function calcPlayerTapDamage(){
    let rand  = randNum(1,100)
    let dmg;
    if(rand <= playerTap.critChance){
        dmg =  Math.ceil(playerTap.damage * playerTap.critMultiplier);
    }else{
        dmg = playerTap.damage
    }
    return dmg
}
function basicBlobAttack(){
    //set image
    var image = document.getElementById("enemyDisplay")
    image.classList.add('active');
    setTimeout(() => {
        image.classList.remove('active');
      }, blobby.atkspeed);

      //math stuff
      randEnemy.curhealth -= blobby.damage

}
function enemyAttack(){
    blobby.curhealth -= randEnemy.damage
}

function checkEnemyDeath(){
    if(randEnemy.curhealth <= 0){
        createReward()
        round++
        createNewRound()
    }
}

function checkPlayerDeath(){
    if(blobby.curhealth <= 0){
        if(firstDeath){
            toastTimer =10000
            Toast.fire({
                icon: "info",
                timer: toastTimer,
                title: "Oh no! Blobby died! Don't worry, you'll just be returned to the start of each round interval!"
              });
               firstDeath = false;
        round = round - (round % 10)
        createNewRound()
        }else{
            let msg = createRandomDeathMessage()
            Toast.fire({
                icon: "info",
                title: "-You died-",
                text: msg
              });
        round = round - (round % 10)
        createNewRound()
    }
    blobby.curhealth = blobby.health
}

    
}

function createRandomDeathMessage(){
    let msg = ""
    let rand = randNum(1,3)
    if(rand == 1){
        msg = "Blobby decided to give up :("
    }else if(rand == 2){
        msg = "Blobby got beat up"
    }else{
        msg = "Blobby got caught lacking"
    }
    return msg;
}
function createNewRound(){
    if(round == roundMAX){
        if(beatFirst10Rounds == false){
            Swal.fire({title:'You explored the Sun Plains!',text:"You can start a new adventure using the tab on the left!"})
            beatFirst10Rounds = true;
            locationStats["SunPlains"].cleared = true
        }else{
            Swal.fire({title:'Location Exploration Complete!'})
        }
        battleActive = false;
        exitBattle()
    }else if(!questActive){
    if(round % 5 == 0){
        createNewBossEnemy()
    }else{
        createNewEnemy(new enemyCreation(
            "Warped",
            1,
            false,
            5000
        ))
    } 
}else{

}
}

function exitBattle(){
    $("#battleDiv").hide();
    $("#idleScreen").show()
    round = 0;
    currentObjective = ""
    calculateEndAdventureRewards(battleLocation,round)
}

function createNewEnemy(enemy){
    $("#enemyDisplay").attr('src','images/warped.png')
    if(!tutorialEnemy.beat){
        randEnemy = tutorialEnemy
    }else{
        randEnemy = enemy
        randEnemy.health = randEnemy.health;
        randEnemy.curhealth = randEnemy.health;
    }
    $("#enemyStatsDisplay").html(randEnemy.name + " Lv." + randEnemy.level)
    
}

function createReward(){
    jelly+=10
    if(randEnemy.boss){
        randomBossReward = createRandomBossReward()
        Toast.fire({
            icon:"info",
            title: `Round ${round} Boss beat!`,
            text: "You got a " + randomBossReward+"! "
        })
    }else if(!tutorialEnemy.beat){
        tutorialEnemy.beat = true
        welcome2()
    }
}

function createNewBossEnemy(){
    $("#enemyDisplay").attr('src','images/corrupted.png')
    randEnemy = new enemyCreation(
        "Corrupted",
        5,
        true,
        3000
    )
}

function createRandomBossReward(){
        
    if(randEnemy.level <= 5){
        let rand = randNum(1, 4)
        if(rand == 1){
            patchedTreasureBag++
            return "Patched Treasure Sack"
        }else{
            frayedTreasureBag++
             return "Frayed Treasure Sack"
        }
    }
    
}
welcome()
createCuriosGrid()