
const updateLoop = setInterval(function(){
    //update jelly
    $("#coinAMOUNT").html("Jelly: " + jelly)
    $("#roundNumber").html("Round: " + round)
    
    },100)
    
    
    const basicBlobAttackLoop = setInterval(function(){
        $("#basicBlobDisplay").attr('src', 'images/blobbyAttack.png')
        basicBlobAttack()
        setTimeout(function(){
            $("#basicBlobDisplay").attr('src', 'images/blobby.png')
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
    
    const updateInventory = setInterval(function(){
    $("#frayedTreasureBagCount").html("Frayed Treasure Bags: " + frayedTreasureBag)
    $("#patchedTreasureBagCount").html("Patched Treasure Bags: " + patchedTreasureBag)

    $("#salvageShardsAmount").html("Salvage Shards: " + salvageShards)
    $("#unidentifiedEssenceAmount").html("Unidentified Essence: " + unidentifiedEssence)
    

    //blob bits
    
    for (let i = 0; i < Object.keys(blobBits).length; i++){
       
        let div = $("#blobbitsDiv")
        let name = Object.entries(blobBits)[i][0]
        let blobDiv;
        if(Object.entries(blobBits)[i][1] > 1){
        if(!document.getElementById(`${name}bitsdiv`)){
            blobDiv = $(`<div class="blobbitscharacterdiv" id="${name}bitsdiv"><img height = "50vh" src = "images/${name}.png" /><p>${displayNames[name]}</p><p id="${name}bitsamount"></p></div>`)
            div.append(blobDiv)
        }
        $(`#${name}bitsamount`).html("Bits: " + Object.entries(blobBits)[i][1])
    
    }
    }

    },100)
    
    const updateBlobbyDiv = setInterval(function(){
        $("#blobbyHPp").html("health: " + blobby.health)
        $("#blobbyDMGp").html("damage: " + blobby.damage)
        $("#blobbyATKSPDp").html("attack speed: " + blobby.atkspeed)
    
        //update curios grid
        
        
    },100)
    
    const updateShop = setInterval(function(){
    $("#rotatingEssenceOffers")
    },100)
    