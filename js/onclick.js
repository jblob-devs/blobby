function logMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
  
  document.addEventListener("click", function(event) {
    logMousePosition(event);
  });



$("#enemyDisplay").on("click",function(){
    tapEnemy()
})


const updateLoop = setInterval(function(){
//update jelly
$("#coinAMOUNT").html("Jelly: " + jelly)
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

const updateInventory = setInterval(function(){
$("#frayedTreasureBagCount").html("Frayed Treasure Bags: " + frayedTreasureBag)
$("#patchedTreasureBagCount").html("Patched Treasure Bags: " + patchedTreasureBag)
},100)

const updateBlobbyDiv = setInterval(function(){
    $("#blobbyHPp").html("health: " + blobby.health)
    $("#blobbyDMGp").html("damage: " + blobby.damage)
    $("#blobbyATKSPDp").html("attack speed: " + blobby.atkspeed)

    //update curios grid
    
    
},100)


function firstTimeCurios(){
    Swal.fire({
        icon: "info",
        title: "Curios",
        text:"Curios are items that buff and provide special abilites to Blobby and it's team. Curios often interact with each other to become extra-powerful!"
      }).then((result) => {
        $("#firstTimeCuriosInfo").hide()
        $("#editCuriosConfigBtn").show()
      });
}

$("#shopDiv").hide()
$("#blobbyCharacterScreen").hide()
$("#inventoryDiv").hide()
$("#resourcesDiv").hide()
$("#openablesDiv").hide()
$("#editCuriosConfigBtn").hide()
$("#augmentsDiv").hide()


$("#toShop").on("click", function(){
    $("#playscreen").slideUp()
    $("#shopDiv").slideDown()
})


//Side Bar
$("#openSideBarButton").on("click",function(){
    $("#blobSideBar").css('width','30vw')
    $('#playscreen').css('margin-left', '250px');
})

$("#closeSideBarButton").on("click",function(){
    $("#blobSideBar").css('width','0')
    $('#playscreen').css('margin-left', '0');
})

//back home
$(".backHome").on("click",function(){
    $("#shopDiv").slideUp()
    $("#blobbyCharacterScreen").slideUp()
    $("#inventoryDiv").slideUp()
    $("#augmentsDiv").slideUp()


    $("#playscreen").slideDown()

})

//open blobby menu
$("#BlobbySidebarDiv").on("click",function(){
    $("#playscreen").slideUp()

    $("#blobbyCharacterScreen").slideDown()
    loadCurios()
})

//open inventory
$('#toInventory').on("click",function(){
    $("#inventoryDiv").slideDown()

    $("#playscreen").slideUp()
})



$("#openablesLink").on("click",function(){
$("#openablesDiv").show()

$("#resourcesDiv").hide()
})

$("#resourcesLink").on("click",function(){
    $("#openablesDiv").hide()
    
    $("#resourcesDiv").show()
})


$("#openAugmentsMenu").on("click",function(){
    $("#playscreen").hide()
    
    $("#augmentsDiv").show()
})

$("#editCuriosConfigBtn").on("click",function(){
  if(curiosArr.length == 0){
    Swal.fire({text:"You have no Curios!"})
  }
})

$("#saveCuriosConfig").on("click",function(){
    applyCuriosConfig(curiosArr)
})

function applyCuriosConfig(curiosArray){
    blobby.resetStats()
    blobby.applyCurios(curiosArray)
}

function gridItemClick(num,arr,thisitem){

}

function loadCurios(){
    for(let i =0; i < UnlockedCuriosList.length; i++){
        

        let displayString = "<div class='curiosItemName'>";
        displayString += UnlockedCuriosList[i].name + "</div> <br> <div class='curiosItemDescriptorText'>"
        console.log(UnlockedCuriosList[i].mods)
        for(let j = 0; j < Object.keys(UnlockedCuriosList[i].mods).length; j++){
            let modlist = Object.keys(UnlockedCuriosList[i].mods)

            displayString+= formatCuriosModText(UnlockedCuriosList[i].mods[modlist[j]])
        
        }
        displayString+="</div>"



        let curiosItemDiv =$('<div></div>');
        curiosItemDiv.html(displayString)

        curiosItemDiv.draggable({
            helper: "clone",
            revert: "invalid"
        })

        
        curiosItemDiv.addClass('curios-item-draggable')
        
        $("#listOfCurios").append(curiosItemDiv)
    }
}


function formatCuriosModText(mod){
    let str =  mod[1] 
    if(mod[2] == "buff"){
        str += ": +"
    }else{
        str += ": -"
    }
    str += mod[0] + mod[3] + "<br>"
    return str
}