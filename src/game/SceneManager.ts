class SceneManager {
    private static _manager: SceneManager = null;
    public rootScene: eui.UILayer;
    public firstScene: Scene;
    public currentScene: Scene;
    public static getInstance(): SceneManager {
        if(this._manager === null) {
            this._manager = new SceneManager();
        }
        return this._manager;
    }
    public goScene(s: Scene) {
        // this.rootScene
        if(this.currentScene) {
            this.rootScene.removeChild(this.currentScene);
            this.currentScene = null;
        }
        this.rootScene.addChild(s);
        this.currentScene = s;
    }
}