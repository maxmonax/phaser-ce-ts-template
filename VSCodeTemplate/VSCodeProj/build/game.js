var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                var _this = _super.call(this, Config.GW, Config.GH, Phaser.AUTO, Config.DOM_PARENT_ID, null) || this;
                _this.state.add(States.BOOT, Client.Boot, false);
                _this.state.add(States.PRELOADER, Client.Preloader, false);
                _this.state.add(States.MAINMENU, Client.MainMenu, false);
                _this.state.add(States.GAME, Client.Game, false);
                _this.state.start(States.BOOT);
                return _this;
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
window.onload = function () {
    new PhaserGame.Client.GameEngine();
};
var Config;
(function (Config) {
    Config.DOM_PARENT_ID = 'game';
    Config.GW = 2000;
    Config.GH = 960;
    Config.GSW = 1024;
    Config.GSH = 768;
    Config.FPS = 12;
})(Config || (Config = {}));
var DB;
(function (DB) {
    DB.ITEMS = [
        { name: 'r', fr: 'red-item', sel: 'red-item-sel', sector: 'red-sector' },
        { name: 'g', fr: 'green-item', sel: 'green-item-sel', sector: 'green-sector' },
        { name: 'b', fr: 'blue-item', sel: 'blue-item-sel', sector: 'blue-sector' }
    ];
})(DB || (DB = {}));
var Params;
(function (Params) {
    Params.isMacOS = false;
})(Params || (Params = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var CrumbParticle = (function (_super) {
            __extends(CrumbParticle, _super);
            function CrumbParticle(game, x, y, key, frame) {
                var _this = _super.call(this, game, x, y, key, frame) || this;
                _this.vx = 0;
                _this.vy = 0;
                _this.ax = 0;
                _this.ay = 0;
                _this.fx = 1;
                _this.fy = 1;
                _this.rotSpd = 0;
                _this.p_scale = 1;
                _this.isDead = false;
                _this.liveTimer = 0;
                _this.anchor.set(0.5);
                return _this;
            }
            CrumbParticle.prototype.reUse = function () {
                this.liveTimer = this.liveTime;
                this.isDead = false;
                this.scale.set(0);
                this.alpha = 1;
                this.game.add.tween(this.scale).to({ x: this.p_scale, y: this.p_scale }, 200, Phaser.Easing.Linear.None, true).chain(this.game.add.tween(this.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, false, 600));
            };
            CrumbParticle.prototype.update = function () {
                if (this.isDead)
                    return;
                var dt = this.game.time.elapsed * 0.001;
                this.vx *= this.fx;
                this.vy *= this.fy;
                this.vx += this.ax * dt;
                this.vy += this.ay * dt;
                this.x += this.vx * dt;
                this.y += this.vy * dt;
                this.rotation += this.rotSpd * dt;
                this.liveTimer -= dt;
                if (this.liveTimer <= 0) {
                    this.isDead = true;
                }
            };
            return CrumbParticle;
        }(Phaser.Sprite));
        Client.CrumbParticle = CrumbParticle;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var EffBtn = (function (_super) {
            __extends(EffBtn, _super);
            function EffBtn(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.particles = [];
                _this.buffer = [];
                _this.addTimer = 0;
                _this.addTime = 0.2;
                _this.radius = 50;
                _this.isInRadius = false;
                _this.isActive = false;
                _this.p_scale = 1;
                _this.useParent = false;
                return _this;
            }
            EffBtn.prototype.addParticle = function () {
                var p;
                if (this.buffer.length > 0) {
                    p = this.buffer.shift();
                }
                else {
                    p = new Client.SparkParticle(this.game, 0, 0, 'game', 'spark');
                }
                p.vx = 0;
                p.vy = 0;
                p.ax = 0;
                p.ay = 0;
                p.liveTimer = 2;
                var an = MyMath.randomIntInRange(0, 2 * Math.PI);
                var len = this.radius;
                if (this.isInRadius)
                    len = MyMath.randomIntInRange(0, this.radius);
                p.x = Math.cos(an) * len;
                p.y = Math.sin(an) * len;
                p.rotSpd = MyMath.randomInRange(3, 6);
                p.p_scale = this.p_scale;
                p.reUse();
                this.particles.push(p);
                if (this.useParent && this.parent != null) {
                    p.x += this.x;
                    p.y += this.y;
                    this.parent.addChild(p);
                }
                else {
                    this.addChild(p);
                }
            };
            EffBtn.prototype.removeParticle = function (id) {
                try {
                    this.particles[id].parent.removeChild(this.particles[id]);
                    this.buffer = this.buffer.concat(this.particles.splice(id, 1));
                }
                catch (e) {
                    LogMng.error('SparkEffect.removeParticle(): ' + e);
                }
            };
            EffBtn.prototype.update = function () {
                var dt = this.game.time.elapsed * 0.001;
                this.addTimer -= dt;
                if (this.isActive && this.addTimer <= 0) {
                    this.addTimer = this.addTime;
                    this.addParticle();
                }
                for (var i = this.particles.length - 1; i >= 0; i--) {
                    this.particles[i].update();
                    if (this.particles[i].isDead) {
                        this.removeParticle(i);
                    }
                }
            };
            return EffBtn;
        }(Phaser.Sprite));
        Client.EffBtn = EffBtn;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var EffCrumb = (function (_super) {
            __extends(EffCrumb, _super);
            function EffCrumb(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.particles = [];
                _this.buffer = [];
                _this.addTimer = 0;
                _this.radius_min = 1;
                _this.radius_max = 10;
                _this.isInRadius = false;
                _this.isActive = false;
                _this.p_scale_min = 0.3;
                _this.p_scale_max = 0.9;
                _this.p_spd_min = 40;
                _this.p_spd_max = 150;
                _this.p_cnt = 10;
                _this.useParent = false;
                _this.crumbId = 0;
                return _this;
            }
            EffCrumb.prototype.addParticle = function () {
                var textur = 'crumb' + String(this.crumbId + 1);
                var p;
                if (this.buffer.length > 0) {
                    p = this.buffer.shift();
                    p.loadTexture('game', textur);
                }
                else {
                    p = new Client.CrumbParticle(this.game, 0, 0, 'game', textur);
                }
                p.ax = 0;
                p.ay = 300;
                p.fx = 0.95;
                p.fy = 0.99;
                p.liveTimer = 2;
                var an = MyMath.randomIntInRange(0, 2 * Math.PI);
                var len = this.radius_max;
                if (this.isInRadius)
                    len = MyMath.randomIntInRange(this.radius_min, this.radius_max);
                p.x = Math.cos(an) * len;
                p.y = Math.sin(an) * len;
                p.vx = 0;
                p.vy = 0;
                p.vx = MyMath.randomInRange(-350, 350);
                p.vy = MyMath.randomInRange(-300, -100);
                p.rotSpd = MyMath.randomInRange(3, 6);
                p.p_scale = MyMath.randomInRange(this.p_scale_min, this.p_scale_max);
                p.reUse();
                if (this.useParent && this.parent != null) {
                    p.x += this.x;
                    p.y += this.y;
                    this.parent.addChild(p);
                }
                else {
                    this.addChild(p);
                }
                this.particles.push(p);
            };
            EffCrumb.prototype.removeParticle = function (id) {
                try {
                    this.particles[id].parent.removeChild(this.particles[id]);
                    this.buffer = this.buffer.concat(this.particles.splice(id, 1));
                }
                catch (e) {
                    LogMng.error('SparkEffect.removeParticle(): ' + e);
                }
            };
            EffCrumb.prototype.doEffect = function () {
                for (var i = 0; i < this.p_cnt; i++) {
                    this.addParticle();
                }
            };
            EffCrumb.prototype.update = function () {
                var dt = this.game.time.elapsed * 0.001;
                for (var i = this.particles.length - 1; i >= 0; i--) {
                    this.particles[i].update();
                    if (this.particles[i].isDead) {
                        this.removeParticle(i);
                    }
                }
            };
            return EffCrumb;
        }(Phaser.Sprite));
        Client.EffCrumb = EffCrumb;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Effect = (function (_super) {
            __extends(Effect, _super);
            function Effect(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.particles = [];
                _this.buffer = [];
                _this.addTimer = 0;
                _this.addTime = 0.2;
                _this.area_w = 100;
                _this.area_h = 100;
                _this.isActive = false;
                return _this;
            }
            Effect.prototype.addParticle = function () {
                var p;
                if (this.buffer.length > 0) {
                    p = this.buffer.shift();
                }
                else {
                    p = new Client.SparkParticle(this.game, 0, 0, 'game', 'spark');
                }
                p.vx = 0;
                p.vy = 0;
                p.ay = 150;
                p.liveTime = 2;
                p.x = this.x + MyMath.randomInRange(-this.area_w / 2, this.area_w / 2);
                p.y = this.y + MyMath.randomInRange(-this.area_h / 2, this.area_h / 2);
                p.rotSpd = MyMath.randomInRange(3, 6);
                p.p_scale = this.scale.x;
                p.reUse();
                this.particles.push(p);
                if (this.parent != null)
                    this.parent.addChild(p);
            };
            Effect.prototype.removeParticle = function (id) {
                try {
                    this.particles[id].parent.removeChild(this.particles[id]);
                    this.buffer = this.buffer.concat(this.particles.splice(id, 1));
                }
                catch (e) {
                    LogMng.error('SparkEffect.removeParticle(): ' + e);
                }
            };
            Effect.prototype.update = function () {
                var dt = this.game.time.elapsed / 1000;
                this.addTimer -= dt;
                if (this.isActive && this.addTimer <= 0) {
                    this.addTimer = this.addTime;
                    this.addParticle();
                }
                for (var i = this.particles.length - 1; i >= 0; i--) {
                    this.particles[i].update();
                    if (this.particles[i].isDead) {
                        this.removeParticle(i);
                    }
                }
            };
            return Effect;
        }(Phaser.Sprite));
        Client.Effect = Effect;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var SparkParticle = (function (_super) {
            __extends(SparkParticle, _super);
            function SparkParticle(game, x, y, key, frame) {
                var _this = _super.call(this, game, x, y, key, frame) || this;
                _this.vx = 0;
                _this.vy = 0;
                _this.ax = 0;
                _this.ay = 0;
                _this.rotSpd = 0;
                _this.p_scale = 1;
                _this.isDead = false;
                _this.liveTimer = 0;
                _this.anchor.set(0.5);
                return _this;
            }
            SparkParticle.prototype.reUse = function () {
                this.liveTimer = this.liveTime;
                this.isDead = false;
                this.scale.set(0);
                this.alpha = 1;
                this.game.add.tween(this.scale).to({ x: this.p_scale, y: this.p_scale }, 200, Phaser.Easing.Linear.None, true).chain(this.game.add.tween(this.scale).to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None, false, 600));
            };
            SparkParticle.prototype.update = function () {
                if (this.isDead)
                    return;
                var dt = this.game.time.elapsed * 0.001;
                this.vx += this.ax * dt;
                this.vy += this.ay * dt;
                this.x += this.vx * dt;
                this.y += this.vy * dt;
                this.rotation += this.rotSpd * dt;
                this.liveTimer -= dt;
                if (this.liveTimer <= 0) {
                    this.isDead = true;
                }
            };
            return SparkParticle;
        }(Phaser.Sprite));
        Client.SparkParticle = SparkParticle;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var LoadingStars = (function (_super) {
            __extends(LoadingStars, _super);
            function LoadingStars(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.pic = new Phaser.Sprite(_this.game, 0, 0, 'loading', 'loading_stars0001');
                _this.pic.anchor.set(0.5);
                _this.pic.animations.add('loading', Phaser.Animation.generateFrameNames('loading_stars', 1, 9, '', 4), 12, true);
                _this.pic.play('loading');
                _this.addChild(_this.pic);
                return _this;
            }
            return LoadingStars;
        }(Phaser.Sprite));
        Client.LoadingStars = LoadingStars;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var LoadMng;
(function (LoadMng) {
    var SceneLoader = (function () {
        function SceneLoader(game) {
            this.isLoadingComplete = false;
            this.game = game;
        }
        SceneLoader.prototype.startLoading = function () {
            this.onLoading1Complete();
        };
        SceneLoader.prototype.onLoading1Complete = function () {
            LogMng.debug('LoadMng: loading complete!');
            this.isLoadingComplete = true;
        };
        return SceneLoader;
    }());
    LoadMng.SceneLoader = SceneLoader;
})(LoadMng || (LoadMng = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                this.load.atlasJSONArray('loading', './assets/atlases/loading.png', './assets/atlases/loading.json');
            };
            Boot.prototype.create = function () {
                this.stage.setBackgroundColor(0x6600CC);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                ScaleManager.init(this.game, Config.DOM_PARENT_ID, Config.GW, Config.GH, Config.GSW, Config.GSH);
                LogMng.system('current log mode: ' + LogMng.getMode());
                Params.isMacOS =
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
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Game.prototype.create = function () {
                SndMng.stopAllMusic();
                SndMng.playMusic(SndMng.MUSIC_GAME);
            };
            Game.prototype.update = function () {
            };
            return Game;
        }(Phaser.State));
        Client.Game = Game;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainMenu.prototype.create = function () {
                this.oav = new ObjAvgValueUtils(this.game);
                this.mainDummy = new Phaser.Sprite(this.game, 0, 0);
                this.add.existing(this.mainDummy);
                this.btnPlay = new Phaser.Button(this.game, Config.GW / 2, Config.GH / 2, 'game', this.onPlayClick, this, 'Button_013', 'Button_013');
                this.btnPlay.anchor.set(0.5);
                this.mainDummy.addChild(this.btnPlay);
                this.oav.addItem(this.btnPlay, 'y', [{ p: 0, v: Config.GH / 2 + 300 }, { p: 100, v: Config.GH / 2 + 250 }]);
                SndMng.playMusic(SndMng.MUSIC_MENU, 0, 1, 1000);
            };
            MainMenu.prototype.onPlayClick = function () {
                this.game.state.start(States.GAME, true, false);
            };
            MainMenu.prototype.update = function () {
                var dt = this.game.time.elapsed * 0.001;
                this.oav.update(dt);
            };
            return MainMenu;
        }(Phaser.State));
        Client.MainMenu = MainMenu;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.soundsDecodeWaiting = false;
                _this.soundsLoading = [];
                return _this;
            }
            Preloader.prototype.preload = function () {
                this.dummyLoader = new Phaser.Sprite(this.game, 0, 0);
                this.add.existing(this.dummyLoader);
                var l_star = new Client.LoadingStars(this.game, Config.GW / 2, Config.GH / 2);
                l_star.scale.set(1.5);
                this.dummyLoader.addChild(l_star);
                this.load.atlasJSONArray('game', './assets/atlases/game.png', './assets/atlases/game.json');
                SndMng.init(this.game, true);
                var sndFiles = SndMng.LOAD_SOUNDS;
                for (var i = 0; i < sndFiles.length; i++) {
                    var mp3 = './assets/audio/' + sndFiles[i] + '.mp3';
                    this.load.audio(sndFiles[i], [mp3]);
                    this.soundsLoading.push(sndFiles[i]);
                }
            };
            Preloader.prototype.create = function () {
                this.soundsDecodeWaiting = true;
            };
            Preloader.prototype.onSoundsDecoded = function () {
                this.game.time.events.add(1000, this.onContinueCreate, this);
            };
            Preloader.prototype.onContinueCreate = function () {
                if (Params.isMacOS) {
                    this.dummyLoader.visible = false;
                    var spr = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2, 'game', 'youtube-like-start-icon');
                    spr.anchor.set(0.5);
                    this.add.existing(spr);
                    this.input.onDown.addOnce(this.startMainMenu, this);
                }
                else {
                    this.startMainMenu();
                }
            };
            Preloader.prototype.startMainMenu = function () {
                if (Params.isMacOS) {
                    SndMng.sfxPlay(SndMng.SFX_CLICK, 0);
                }
                this.game.state.start(States.MAINMENU, true, false);
            };
            Preloader.prototype.update = function () {
                if (!this.soundsDecodeWaiting)
                    return;
                var sndDecoded = true;
                for (var i = 0; i < this.soundsLoading.length; i++) {
                    var sndName = this.soundsLoading[i];
                    if (!this.game.cache.isSoundDecoded(sndName)) {
                        sndDecoded = false;
                        break;
                    }
                }
                if (sndDecoded) {
                    this.soundsDecodeWaiting = false;
                    this.onSoundsDecoded();
                }
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
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
        mode = aMode;
        switch (mode) {
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
    function randomInRange(aMin, aMax, auto) {
        if (auto === void 0) { auto = false; }
        if (auto && aMin > aMax) {
            var tmp = aMin;
            aMin = aMax;
            aMax = tmp;
        }
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
var ObjAvgValueUtils = (function () {
    function ObjAvgValueUtils(aGame) {
        this.gh = Config.GH;
        this.gsh = Config.GSH;
        this.press_perc_y = 0;
        this.itemsYPos = [];
        this.itemsScale = [];
        this.itemsUni = [];
        this.updateTimer = 0;
        this.UPD_TIME = 0.1;
        this.game = aGame;
    }
    ObjAvgValueUtils.prototype.getValue = function (aVals, aPerc) {
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
        return res;
    };
    ObjAvgValueUtils.prototype.getValueFromVals = function (vals) {
        return this.getValue(vals, this.press_perc_y * 100);
    };
    ObjAvgValueUtils.prototype.addItem = function (aObj, aField, aVals) {
        this.itemsUni.push({ o: aObj, f: aField, v: aVals });
    };
    ObjAvgValueUtils.prototype.removeItem = function (aObj) {
        for (var i = this.itemsUni.length - 1; i >= 0; i--) {
            try {
                if (this.itemsUni[i]['o'] == aObj)
                    this.itemsUni.splice(i, 1);
            }
            catch (e) {
                LogMng.error('ObjAvgValueUtils.removeItem: ' + e);
            }
        }
    };
    ObjAvgValueUtils.prototype.update = function (dt) {
        var gvh = ScaleManager.gameViewH;
        this.press_perc_y = (this.gh - gvh) / (this.gh - this.gsh);
        this.updateTimer -= dt;
        if (this.updateTimer > 0)
            return;
        this.updateTimer = this.UPD_TIME;
        for (var i = this.itemsUni.length - 1; i >= 0; i--) {
            try {
                var obj = this.itemsUni[i].o;
                obj[this.itemsUni[i].f] = this.getValueFromVals(this.itemsUni[i].v);
                obj = null;
            }
            catch (e) {
                this.itemsUni.splice(i, 1);
            }
        }
    };
    return ObjAvgValueUtils;
}());
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
        this.isDesktop = this.game.device.desktop;
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
        var oldOri = this.isPortrait;
        this.isPortrait = wnd.h > wnd.w;
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
        var scale_x = gw / g.w;
        var scale_y = gh / g.h;
        var newScale = Math.min(scale_x, scale_y);
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
        if (!this.isDesktop && this.isPortrait) {
            this.dom.style.marginTop = '0px';
        }
        else {
            this.dom.style.marginTop = Math.round(this.dty).toString() + 'px';
        }
        this.dom.style.maxWidth = String(gw) + 'px';
        this.dom.style.maxHeight = String(gh) + 'px';
        ScaleManager.game.scale.refresh();
        this.updateRotationIcon();
        if (this.isPortrait != oldOri) {
            this.doEventOriChange();
        }
    };
    ScaleManager.updateRotationIcon = function () {
        var MAX_PERC = 24;
        if (!this.isDesktop) {
            if (this.isPortrait) {
                this.showRotateIcon();
            }
            else {
                this.hideRotateIcon();
                return;
            }
            var wnd = {
                w: window.innerWidth,
                h: window.innerHeight
            };
            var rp_div = document.getElementById("rp-div");
            var rp_img = document.getElementById("rp-img");
            var com_h = this.dom.clientHeight + rp_div.clientHeight;
            var perc = MAX_PERC;
            if (rp_img.style.height != null && rp_img.style.height != undefined && rp_img.style.height != '') {
                if (rp_img.style.height.indexOf('%') > 0)
                    perc = Number(rp_img.style.height.split('%')[0]);
            }
            if (com_h > wnd.h) {
                while (com_h > wnd.h) {
                    perc--;
                    rp_img.style.width = rp_img.style.height = String(perc) + '%';
                    com_h = this.dom.clientHeight + rp_div.clientHeight;
                }
            }
            else {
                while (perc < MAX_PERC && com_h < wnd.h - 10) {
                    perc++;
                    rp_img.style.width = rp_img.style.height = String(perc) + '%';
                    com_h = this.dom.clientHeight + rp_div.clientHeight;
                }
            }
            var bot_h = wnd.h - this.dom.clientHeight;
            rp_div.style.paddingTop = String((bot_h - rp_img.clientHeight) / 2) + 'px';
        }
    };
    ScaleManager.showRotateIcon = function () {
        document.getElementById("rp-div").style.display = "block";
    };
    ScaleManager.hideRotateIcon = function () {
        document.getElementById("rp-div").style.display = "none";
    };
    ScaleManager.dom_id = '';
    ScaleManager.isDesktop = false;
    ScaleManager.dtx = 0;
    ScaleManager.dty = 0;
    ScaleManager.onOrientationChange = new Phaser.Signal();
    return ScaleManager;
}());
var SndMng;
(function (SndMng) {
    SndMng.MUSIC_MENU = 'music_main_menu';
    SndMng.MUSIC_GAME = 'music_game';
    SndMng.SFX_CLICK = 'click';
    SndMng.LOAD_SOUNDS = [SndMng.MUSIC_MENU, SndMng.MUSIC_GAME, SndMng.SFX_CLICK];
    var MUS_MAX_VOL = 1;
    var game;
    var enabled;
    var musics = [];
    function getMusic(aName) {
        for (var i = 0; i < musics.length; i++) {
            var data = musics[i];
            if (data.name == aName)
                return data.mus;
        }
        return null;
    }
    function init(aGame, aEnabled) {
        game = aGame;
        enabled = aEnabled;
    }
    SndMng.init = init;
    function playMusic(aName, aVolFrom, aVolEnd, aDuration) {
        if (aVolFrom === void 0) { aVolFrom = 0; }
        if (aVolEnd === void 0) { aVolEnd = 1; }
        if (aDuration === void 0) { aDuration = 500; }
        if (!enabled)
            return;
        if (aVolEnd > MUS_MAX_VOL)
            aVolEnd = MUS_MAX_VOL;
        var music = game.add.audio(aName, aVolFrom, true);
        music.volume = aVolFrom;
        music.play();
        game.add.tween(music).to({ volume: aVolEnd }, aDuration, Phaser.Easing.Linear.None, true);
        musics.push({ name: aName, mus: music });
    }
    SndMng.playMusic = playMusic;
    function stopMusicById(id, aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        try {
            var data = musics[id];
            var music = data.mus;
            var tw = game.add.tween(music).to({ volume: aVol }, aDuration, Phaser.Easing.Linear.None, true);
            tw.onComplete.add(function (mus) { mus.stop(); }, null, null, music);
            musics.splice(id, 1);
        }
        catch (e) {
            LogMng.error('SndMng.stopMusicById: ' + e);
        }
    }
    function stopMusicByName(aName, aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        for (var i = musics.length - 1; i >= 0; i++) {
            var data = musics[i];
            if (data.name == aName) {
                stopMusicById(i, aVol, aDuration);
            }
        }
    }
    SndMng.stopMusicByName = stopMusicByName;
    function stopAllMusic(aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        for (var i = musics.length - 1; i >= 0; i--) {
            stopMusicById(i);
        }
    }
    SndMng.stopAllMusic = stopAllMusic;
    function setEnabled(aEnabled) {
        enabled = aEnabled;
        if (enabled) {
        }
        else {
            stopAllMusic();
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
        var snd = game.add.audio(aName, aVol);
        snd.play();
        return snd;
    }
    SndMng.sfxPlay = sfxPlay;
    function update(dt) {
    }
    SndMng.update = update;
})(SndMng || (SndMng = {}));
var TextUtils;
(function (TextUtils) {
    function addZero(aNum, aLen) {
        var text = String(aNum);
        while (text.length < aLen)
            text = '0' + text;
        return text;
    }
    TextUtils.addZero = addZero;
    function sizingBitmapTextByW(aBmpText, aW, aInc, aDec) {
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
    TextUtils.sizingBitmapTextByW = sizingBitmapTextByW;
    function sizingBitmapTextByH(aBmpText, aH, aInc, aDec) {
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
    TextUtils.sizingBitmapTextByH = sizingBitmapTextByH;
})(TextUtils || (TextUtils = {}));
var PhaserNineSlice;
(function (PhaserNineSlice) {
    var NineSlice = (function (_super) {
        __extends(NineSlice, _super);
        function NineSlice(game, x, y, key, frame, width, height, data) {
            var _this = _super.call(this, game, x, y, key, frame) || this;
            _this.baseTexture = _this.texture.baseTexture;
            _this.baseFrame = _this.texture.frame;
            if (frame !== null && !data) {
                data = game.cache.getNineSlice(frame);
            }
            else if (!data) {
                data = game.cache.getNineSlice(key);
            }
            if (undefined === data) {
                return _this;
            }
            _this.topSize = data.top;
            if (!data.left) {
                _this.leftSize = _this.topSize;
            }
            else {
                _this.leftSize = data.left;
            }
            if (!data.right) {
                _this.rightSize = _this.leftSize;
            }
            else {
                _this.rightSize = data.right;
            }
            if (!data.bottom) {
                _this.bottomSize = _this.topSize;
            }
            else {
                _this.bottomSize = data.bottom;
            }
            _this.loadTexture(new Phaser.RenderTexture(_this.game, _this.localWidth, _this.localHeight));
            _this.resize(width, height);
            return _this;
        }
        NineSlice.prototype.renderTexture = function () {
            this.texture.resize(this.localWidth, this.localHeight, true);
            var textureXs = [0, this.leftSize, this.baseFrame.width - this.rightSize, this.baseFrame.width];
            var textureYs = [0, this.topSize, this.baseFrame.height - this.bottomSize, this.baseFrame.height];
            var finalXs = [0, this.leftSize, this.localWidth - this.rightSize, this.localWidth];
            var finalYs = [0, this.topSize, this.localHeight - this.bottomSize, this.localHeight];
            for (var yi = 0; yi < 3; yi++) {
                for (var xi = 0; xi < 3; xi++) {
                    var s = this.createTexturePart(textureXs[xi], textureYs[yi], textureXs[xi + 1] - textureXs[xi], textureYs[yi + 1] - textureYs[yi]);
                    s.width = finalXs[xi + 1] - finalXs[xi];
                    s.height = finalYs[yi + 1] - finalYs[yi];
                    this.texture.renderXY(s, finalXs[xi], finalYs[yi]);
                }
            }
        };
        NineSlice.prototype.resize = function (width, height) {
            this.localWidth = width;
            this.localHeight = height;
            this.renderTexture();
        };
        NineSlice.prototype.createTexturePart = function (x, y, width, height) {
            var frame = new PIXI.Rectangle(this.baseFrame.x + this.texture.frame.x + x, this.baseFrame.y + this.texture.frame.y + y, Math.max(width, 1), Math.max(height, 1));
            return new Phaser.Sprite(this.game, 0, 0, new PIXI.Texture(this.baseTexture, frame));
        };
        return NineSlice;
    }(Phaser.Sprite));
    PhaserNineSlice.NineSlice = NineSlice;
})(PhaserNineSlice || (PhaserNineSlice = {}));
var PhaserNineSlice;
(function (PhaserNineSlice) {
    var Plugin = (function (_super) {
        __extends(Plugin, _super);
        function Plugin(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this.addNineSliceCache();
            _this.addNineSliceFactory();
            _this.addNineSliceLoader();
            return _this;
        }
        Plugin.prototype.addNineSliceLoader = function () {
            Phaser.Loader.prototype.nineSlice = function (key, url, top, left, right, bottom) {
                var cacheData = {
                    top: top
                };
                if (left) {
                    cacheData.left = left;
                }
                if (right) {
                    cacheData.right = right;
                }
                if (bottom) {
                    cacheData.bottom = bottom;
                }
                this.addToFileList('image', key, url);
                this.game.cache.addNineSlice(key, cacheData);
            };
        };
        Plugin.prototype.addNineSliceFactory = function () {
            Phaser.GameObjectFactory.prototype.nineSlice = function (x, y, key, frame, width, height, group) {
                if (group === undefined) {
                    group = this.world;
                }
                var nineSliceObject = new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);
                return group.add(nineSliceObject);
            };
            Phaser.GameObjectCreator.prototype.nineSlice = function (x, y, key, frame, width, height) {
                return new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);
            };
        };
        Plugin.prototype.addNineSliceCache = function () {
            Phaser.Cache.prototype.nineSlice = {};
            Phaser.Cache.prototype.addNineSlice = function (key, data) {
                this.nineSlice[key] = data;
            };
            Phaser.Cache.prototype.getNineSlice = function (key) {
                var data = this.nineSlice[key];
                if (undefined === data) {
                    console.warn('Phaser.Cache.getNineSlice: Key "' + key + '" not found in Cache.');
                }
                return data;
            };
        };
        return Plugin;
    }(Phaser.Plugin));
    PhaserNineSlice.Plugin = Plugin;
})(PhaserNineSlice || (PhaserNineSlice = {}));
//# sourceMappingURL=game.js.map