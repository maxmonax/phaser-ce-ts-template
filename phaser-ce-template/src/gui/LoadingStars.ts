module PhaserGame {

	export class LoadingStars extends Phaser.Sprite {
		private pic: Phaser.Sprite;

		constructor(game, x, y) {
			super(game, x, y);
			this.pic = new Phaser.Sprite(this.game, 0, 0, 'loading', 'loading_stars0001');
			this.pic.anchor.set(0.5);
			this.pic.animations.add('loading',
				Phaser.Animation.generateFrameNames('loading_stars', 1, 9, '', 4), 12, true);
			this.pic.play('loading');
			this.addChild(this.pic);
		}

	}

}