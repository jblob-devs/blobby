let mouseX;
let mouseY;
let letsave = false;
let questList = []


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
    sunPetals: "Sun petals",
    'blobBits.blobby': 'Blobby blob bits',
    'blobBits.slimeBlob': 'Slime blob bits'
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

        let curiosname;
        //initialize name
        if(curiosArr[i] == undefined){
            curiosname = "Empty"
        }else{
            curiosname = curiosArr[i].name
        }
        const gridItem = $(`<div>${curiosname}</div>`)
        .addClass('curios-grid-item')
        .attr('data-id',i)
        .attr('data-row', row)
        .attr('data-col', col);
       
  
        gridItem.on('click',function(){
            //console.log(gridItem.innerHTML)
            //curiosArr.indexOf(gridItem.innerHTML)
        })
       
        gridItem.droppable({
            accept: ".curios-item-draggable",
            hoverClass:'over',
            drop: function(event, ui){
                
                const dropped = ui.helper.html()
                console.log(dropped)
                let name = $(ui.helper).find('.curiosItemName').text()
                
                let equipped = false;
                for(let i =0; i < UnlockedCuriosList.length; i++){
                    if(UnlockedCuriosList[i].name == name){
                        if(curiosArr.findIndex(o => o.name ==  UnlockedCuriosList[i].name) == -1){
                            curiosArr[gridItem.data("id")] = UnlockedCuriosList[i]
                            equipped = true;
                        }
                    }
                }
                if(equipped){
                $(this).empty().html(name)
                }else{
                    Toast.fire({
                        text:'You already have this curios equipped!'
                    })
                }
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
            title: "Why don't you help Blobby out by tapping that warped enemy! Tapping takes goo, which regenerates slowly"
          });
          //rest to default time
          toastTimer = 3000
      })
  }

function welcome(){
    loadGame()
    if(gameData.beatFirst5Rounds){
        loadGame()
        createCuriosGrid()
        applyCuriosConfig(curiosArr)
        battleActive = false;
        $("#battleDiv").hide();
        $("#idleScreen").show()
    }else{
        startTutorial()
        createCuriosGrid()
    }
 
}

  function welcome2(){
    if(!beatFirst5Rounds){
    Toast.fire({
        icon: "info",
        title: "Phew! Blobby will continue to attack enemies, but keep it safe by helping it out!"
      })
    }
  }

function tapEnemy(){
    if(blobby.gooGauge > 0 ){
        blobby.gooGauge--
        let dmgDone  =calcPlayerTapDamage()
        randEnemy.curhealth-= dmgDone
        generateDamageNumbers(dmgDone)
    }else{
        Toast.fire({text:'Not enough goo!'})
    }
    
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
    if(rand <= player.critChance){
        dmg =  Math.ceil(player.damage * player.critMultiplier);
    }else{
        dmg = player.damage
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
        round = round - (round % 10) + 1
        createNewRound()

        }else{
            let msg = createRandomDeathMessage()
            Toast.fire({
                icon: "info",
                title: "-You died-",
                text: msg
              });
              if(curQuest){
                exitBattleFail()
              }else{
        round = round - (round % 10) + 1
        createNewRound()
              }
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

    if(beatFirst5Rounds == false && round == 5){
        beatFirst5Rounds = true;
        locationStats["SunPlains"].cleared = true
        battleActive = false
        currentObjective = ""
        $("#battleDiv").hide();
        $("#idleScreen").show()
        round = 1
        Swal.fire({
            title:'You explored the Sun Plains!',
            text:"You can start a new adventure using the tab on the left!"
        }).then((result) =>{
            Swal.fire({
                title:"Quests Available...",
                text:"You can also launch progression quests from the adventure tab!"
            })
            questsArr.push("UnlockCurios")
            questsArr.push("UnlockBlobs")
        })
    }

if(curQuest == null){
    if(round % 5 == 0){
        createNewBossEnemy()
    }else{
        if(beatFirst5Rounds == false){
            createNewEnemy(Enemy("Warped",2))
        }else{
        createNewEnemy(
            Enemy("Warped",Math.ceil(round * 0.5))
            )
    }
    }
}else{
    createNewEnemy(curQuest.enemy)
    if(!curQuest.completed){
        console.log("e")
        if(!curQuest.waveDead()){
            createNewEnemy(curQuest.enemy)
        }
        
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

function exitBattle(optionalTitle, optionalText,quest){
    battleActive = false
    $("#battleDiv").hide();
    $("#idleScreen").show()
    Swal.fire({title:`${optionalTitle}`, text:`${optionalText}`,allowOutsideClick: false})
    .then((result) =>{
        quest.grantRewards()
    })
    currentObjective = ""
    round = 1
}

function exitBattleFail(){
    battleActive = false
    $("#battleDiv").hide();
    $("#idleScreen").show()
    Swal.fire({title:`Mission Failed`, text:`Maybe get better at the game...`,allowOutsideClick: false})
    currentObjective = ""
    curQuest = null;
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

