
class FirstScene extends Scene{
    private group: eui.Group;
    public constructor() {
        super();
        this.skinName = "resource/game/firstSkin.exml";
    }
    noticeBg: eui.Image;
    notice1: eui.Image;
    public onComplete() {
        egret.log("第一个场景加载完成");
        var noticeLen:any = 0;
        let that = this;
        setInterval(function(){
            if(noticeLen == 8) {
                noticeLen = 0;
            }
            console.log(RES.getRes("barrage_" + noticeLen + "_png"));
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