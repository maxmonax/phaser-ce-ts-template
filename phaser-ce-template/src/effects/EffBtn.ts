module PhaserGame {

	export class EffBtn extends Phaser.Sprite {
		private particles: SparkParticle[] = [];
		private buffer: SparkParticle[] = [];
		private addTimer = 0;

		addTime = 0.2; // secs
		radius = 50;
		isInRadius = false;
		//area_w = 90;
		//area_h = 90;
		isActive = false;
		p_scale = 1;

		useParent = false;

		constructor(game, x, y) {
			super(game, x, y);
			//this.starParent = aStarParent;
		}

		addParticle() {
			//LogMng.debug('EffBtn addParticle...');
			var p: SparkParticle;

			if (this.buffer.length > 0) {
				p = this.buffer.shift();
			}
			else {
				p = new SparkParticle(this.game, 0, 0, 'game', 'spark');
			}

			p.vx = 0;
			p.vy = 0;
			p.ax = 0;
			p.ay = 0;
			p.liveTimer = 2;
			var an = MyMath.randomIntInRange(0, 2 * Math.PI);
			var len = this.radius;
			if (this.isInRadius)
				len = MyMath.randomIntInRange(0, this.radius);
			p.x = Math.cos(an) * len; // MyMath.randomInRange(-this.area_w / 2, this.area_w / 2);
			p.y = Math.sin(an) * len; // MyMath.randomInRange(-this.area_h / 2, this.area_h / 2);
			p.rotSpd = MyMath.randomInRange(3, 6);
			p.p_scale = this.p_scale;
			p.reUse();

			this.particles.push(p);
			if (this.useParent && this.parent != null) {
				p.x += this.x;
				p.y += this.y;
				this.parent.addChild(p);
			}
			else {
				this.addChild(p);
			}
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
			var dt = this.game.time.elapsed * 0.001;

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