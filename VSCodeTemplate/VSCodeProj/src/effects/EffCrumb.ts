module PhaserGame.Client {

	export class EffCrumb extends Phaser.Sprite {
		private particles: CrumbParticle[] = [];
		private buffer: CrumbParticle[] = [];
		private addTimer = 0;

		//addTime = 0.2; // secs
		radius_min = 1;
    radius_max = 10;
    isInRadius = false;
		isActive = false;
		p_scale_min = 0.3;
		p_scale_max = 0.9;
		p_spd_min = 40;
		p_spd_max = 150;
		p_cnt = 10;

		useParent = false;
		
		crumbId = 0;

		constructor(game, x, y) {
			super(game, x, y);
			//this.starParent = aStarParent;
		}
		
		private addParticle() {
			var textur = 'crumb' + String(this.crumbId + 1);
      //LogMng.debug('EffBtn addParticle...');
			var p: CrumbParticle;

			if (this.buffer.length > 0) {
				p = this.buffer.shift();
				p.loadTexture('game', textur);
			}
			else {
				p = new CrumbParticle(this.game, 0, 0, 'game', textur);
			}

      p.ax = 0;
			p.ay = 300;
			p.fx = 0.95;
			p.fy = 0.99;
      p.liveTimer = 2;
      var an = MyMath.randomIntInRange(0, 2 * Math.PI);
      var len = this.radius_max;
      if (this.isInRadius)
        len = MyMath.randomIntInRange(this.radius_min, this.radius_max);
      p.x = Math.cos(an) * len; // MyMath.randomInRange(-this.area_w / 2, this.area_w / 2);
			p.y = Math.sin(an) * len; // MyMath.randomInRange(-this.area_h / 2, this.area_h / 2);
			//var spd = MyMath.randomInRange(this.p_spd_min, this.p_scale_max);
			p.vx = 0;
			p.vy = 0;
			p.vx = MyMath.randomInRange(-350, 350);
			p.vy = MyMath.randomInRange(-300, -100);
			p.rotSpd = MyMath.randomInRange(3, 6);
			p.p_scale = MyMath.randomInRange(this.p_scale_min, this.p_scale_max);
			p.reUse();
			
      if (this.useParent && this.parent != null) {
        p.x += this.x;
        p.y += this.y;
        this.parent.addChild(p);
      }
      else {
        this.addChild(p);
			}  

			this.particles.push(p);
		}

		private removeParticle(id: number) {
			try {
				this.particles[id].parent.removeChild(this.particles[id]);
				this.buffer = this.buffer.concat(this.particles.splice(id, 1));
			}
			catch (e) {
				LogMng.error('SparkEffect.removeParticle(): ' + e);
			}
		}

		doEffect() {
			for (var i = 0; i < this.p_cnt; i++) {
				this.addParticle();
			}
		}

		update() {
			var dt = this.game.time.elapsed * 0.001;

			for (var i = this.particles.length - 1; i >= 0; i--) {
				this.particles[i].update();
				if (this.particles[i].isDead) {
					this.removeParticle(i);
				}
			}
		}

	}

}