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
        //私有属性
        _this.isplaying = false;
        _this.skinName = "resource/game/firstSkin.exml";
        return _this;
    }
    FirstScene.prototype.onComplete = function () {
        egret.log("第一个场景加载完成");
        this.noticeChange();
        this.startTween();
        this.playBGM();
        this.pointer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointerClick, this);
    };
    //播放音乐
    FirstScene.prototype.playBGM = function () {
        var sound = RES.getRes("audio_bg_mp3");
        sound.play();
    };
    //点击按钮
    FirstScene.prototype.onPointerClick = function () {
        console.log('抽奖');
        this.turnTable(3);
    };
    //指针转到哪一项
    FirstScene.prototype.turnTable = function (resultNum) {
        if (this.isplaying == false) {
            this.isplaying = true;
            var resultAngle = resultNum * 45 + 5 * 360;
            this.showAnimation(5000, resultAngle);
        }
    };
    FirstScene.prototype.showAnimation = function (time, resultAngle) {
        var self = this;
        this._tween = egret.Tween.get(self.circle_inside).to({ rotation: resultAngle }, time, egret.Ease.cubicInOut).call(function () { self.isplaying = false; });
    };
    //动画
    FirstScene.prototype.startTween = function () {
        //手指头放大缩小
        var tw = egret.Tween.get(this.pointer, { loop: true });
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 300, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.sineOut);
        //灯闪烁的效果
        var tw2 = egret.Tween.get(this.circle_light, { loop: true });
        tw2.to({ alpha: 0 }, 100, egret.Ease.sineIn).to({ alpha: 1 }, 100, egret.Ease.sineOut);
    };
    //信息通知栏切换
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