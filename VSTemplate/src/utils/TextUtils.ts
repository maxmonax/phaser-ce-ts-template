namespace TextUtils {

	// добавляет нули к числу в начало
	export function addZero(aNum: number, aLen: number): string {
		var text: string = String(aNum);
		while (text.length < aLen) text = '0' + text;
		return text;
	}

	export function sizingBitmapTextByW(aBmpText: Phaser.BitmapText, aW: number, aInc: boolean, aDec: boolean) {
		if (aBmpText.text == '' || aBmpText.height == 0 || aBmpText.width == 0) {
			LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.text == ""');
			LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.width = ' + aBmpText.width);
			LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.height = ' + aBmpText.height);
			return;
		}

		if (aInc) {
			if (aBmpText.width < aW) {
				while (aBmpText.width < aW) {
					aBmpText.fontSize++;
				}
			}
		}

		if (aDec) {
			if (aBmpText.width > aW) {
				while (aBmpText.width > aW) {
					aBmpText.fontSize--;
				}
			}
		}
	}

	export function sizingBitmapTextByH(aBmpText: Phaser.BitmapText, aH: number, aInc: boolean, aDec: boolean) {
		if (aBmpText.text == '' || aBmpText.height == 0 || aBmpText.width == 0) {
			LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.text == ""');
			LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.width = ' + aBmpText.width);
			LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.height = ' + aBmpText.height);
			return;
		}

		if (aInc) {
			if (aBmpText.height < aH) {
				while (aBmpText.height < aH) {
					aBmpText.fontSize++;
				}
			}
		}

		if (aDec) {
			if (aBmpText.height > aH) {
				while (aBmpText.height > aH) {
					aBmpText.fontSize--;
				}
			}
		}
	}

}