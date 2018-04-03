module PhaserGame.Client {

  export class Boot extends Phaser.State {
    preload() {
      this.load.atlasJSONArray('loading', './assets/atlases/loading.png', './assets/atlases/loading.json');
    }

    create() {
      this.stage.setBackgroundColor(0x6600CC);
      this.input.maxPointers = 1;
      // если true то игра старается не останавливаться теряя фокус
      this.stage.disableVisibilityChange = true;

      // SCALE MNG
      ScaleManager.init(this.game, Config.DOM_PARENT_ID, Config.GW, Config.GH, Config.GSW, Config.GSH);

      // LogMng settings
      if (IS_RELEASE) LogMng.setMode(LogMng.MODE_RELEASE);
      LogMng.system('current log mode: ' + LogMng.getMode());

      // FILL PARAMS
      Params.isTapToStartBtn = //true || // uncomment for testing
        this.game.device.iOS ||
        this.game.device.iPhone ||
        this.game.device.iPhone4 ||
        this.game.device.iPad ||
        this.game.device.mobileSafari;

      // little pause
      this.time.events.add(100, this.onWaitComplete, this);
    }

    onWaitComplete() {
      this.game.state.start(States.PRELOADER, true, false);
    }

  }

}