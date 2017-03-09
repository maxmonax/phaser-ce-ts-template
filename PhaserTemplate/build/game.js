var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Config;
(function (Config) {
    Config.DOM_PARENT_ID = 'content';
    Config.GW = 960;
    Config.GH = 720;
    Config.GSW = 960;
    Config.GSH = 500;
})(Config || (Config = {}));
var Params;
(function (Params) {
    Params.isIOS = false;
})(Params || (Params = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                _super.call(this, Config.GW, Config.GH, Phaser.AUTO, Config.DOM_PARENT_ID, null);
                this.state.add(States.BOOT, Client.Boot, false);
                this.state.add(States.PRELOADER, Client.Preloader, false);
                this.state.add(States.MAINMENU, Client.MainMenu, false);
                this.state.add(States.GAME, Client.Game, false);
                this.state.start(States.BOOT);
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = PhaserTemplate.Client || (PhaserTemplate.Client = {}));
})(PhaserTemplate || (PhaserTemplate = {}));
window.onload = function () {
    new PhaserTemplate.Client.GameEngine();
};
var PhaserTemplate;
(function (PhaserTemplate) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
            };
            Boot.prototype.create = function () {
                this.stage.setBackgroundColor(0xCCCCCC);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                LogMng.system('Created by MonaxGames studio', 'http://monaxgames.com');
                ScaleManager.init(this.game, Config.DOM_PARENT_ID, Config.GW, Config.GH, Config.GSW, Config.GSH);
                LogMng.setMode(LogMng.MODE_DEBUG);
                LogMng.system('current log mode: ' + LogMng.getMode());
                LogMng.debug('debug log demo');
                LogMng.info('info log demo');
                LogMng.warn('warning log demo');
                LogMng.error('error log demo');
                LogMng.net('net log demo');
                Params.isIOS =
                    this.game.device.iOS ||
                        this.game.device.iPhone ||
                        this.game.device.iPhone4 ||
                        this.game.device.iPad ||
                        this.game.device.mobileSafari;
                this.time.events.add(100, this.onWaitComplete, this);
            };
            Boot.prototype.onWaitComplete = function () {
                this.game.state.start(States.PRELOADER, true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = PhaserTemplate.Client || (PhaserTemplate.Client = {}));
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Client;
    (function (Client) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                _super.apply(this, arguments);
            }
            Game.prototype.create = function () {
            };
            Game.prototype.update = function () {
            };
            return Game;
        }(Phaser.State));
        Client.Game = Game;
    })(Client = PhaserTemplate.Client || (PhaserTemplate.Client = {}));
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.apply(this, arguments);
            }
            MainMenu.prototype.create = function () {
                SndMng.fadeInMusic();
            };
            MainMenu.prototype.update = function () {
            };
            return MainMenu;
        }(Phaser.State));
        Client.MainMenu = MainMenu;
    })(Client = PhaserTemplate.Client || (PhaserTemplate.Client = {}));
})(PhaserTemplate || (PhaserTemplate = {}));
var PhaserTemplate;
(function (PhaserTemplate) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                _super.apply(this, arguments);
            }
            Preloader.prototype.preload = function () {
                SndMng.init(this.game, true);
                var sndFiles = SndMng.LOAD_SOUNDS;
                for (var i = 0; i < sndFiles.length; i++) {
                    var ogg = './assets/sounds/ogg/' + sndFiles[i] + '.ogg';
                    var mp3 = './assets/sounds/mp3/' + sndFiles[i] + '.mp3';
                    var m4a = './assets/sounds/m4a/' + sndFiles[i] + '.m4a';
                    this.load.audio(sndFiles[i], [ogg, mp3, m4a]);
                }
            };
            Preloader.prototype.create = function () {
                if (Params.isIOS) {
                    this.input.onDown.addOnce(this.startMainMenu, this);
                }
                else {
                    this.startMainMenu();
                }
            };
            Preloader.prototype.startMainMenu = function () {
                this.game.state.start(States.MAINMENU, true, false);
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = PhaserTemplate.Client || (PhaserTemplate.Client = {}));
})(PhaserTemplate || (PhaserTemplate = {}));
var States;
(function (States) {
    States.BOOT = 'Boot';
    States.PRELOADER = 'Preloader';
    States.MAINMENU = 'MainMenu';
    States.GAME = 'Game';
})(States || (States = {}));
var LogMng;
(function (LogMng) {
    LogMng.MODE_DEBUG = 'MODE_DEBUG';
    LogMng.MODE_RELEASE = 'MODE_RELEASE';
    var DEBUG = 'DEBUG';
    var INFO = 'INFO';
    var NETWORK = 'NETWORK';
    var WARNING = 'WARNING';
    var ERROR = 'ERROR';
    var mode = LogMng.MODE_DEBUG;
    var levels = [DEBUG, INFO, NETWORK, WARNING, ERROR];
    function setMode(aMode) {
        switch (aMode) {
            case LogMng.MODE_DEBUG:
                levels = [DEBUG, INFO, NETWORK, WARNING, ERROR];
                break;
            case LogMng.MODE_RELEASE:
                levels = [WARNING, ERROR];
                break;
        }
    }
    LogMng.setMode = setMode;
    function getMode() {
        return mode;
    }
    LogMng.getMode = getMode;
    function getCSS(bgColor) {
        return 'background: ' + bgColor + ';' +
            'background-repeat: no-repeat;' +
            'color: #1df9a8;' +
            'line-height: 16px;' +
            'padding: 1px 0;' +
            'margin: 0;' +
            'user-select: none;' +
            '-webkit-user-select: none;' +
            '-moz-user-select: none;';
    }
    ;
    function getLink(color) {
        return 'background: ' + color + ';' +
            'background-repeat: no-repeat;' +
            'font-size: 12px;' +
            'color: #446d96;' +
            'line-height: 14px';
    }
    ;
    function log(aMsg, aLevel) {
        if (aLevel === void 0) { aLevel = DEBUG; }
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
    }
    ;
    function system(aMsg, aLink) {
        if (aLink === void 0) { aLink = ''; }
        console.log("%c %c %c %s %c %c %c %c%s", getCSS('#5C6166'), getCSS('#4F5357'), getCSS('#313335'), aMsg, getCSS('#4F5357'), getCSS('#5C6166'), getLink('none'), getLink('none'), aLink);
    }
    LogMng.system = system;
    function debug(aMsg) {
        log(aMsg, DEBUG);
    }
    LogMng.debug = debug;
    function info(aMsg) {
        log(aMsg, INFO);
    }
    LogMng.info = info;
    function net(aMsg) {
        log(aMsg, NETWORK);
    }
    LogMng.net = net;
    function warn(aMsg) {
        log(aMsg, WARNING);
    }
    LogMng.warn = warn;
    function error(aMsg) {
        log(aMsg, ERROR);
    }
    LogMng.error = error;
})(LogMng || (LogMng = {}));
var MyMath;
(function (MyMath) {
    var RectABCD = (function () {
        function RectABCD(a, b, c, d) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
        }
        return RectABCD;
    }());
    MyMath.RectABCD = RectABCD;
    function randomInRange(aMin, aMax) {
        return Math.random() * Math.abs(aMax - aMin) + aMin;
    }
    MyMath.randomInRange = randomInRange;
    function randomIntInRange(aMin, aMax) {
        return Math.round(randomInRange(aMin, aMax));
    }
    MyMath.randomIntInRange = randomIntInRange;
    function toRadian(aDeg) {
        return aDeg * Math.PI / 180;
    }
    MyMath.toRadian = toRadian;
    function toDeg(aRad) {
        return aRad * 180 / Math.PI;
    }
    MyMath.toDeg = toDeg;
    function IsPointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
        var b0x, b0y, c0x, c0y, p0x, p0y;
        var m, l;
        var res = false;
        b0x = bx - ax;
        b0y = by - ay;
        c0x = cx - ax;
        c0y = cy - ay;
        p0x = px - ax;
        p0y = py - ay;
        m = (p0x * b0y - b0x * p0y) / (c0x * b0y - b0x * c0y);
        if (m >= 0 && m <= 1) {
            l = (p0x - m * c0x) / b0x;
            if (l >= 0 && (m + l) <= 1)
                res = true;
        }
        return res;
    }
    MyMath.IsPointInTriangle = IsPointInTriangle;
    function isPointInRect(rect, p) {
        return IsPointInTriangle(rect.a.x, rect.a.y, rect.b.x, rect.b.y, rect.c.x, rect.c.y, p.x, p.y) &&
            IsPointInTriangle(rect.c.x, rect.c.y, rect.d.x, rect.d.y, rect.a.x, rect.a.y, p.x, p.y);
    }
    MyMath.isPointInRect = isPointInRect;
    function isCirclesIntersect(x1, y1, r1, x2, y2, r2) {
        var veclen = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        return veclen <= r1 + r2;
    }
    MyMath.isCirclesIntersect = isCirclesIntersect;
})(MyMath || (MyMath = {}));
var ScaleManager = (function () {
    function ScaleManager() {
    }
    ScaleManager.init = function (aGame, aDomId, GW, GH, GSW, GSH) {
        this.game = aGame;
        this.dom_id = aDomId;
        this.dom = document.getElementById(this.dom_id);
        this.game_w = GW;
        this.game_h = GH;
        this.game_sw = GSW;
        this.game_sh = GSH;
        aGame.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        ScaleManager.SizeCalculation();
        window.onresize = function () {
            ScaleManager.SizeCalculation();
        };
    };
    ScaleManager.doEventOriChange = function () {
        this.onOrientationChange.dispatch(this.isPortrait);
    };
    ScaleManager.SizeCalculation = function () {
        var wnd = {
            w: window.innerWidth,
            h: window.innerHeight
        };
        var g = {
            w: ScaleManager.game_w,
            h: ScaleManager.game_h,
            sw: ScaleManager.game_sw,
            sh: ScaleManager.game_sh
        };
        var gw;
        var gh;
        if (g.h / g.w > wnd.h / wnd.w) {
            if (g.sh / g.w > wnd.h / wnd.w) {
                gh = wnd.h * g.h / g.sh;
                gw = gh * g.w / g.h;
            }
            else {
                gw = wnd.w;
                gh = gw * g.h / g.w;
            }
        }
        else {
            if (g.h / g.sw > wnd.h / wnd.w) {
                gh = wnd.h;
                gw = gh * g.w / g.h;
            }
            else {
                gw = wnd.w * g.w / g.sw;
                gh = gw * g.h / g.w;
            }
        }
        var sclX = gw / g.sw;
        var sclY = gh / g.sh;
        var newScale = Math.min(sclX, sclY);
        ScaleManager.game.scale.setUserScale(newScale, newScale, 0, 0);
        this.dtx = (wnd.w - gw) / 2;
        this.dty = (wnd.h - gh) / 2;
        this.gameViewW = this.game_w + 2 * this.dtx / newScale;
        if (this.gameViewW > this.game_w)
            this.gameViewW = this.game_w;
        this.gameViewH = this.game_h + 2 * this.dty / newScale;
        if (this.gameViewH > this.game_h)
            this.gameViewH = this.game_h;
        this.dom.style.marginLeft = Math.round(this.dtx).toString() + 'px';
        this.dom.style.marginTop = Math.round(this.dty).toString() + 'px';
        this.dom.style.maxWidth = String(gw) + 'px';
        this.dom.style.maxHeight = String(gh) + 'px';
        ScaleManager.game.scale.refresh();
        var oldOri = this.isPortrait;
        this.isPortrait = wnd.h > wnd.w;
        if (this.isPortrait != oldOri)
            this.doEventOriChange();
    };
    ScaleManager.handleIncorrect = function () {
        if (!this.game.device.desktop) {
            document.getElementById("turn").style.display = "block";
            ScaleManager.game.world.isPaused = true;
        }
    };
    ScaleManager.handleCorrect = function () {
        if (!this.game.device.desktop) {
            document.getElementById("turn").style.display = "none";
            ScaleManager.game.world.isPaused = false;
        }
        setTimeout("window.scrollTo(0,0)", 1000);
    };
    ScaleManager.dom_id = '';
    ScaleManager.dtx = 0;
    ScaleManager.dty = 0;
    ScaleManager.onOrientationChange = new Phaser.Signal();
    return ScaleManager;
}());
var SndMng;
(function (SndMng) {
    SndMng.MUSIC = 'music';
    SndMng.SFX_CLICK_1 = 'click';
    var musics = [SndMng.MUSIC];
    var sfx_click = [SndMng.SFX_CLICK_1];
    SndMng.LOAD_SOUNDS = musics.concat(musics, sfx_click);
    var MUS_MAX_VOL = 1;
    var game;
    var enabled;
    var music = null;
    function init(aGame, aEnabled) {
        game = aGame;
        enabled = aEnabled;
    }
    SndMng.init = init;
    function fadeInMusic(aVolFrom, aVolEnd, aDuration) {
        if (aVolFrom === void 0) { aVolFrom = 0; }
        if (aVolEnd === void 0) { aVolEnd = 1; }
        if (aDuration === void 0) { aDuration = 500; }
        if (aVolEnd > MUS_MAX_VOL)
            aVolEnd = MUS_MAX_VOL;
        if (music == null)
            music = game.add.audio(SndMng.MUSIC, aVolFrom, true);
        if (enabled) {
            game.tweens.removeFrom(music);
            if (!music.isPlaying) {
                music.volume = aVolFrom;
                music.play();
            }
            game.add.tween(music).to({ volume: aVolEnd }, aDuration, Phaser.Easing.Linear.None, true);
        }
    }
    SndMng.fadeInMusic = fadeInMusic;
    function fadeOutMusic(aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        game.tweens.removeFrom(music);
        return game.add.tween(music).to({ volume: aVol }, aDuration, Phaser.Easing.Linear.None, true);
    }
    SndMng.fadeOutMusic = fadeOutMusic;
    function setEnabled(aEnabled) {
        enabled = aEnabled;
        if (enabled) {
            fadeInMusic();
        }
        else {
            fadeOutMusic().onComplete.add(function () { music.stop(); });
        }
    }
    SndMng.setEnabled = setEnabled;
    function getEnabled() {
        return enabled;
    }
    SndMng.getEnabled = getEnabled;
    function sfxPlay(aName, aVol) {
        if (aVol === void 0) { aVol = 1; }
        if (!enabled)
            return;
        game.add.audio(aName, aVol).play();
    }
    SndMng.sfxPlay = sfxPlay;
    function sfxClick(aVol) {
        if (aVol === void 0) { aVol = 1; }
        sfxPlay(SndMng.SFX_CLICK_1, aVol);
    }
    SndMng.sfxClick = sfxClick;
})(SndMng || (SndMng = {}));
//# sourceMappingURL=game.js.map