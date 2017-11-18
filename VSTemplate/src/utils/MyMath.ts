namespace MyMath {

	export class RectABCD {
		a: Phaser.Point;
		b: Phaser.Point;
		c: Phaser.Point;
		d: Phaser.Point;
		constructor(a: Phaser.Point, b: Phaser.Point, c: Phaser.Point, d: Phaser.Point) {
			this.a = a; this.b = b; this.c = c; this.d = d;
		}
	}

	export function randomInRange(aMin: number, aMax: number): number {
		return Math.random() * Math.abs(aMax - aMin) + aMin;
	}

	export function randomIntInRange(aMin: number, aMax: number): number {
		return Math.round(randomInRange(aMin, aMax));
	}

	export function toRadian(aDeg: number): number {
		return aDeg * Math.PI / 180;
	}

	export function toDeg(aRad: number): number {
		return aRad * 180 / Math.PI;
	}
	
	export function IsPointInTriangle(ax, ay, bx, by, cx, cy, px, py: number): boolean {
		var b0x, b0y, c0x, c0y, p0x, p0y: number;
		var m, l: number; // мю и лямбда
		var res = false;
		// переносим треугольник точкой А в (0;0).
		b0x = bx - ax; b0y = by - ay;
		c0x = cx - ax; c0y = cy - ay;
		p0x = px - ax; p0y = py - ay;
		//
		m = (p0x * b0y - b0x * p0y) / (c0x * b0y - b0x * c0y);
		if (m >= 0 && m <= 1) {
			l = (p0x - m * c0x) / b0x;
			if (l >= 0 && (m + l) <= 1)
				res = true;
		}
		return res;
	}
	
	export function isPointInRect(rect: RectABCD, p: Phaser.Point): boolean {
		return IsPointInTriangle(rect.a.x, rect.a.y, rect.b.x, rect.b.y, rect.c.x, rect.c.y, p.x, p.y) &&
			IsPointInTriangle(rect.c.x, rect.c.y, rect.d.x, rect.d.y, rect.a.x, rect.a.y, p.x, p.y);
	}

	export function isCirclesIntersect(x1, y1, r1, x2, y2, r2: number): boolean {
		var veclen = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
		return veclen <= r1 + r2;
	}

}