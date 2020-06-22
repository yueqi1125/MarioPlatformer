// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {

        //开启碰撞
        manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        
        var otherColliderNode = otherCollider.node;

        //判断碰撞体为何物
        if (otherColliderNode.name == "Player") {

            var Player = otherColliderNode.getComponent("Player");

            Player.gainScore();
            this.node.destroy();
        }
    },
});
