
class Quest{
    constructor(name, description, missionAttached, launchtext, completiontext, rewards, missionEnemies = []){
       this.name = name;
       this.description= description;
       this.missionAttached = missionAttached;
       this.completed = false;
       this.enemy = null;
       //completednotclaimed property is only for quests that dont have a mission attached.
       this.completednotclaimed = false;
       this.launchtext = launchtext || ""
       this.completiontext = completiontext || ""
       this.missionEnemies = missionEnemies || []
       this.rewards = rewards;

    }
    launchMission(){
        curQuest = this
        //console.log(this.rewards)
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

    checkCompletion(){
        
    }

    waveDead(){
        if(round >= this.missionEnemies.length){
            console.log(round + " + " + this.missionEnemies.length)
            this.completed = true;
            for(let i = 0; i < questsArr.length; i++){
                if(quest[questsArr[i]] == curQuest){
                    questsArr.splice(i, 1)
                    let noname = this.name.replace(/\s+/g,"")
                    $(`#AVAILABLEQUEST${noname}Div`).remove()
                }
            }
            curQuest = null
            exitBattle("Quest Complete!",this.completiontext,this)
            return true
        }
        return false
    }

    grantRewards(){
        console.log(this.rewards)
        addReward(this.rewards.name,this.rewards.amount,true)
    }
  
    
}
