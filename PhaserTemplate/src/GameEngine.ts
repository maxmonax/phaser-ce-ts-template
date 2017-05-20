module PhaserGame.Client {

	export class GameEngine extends Phaser.Game {

		constructor() {
			super(Config.GW, Config.GH, Phaser.AUTO, Config.DOM_PARENT_ID, null);
			
			this.state.add(States.BOOT, Boot, false);
			this.state.add(States.PRELOADER, Preloader, false);
			this.state.add(States.MAINMENU, MainMenu, false);
			this.state.add(States.GAME, Game, false);

			this.state.start(States.BOOT);
		}
	}
}

window.onload = () => {
	new PhaserGame.Client.GameEngine();
};