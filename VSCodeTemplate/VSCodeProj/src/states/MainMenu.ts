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

      
      // full area border
      var fullArea = new Phaser.Graphics(this.game, Config.GW / 2, Config.GH / 2);
      fullArea.beginFill(0, 0);
      fullArea.lineStyle(6, 0xAA0000, 1);
      fullArea.drawRect(-Config.GW / 2, -Config.GH / 2, Config.GW, Config.GH);
      fullArea.endFill();
      this.mainDummy.addChild(fullArea);

      var faText = new Phaser.Text(this.game, 25, 20, 'Full Area: ' + Config.GW + 'x' + Config.GH);
      faText.addColor('#AA0000', 0);
      this.mainDummy.addChild(faText);


      // safe area border
      var safeArea = new Phaser.Graphics(this.game, Config.GW / 2, Config.GH / 2);
      safeArea.beginFill(0, 0);
      safeArea.lineStyle(6, 0x00AA00, 1);
      safeArea.drawRect(-Config.GSW / 2, -Config.GSH / 2, Config.GSW, Config.GSH);
      safeArea.endFill();
      this.mainDummy.addChild(safeArea);

      var saText = new Phaser.Text(this.game,
        Config.GW / 2 - Config.GSW / 2 + 25,
        Config.GH / 2 - Config.GSH / 2 + 20,
        'Safe Area: ' + Config.GSW + 'x' + Config.GSH);
      saText.addColor('#00AA00', 0);
      this.mainDummy.addChild(saText);


			this.btnPlay = new Phaser.Button(this.game, Config.GW / 2, Config.GH / 2, 'game',
				this.onPlayClick, this, 'Button_013', 'Button_013');
      this.btnPlay.anchor.set(0.5);
      this.mainDummy.addChild(this.btnPlay);

      this.oav.addItemPercVals(ScaleManager, 'gameViewW', Config.GSH, Config.GH, this.btnPlay, 'y', [{ p: 0, v: Config.GH / 2 + 300 }, { p: 100, v: Config.GH / 2 + 250 }])

			SndMng.playMusic(SndMng.MUSIC_MENU, 0, 1, 1000);
		}

		private onPlayClick() {
      this.game.state.start(States.GAME, true, false);
		}

		update() {
			var dt = this.game.time.elapsed * 0.001;

			this.oav.update();
		}

	}

}