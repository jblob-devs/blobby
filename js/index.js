var gold = 0;
var round = 1;
var randEnemy = new enemyCreation(
    "poo",
    false,
    Math.floor( Math.random()*50 + 30),
    Math.floor( Math.random()*5 + 2),
    1000
)



function tapEnemy(){
    randEnemy.curhealth--
}

function basicBlobAttack(){
    //set image
    var image = document.getElementById("enemyDisplay")
    image.classList.add('active');
    setTimeout(() => {
        image.classList.remove('active');
      }, basicBlob.atkspeed);

      //math stuff
      randEnemy.curhealth -= basicBlob.damage

}
function enemyAttack(){
    basicBlob.curhealth -= randEnemy.damage
}

function checkEnemyDeath(){
    if(randEnemy.curhealth <= 0){
        createReward()
        round++
        createNewRound()
    }
}

function checkPlayerDeath(){
    if(basicBlob.curhealth <= 0){
        alert("You died!")
        round = round - (round % 10)
        createNewRound()
    }
}

function createNewRound(){
    if(round % 5 == 0){
        createNewBossEnemy()
    }else{
        createNewEnemy()
    } 
    basicBlob.curhealth = basicBlob.health
}

function createNewEnemy(){
    $("#enemyDisplay").attr('src','images/warped.png')
    randEnemy = new enemyCreation(
        "poo",
        false,
        Math.floor( Math.random()*50 + 30),
        Math.floor( Math.random()*5 + 2),
        1000
    )
}

function createReward(){
    gold+=10
}

function createNewBossEnemy(){
    $("#enemyDisplay").attr('src','images/corrupted.png')
}