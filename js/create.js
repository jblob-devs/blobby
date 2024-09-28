
class enemyCreation{
    constructor(name, boss, health,damage,atkspeed){
        this.name= name;
        this.boss= boss;
        this.curhealth= health;
        this.health=health;
        this.curhealth = health;
        this.damage=damage;
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

var basicBlob = new basicBlobConstructor(100,1,1000)

