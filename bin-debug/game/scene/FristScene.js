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
        _this._isplaying = false;
        _this._giftIdx = 0;
        _this._giftName = "";
        _this._giftType = "";
        //奖品列表配置
        _this._giftList = [
            {
                name: "16.6元红包",
                rate: 10,
                type: "money"
            },
            {
                name: "再来一次",
                rate: 20,
                type: ""
            },
            {
                name: "18.8元红包",
                rate: 20,
                type: "money"
            },
            {
                name: "38.8元红包",
                rate: 5,
                type: "money"
            },
            {
                name: "28.8元红包",
                rate: 1,
                type: "money"
            },
            {
                name: "再接再厉",
                rate: 20,
                type: ""
            },
            {
                name: "26.6元红包",
                rate: 1,
                type: "money"
            },
            {
                name: "36.6元红包",
                rate: 1,
                type: "money"
            }
        ];
        _this.skinName = "resource/game/firstSkin.exml";
        return _this;
    }
    //获取抽奖结果
    FirstScene.prototype.getResult = function (arr) {
        var leng = 0;
        for (var i = 0; i < arr.length; i++) {
            leng += arr[i].rate;
        }
        for (var i = 0; i < arr.length; i++) {
            var random = Math.random() * leng;
            if (random < arr[i].rate) {
                return {
                    index: i,
                    obj: arr[i]
                };
            }
            else {
                leng -= arr[i].rate;
            }
        }
    };
    FirstScene.prototype.onComplete = function () {
        egret.log("第一个场景加载完成");
        this.noticeChange();
        this.startTween();
        this.loadingSound();
        this._audioBgChannel = this._audioBg.play(0, 0);
        this.pointer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointerClick, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainClick, this);
    };
    //加载音乐
    FirstScene.prototype.loadingSound = function () {
        this._audioBg = RES.getRes("audio_bg_mp3");
        this._audioClick = RES.getRes("audio_click_mp3");
        this._audioRotation = RES.getRes("audio_rotation_mp3");
        this._audioVictory = RES.getRes("audio_victory_mp3");
    };
    //再来一次
    FirstScene.prototype.onAgainClick = function () {
        this.pointer.visible = true;
        this.failGroup.visible = false;
        this._giftType = "";
        this.circle_inside.rotation = 0;
        this._audioBgChannel = this._audioBg.play(0, 0);
    };
    //点击按钮
    FirstScene.prototype.onPointerClick = function () {
        var resultGift = this.getResult(this._giftList);
        this._giftIdx = resultGift.index;
        this._giftName = resultGift.obj.name;
        this._giftType = resultGift.obj.type;
        this.turnTable(this._giftIdx);
        this.pointer.visible = false;
        this._audioBgChannel.stop();
        this._audioClick.play(0, 1);
        this._audioRotation.play(0, 1);
    };
    //指针转到哪一项
    FirstScene.prototype.turnTable = function (resultNum) {
        if (this._isplaying == false) {
            this._isplaying = true;
            var resultAngle = resultNum * 45 + 5 * 360 + 30;
            this.showAnimation(5000, resultAngle);
        }
    };
    FirstScene.prototype.showAnimation = function (time, resultAngle) {
        var self = this;
        this._tween = egret.Tween.get(self.circle_inside).to({ rotation: resultAngle }, time, egret.Ease.cubicInOut).call(function () {
            self._isplaying = false;
            if (self._giftType != "") {
                console.log("成功" + self._giftName);
                self.zhuanPanGroup.visible = false;
                self.winGroup.visible = true;
                self.giftNameLabel.text = self._giftName;
                self._audioVictory.play(0, 1);
            }
            else {
                self.failGroup.visible = true;
                console.log("失败");
            }
        });
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
            that.notice1.texture = RES.getRes("barrage_" + noticeLen + "_png");
            noticeLen++;
        }, 2000);
    };
    return FirstScene;
}(Scene));
__reflect(FirstScene.prototype, "FirstScene");
//# sourceMappingURL=FristScene.js.map