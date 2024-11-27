
const gameSaveUpdate = setInterval(function(){
    mapGameDataToGlobals()
    saveGame()
},100)  

const tutorialLoop = setInterval(function(){
    if(beatFirst5Rounds == false){
        $("#NavSideBar").hide();
    }
},1000)
const statsUpdateLoop = setInterval(function(){
    // Update coin amount (always visible)
    $("#coinAMOUNT").html("Jelly: " + jelly);

    if (battleActive) {
        // Update and show stats during battle
        $("#roundNumber").html("Round: " + round);
        $("#location").html("Location: " + battleLocation);
        $("#stats").removeClass("hidden");
    } else {
        // Hide stats when not in battle
        $("#stats").addClass("hidden");
    }

    // Show or hide quest mission availability
    if (questsArr.length > 0) {
        $("#questMissionAvailable").show();
    } else {
        $("#questMissionAvailable").hide();
    }
}, 100);


    const battleLoop = setInterval(function(){
        if(battleActive){
            //extract button
            if(beatFirst5Rounds && curQuest == null){
                if(round > 5){
                    $("#extractFromAdventureButton").show()
                }else{
                    $("#extractFromAdventureButton").hide()
                }
                
            }else{
                $("#extractFromAdventureButton").hide()
            }
        }else{
            $("#extractFromAdventureButton").hide()
        }
    },100)

    const gooGaugeRegen = setInterval(function(){
        if(blobby.gooGauge < blobby.gooGaugeMax){
            blobby.gooGauge += blobby.gooRegenPerRate
        }
    },blobby.gooRegenRate)
    
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

    const updateGooGauge = setInterval(function(){
        if(battleActive){
            var googaugebar = document.getElementById("googaugebar")
            var googaugetext = document.getElementById("googaugetext")
            let percentage = (blobby.gooGauge/blobby.gooGaugeMax)*100
            googaugebar.style.width = percentage + '%'
            googaugetext.textContent = blobby.gooGauge + " goo";
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
    },1000)

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
                let display = displayNames["materials." + name.toString()]
                $(`#${name}AmountP`).html(`${display}: ${amount}`)
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
            let name = questsArr[i]
            let nospacename = name.replace(/\s+/g,"")
                if($(`#AVAILABLEQUEST${nospacename}Div`).length == 0 && !questsArr[i].completed){
                    div = $(`<div class="questBlockDiv" id="AVAILABLEQUEST${nospacename}Div"><p>${quest[questsArr[i]].name}</p><p><i>${quest[questsArr[i]].description}<i></p><button id= "${nospacename}launchMission">Launch</button></div>`)
                    div.find(`#${nospacename}launchMission`).click((function (questname) {
                        return function () {
                           quest[questname].launchMission();
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
    
      $("#gooGaugeMaxDisplay").html('Goo Gauge Max: ' + blobby.gooGaugeMax)
      $("#gooGaugeRegenDisplay").html('Regens ' + blobby.gooRegenPerRate + " goo per " + (blobby.gooRegenRate / 1000) + "s ")
        
        
    },100)

    //in seconds 
    
    const updateBazaar = setInterval(function(){
        if(refreshtimer == 0){
            polyhedronOfferName = rotatePolyhedronOffer()
            refreshtimer = 10;
        }
    $("#rotationPolyhedronSlot").html(`<p>${polyhedronOfferName}</p><p><i>Refreshes in: ${refreshtimer}</i></p>`)
    refreshtimer--
    },1000)


function rotatePolyhedronOffer(){
    let rand = randNum(1,3)
    let name  = ""
    if(rand == 1){
        name = "plain polyhedron"
    }else if(rand == 2){
        name = "rounded polyhedron"
    }else if(rand == 3){
        name = "fermented polyhedron"
    }

    return name
}
    
let gatewayData = {
    'salvage': {
        title: 'Salvage',
        description: 'Activate a random gateway potentially containing rare curios.',
        rewards:[new reward('materials.salvageShards',3), new reward(curios.mossyStone,1),new reward(curios.heavyStone,1),new reward(curios.fluxFlower,1)],
        probabilities:[70,10,10,10],
        cost: {item: 'jelly', amount: 50}
    }
}


const updateGateways = setInterval(function(){
    $("#openGatewaysList").html("")
    for(let i = 0; i < openGatewayArray.length;i++){
        let gatedetails = gatewayData[openGatewayArray[i]] 
        $("#openGatewaysList").append(`<button class='opengatewaybuttons' id='navigate${openGatewayArray[i]}gateway'>${gatedetails.title}</button>`)
        $(`#navigate${openGatewayArray[i]}gateway`).css('top', (i+1) *5 + 'vh')
    $(`#navigate${openGatewayArray[i]}gateway`).on('click',function(){
            $("#gatewayInfoDiv").html(`<h2>${gatedetails.title}</h2><br><p><i>${gatedetails.description}</i></p><br><button id="use${openGatewayArray[i]}gateway">${gatedetails.cost.amount} ${gatedetails.cost.item}</button>`)
    })
    $(`#use${openGatewayArray[i]}gateway`).on('click',function(){
        if(eval(gatedetails.cost.item) >= gatedetails.cost.amount){
            eval(gatedetails.cost.item -= gatedetails.cost.amount) 
            let randnum = randNum(1,100)
            let recur = gatedetails.probabilities[0]
            let rewardgranted;
            for(let i = 0; i < gatedetails.probabilities.length; i++){
                if(randnum <= recur){
                    rewardgranted = gatedetails.rewards[i]
                }else{
                    recur += gatedetails.probabilities[i+1]
                }
            }
            addReward(rewardgranted.name, rewardgranted.amount, true)
        }
    })
}
},1000)