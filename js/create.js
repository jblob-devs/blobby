
function randNum(min, max) {
    return Math.floor(Math.random() * (max - min+1) + min);
  }


class tutorialEnemyCreation{
    constructor(name, level, atkspeed){
        this.name= name;
        this.level = level;
        this.health=randNum(10,1 + (10*level))
        this.curhealth= this.health;
        this.damage=randNum(level, 2*level);
        this.atkspeed = atkspeed; //milliseconds
    }
}
var tutorialEnemy = new tutorialEnemyCreation("Tutorial Warped", 2, 7000)


class enemyCreation{
    constructor(name, level, boss, atkspeed){
        this.name= name;
        this.level = level;
        this.boss= boss;
        this.difficultscalar = 2;
        this.health=randNum(10*level,1 + (this.difficultscalar* 10*level));
        this.curhealth= this.health;
        this.damage=randNum(level, 2*level);
        this.atkspeed = atkspeed; //milliseconds
    }
}


let warped = new enemyCreation(
    "Warped",
    3,
    false,
    3000
)

let corrupted = new enemyCreation(
    "Corrupted",
    4,
    false,
    2000
)
class basicBlobConstructor{
    constructor(health,damage,atkspeed){
        //actual stats, changes to this are permanent
        this.healthSTAT = health
        this.damageSTAT = damage
        this.attackspeedSTAT = atkspeed
        


        //stats modified by buffs n stuff
        this.health=this.healthSTAT;
        this.damage=this.damageSTAT;
        this.atkspeed = this.attackspeedSTAT; //milliseconds


        //health in game during battle 
        this.curhealth = health;

        
    }

    resetStats(){
        this.health = this.healthSTAT
        this.damage = this.damageSTAT
        this.atkspeed = this.attackspeedSTAT
    }

    applyCurios(curiosApplicationArray){
        curiosApplicationArray.forEach(curios =>{
            if(curios == null){
            }else{
                //[0] gets the number value of the mods 
                if(curios.mods.baseDMGBuff) this.damage += curios.mods.baseDMGBuff[0]
                if(curios.mods.damagePercentageBuff) this.damage += Math.floor(this.damage * curios.mods.damagePercentageBuff[0]/100)
    
                if(curios.mods.baseHPBuff) this.health += curios.baseHPBuff[0]
                if(curios.mods.healthPercentageBuff) this.health += Math.floor(this.health * curios.mods.healthPercentageBuff[0]/100)
            }
           
        })
    }
}

var curiosGrid={
    rows: 2,
    columns:2
}
var blobby = new basicBlobConstructor(100,1,1000)

class curiosItem{
    constructor(name,icon,resonance,mods){
        this.name = name
        this.icon = icon
        this.resonance = resonance
        this.mods = mods;
    }
}

function curiosModList(num, name, type, extra){
    let list = [num, name, type, extra]
    return list;
}

let nullItem = new curiosItem(
    'null', 
    'no item', 
    {
    }
)
