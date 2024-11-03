
class quest{
    constructor(name, description, missionAttached, missionEnemies = []){
       this.name = name;
       this.description= description;
       this.missionAttached = missionAttached;
       this.completed = false;
       this.enemy = null;
       this.missionEnemies = missionEnemies
    }
    launchMission(){
        curQuest = this
        
        if(this.missionAttached){
            this.enemy = this.missionEnemies[round]
            preBattlePrep()
            createNewRound()
            $("#AdventureSelectScreen").hide()
            $("#battleDiv").show();
            battleActive = true;
            currentObjective = this.name
        }
        
    }
    waveDead(){
        if(round >= this.missionEnemies.length){
            console.log(round + " + " + this.missionEnemies.length)
            this.completed = true;
            for(let i = 0; i < questsArr.length; i++){
                if(questsArr[i] == curQuest){
                    questsArr.splice(i, 1)
                }
            }
            curQuest = null
            exitBattle("Quest Complete!")
            return true
        }
        return false
    }
}

let curiosUnlockingQuest = new quest("Unlock Curios", "Unlock the ability to use strange artifacts",true, [Enemy("Warped",3), Enemy("Warped",3), Enemy("Warped",4), Enemy("Corrupted",5)])
let blobUnlockingQuest = new quest("Unlock Blobs!", "Recruit Blobs to assist and powerup Blobby!",true, [Enemy("Warped",5), Enemy("Warped",3), Enemy("Corrupted",6)])