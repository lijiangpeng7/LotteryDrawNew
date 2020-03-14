var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var FirstScene = (function (_super) {
    __extends(FirstScene, _super);
    function FirstScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/game/firstSkin.exml";
        return _this;
    }
    FirstScene.prototype.onComplete = function () {
        egret.log("第一个场景加载完成");
        this.noticeChange();
        var sound = RES.getRes("audio_bg_mp3");
        sound.play();
    };
    //notice栏 切换
    FirstScene.prototype.noticeChange = function () {
        var noticeLen = 0;
        var that = this;
        setInterval(function () {
            if (noticeLen == 8) {
                noticeLen = 0;
            }
            // console.log(RES.getRes("barrage_" + noticeLen + "_png"));
            that.notice1.texture = RES.getRes("barrage_" + noticeLen + "_png");
            noticeLen++;
        }, 2000);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    FirstScene.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return FirstScene;
}(Scene));
__reflect(FirstScene.prototype, "FirstScene");
//# sourceMappingURL=FristScene.js.map