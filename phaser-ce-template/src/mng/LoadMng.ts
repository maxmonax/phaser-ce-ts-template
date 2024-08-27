namespace LoadMng {

	export class SceneLoader {
		private game: Phaser.Game;
		isLoadingComplete = false;

		constructor(game) {
			this.game = game;
		}

		startLoading() {
			//var loader = new Phaser.Loader(this.game);
			//loader.atlasJSONArray('game2', './assets/atlases/game2.png', './assets/atlases/game2.json');
			//loader.atlasJSONArray('game3', './assets/atlases/game3.png', './assets/atlases/game3.json');
			//loader.onLoadComplete.addOnce(this.onLoading1Complete, this);
			//loader.start();
			this.onLoading1Complete();
		}

		onLoading1Complete() {
			LogMng.debug('LoadMng: loading complete!');
			this.isLoadingComplete = true;
		}

	}

}