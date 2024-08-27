module PhaserGame {

	export class Effect extends Phaser.Sprite {
		private particles: SparkParticle[] = [];
		private buffer: SparkParticle[] = [];
		private addTimer = 0;

		addTime = 0.2; // secs
		//radius = 100;
		area_w = 100;
		area_h = 100;
		isActive = false;

		constructor(game, x, y) {
			super(game, x, y);
			//this.starParent = aStarParent;
		}

		addParticle() {
			//LogMng.debug('sp eff addParticle...');

			var p: SparkParticle;

			if (this.buffer.length > 0) {
				p = this.buffer.shift();
			}
			else {
				p = new SparkParticle(this.game, 0, 0, 'game', 'spark');
			}

			p.vx = 0;
			p.vy = 0;
			p.ay = 150;
			p.liveTime = 2;
			p.x = this.x + MyMath.randomInRange(-this.area_w / 2, this.area_w / 2);
			p.y = this.y + MyMath.randomInRange(-this.area_h / 2, this.area_h / 2);
			p.rotSpd = MyMath.randomInRange(3, 6);
			p.p_scale = this.scale.x;

			p.reUse();

			this.particles.push(p);
			if (this.parent != null)
				this.parent.addChild(p);
		}

		removeParticle(id: number) {
			try {
				this.particles[id].parent.removeChild(this.particles[id]);
				this.buffer = this.buffer.concat(this.particles.splice(id, 1));
			}
			catch (e) {
				LogMng.error('SparkEffect.removeParticle(): ' + e);
			}
		}

		update() {
			var dt = this.game.time.elapsed / 1000;

			this.addTimer -= dt;
			if (this.isActive && this.addTimer <= 0) {
				this.addTimer = this.addTime;
				this.addParticle();
			}

			for (var i = this.particles.length - 1; i >= 0; i--) {
				this.particles[i].update();
				if (this.particles[i].isDead) {
					this.removeParticle(i);
				}
			}
		}

	}

}