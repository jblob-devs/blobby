
class Quest{
    constructor(name, description, missionAttached, launchtext, completiontext, rewards, missionEnemies = []){
       this.name = name;
       this.description= description;
       this.missionAttached = missionAttached;
       this.completed = false;
       this.enemy = null;
       this.launchtext = launchtext
       this.completiontext = completiontext
       this.missionEnemies = missionEnemies
       this.rewards = rewards;

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
                    let noname = this.name.replace(/\s+/g,"")
                    $(`#AVAILABLEQUEST${noname}Div`).remove()
                }
            }
            curQuest = null
            exitBattle("Quest Complete!",this.completiontext)
            this.grantRewards()
            return true
        }
        return false
    }

    grantRewards(){
        if(typeof this.rewards === 'function'){
            this.rewards()
        }else{
            console.log('Reward unable to be granted; not a function')
        }
    }

    
    
    
}
