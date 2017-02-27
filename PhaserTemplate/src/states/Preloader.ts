module PhaserTemplate.Client {

	export class Preloader extends Phaser.State {

		preload() {
			// json
			//this.load.json('config', './data/config.json');
			// atlases
			//this.load.atlasJSONArray('game', './assets/atlases/game.png', './assets/atlases/game.json');
			// fonts
			//this.load.bitmapFont('scores', './assets/fonts/font.png', './assets/fonts/font.xml');
			
			// SOUNDS LOADING
			SndMng.init(this.game, true);

			var sndFormat: string = 'ogg';
			if (Params.isIOS && this.game.device.m4a) {
				sndFormat = 'm4a';
			}
			else if (this.game.device.ie && this.game.device.mp3) {
				sndFormat = 'mp3';
			}

			var sndFiles = SndMng.LOAD_SOUNDS;
			for (var i = 0; i < sndFiles.length; i++) {
				var sndAddr = './assets/sounds/' + sndFormat + '/' + sndFiles[i] + '.' + sndFormat;
				this.load.audio(sndFiles[i], sndAddr);
			}
			
		}

		create() {
			// 'tap to start' for iOS
			if (Params.isIOS) {
				// TODO: image 'tap to start'
				//var ttp = this.add.sprite(this.world.centerX, this.world.centerY, 'preloader', 'TAP');
				//ttp.anchor.set(0.5);
				this.input.onDown.addOnce(this.startMainMenu, this);
			}
			else {
				this.startMainMenu();
			}
		}

		startMainMenu() {
			this.game.state.start(States.MAINMENU, true, false);
		}

	}

}