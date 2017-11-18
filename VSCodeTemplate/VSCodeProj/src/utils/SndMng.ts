namespace SndMng {
	// musics
	export const MUSIC_MENU = 'music_main_menu';
	export const MUSIC_GAME = 'music_game';
	
	// sfx
  export const SFX_CLICK = 'click';

	// loading sounds
	export const LOAD_SOUNDS = [MUSIC_MENU, MUSIC_GAME, SFX_CLICK];

  // local params
	const MUS_MAX_VOL = 1;

	// local vars
	var game: Phaser.Game;
	var enabled: boolean;
	//var music: Phaser.Sound = null;
	var musics: any[] = []; // of { name: str, mus: Phaser.Sound }
	
	
	function getMusic(aName: string): Phaser.Sound {
		for (var i = 0; i < musics.length; i++) {
			var data = musics[i];
			if (data.name == aName)
				return data.mus;
		}
		return null;
	}
  
	export function init(aGame: Phaser.Game, aEnabled: boolean) {
		game = aGame;
		enabled = aEnabled;
	}

	export function playMusic(aName: string, aVolFrom = 0, aVolEnd = 1, aDuration: number = 500) {
		if (!enabled) return;
		if (aVolEnd > MUS_MAX_VOL) aVolEnd = MUS_MAX_VOL;
		// create music
		var music = game.add.audio(aName, aVolFrom, true);
		music.volume = aVolFrom;
		music.play();
		game.add.tween(music).to({ volume: aVolEnd }, aDuration, Phaser.Easing.Linear.None, true);
		musics.push({name: aName, mus: music});
	}

  function stopMusicById(id: number, aVol: number = 0, aDuration: number = 500) {
    try {
      var data = musics[id];
      var music: Phaser.Sound = data.mus;
      var tw = game.add.tween(music).to({ volume: aVol }, aDuration, Phaser.Easing.Linear.None, true);
      tw.onComplete.add(
        function (mus: Phaser.Sound) { mus.stop(); },
        null, null, music);
      musics.splice(id, 1);  
    } catch (e) {
      LogMng.error('SndMng.stopMusicById: ' + e);
    }
    
	}

	export function stopMusicByName(aName: string, aVol: number = 0, aDuration: number = 500) {
		for (var i = musics.length - 1; i >= 0; i++) {
			var data = musics[i];
			if (data.name == aName) {
				stopMusicById(i, aVol, aDuration);
			}
		}
	}

	export function stopAllMusic(aVol: number = 0, aDuration: number = 500) {
		for (var i = musics.length - 1; i >= 0; i--) {
			stopMusicById(i);
		}
	}
	
	export function setEnabled(aEnabled: boolean) {
		enabled = aEnabled;
		if (enabled) {
			//fadeInMusic();
		}
		else {
			stopAllMusic();
		}
	}

	export function getEnabled(): boolean {
		return enabled;
	}

	export function sfxPlay(aName: string, aVol = 1): Phaser.Sound {
    if (!enabled) return;
    var snd = game.add.audio(aName, aVol);
    snd.play();
		return snd;
	}
  
  export function update(dt: number) {
    
  }

}