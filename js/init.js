
//Resonance
/*
Syntactic
Harmonic
Chaotic
Entropic

*/


/*

buffs 


baseDMG
damagePercentage
baseHP
healthPercentage
gooMax
gooRegenRate
gooRegenPerRate
*/

let curios={
    smoothStone: new curiosItem(
        'Smooth Stone', 
        'sigma', //icon
        'Syntactic',
        {
            baseDMG: curiosModList(2,"Base Damage", "buff", ""),
            healthPercentage: curiosModList(10,"Health", "buff", "%")
        }
    ),
    mossyStone: new curiosItem(
        'Mossy Stone', 
        'sigma', //icon
        'Harmonic',
        {
            damagePercentage: curiosModList(10,"Base Damage", "buff", "%")
        }
    ),
    heavyStone: new curiosItem(
        'Heavy Stone', 
        'sigma', //icon
        'Harmonic',
        {
            baseDMG: curiosModList(-5,"Base Damage", "nerf", ""),
            baseHP: curiosModList(20,"Base HP", "buff", ""),
        }
    ),fluxFlower: new curiosItem(
        'Flux Flower', 
        'sigma', //icon
        'Harmonic',
        {
            gooRegenPerRate: curiosModList(2,"Goo Regenerated", "buff", ""),
            gooMax: curiosModList(15,"Goo Max", "buff", ""),
        }
    ),

}



let gameData = {
    jelly: 0,
    round: 1,
    firstDeath: true,
    battleActive: true,
    currentObjective: "Clear Round 5",
    beatFirst5Rounds: false,
    tutorialEnemyBeat: false,
   frayedTreasureBag: 0,
   patchedTreasureBag: 0,
   robustTreasureBag: 0,
   battleLocation: "Sun Plains",
   
   player: {
       damage: 1,
       damageType: 'physical',
       critChance: 10,
       critMultiplier: 1.2,
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
       "SunPlains": {unlocked:true, cleared: false, maxRound: 0},
       "SlimyWoods": {unlocked:false, cleared: false, maxRound:0}
   },
   
   
   UnlockedCuriosList: [],
   curiosArr: [],
   questsArr: [],
   curQuest: null,

   refreshtimer: 10,
    polyhedronOfferName: 'plain polyhedron',
    openGatewayArray: ['salvage'],
   
}


let quest={
    UnlockCurios: new Quest("Unlock Curios", "Unlock the ability to use strange artifacts",true,"A powered up Culled has been roaming this area ... scare it off." ,"The corrupted dropped some sort of artifact ... maybe it can be used to make Blobby stronger?", new reward(curios.smoothStone,1), [new Enemy("Warped",3), new Enemy("Warped",3), new Enemy("Warped",4), new Enemy("Corrupted",5)]),
    UnlockBlobs: new Quest("Unlock Blobs", "Recruit Blobs to assist and powerup Blobby!",true,"Fragments of blobs, similar to blobby, are being guarded by the Culled. Retrieve them!","Continue collected blob bits to recruit new blobs for your squad!", new reward('blobBits.slimeBlob',10), [new Enemy("Warped",5), new Enemy("Warped",3),new Enemy("Corrupted",6)]),
    UnlockSlimyWoods: Object.assign (new Quest("Unlock Slimy Woods", "Venture the Slimy Woods",false,"Clear wave 10 in the sun plains", new reward('locationStats.SlimyWoods.unlocked',true)), {check:function(){return gameData[locationStats.SunPlains.maxRound] >= 10}})
}