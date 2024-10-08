var jelly = 0;
var round = 1;
var firstDeath = true;
var randEnemy = new enemyCreation(
    "poo",
    3,
    false,
    3000
)
var unidentifiedEssence = 0;
eval("jelly")

var redSalvage = 0;
var greenSalvage = 0;
var blueSalvage = 0;

var frayedTreasureBag = 0;
var patchedTreasureBag = 0;
var robustTreasureBag = 0;

const displayNames ={
    jelly: "Jelly",
    redSalvage: "Red Salvage",
    greenSalvage: "Blue Salvage",
    blueSalvage: "Green Salvage",
    frayedTreasureBag: "Frayed Treasure Bag",
    patchedTreasureBag: "Patched Treasure Bag",
    robustTreasureBag: "Robust Treasure Bag",
    unidentifiedEssence: "Unidentified Essence",
}


let placeHolderCuriosItem = new curiosItem(
    'Placeholder', 
    'sigma', 
    {
        baseDMGBuff: 2,
        healthPercentageBuff: 10
    }
)


let curiosArr = [placeHolderCuriosItem]


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
        toastTimer = 5000
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
    toastTimer = 10000
    Toast.fire({
        icon: "info",
        timer: toastTimer,
        title: "Phew! Blobby will continue to attack enemies, but keep it safe by helping it out!"
      }).then((result)=>{
        //if toast timer isnt set as the timer, itll be a default of 3000
        Toast.fire({
            icon: "info",
            title: "Maybe you can look around for upgrades and items to help..."
          });
      })
  }

function tapEnemy(){
    randEnemy.curhealth--
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
    if(round % 5 == 0){
        createNewBossEnemy()
    }else{
        createNewEnemy()
    } 
    blobby.curhealth = blobby.health
}

function createNewEnemy(){
    $("#enemyDisplay").attr('src','images/warped.png')
    if(!tutorialEnemy.beat){
        randEnemy = tutorialEnemy
    }else{
        randEnemy = new enemyCreation(
            "Warped",
            3,
            false,
            3000
        )
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