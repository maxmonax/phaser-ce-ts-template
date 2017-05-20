namespace LogMng {
	export const MODE_DEBUG = 'MODE_DEBUG';
	export const MODE_RELEASE = 'MODE_RELEASE';

	const DEBUG = 'DEBUG';
	const INFO = 'INFO';
	const NETWORK = 'NETWORK';
	const WARNING = 'WARNING';
	const ERROR = 'ERROR';

	// current mode
	var mode: string = MODE_DEBUG;
	// available levels
	var levels: Array<string> = [DEBUG, INFO, NETWORK, WARNING, ERROR];

	export function setMode(aMode: string) {
		this.mode = aMode;
		switch (this.mode) {
			case MODE_DEBUG:
				levels = [DEBUG, INFO, NETWORK, WARNING, ERROR];
				break;
			case MODE_RELEASE:
				levels = [WARNING, ERROR];
				break;
		}
	}

	export function getMode(): string {
		return mode;
	}

	function getCSS(bgColor: string): string {
		return 'background: ' + bgColor + ';' +
			'background-repeat: no-repeat;' +
			'color: #1df9a8;' +
			'line-height: 16px;' +
			'padding: 1px 0;' +
			'margin: 0;' +
			'user-select: none;' +
			'-webkit-user-select: none;' +
			'-moz-user-select: none;';
	};

	function getLink(color: string): string {
		return 'background: ' + color + ';' +
			'background-repeat: no-repeat;' +
			'font-size: 12px;' +
			'color: #446d96;' +
			'line-height: 14px';
	};
	
	function log(aMsg: string, aLevel: string = DEBUG) {
		if (levels.indexOf(aLevel) < 0)
			return;

		var css = '';
		switch (aLevel) {
			case INFO:
				css = 'background: #308AE4; color: #fff; padding: 1px 4px';
				break;

			case WARNING:
				css = 'background: #f7a148; color: #fff; padding: 1px 4px';
				break;

			case ERROR:
				css = 'background: #DB5252; color: #fff; padding: 1px 4px';
				break;

			case NETWORK:
				css = 'background: #7D2998; color: #fff; padding: 1px 4px';
				break;

			case DEBUG:
			default:
				css = 'background: #ADADAD; color: #fff; padding: 1px 4px';
		}

		console.log("%c%s", css, aLevel, aMsg);
	};

	export function system(aMsg: string, aLink: string = '') {
		console.log("%c %c %c %s %c %c %c %c%s",
			getCSS('#5C6166'), getCSS('#4F5357'),
			getCSS('#313335'), aMsg,
			getCSS('#4F5357'), getCSS('#5C6166'),
			getLink('none'), getLink('none'), aLink
		);
	}

	export function debug(aMsg: string) {
		log(aMsg, DEBUG);
	}

	export function info(aMsg: string) {
		log(aMsg, INFO);
	}
	
	export function net(aMsg: string) {
		log(aMsg, NETWORK);
	}

	export function warn(aMsg: string) {
		log(aMsg, WARNING);
	}

	export function error(aMsg: string) {
		log(aMsg, ERROR);
	}

}