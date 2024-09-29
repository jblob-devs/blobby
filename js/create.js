function randNum(min, max) {
    return Math.floor(Math.random() * (max - min+1) + min);
  }


class tutorialEnemyCreation{
    constructor(name, level, atkspeed){
        this.name= name;
        this.level = level;
        this.beat = false;
        this.health=randNum(30,30 + (10*level))
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
        this.health=randNum(30,30 + (10*level));
        this.curhealth= this.health;
        this.damage=randNum(level, 2*level);
        this.atkspeed = atkspeed; //milliseconds
    }
}

class basicBlobConstructor{
    constructor(health,damage,atkspeed){
        this.health=health;
        this.curhealth = health;
        this.damage=damage;
        this.atkspeed = atkspeed; //milliseconds
    }
}

var blobby = new basicBlobConstructor(100,1,1000)

