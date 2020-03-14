
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

    //私有属性
    private isplaying:boolean = false;

    public onComplete() {
        egret.log("第一个场景加载完成");
        this.noticeChange();
        this.startTween();
        this.playBGM();
        this.pointer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPointerClick,this);
    }

    //播放音乐
    private playBGM() {
        var sound:egret.Sound = RES.getRes("audio_bg_mp3");
        sound.play();
    }

    //点击按钮
    private onPointerClick() {
        console.log('抽奖')
        this.turnTable(3);
    }

    //指针转到哪一项
    public turnTable(resultNum: number) {
		if (this.isplaying == false) {
			this.isplaying = true;
			let resultAngle = resultNum * 45 + 5 * 360;
			this.showAnimation(5000, resultAngle);
		}
	}
 
    //播放转到多少角度的动画
    private _tween: egret.Tween;
    public showAnimation(time: number, resultAngle: number): void {
        let self = this;
        this._tween = egret.Tween.get(self.circle_inside).to({ rotation: resultAngle }, time, egret.Ease.cubicInOut).call(function () { self.isplaying = false; });
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
            // console.log(RES.getRes("barrage_" + noticeLen + "_png"));
            that.notice1.texture = RES.getRes("barrage_" + noticeLen + "_png");
            noticeLen++;
        }, 2000);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}