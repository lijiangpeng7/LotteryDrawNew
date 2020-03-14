var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.getInstance = function () {
        if (this._manager === null) {
            this._manager = new SceneManager();
        }
        return this._manager;
    };
    SceneManager.prototype.goScene = function (s) {
        // this.rootScene
        if (this.currentScene) {
            this.rootScene.removeChild(this.currentScene);
            this.currentScene = null;
        }
        this.rootScene.addChild(s);
        this.currentScene = s;
    };
    SceneManager._manager = null;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map