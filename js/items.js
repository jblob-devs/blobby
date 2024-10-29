
let rewardArray = []

class reward{
    constructor(name, amount){
        this.name = name;
        this.amount = amount;
    }
}

function addRewardArray(type, amount){
    let added = false;
    for(let i = 0; i < rewardArray.length; i++){
        if(rewardArray[i].name == type){
            rewardArray[i].amount += amount;
            added = true;
        }
    }
    if(added == false){
        rewardArray.push(new reward(type,amount))
    }
}

function sendRewardArray(){
    console.log(rewardArray)
    let string = "Rewards Recieved <br>";
    for(let i = 0; i< rewardArray.length;i++){
        string += displayNames[rewardArray[i].name]  + ": " + rewardArray[i].amount + "<br>";
        eval(rewardArray[i].name + "+=" + rewardArray[i].amount)
    }
    return string
}

function clearRewardArray(){
    rewardArray = []
}
function openTreasureBags(type){
    let nobags = true;
    /*
        Frayed Rewards
        50% jelly 8 - 15
        40%  salvage shards 1 - 3
        10% unidentified essence 3 - 5

        10% chance for a second reward
    */
   
    if(type == "frayed" && frayedTreasureBag > 0){
        nobags = false;
        while(frayedTreasureBag > 0){
            let rand = randNum(1,10)
            if(rand <= 5){
                let amount = randNum(8,15)
                addRewardArray("jelly",amount)
            }else if(rand <= 9){
                let amount = randNum(1,3)
                addRewardArray("materials.salvageShards", amount)
            }else{
                let amount = randNum(3,5)
                addRewardArray("materials.unidentifiedEssence", amount)
            }
            frayedTreasureBag--
        }
       
  
    }else if(type == "patched" && patchedTreasureBag > 0){
        nobags = false;
        /*
        Patched Rewards
        30% jelly 10 - 20
        55%  salvage shards 3 - 5
        15% unidentified essence  5 - 6

        10% chance for a second reward
    */
        while(patchedTreasureBag > 0){
            let rand = randNum(1,100)
            if(rand <= 30){
                let amount = randNum(10,20)
                addRewardArray("jelly",amount)
            }else if(rand <= 85){
                let amount = randNum(3,5)
                addRewardArray("salvageShards", amount)
            }else{
                let amount = randNum(5,6)
                addRewardArray("unidentifiedEssence", amount)
            }
            patchedTreasureBag--
        }
    }else if(type == "robust" && robustTreasureBag > 0){
        nobags = false;
        while(frayedTreasureBag > 0){
            let rand = randNum(1,10)
            if(rand <= 5){
                let amount = randNum(8,15)
                addRewardArray("jelly",amount)
            }else if(rand <= 9){
                let amount = randNum(1,3)
                addRewardArray("salvageShards", amount)
            }else{
                let amount = randNum(3,5)
                addRewardArray("unidentifiedEssence", amount)
            }
            frayedTreasureBag--
        }
    }
    if(nobags){
        Toast.fire({text:"You don't have any of this treasure bag!"})
    }else{
        let out = sendRewardArray()
        console.log(out)
        Toast.fire({
            icon: "info",
            html: out
          });
        clearRewardArray()
    }
   

}

function whatIsThis(item){
    console.log(item)
    if(item == 'salvageShards') Swal.fire({title:'Salvage Shards',text:'Can be used to craft new curios. Acquired from various reward pools',footer: '<i>shards broken from relics of the past, present and future. the possibilites are endless</i>'})
    if(item == 'unidentifiedEssence') Swal.fire({title:'Unidentified Essence',text:'Primary resource used to get new blobs. Can be traded and converted into various other resources for blob summoning',footer: "<i>i'm not exactly sure what its from...but that makes it easier to turn it into anything</i>"})
    if(item == 'sunPetals') Swal.fire({title:'Sun Petals',text:'Bright petals often found when exploring the Sun Plains.',footer: "<i>they say the sun itself came down and touched every one of these petals.</i>"})
    }


function calculateEndAdventureRewards(location,round){
    let roundmarker = round - round % 5
    let jellyearned = 10 * round;
 if(location == "Sun Plains"){
    var sunpetalsamounts;
    if(roundmarker >= 20){
       sunpetalsamounts = randNum(10,15)
    }else if(roundmarker >= 15){
        sunpetalsamounts = randNum(8,10)
    }else if(roundmarker >= 10){
        sunpetalsamounts = randNum(5,8)
    }else{
        sunpetalsamounts = randNum(3,5)
    }
    Swal.fire({
        title: `${location} adventure complete!`,
        html:
        `<b>Rewards:</b> <br>
        <i>
        ${sunpetalsamounts} Sun Petals <br>
        ${jellyearned} jelly
        </i>
        `
    })
    materials.sunPetals+=sunpetalsamounts
 }

 jelly += jellyearned;
}