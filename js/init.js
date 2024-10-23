
//Resonance
/*
Syntactic
Harmonic
Chaotic
Entropic

*/


let curios={
    smoothStone: new curiosItem(
        'Smooth Stone', 
        'sigma', //icon
        'Syntactic',
        {
            baseDMGBuff: curiosModList(2,"Base Damage", "buff", ""),
            healthPercentageBuff: curiosModList(10,"Health", "buff", "%")
        }
    ),

}



let gameData = {
    jelly: 0,
    round: 1,
    firstDeath: true,
    battleActive: true,
    currentObjective: "Clear Round 10",
    beatFirst10Rounds: false,
    tutorialEnemyBeat: false,
    questActive: false,
   frayedTreasureBag: 0,
   patchedTreasureBag: 0,
   robustTreasureBag: 0,
   battleLocation: "Sun Plains",
   
   playerTap: {
       damage: 1,
       damageType: 'physical',
       critChance: 10,
       critMultiplier: 1.2
   },
   blobBits: {
       blobby: 0,
       slimeBlob: 0
   },
   materials: {
       unidentifiedEssence:0,
       salvageShards:0,
       sunPetals: 0
   },
   locationStats: { 
       "SunPlains": {unlocked:true, cleared: false},
       "SlimyWoods": {unlocked:false, cleared: false}
   },
   
   
   UnlockedCuriosList: [curios.smoothStone],
   curiosArr: [],
   }
   
