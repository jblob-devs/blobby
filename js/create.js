
function randNum(min, max) {
    return Math.floor(Math.random() * (max - min+1) + min);
  }


class tutorialEnemyCreation{
    constructor(name, level, atkspeed){
        this.name= name;
        this.level = level;
        this.beat = false;
        this.health=randNum(10,10 + (10*level))
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

function createCuriosGrid(){
    let grid = $("#curios-grid-container")
    grid.css({
    'gridTemplateColumns': `repeat(${curiosGrid.columns},100px)`,
    'gridTemplateRows': `repeat(${curiosGrid.rows},100px)`
    })
    curiosArr = []
    curiosArr =  Array.from({ length: curiosGrid.rows }, () => Array(curiosGrid.columns).fill(null))
    let totcelnum = curiosGrid.columns * curiosGrid.rows

    grid.empty()
    let gridState = Array(totcelnum).fill(null)
    
    for(let i =0; i < totcelnum;i++){
        let row = Math.floor(i / curiosGrid.columns) + 1;
        let col = (i % curiosGrid.columns) + 1;

        const gridItem = $('<div>lalalala</div>')
        .addClass('curios-grid-item')
        .attr('data-id',i+1)
        .attr('data-row', row)
        .attr('data-col', col);
       
  
        gridItem.on('click',function(){
            gridItemClick(i+1,gridState,gridItem)
        })
       
        gridItem.droppable({
            accept: ".curios-item-draggable",
            hoverClass:'over',
            drop: function(event, ui){
                
                const dropped = ui.helper.html()
                console.log(dropped)
                let name = $(ui.helper).find('.curiosItemName').text()
                
                for(let i =0; i < UnlockedCuriosList.length; i++){
                    if(UnlockedCuriosList[i].name == name){
                        curiosArr[gridItem.data("id")] = UnlockedCuriosList[i]
                    }
                }
                
                $(this).empty().html(name);
            }
        })
        grid.append(gridItem)


        //populate curios array with no item
    
        curiosArr[i] = null
    }
}

function getItemOn(cur, side){
    let pos = curiosArr.indexOf(cur)

    let curRows = Math.floor(pos / curiosGrid.columns) + 1
    let curCols = (pos % curiosGrid.columns) + 1

    let item;
    if(curRows++ > curiosGrid.rows || curRows-- > curiosGrid.rows || curCols-- < 0 || curCols++ > curiosGrid.columns){
        return null
    }
    if(side == 'down'){
        item = $(`.curios-grid-item[data-row='${curRows + 1}'][data-col='${curCols}']`);
    }else if(side == 'up'){
        item = $(`.curios-grid-item[data-row='${curRows - 1}'][data-col='${curCols}']`);
    }else if(side == 'right'){
        item = $(`.curios-grid-item[data-row='${curRows}'][data-col='${curCols+1}']`);
    }else if(side == 'left'){
        item = $(`.curios-grid-item[data-row='${curRows}'][data-col='${curCols-1}']`);
    }
    return item
}


function createEncounters(roundmax){
    roundMAX = roundmax;
    createNewRound()
}
function loadLocation(name){
battleLocation = name
$("#toAdventureSelectScreen").hide()
$("#battleDiv").show();
if(name == "Sun Plains"){
    battleLocation = "Sun Plains"
    createEncounters(10)
    currentObjective = "Clear Round " + roundMAX
}else if(name == "Slimy Woods"){

}
battleActive = true;
}
