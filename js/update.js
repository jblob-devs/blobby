

const gameSaveUpdate = setInterval(function(){
    if(letsave){
    mapGameDataToGlobals()
    saveGame()
    }
},100)

const statsUpdateLoop = setInterval(function(){
    //update jelly
    $("#coinAMOUNT").html("Jelly: " + jelly)
    $("#roundNumber").html("Round: " + round)
    $("#location").html(battleLocation)

    if(questsArr.length > 0){
        $("#questMissionAvailable").show()
    }else{
        $("#questMissionAvailable").hide()
    }
    
},100)
    const battleLoop = setInterval(function(){
        if(battleActive && beatFirst10Rounds){
            if(round > 5){
                $("#extractFromAdventureButton").show()
            }else{
                $("#extractFromAdventureButton").hide()
            }
            
        }else{
            $("#extractFromAdventureButton").hide()
        }
    })
    
    const basicBlobAttackLoop = setInterval(function(){
        if(battleActive){
        $("#basicBlobDisplay").attr('src', 'images/blobbyAttack.png')
        basicBlobAttack()
        setTimeout(function(){
            $("#basicBlobDisplay").attr('src', 'images/blobby.png')
        },blobby.atkspeed)
    }else{
        $("#basicBlobDisplay").attr('src', 'images/blobby.png')
    }
    },500+blobby.atkspeed)
    
    const enemyAttackLoop = setInterval(function(){
        if(battleActive){
        enemyAttack()
        }
    },randEnemy.atkspeed)
    
    
    const updateEnemyHealth = setInterval(function(){
        if(battleActive){
        var healthbar = document.getElementById("enemyHealthbar")
        var healthbarText = document.getElementById("enemyHealthText")
        let percentage = (randEnemy.curhealth/randEnemy.health)* 100
        healthbar.style.width = percentage + '%'
        healthbarText.textContent = randEnemy.curhealth + " / " + randEnemy.health
        checkEnemyDeath()
        }
    },100)
    
    
    const updateBlobHealth = setInterval(function(){
        if(battleActive){
        var blobhealthbar = document.getElementById("blobHealthbar")
        var blobhealthbarText = document.getElementById("blobHealthText")
        let percentage = (blobby.curhealth/blobby.health)* 100
        blobhealthbar.style.width = percentage + '%'
        blobhealthbarText.textContent = blobby.curhealth + " / " + blobby.health
        checkPlayerDeath()
        }else{
            
        }
    },100)

    const updateObjective = setInterval(function(){
    if(battleActive){
        $("#currentObjective").show()
        if(currentObjective == ""){
            $("#currentObjective").html(" ")
        }else{
        $("#currentObjective").html("Current Objective: " + currentObjective)
        }
    }else{
        $("#currentObjective").hide()
    }
    })

    const updateInventory = setInterval(function(){
    $("#frayedTreasureBagCount").html("Frayed Treasure Bags: " + frayedTreasureBag)
    $("#patchedTreasureBagCount").html("Patched Treasure Bags: " + patchedTreasureBag)

    //abstraction for inventory blob bits amount
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

    //abstraction of inventory resources
    for(let i = 0; i < Object.keys(materials).length; i++){
        let div;
        let parent = $("#resourcesDiv")
        let name = Object.entries(materials)[i][0]
        let amount = Object.entries(materials)[i][1]
        if(amount > 0){
            if(!document.getElementById(`${name}AmountDiv`)){
                div = $(`<div class="resourceCounterDiv" id="${name}AmountDiv"><p id='${name}AmountP'>${displayNames[name]}</p><button onclick="whatIsThis('${name}')">?</button></div>`)
                parent.append(div)
            }else{
                $(`#${name}AmountP`).html(`${displayNames[name]}: ${amount}`)
            }
        }
    }

    },100)
    const updateAdventure = setInterval(function(){
        for(let i = 0; i < Object.keys(locationStats).length; i++){
            let div;
            let parent = $("#locationAdventureSelect")
            let name = Object.entries(locationStats)[i][0]
            let unlocked = Object.entries(locationStats)[i][1].unlocked
            if(unlocked){
                if(!document.getElementById(`to${name}Div`)){
                    div = $(`<div class="toLocationDiv" id="to${name}Div"><p>${displayNames[name]}</p><button onclick="loadLocation('${displayNames[name]}')">Enter</button></div>`)
                    parent.append(div)
                }
            }
        }


        //update quests
       
        for(let i = 0; i < questsArr.length; i++){
            let div;
            let parent = $("#questMissionSelect")
            parent.innerHTML = ''
            let name = questsArr[i].name
            let nospacename = questsArr[i].name.replace(/\s+/g,"")
                if($(`#AVAILABLEQUEST${nospacename}Div`).length == 0 && !questsArr[i].completed){
                    div = $(`<div class="questBlockDiv" id="AVAILABLEQUEST${nospacename}Div"><p>${questsArr[i].name}</p><p><i>${questsArr[i].description}<i></p><button id= "${nospacename}launchMission">Launch</button></div>`)
                    div.find(`#${nospacename}launchMission`).click((function (quest) {
                        return function () {
                           quest.launchMission();
                        };
                    })(questsArr[i]));
                    parent.append(div)
                }
             
        }



        //update skirmishes 

        
    },100)

    
    const updateBlobbyDiv = setInterval(function(){
        $("#blobbyHPp").html("health: " + blobby.health)
        $("#blobbyDMGp").html("damage: " + blobby.damage)
        $("#blobbyATKSPDp").html("attack speed: " + blobby.atkspeed)
    
        //update curios grid
        
        
    },100)
    /*
    const updateShop = setInterval(function(){
    $("#rotatingEssenceOffers")
    },100)
    */