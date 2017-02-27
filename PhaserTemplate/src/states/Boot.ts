module PhaserTemplate.Client {

	export class Boot extends Phaser.State {
		preload() {
			// loading for Preloader if it needed
		}

		create() {
			this.stage.setBackgroundColor(0xDDDDDD);

			this.input.maxPointers = 1;

			// если true то игра старается не останавливаться теряя фокус
			this.stage.disableVisibilityChange = true;

			// SCALE MNG
			ScaleManager.init(this.game, Config.DOM_PARENT_ID, Config.GW, Config.GH, Config.GSW, Config.GSH);

			// CREDITS in console
			LogMng.logSystem('Created by MonaxGames studio', 'http://monaxgames.com');

			// FILL PARAMS
			Params.isIOS = //true || // uncomment for testing
				this.game.device.iOS ||
				this.game.device.iPhone ||
				this.game.device.iPhone4 ||
				this.game.device.iPad ||
				this.game.device.macOS ||
				this.game.device.safari ||
				this.game.device.mobileSafari;

			// little pause
			this.time.events.add(100, this.onWaitComplete, this);
		}

		onWaitComplete() {
			this.game.state.start(States.PRELOADER, true, false);
		}

	}

}