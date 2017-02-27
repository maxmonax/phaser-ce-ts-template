class ScaleManager {
	private static game: Phaser.Game;
	private static dom_id: string = '';
	private static dom: HTMLElement;
	// game maximum size
	private static game_w: number;
	private static game_h: number;
	// game save area size
	private static game_sw: number;
	private static game_sh: number;

	// смещение контейнера игры по результатам скейлинга, для центрирования
	public static dtx: number = 0;
	public static dty: number = 0;

	// реально видимые ширина и высота в размерах истинного разрешения игры
	public static gameViewW: number;
	public static gameViewH: number;

	// orientation
	public static isPortrait: boolean;
	public static onOrientationChange: Phaser.Signal = new Phaser.Signal(); // orientation change event
	
	public static init(aGame: Phaser.Game, aDomId: string, GW: number, GH: number, GSW: number, GSH: number) {
		this.game = aGame;
		this.dom_id = aDomId;
		this.dom = document.getElementById(this.dom_id);

		this.game_w = GW;
		this.game_h = GH;
		this.game_sw = GSW;
		this.game_sh = GSH;

		aGame.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

		ScaleManager.SizeCalculation();

		window.onresize = () => {
			ScaleManager.SizeCalculation();
		};
	}

	private static doEventOriChange() {
		this.onOrientationChange.dispatch(this.isPortrait);
	}

	public static SizeCalculation() {
		var wnd = {
			w: window.innerWidth,
			h: window.innerHeight
		};
		
		var g = {
			w: ScaleManager.game_w,
			h: ScaleManager.game_h,
			sw: ScaleManager.game_sw,
			sh: ScaleManager.game_sh
		}

		var gw: number;
		var gh: number;

		// determine game size
		if (g.h / g.w > wnd.h / wnd.w) {
			// game compressed window HEIGHT, black borders on the LEFT and the RIGHT
			if (g.sh / g.w > wnd.h / wnd.w) {
				// A
				gh = wnd.h * g.h / g.sh;
				gw = gh * g.w / g.h;
			} else {
				// B
				gw = wnd.w;
				gh = gw * g.h / g.w;
			}
		} else {
			// game compressed window WIDTH, black borders on the TOP and the BOT
			if (g.h / g.sw > wnd.h / wnd.w) {
				// C
				gh = wnd.h;
				gw = gh * g.w / g.h;
			} else {
				// D
				gw = wnd.w * g.w / g.sw;
				gh = gw * g.h / g.w;
			}
		}

		// game scale
		var sclX = gw / g.sw;
		var sclY = gh / g.sh;
		var newScale = Math.min(sclX, sclY);
		ScaleManager.game.scale.setUserScale(newScale, newScale, 0, 0);

		// game dt xy
		this.dtx = (wnd.w - gw) / 2;
		this.dty = (wnd.h - gh) / 2;

		this.gameViewW = this.game_w + 2 * this.dtx / newScale;
		if (this.gameViewW > this.game_w) this.gameViewW = this.game_w;

		this.gameViewH = this.game_h + 2 * this.dty / newScale;
		if (this.gameViewH > this.game_h) this.gameViewH = this.game_h;

		this.dom.style.marginLeft = Math.round(this.dtx).toString() + 'px';
		this.dom.style.marginTop = Math.round(this.dty).toString() + 'px';
		this.dom.style.maxWidth = String(gw) + 'px';
		this.dom.style.maxHeight = String(gh) + 'px';

		ScaleManager.game.scale.refresh();

		// orientation check
		var oldOri = this.isPortrait;
		this.isPortrait = wnd.h > wnd.w;
		if (this.isPortrait != oldOri)
			this.doEventOriChange();
	}

	private static handleIncorrect() {
		if (!this.game.device.desktop) {
			document.getElementById("turn").style.display = "block";
			ScaleManager.game.world.isPaused = true;
		}
	}

	private static handleCorrect() {
		if (!this.game.device.desktop) {
			document.getElementById("turn").style.display = "none";
			ScaleManager.game.world.isPaused = false;
		}
		setTimeout("window.scrollTo(0,0)", 1000);
	}

}

