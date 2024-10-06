
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

var curiosGrid={
    rows: 2,
    columns:2
}
var blobby = new basicBlobConstructor(100,1,1000)

class curiosItem{
    constructor(name,icon,buffs){
        this.name = name
        this.icon = icon
        this.buffs = buffs;
    }
}

function createCuriosGrid(){
    let grid = $("#curios-grid-container")
    grid.css({
    'gridTemplateColumns': `repeat(${curiosGrid.columns},100px)`,
    'gridTemplateRows': `repeat(${curiosGrid.rows},100px)`
    })
    
    let totcelnum = curiosGrid.columns * curiosGrid.rows

    grid.empty()
    let gridState = Array(totcelnum).fill(null)
    for(let i =0; i < totcelnum;i++){
        const gridItem = $('<div>lalalala</div>')
        .addClass('curios-grid-item')
        .attr('data-id',i+1)
       
        grid.append(gridItem)
        gridItem.on('click',function(){
            gridItemClick(i+1,gridState,gridItem)
        })
    }
}

