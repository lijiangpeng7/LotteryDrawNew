
abstract class Scene extends eui.Component{
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
    }
    protected abstract onComplete();
 
}