module PhaserGame.Client {

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
			
			var sndFiles = SndMng.LOAD_SOUNDS;
			for (var i = 0; i < sndFiles.length; i++) {
				var ogg = './assets/sounds/ogg/' + sndFiles[i] + '.ogg';
				var mp3 = './assets/sounds/mp3/' + sndFiles[i] + '.mp3';
				var m4a = './assets/sounds/m4a/' + sndFiles[i] + '.m4a';
				this.load.audio(sndFiles[i], [ogg, mp3, m4a]);
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