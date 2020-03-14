
class FirstScene extends Scene{
    private group: eui.Group;
    public constructor() {
        super();
        this.skinName = "resource/game/firstSkin.exml";
    }

    // eui 组件
    noticeBg: eui.Image;
    notice1: eui.Image;
    pointer: eui.Image;
    circle_light: eui.Image;
    circle_inside: eui.Image;
    zhuanPanGroup: eui.Group;
    failGroup: eui.Group;
    winGroup: eui.Group;
    againBtn: eui.Image;
    giftNameLabel: eui.Label;

    //私有属性
    private _isplaying:boolean = false;
    private _audioBg:egret.Sound;
    private _audioClick:egret.Sound;
    private _audioRotation:egret.Sound;
    private _audioVictory:egret.Sound;
    private _audioBgChannel: egret.SoundChannel;
    private _giftIdx: number = 0;
    private _giftName: string = "";
    private _giftType: string = "";
    
    //奖品列表配置
    private _giftList = [
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
    ]

    //获取抽奖结果
     private getResult(arr) {
        var leng = 0;
        for (var i = 0; i < arr.length; i++) {
            leng += arr[i].rate
        }
        for (var i = 0; i < arr.length; i++) {
            var random = Math.random() * leng;
            if (random < arr[i].rate) {
                return {
                    index: i,
                    obj: arr[i]
                };
            } else {
                leng -= arr[i].rate
            }
        }
    }

    public onComplete() {
        egret.log("第一个场景加载完成");
        this.noticeChange();
        this.startTween();
        this.loadingSound();
        this._audioBgChannel = this._audioBg.play(0,0);
        this.pointer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointerClick,this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainClick, this);
    }

    //加载音乐
    private loadingSound() {
        this._audioBg = RES.getRes("audio_bg_mp3");
        this._audioClick = RES.getRes("audio_click_mp3");
        this._audioRotation = RES.getRes("audio_rotation_mp3");
        this._audioVictory = RES.getRes("audio_victory_mp3");
    }

    //再来一次
    private onAgainClick():void {
        this.pointer.visible = true;
        this.failGroup.visible = false;
        this._giftType = "";
        this.circle_inside.rotation = 0;
        this._audioBgChannel = this._audioBg.play(0,0);
    }

    //点击按钮
    private onPointerClick() {
        let resultGift = this.getResult(this._giftList);
        this._giftIdx = resultGift.index;
        this._giftName = resultGift.obj.name;
        this._giftType = resultGift.obj.type;
        this.turnTable(this._giftIdx);
        this.pointer.visible = false;
        this._audioBgChannel.stop();
        this._audioClick.play(0, 1);
        this._audioRotation.play(0, 1);
    }

    //指针转到哪一项
    public turnTable(resultNum: number) {
		if (this._isplaying == false) {
			this._isplaying = true;
			let resultAngle = resultNum * 45 + 5 * 360 + 30;
			this.showAnimation(5000, resultAngle);
		}
	}
 
    //播放转到多少角度的动画
    private _tween: egret.Tween;
    public showAnimation(time: number, resultAngle: number): void {
        let self = this;
        this._tween = egret.Tween.get(self.circle_inside).to({ rotation: resultAngle }, time, egret.Ease.cubicInOut).call(function () { 
            self._isplaying = false;
            if(self._giftType != "") { //成功
                console.log("成功" + self._giftName);
                self.zhuanPanGroup.visible = false;
                self.winGroup.visible = true;
                self.giftNameLabel.text = self._giftName;
                self._audioVictory.play(0, 1);
            }else{ //失败
                self.failGroup.visible = true;
                console.log("失败");
            }
        });
    }

    //动画
    private startTween():void{
        //手指头放大缩小
        let tw = egret.Tween.get(this.pointer, {loop: true});
        tw.to({scaleX:1.3, scaleY:1.3}, 300, egret.Ease.sineIn).to({scaleX:1, scaleY:1}, 300, egret.Ease.sineOut);

        //灯闪烁的效果
        let tw2 = egret.Tween.get(this.circle_light, {loop: true});
        tw2.to({alpha: 0}, 100, egret.Ease.sineIn).to({alpha: 1}, 100, egret.Ease.sineOut);
    }

    //信息通知栏切换
    private noticeChange():void {
        var noticeLen:any = 0;
        var that = this;
        setInterval(function(){
            if(noticeLen == 8) {
                noticeLen = 0;
            }
            that.notice1.texture = RES.getRes("barrage_" + noticeLen + "_png");
            noticeLen++;
        }, 2000);
    }

}