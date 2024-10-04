
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
        if(rewardArray.name == type){
            rewardArray.amount += amount;
            added = true;
        }
    }
    if(added == false){
        rewardArray.push(new reward(type,amount))
    }
}

function sendRewardArray(){
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
    /*
        Frayed Rewards
        30% jelly 8 - 15
        20% red salvage 1 - 3
        20%  green salvage 1 - 3
        20%  blue salvage 1 - 3
        10% unidentified essence 3 - 5

        10% chance for a second reward
    */
    if(type == "frayed"){
        let rand = randNum(1,10)
        if(rand <= 3){
            let amount = randNum(8,15)
            addRewardArray("jelly",amount)
        }else if(rand <= 5){
            let amount = randNum(1,3)
            addRewardArray("redSalvage", amount)
        }else if(rand <= 7){
            let amount = randNum(1,3)
            addRewardArray("blueSalvage", amount)
        }else if(rand <= 9){
            let amount = randNum(1,3)
            addRewardArray("greenSalvage", amount)
        }else{
            let amount = randNum(3,5)
            addRewardArray("unidentifiedEssence", amount)
        }
    }

    let out = sendRewardArray()
    console.log(out)
    Toast.fire({
        icon: "info",
        html: out
      });
    clearRewardArray()
}