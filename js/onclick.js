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



function whatIsCurios(){
    Swal.fire({
        icon: "info",
        title: "Curios",
        text:"Curios are items that buff and provide special abilites to Blobby and it's team. Curios often interact with each other to become extra-powerful!"
      })
}

$("#shopDiv").hide()
$("#blobbyCharacterScreen").hide()
$("#inventoryDiv").hide()
$("#resourcesDiv").hide()
$("#openablesDiv").hide()
$("#editCuriosConfigBtn").hide()
$("#augmentsDiv").hide()
$("#blobbitsDiv").hide()
$("#idleScreen").hide()
$("#AdventureSelectScreen").hide()
$("#locationAdventureSelect").hide()
$("#questMissionSelect").hide()
$("#skirmishMissionSelect").hide()

$("#questMissionAvailable").hide()



$("#toShop").on("click", function(){
    $("#playscreen").slideUp()
    $("#shopDiv").slideDown()
})

$("#openAdventureTab").on("click",function(){
if(battleActive){
    Toast.fire("You can't currently start an adventure!")
}else{
    $("#AdventureSelectScreen").show()
    $("#idleScreen").hide()
}
})

$("#extractFromAdventureButton").on("click",function(){
Swal.fire({
    title:"Extract?", 
    text:`You'll only get rewards up to Round ${round - (round % 5)}`,
    showCancelButton: true,
    confirmButtonText: 'Extract!',
    cancelButtonText: 'Continue exploring'
}).then((result) => {
    if(result.isConfirmed){
        exitAdventureBattle()
    }else{
        Toast.fire('Adventure resumed...')
    }
})

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
    $("#AdventureSelectScreen").slideUp()


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
$("#blobbitsDiv").hide()

$("#resourcesDiv").hide()
})

$("#resourcesLink").on("click",function(){
    $("#openablesDiv").hide()
    $("#blobbitsDiv").hide()
    
    $("#resourcesDiv").show()
})

$("#blobbitsLink").on("click",function(){
    $("#openablesDiv").hide()
    $("#resourcesDiv").hide()
    
    $("#blobbitsDiv").show()
})

$("#expeditionLink").on("click",function(){
    $("#skirmishMissionSelect").hide()
    $("#questMissionSelect").hide()
    
    $("#locationAdventureSelect").show()
    })
    
$("#skirmishLink").on("click",function(){
    $("#locationAdventureSelect").hide()
    $("#questMissionSelect").hide()
        
    $("#skirmishMissionSelect").show()
})
    
$("#questLink").on("click",function(){
    $("#skirmishMissionSelect").hide()
    $("#locationAdventureSelect").hide()
        
    $("#questMissionSelect").show()
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

// Example in onclick.js
$('#openAdventureTab').on('click', () => {
    if (battleActive) {
        Swal.fire({
            icon: 'error',
            title: 'Cannot Start Adventure',
            text: "You're already adventuring!",
        });
    } else {
        UIManager.showScreen('ADVENTURE');
        $(UI_ELEMENTS.IDLE).hide();
    }
});