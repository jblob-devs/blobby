
class questMission{
    constructor(waves,enemies){
        roundMAX = waves
        this.enemies = enemies
        this.curWave = 0;
        this.curenemy = this.enemies[this.curWave]
        
    }

    nextWave(){
        this.curWave++
    }
}