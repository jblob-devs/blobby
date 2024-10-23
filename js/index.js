let mouseX;
let mouseY;
let letsave = false;

randEnemy = new enemyCreation(
    "warped",
    3,
    false,
    3000
)


const displayNames ={
    jelly: "Jelly",
    'materials.salvageShards': "Salvage Shards",
    frayedTreasureBag: "Frayed Treasure Bag",
    patchedTreasureBag: "Patched Treasure Bag",
    robustTreasureBag: "Robust Treasure Bag",
    'materials.unidentifiedEssence': "Unidentified Essence",
    blobby: "Blobby",
    slimeBlob: "Slime Blob",
    "SunPlains": "Sun Plains",
    "SlimyWood": "Slimy Woods",
    sunPetals: "Sun petals"
}

let  = randEnemy = new enemyCreation(
    "warped",
    3,
    false,
    3000
)



function createCuriosGrid(){
    let grid = $("#curios-grid-container")
    grid.css({
    'gridTemplateColumns': `repeat(${curiosGrid.columns},100px)`,
    'gridTemplateRows': `repeat(${curiosGrid.rows},100px)`
    })
    

    let totcelnum = curiosGrid.columns * curiosGrid.rows

    grid.empty()
    let gridState = Array(totcelnum).fill(null)
    
    for(let i =0; i < totcelnum;i++){
        let row = Math.floor(i / curiosGrid.columns) + 1;
        let col = (i % curiosGrid.columns) + 1;
        const gridItem = $(`<div>${curiosArr[i].name}</div>`)
        .addClass('curios-grid-item')
        .attr('data-id',i+1)
        .attr('data-row', row)
        .attr('data-col', col);
       
  
        gridItem.on('click',function(){
            
        })
       
        gridItem.droppable({
            accept: ".curios-item-draggable",
            hoverClass:'over',
            drop: function(event, ui){
                
                const dropped = ui.helper.html()
                console.log(dropped)
                let name = $(ui.helper).find('.curiosItemName').text()
                
                for(let i =0; i < UnlockedCuriosList.length; i++){
                    if(UnlockedCuriosList[i].name == name){
                        curiosArr[gridItem.data("id")] = UnlockedCuriosList[i]
                    }
                }
                
                $(this).empty().html(name);
            }
        })
        grid.append(gridItem)


        //populate curios array with no item
    
        
    }
}

function getItemOn(cur, side){
    let pos = curiosArr.indexOf(cur)

    let curRows = Math.floor(pos / curiosGrid.columns) + 1
    let curCols = (pos % curiosGrid.columns) + 1

    let item;
    if(curRows++ > curiosGrid.rows || curRows-- > curiosGrid.rows || curCols-- < 0 || curCols++ > curiosGrid.columns){
        return null
    }
    if(side == 'down'){
        item = $(`.curios-grid-item[data-row='${curRows + 1}'][data-col='${curCols}']`);
    }else if(side == 'up'){
        item = $(`.curios-grid-item[data-row='${curRows - 1}'][data-col='${curCols}']`);
    }else if(side == 'right'){
        item = $(`.curios-grid-item[data-row='${curRows}'][data-col='${curCols+1}']`);
    }else if(side == 'left'){
        item = $(`.curios-grid-item[data-row='${curRows}'][data-col='${curCols-1}']`);
    }
    return item
}

function loadLocation(name){
battleLocation = name
$("#toAdventureSelectScreen").hide()
$("#AdventureSelectScreen").hide()
$("#battleDiv").show();
if(name == "Sun Plains"){
    battleLocation = "Sun Plains"
    preBattlePrep()
    createNewRound()
    currentObjective = "Explore and clear rounds for rewards! <br> Extraction is unlocked after round 5!"
}else if(name == "Slimy Woods"){

}
battleActive = true;
}

function preBattlePrep(){
    round = 1
    blobby.curhealth = blobby.health
}
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

  function startTutorial(){
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

function welcome(){
    let save = localStorage.getItem('gameSave') ? JSON.parse(localStorage.getItem('gameSave')): null
    if(save.beatFirst10Rounds == false){
        startTutorial()
        createCuriosGrid()
    }else{
        loadGame()
        createCuriosGrid()
        applyCuriosConfig(curiosArr)
        battleActive = false;
        $("#battleDiv").hide();
        $("#idleScreen").show()
    }
    letsave=  true;
    
}

  function welcome2(){
    if(!beatFirst10Rounds){
    Toast.fire({
        icon: "info",
        title: "Phew! Blobby will continue to attack enemies, but keep it safe by helping it out!"
      })
    }
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
    if(!tutorialEnemyBeat){
      tutorialEnemyBeat = true;  
    }
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

    if(beatFirst10Rounds == false && round == 10){
        beatFirst10Rounds = true;
        locationStats["SunPlains"].cleared = true
        battleActive = false
        currentObjective = ""
        $("#battleDiv").hide();
        $("#idleScreen").show()
        round = 1
        Swal.fire({title:'You explored the Sun Plains!',text:"You can start a new adventure using the tab on the left!"})
    }

if(!questActive){
    if(round % 5 == 0){
        createNewBossEnemy()
    }else{
        createNewEnemy(new enemyCreation(
            "Warped",
            Math.ceil(round * 0.5),
            false,
            5000
        ))
    }
}
}

function exitAdventureBattle(){
    battleActive = false
    $("#battleDiv").hide();
    $("#idleScreen").show()
    Swal.fire({title:'Location Exploration Complete!'})
    currentObjective = ""
    calculateEndAdventureRewards(battleLocation,round)
    round = 1
}

function createNewEnemy(enemy){
    $("#enemyDisplay").attr('src','images/warped.png')
    if(!tutorialEnemyBeat){
        randEnemy = tutorialEnemy
    }else{
        randEnemy = enemy
        randEnemy.health = randEnemy.health;
        randEnemy.curhealth = randEnemy.health;
    }
    $("#enemyStatsDisplay").html(enemy.name + " Lv." + enemy.level)
    
}

function createReward(){
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
//in a document.ready so the function only runs once all elements are loaded
$( document ).ready(function() {
    welcome()
});

