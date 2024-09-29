$("#enemyDisplay").on("click",function(){
    tapEnemy()
})


const updateLoop = setInterval(function(){
//update gold
$("#coinAMOUNT").html("Gold: " + gold)
$("#roundNumber").html("Round: " + round)

},100)


const basicBlobAttackLoop = setInterval(function(){
    $("#basicBlobDisplay").attr('src', 'images/basicBlobAttack.png')
    basicBlobAttack()
    setTimeout(function(){
        $("#basicBlobDisplay").attr('src', 'images/basicBlob.png')
    },blobby.atkspeed)
},500+blobby.atkspeed)

const enemyAttackLoop = setInterval(function(){
    enemyAttack()
},randEnemy.atkspeed)


const updateEnemyHealth = setInterval(function(){
    var healthbar = document.getElementById("enemyHealthbar")
    var healthbarText = document.getElementById("enemyHealthText")
    let percentage = (randEnemy.curhealth/randEnemy.health)* 100
    healthbar.style.width = percentage + '%'
    healthbarText.textContent = randEnemy.curhealth + " / " + randEnemy.health
    checkEnemyDeath()
},100)


const updateBlobHealth = setInterval(function(){
    var blobhealthbar = document.getElementById("blobHealthbar")
    var blobhealthbarText = document.getElementById("blobHealthText")
    let percentage = (blobby.curhealth/blobby.health)* 100
    blobhealthbar.style.width = percentage + '%'
    blobhealthbarText.textContent = blobby.curhealth + " / " + blobby.health
    checkPlayerDeath()
},100)


$("#shopDiv").hide()

$("#toShop").on("click", function(){
    $("#playscreen").slideUp()
    $("#shopDiv").slideDown()
})

$("#openSideBarButton").on("click",function(){
    $("#blobSideBar").css('width','30vw')
    $('#playscreen').css('margin-left', '250px');
})

$("#closeSideBarButton").on("click",function(){
    $("#blobSideBar").css('width','0')
    $('#playscreen').css('margin-left', '0');
})