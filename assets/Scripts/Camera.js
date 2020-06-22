// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            default: null,
            type: cc.Node
        },
    },

    update(dt) {

        if (!this.playerNode) return;

        let playerPosition = this.playerNode.convertToWorldSpaceAR(cc.v2(0, 0));
        playerPosition.x -= 960;
        playerPosition.y -= 640;
        let destination = this.node.parent.convertToWorldSpaceAR(playerPosition);

        this.node.position = destination;
    },
});
