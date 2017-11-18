module PhaserGame.Client {

	export class Game extends Phaser.State {

		create() {
			// physics init example
			//this.physics.startSystem(Phaser.Physics.ARCADE);

			

			SndMng.stopAllMusic();
			SndMng.playMusic(SndMng.MUSIC_GAME);
		}

		update() {

		}

	}

}