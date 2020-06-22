// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


//按键监听
const Input = {};
//人物方向：1向右，-1向左
var direction = 1;
//是否正在跳跃
OnJump = false;
//跳跃时间
var Duration = 0; 

cc.Class({
    extends: cc.Component,

    properties: {
        // 跳跃初速度
        jumpSpeed: 0,
        // 最长跳跃时间
        jumpDuration: 0,
        // 移动速度
        moveSpeed: 0,
        //生命值
        health: 1,

        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        spriteNode: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {

        this.sp = cc.v2(0, 0);

        //var sprite = this.node.getChildByName("Player");

        //开启碰撞
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    getMoveDirection: function () {
        //获取移动方向
        if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
            //this.direction = -1;
            this.sp.x = -1;
            direction = -1;
        } else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
            //this.direction = 1;
            this.sp.x = 1;
            direction = 1;
        } else {
            this.sp.x = 0;
        }
    },

    Jump: function () {

        if (Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up]) {

            if (!OnJump) {
                OnJump = true;
                this.sp.y = 1;
                cc.audioEngine.playEffect(this.jumpAudio, false);
                //var jumpingAudio = cc.audioEngine.play(this.jumpAudio, false, 1);
            }
        }
    },

    hurt: function () {
        this.health--;
    },

    death: function () {

        //this.node.parent.getComponent("Main").gainResurrection();
        this.node.parent.getComponent("Main").gameOver();
    },

    gainScore: function () {
        this.node.parent.getComponent("Main").gainScore();
    },

    onKeyDown(input) {

        Input[input.keyCode] = 1;
        this.getMoveDirection();
        this.Jump();
    },

    onKeyUp(input) {

        Input[input.keyCode] = 0;
        this.getMoveDirection();
        this.Jump();
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {

        var otherColliderNode = otherCollider.node;

        //碰撞体为Ground时再结束跳跃状态
        if (otherColliderNode.group == "Ground") {

            OnJump = false;
        }
    },

    //无效，原因未知
    //onCollisionEnter: function (other, self) {
    //    alert(OnJump);
    //},

    update: function (dt) {

        //判断是否死亡
        if (this.health <= 0) {
            this.death();
        }

        //判断是否跌出地图
        if (this.node.y < -320) {
            this.death();
        }

        if (this.sp.y) {
            Duration += dt;
            if (Duration > this.jumpDuration) {
                this.sp.y = 0;
                Duration = 0;
            }
        }
        this.node.x += this.sp.x * this.moveSpeed * dt;
        this.node.y += this.sp.y * this.jumpSpeed * dt;
        
        this.spriteNode.scaleX = direction;
    },

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
});
