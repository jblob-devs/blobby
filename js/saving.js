
function clearSave(){
    Swal.fire({
        title:'Are you sure you want to clear your save?',
        text: "It can't be recovered!",
        showCancelButton: true,
    }).then((result) => {
       if(result.isConfirmed){
        localStorage.clear()
        location.reload()
       }
      })
    
}

function saveGame(){
    const questsData = questsArr.map(quest => {
        // Check if the reward is an object and save it accordingly
        const rewards = quest.rewards && typeof quest.rewards instanceof reward
            ? {
                item: typeof quest.rewards.name === 'string' 
                    ? quest.rewards.name
                    :null, 
                quantity: quest.rewards.amount
            } 
            : null;  
            
        const missionEnemies = Array.isArray(quest.missionEnemies) ? quest.missionEnemies.map(enemy => ({
            name: enemy.name,
            level: enemy.level
        })) : [];

        return {
            ...quest,
            rewards: rewards,
            missionEnemies: missionEnemies
        };
    });
    localStorage.setItem('questsSave', JSON.stringify(questsData))

    //save the remaining game data
    localStorage.setItem('gameSave', JSON.stringify(gameData))
}

function loadGame() {
    const savedGame = localStorage.getItem('gameSave');
    const savedQuests = localStorage.getItem('questsSave')

    if (savedGame) {
        const loadedData = JSON.parse(savedGame);
        Object.assign(gameData, loadedData);

        if(savedQuests){
            const questsData = JSON.parse(savedQuests)
            questsArr = questsData.map(data => recreateQuestsArray(data))
        }

        mapGameDataToGlobals(); 
        console.log('Game loaded successfully!');
    } else {
        console.log('No saved game found.');
    }

    
}

//allows for the calling for 'jelly' rather than 'gameData.jelly'
function mapGameDataToGlobals() {
    for (const key in gameData) {
        if (gameData.hasOwnProperty(key)) {
            if(!window.hasOwnProperty(key)){
            Object.defineProperty(window, key,{
                get(){
                    return gameData[key];
                },
                set(value){
                    gameData[key] = value
                }
            })
        }
        }
    }
}

//since Quests contain important methods, we need to reconstruct them after a load
function recreateQuestsArray(data){

    const reward = data.rewards
        ? new reward(
            typeof data.rewards.item === 'string'
                ? (curios[data.rewards.item] || data.rewards.item)  // Retrieve from curios or use as-is
                : data.rewards.item,
            data.rewards.quantity
        )
        : null;  // Default to null if rewards is missing

    //console.log(reward)
    const missionEnemies = data.missionEnemies.map(enemyData => new Enemy(enemyData.name, enemyData.level));

    return new Quest(
        data.name,
        data.description,
        data.missionAttached,
        data.launchtext,
        data.completiontext,
        reward,
        missionEnemies
    );
}
mapGameDataToGlobals();