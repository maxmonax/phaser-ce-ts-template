class ObjAvgValueUtils {
  private game: Phaser.Game;
  // объекты с зависимостью от процентов
  private itemsPerc: Array<any> = [];
  // объекты с зависимостью от значений
  private itemsVals: Array<any> = [];

  private updateTimer: number = 0;
  private UPD_TIME = 0.1; // sec

  constructor(aGame: Phaser.Game) {
    this.game = aGame;
    this.itemsPerc = [];
    this.itemsVals = [];
  }

  private getValueFromPerc(aVals: Array<any>, aPerc: number): number {
    var res = 0;
    var p = aPerc;
    var minData: any;
    var maxData: any;
    for (var i = 0; i < aVals.length; i++) {
      if (aVals[i].p <= aPerc && (!minData || aVals[i].p > minData.p)) {
        minData = aVals[i];
      }
      if (aVals[i].p > aPerc && (!maxData || aVals[i].p < maxData.p)) {
        maxData = aVals[i];
      }
    }

    if (minData && maxData) {
      var v1 = minData.v;
      var p1 = minData.p;
      var v2 = maxData.v;
      var p2 = maxData.p;
      res = v1 + (v2 - v1) * (p - p1) / (p2 - p1);
    }
    else if (minData) {
      res = minData.v;
    }
    else if (maxData) {
      res = maxData.v;
    }
    //console.log('==================');
    //console.log('p = ' + p);
    //console.log('p1 = ' + p1);
    //console.log('v1 = ' + v1);
    //console.log('p2 = ' + p2);
    //console.log('v2 = ' + v2);
    //console.log('res = ' + res);
    return res;
  }

  private updatePercObj(aObjData: any) {
    var min = aObjData.min;
    var max = aObjData.max;
    var cval = aObjData.ov[aObjData.fv];
    // расчёт процента значения
    var perc = 100 * (cval - min) / (max - min);
    aObjData.o[aObjData.f] = this.getValueFromPerc(aObjData.vals, perc);
  }

  /**
	 * Добавления зависимости значения поля объекта от процентов сжатия значений второго объекта.
   * @param aObjVal объект задающий проценты
   * @param aFieldVal поле задающее проценты
   * @param aMax максимальное значение задающей величины
   * @param aMin минимальное значение задающей величины
   * @param aObj зависимый объект
   * @param aField изменяемое поле зависемого объекта
   * @param aVals массив зависимых значений относительно процентов: [{p: 0, v: 120}, {p: 100, v: 230}]
   */
  addItemPercVals(aObjVal: any, aFieldVal: string, aMax: number, aMin: number, aObj: any, aField: string, aVals: Array<any>) {
    this.itemsPerc.push({ ov: aObjVal, fv: aFieldVal, min: aMin, max: aMax, o: aObj, f: aField, vals: aVals });
  }

  removeItemPerc(aObj: any) {
    for (var i = this.itemsPerc.length - 1; i >= 0; i--) {
      try {
        if (this.itemsPerc[i]['o'] == aObj)
          this.itemsPerc.splice(i, 1);
      }
      catch (e) {
        LogMng.error('ObjAvgValueUtils.removeItem: ' + e);
      }
    }
  }

  update() {
    var dt = this.game.time.elapsed * 0.001;
    this.updateTimer -= dt;
    if (this.updateTimer > 0) return;
    this.updateTimer = this.UPD_TIME;

    for (var i = this.itemsPerc.length - 1; i >= 0; i--) {
      try {
        this.updatePercObj(this.itemsPerc[i]);
      }
      catch (e) {
        this.itemsPerc.splice(i, 1);
      }
    }
  }

}