class ObjAvgValueUtils {
	private game: Phaser.Game;

	private gh = Config.GH;
	private gsh = Config.GSH;
	private press_perc_y: number = 0; // процент сжатия до safe area по Y

	private itemsYPos: Array<any> = [];
	private itemsScale: Array<any> = [];
	private itemsUni: Array<any> = [];

	private updateTimer: number = 0;
	private UPD_TIME = 0.1; // sec

	constructor(aGame: Phaser.Game) {
		this.game = aGame;
	}

	private getValue(aVals: Array<any>, aPerc: number): number {
		var res = 0;
		var p = aPerc;
		var p1 = 0;
		var v1 = 0;
		var p2 = 0;
		var v2 = 0;
		for (var i = 0; i < aVals.length; i++) {
			if (aVals[i].p <= aPerc) {
				p1 = aVals[i].p;
				v1 = aVals[i].v;
			}
			else {
				p2 = aVals[i].p;
				v2 = aVals[i].v;
				break;
			}
		}

		res = v1 + (v2 - v1) * (p - p1) / (p2 - p1);

		//console.log('==================');
		//console.log('p = ' + p);
		//console.log('p1 = ' + p1);
		//console.log('v1 = ' + v1);
		//console.log('p2 = ' + p2);
		//console.log('v2 = ' + v2);
		//console.log('res = ' + res);

		return res;
	}

	getValueFromVals(vals: Array<any>): number {
		return this.getValue(vals, this.press_perc_y * 100);
	}

	/**
	 * 
	 * @param aObj
	 * @param aField - изменяемое поле объекта
	 * @param aVals - массив значений для процентов: [{p: 0, v: 120}, {p: 100, v: 230}]
	 */
	addItem(aObj: any, aField: string, aVals: Array<any>) {
		this.itemsUni.push({ o: aObj, f: aField, v: aVals });
	}

	removeItem(aObj: any) {
		for (var i = this.itemsUni.length - 1; i >= 0; i--) {
			try {
				if (this.itemsUni[i]['o'] == aObj)
					this.itemsUni.splice(i, 1);
			}
			catch (e) {
				LogMng.error('ObjAvgValueUtils.removeItem: ' + e);
			}
		}
	}

	update(dt: number) {

		var gvh = ScaleManager.gameViewH;
		this.press_perc_y = (this.gh - gvh) / (this.gh - this.gsh); // процент сжатия до safe area по Y

		this.updateTimer -= dt;
		if (this.updateTimer > 0) return;
		this.updateTimer = this.UPD_TIME;
		
		// позиционирование
		//for (var i = 0; i < this.itemsYPos.length; i++) {			
		//	var obj: any = this.itemsYPos[i].obj;
		//	var y0 = this.itemsYPos[i].y0;
		//	var sa_y = this.itemsYPos[i].ysa;
		//	var dy = sa_y - y0;
		//	obj.y = y0 + dy * perc;
		//}
		
		for (var i = this.itemsUni.length - 1; i >= 0; i--) {
			try {
				var obj: any = this.itemsUni[i].o;
				obj[this.itemsUni[i].f] = this.getValueFromVals(this.itemsUni[i].v);
				obj = null;
			}
			catch (e) {
				//LogMng.warn('obj == null, deleted...');
				this.itemsUni.splice(i, 1);
			}
		}

	}

}