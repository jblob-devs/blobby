
class quest{
    constructor(name, description, missionAttached, launchtext, completiontext, missionEnemies = []){
       this.name = name;
       this.description= description;
       this.missionAttached = missionAttached;
       this.completed = false;
       this.enemy = null;
       this.launchtext = launchtext
       this.completiontext = completiontext
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
            Toast.fire({
                icon: "info",
                text: this.launchtext,
                timer: 5000
              });
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
            exitBattle("Quest Complete!",this.completiontext)
            return true
        }
        return false
    }
}

let curiosUnlockingQuest = new quest("Unlock Curios", "Unlock the ability to use strange artifacts",true,"A powered up Culled has been roaming this area ... scare it off." ,"The corrupted dropped some sort of artifact ... maybe it can be used to make Blobby stronger?", [Enemy("Warped",3), Enemy("Warped",3), Enemy("Warped",4), Enemy("Corrupted",5)])
let blobUnlockingQuest = new quest("Unlock Blobs!", "Recruit Blobs to assist and powerup Blobby!",true,"Fragments of blobs, similar to blobby, are being guarded by the Culled. Retrieve them!","Continue collected blob bits to recruit new blobs for your squad!", [Enemy("Warped",5), Enemy("Warped",3), Enemy("Corrupted",6)])