// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


//移动方向：1向右，-1向左
var direction = -1;
//是否移动
var isMove = 0
//
var manager;
cc.Class({
    extends: cc.Component,

    properties: {
        // 移动速度
        moveSpeed: 0,
    },

    onLoad: function () {

        this.sp = cc.v2(1, 0);

        //开启碰撞
        manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    death: function () {
        this.node.destroy();
    },

    //被人物踩踏
    wasHit: function () {
        this.death();
    },

    //撞墙反向
    onBeginContact: function (contact, selfCollider, otherCollider) {

        var worldManifold = contact.getWorldManifold();
        var otherColliderNode = otherCollider.node;
        
        //判断碰撞体为何物
        if (otherColliderNode.name == "Player") {

            var Player = otherColliderNode.getComponent("Player");

            if (worldManifold.normal.y == 1) {
                Player.gainScore();
                this.wasHit();
            } else {
                Player.hurt();
            }

        } else {
            if (worldManifold.normal.y) {
                isMove = 1;
            }
            if (worldManifold.normal.x) {
                direction = (-1) * direction;
            }
        }
    },

    update: function (dt) {

        this.node.x += isMove * direction * this.sp.x * this.moveSpeed * dt;
    },
});
