module PhaserGame.Client {

	export class MainMenu extends Phaser.State {
    private mainDummy: Phaser.Sprite;
    private btnPlay: Phaser.Button;
		private oav: ObjAvgValueUtils;

		create() {
			this.oav = new ObjAvgValueUtils(this.game);

			// just container for some elements
			this.mainDummy = new Phaser.Sprite(this.game, 0, 0);
			this.add.existing(this.mainDummy);

			this.btnPlay = new Phaser.Button(this.game, Config.GW / 2, Config.GH / 2, 'game',
				this.onPlayClick, this, 'Button_013', 'Button_013');
      this.btnPlay.anchor.set(0.5);
      this.mainDummy.addChild(this.btnPlay);

      this.oav.addItem(this.btnPlay, 'y', [{ p: 0, v: Config.GH / 2 + 300 }, { p: 100, v: Config.GH / 2 + 250 }])

			SndMng.playMusic(SndMng.MUSIC_MENU, 0, 1, 1000);
		}

		private onPlayClick() {
      this.game.state.start(States.GAME, true, false);
		}

		update() {
			var dt = this.game.time.elapsed * 0.001;

			this.oav.update(dt);
		}

	}

}