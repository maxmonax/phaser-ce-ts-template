namespace LogMng {
	export const DEBUG = 'DEBUG';
	export const INFO = 'INFO';
	export const NETWORK = 'NETWORK';
	export const WARNING = 'WARNING';
	export const ERROR = 'ERROR';

	export var levels: Array<string> = [DEBUG, INFO, NETWORK, WARNING, ERROR];

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

	export function logSystem(message: string, link: string) {
		console.log("%c %c %c %s %c %c %c %c%s",
			getCSS('#5C6166'), getCSS('#4F5357'),
			getCSS('#313335'), message,
			getCSS('#4F5357'), getCSS('#5C6166'),
			getLink('none'), getLink('none'), link
		);
	}

	export function log(message: string, level: string = DEBUG) {
		if (levels.indexOf(level) < 0)
			return;

		var css = '';
		switch (level) {
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

		console.log("%c%s", css, level, message);
	};
}