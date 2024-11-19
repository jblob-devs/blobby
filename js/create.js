
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

let enemies = {
"Warped": new enemyCreation(
    "Warped",
    1,
    false,
    3000
),

"Corrupted": new enemyCreation(
    "Corrupted",
    1,
    false,
    2000
)
}

function Enemy(name, level){
    return new enemyCreation(name, level, false, enemies[name].atkspeed)
}
class basicBlobConstructor{
    constructor(health,damage,atkspeed){
        //actual stats, changes to this are permanent
        this.healthSTAT = health
        this.damageSTAT = damage
        this.attackspeedSTAT = atkspeed
        this.gooGaugeMaxSTAT = 10
        this.gooRegenPerRateSTAT= 1,
        this.gooRegenRateSTAT = 1000,


        this.gooGauge = this.gooGaugeMaxSTAT,
        this.gooGaugeMax = this.gooGaugeMaxSTAT,
        this.gooRegenPerRate= this.gooRegenPerRateSTAT,
        this.gooRegenRate = this.gooRegenRateSTAT,
        

        


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
        this.gooGaugeMax = this.gooGaugeMaxSTAT,
        this.gooRegenPerRate= this.gooRegenPerRateSTAT,
        this.gooRegenRate = this.gooRegenRateSTAT
    }

    applyCurios(curiosApplicationArray){
        curiosApplicationArray.forEach(curios =>{
            if(curios == null){
            }else{
                //[0] gets the number value of the mods 
                if(curios.mods.baseDMG) this.damage += curios.mods.baseDMG[0]
                if(curios.mods.damagePercentage) this.damage += Math.floor(this.damage * curios.mods.damagePercentage[0]/100)
    
                if(curios.mods.baseHP) this.health += curios.mods.baseHP[0]
                if(curios.mods.healthPercentage) this.health += Math.floor(this.health * curios.mods.healthPercentage[0]/100)
            
                if(curios.mods.gooMax) this.gooGaugeMax += curios.mods.gooMax[0]
                if(curios.mods.gooRegenRate) this.gooRegenRate += curios.mods.gooRegenRate[0]
                if(curios.mods.gooRegenPerRate) this.gooRegenPerRate += curios.mods.gooRegenPerRate[0]
            }
           
        })
        if(this.health <= 0){
            this.health = 1
        }
        if(this.damage < 0){
            this.damage = 0
        }
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
        this.unlocked= false;
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


class reward{
    constructor(name, amount){
        this.name = name;
        this.amount = amount;
    }
}