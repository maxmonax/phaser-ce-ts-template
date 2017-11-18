namespace SndMng {
	export const MUSIC = 'music';

	export const SFX_CLICK_1 = 'click';
	//export const SFX_CLICK_2 = 'click_02';

	// примеры наборов звуков
	//export const SFX_STAR1 = 'star_01';
	//export const SFX_STAR2 = 'star_02';
	
	const musics = [MUSIC];
	const sfx_click = [SFX_CLICK_1];
	//const sfx_stars = [SFX_STAR1, SFX_STAR2];

	export const LOAD_SOUNDS = musics.concat(musics, sfx_click);

	const MUS_MAX_VOL = 1;

	var game: Phaser.Game;
	var enabled: boolean;
	var music: Phaser.Sound = null;
	
	export function init(aGame: Phaser.Game, aEnabled: boolean) {
		game = aGame;
		enabled = aEnabled;
	}

	export function fadeInMusic(aVolFrom = 0, aVolEnd = 1, aDuration: number = 500) {
		if (aVolEnd > MUS_MAX_VOL)
			aVolEnd = MUS_MAX_VOL;

		// create music
		if (music == null)
			music = game.add.audio(MUSIC, aVolFrom, true);

		if (enabled) {
			game.tweens.removeFrom(music);
			if (!music.isPlaying) {
				music.volume = aVolFrom;
				music.play();
			}
			game.add.tween(music).to({ volume: aVolEnd }, aDuration, Phaser.Easing.Linear.None, true);
		}
	}

	export function fadeOutMusic(aVol: number = 0, aDuration: number = 500): Phaser.Tween {
		game.tweens.removeFrom(music);
		return game.add.tween(music).to({ volume: aVol }, aDuration, Phaser.Easing.Linear.None, true);
	}
	
	export function setEnabled(aEnabled: boolean) {
		enabled = aEnabled;
		if (enabled) {
			fadeInMusic();
		}
		else {
			fadeOutMusic().onComplete.add(function () { music.stop(); });
		}
	}

	export function getEnabled(): boolean {
		return enabled;
	}

	export function sfxPlay(aName: string, aVol = 1) {
		if (!enabled) return;
		game.add.audio(aName, aVol).play();
	}
	
	export function sfxClick(aVol = 1) {
		// пример рандомизации звука из набора
		//sfxPlay(sfx_tramp[MyMath.randomIntInRange(0, sfx_tramp.length - 1)], aVol);
		sfxPlay(SFX_CLICK_1, aVol);
	}

}