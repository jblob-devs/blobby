
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
        }
        preBattlePrep()
        createNewRound()
        $("#AdventureSelectScreen").hide()
        $("#battleDiv").show();
        battleActive = true;
        currentObjective = this.name
    }
    waveDead(){
        if(round >= this.missionEnemies.length){
            console.log(round + " + " + this.missionEnemies.length)
            this.completed = true;
            exitBattle("Quest Complete!")
        }
    }
}

let curiosUnlockingQuest = new quest("Unlock Curios", "Unlock the ability to use strange artifacts",true, [enemies.warped, enemies.warped, enemies.corrupted, enemies.corrupted])