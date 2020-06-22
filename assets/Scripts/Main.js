// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//怪物生成地点
const Point = {};
//复活次数
//var resurrection = 0;
cc.Class({
    extends: cc.Component,

    properties: {

        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        //resurrectionDisplay: {
        //    default: null,
        //    type: cc.Label
        //},
        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        playerDisplay: {
            default: null,
            type: cc.Node
        },
    },

    //playBackMusic: function () {
    //    // 调用声音引擎播放声音
    //    cc.audioEngine.playMusic(this.music, false);
    //},

    onLoad: function () {

        this.score = 0;
        //即将生成的怪物编号
        this.i = 0;
        //player与下一个怪物生成点的X距离（初始值大于生成距离即可）
        this.distance = 1200;

        this.playerPoint = 0;
        //怪物坐标信息（暂时需确保列表最后一个坐标x信息远大于地图长度）
        Point[0] = cc.v2(1200,  0);
        Point[1] = cc.v2(2500,  0);
        Point[2] = cc.v2(3500,  500);
        Point[3] = cc.v2(5200,  100);
        Point[4] = cc.v2(7200,  1100);
        Point[5] = cc.v2(9400,  100);
        Point[6] = cc.v2(10600, 0)
        Point[7] = cc.v2(40000, 0);
        //Point[i] = cc.v2(, );
    },

    spawnNewEnemy: function () { 

        var newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);

        newEnemy.setPosition(this.getNewEnemyPosition());
    },

    getNewEnemyPosition: function () {
        
        return Point[this.i++];
    },

    gainScore: function () {
        this.score += 1;
        this.scoreDisplay.string = '分数：' + this.score;
    },
    //gainResurrection: function () {
    //    resurrection += 1;
    //    this.resurrectionDisplay.string = '复活次数：' + resurrection;
    //},

    gameOver: function () {
        
        //重新加载游戏
        cc.director.loadScene('Mario_Platformer');
    },

    update(dt) {

        //判断并生成怪物
        this.distance = Point[this.i].x - this.playerDisplay.x;
        if (this.distance < 480) {
            this.spawnNewEnemy();
        }

        this.playerPoint = this.playerDisplay.x;
        if (this.playerPoint > 13800) {
            
            //恭喜通关，得分this.score
            this.gameOver();
        }
    },

    //onDestroy: function () {
    //    cc.audioEngine.stop(this.current);
    //}
});


