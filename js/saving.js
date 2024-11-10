
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
    localStorage.setItem('gameSave', JSON.stringify(gameData))
}

function loadGame() {
    const savedGame = localStorage.getItem('gameSave');
    if (savedGame) {
        const loadedData = JSON.parse(savedGame);
        Object.assign(gameData, loadedData);
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
mapGameDataToGlobals();