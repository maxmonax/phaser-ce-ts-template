module PhaserGame {

	export class CrumbParticle extends Phaser.Sprite {
		liveTime: number;
		// velocity
		vx = 0;
		vy = 0;
		// acc (grav)
		ax = 0;
		ay = 0;
		// затухание
		fx = 1;
		fy = 1;
		// rot spd
		rotSpd = 0;
		p_scale = 1;

		isDead = false;

		liveTimer: number = 0;

		constructor(game, x, y, key: string, frame: string) {
			super(game, x, y, key, frame);
			this.anchor.set(0.5);
		}

		reUse() {
			this.liveTimer = this.liveTime;
			this.isDead = false;
			this.scale.set(0);
			this.alpha = 1;
			this.game.add.tween(this.scale).to({ x: this.p_scale, y: this.p_scale }, 200, Phaser.Easing.Linear.None, true).chain(
				this.game.add.tween(this.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, false, 600)
			);
			//this.addChild(this.spark);
		}

		update() {
			if (this.isDead) return;

			var dt = this.game.time.elapsed * 0.001;

			//LogMng.debug('part vx = ' + this.vx);
			//LogMng.debug('part vy = ' + this.vy);

			this.vx *= this.fx;
			this.vy *= this.fy;

			this.vx += this.ax * dt;
			this.vy += this.ay * dt;

			this.x += this.vx * dt;
			this.y += this.vy * dt;

			this.rotation += this.rotSpd * dt;

			this.liveTimer -= dt;
			if (this.liveTimer <= 0) {
				this.isDead = true;
			}
		}

	}

}