/** @import { Scene } from 'engine' */
/** @extends HTMLElement */
export default class DOMCanvas extends HTMLElement {
    /**
     * @private
     * @default HTMLCanvasElement
     */
    $canvas = document.createElement("canvas");
    /**
     * @private
     */
    ctx;
    /**
     * @private
     * @default false
     */
    _isPlaying = false;
    /**
     * @private
     */
    $shadowRoot;
    /**
     * @private
     */
    start;
    /**
     * @private
     * @default 0
     */
    _playTime = 0;
    /**
     * @private
     */
    _jsSrc;
    /**
     * @public
     */
    _src;
    /**
     *
     */
    constructor() {
        super();
        this.newFrame = this.newFrame.bind(this);
        this.$shadowRoot = this.attachShadow({ mode: "closed" });
        const ctx = this.$canvas.getContext("2d");
        if (ctx === null) {
            throw new Error("could not get context from canvas");
        }
        this.ctx = ctx;
				ctx.imageSmoothingQuality = "high";
				ctx.imageSmoothingEnabled = false;
        this._buildUI();
    }
    /**
     * @private
     * @returns {void}
     */
    _buildUI() {
        const $style = document.createElement("style");
        $style.innerHTML = `
			:host {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				border: 1px solid #2a2b2b;
				background:#2a2b2b;
				overflow:auto;
			}

			canvas {
				display: block;
				max-width: 100%;
				max-height: 100%;
				overflow: auto;
			}
		`;
        this.$shadowRoot.appendChild($style);
        this.$shadowRoot.appendChild(this.$canvas);
    }
    /**
     * @returns {void}
     */
    toggle() {
        if (this.isPlaying) {
            this.pause();
        }
        else {
            this.play();
        }
    }
		/**
		 * @returns {string}
		 */
		get src(){
			return this._src;
		}
    /**
     * @param {string} src
     */
    set src(src) {
        import(src)
            .then(({ default: scene }) => scene)
            .then(async scene => {
            if (scene === undefined) {
                throw new Error("Invalid scene, make sure you are exporting it as the default");
            }
            const jsSrc = new scene();
						await jsSrc.setup();

            this.$canvas.width = jsSrc.width;
            this.$canvas.height = jsSrc.height;
            this._jsSrc = jsSrc;
						this._src = src;
            this.reset();

            const loadEvent = new CustomEvent("load", { detail: { width: jsSrc.width, height: jsSrc.height, end: jsSrc.endTime } });
            this.dispatchEvent(loadEvent);
        });
    }
    /**
     * @returns {void}
     */
    play() {
        if (this._isPlaying) {
            return;
        }
        this._isPlaying = true;
        window.requestAnimationFrame(this.newFrame);
				const statusEvent = new CustomEvent("status", { detail: { playing: this._isPlaying } });
				this.dispatchEvent(statusEvent);
    }
    /**
     * @returns {boolean}
     */
    get isPlaying() {
        return this._isPlaying;
    }
    /**
     * @returns {void}
     */
    pause() {
        if (!this._isPlaying) {
            return;
        }
        this._isPlaying = false;
        this.start = undefined;
				const statusEvent = new CustomEvent("status", { detail: { playing: this._isPlaying } });
				this.dispatchEvent(statusEvent);
    }
    /**
     * @returns {void}
     */
    reset() {
        this._isPlaying = false;
        this.start = undefined;
        this.playTime = 0;
				const statusEvent = new CustomEvent("status", { detail: { playing: this._isPlaying } });
				this.dispatchEvent(statusEvent);
    }
    /**
     * @param {number} value
     */
    set playTime(value) {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this._playTime = value;
        if (this._jsSrc !== undefined) {
            this._jsSrc.currentTime = Math.min(value, this._jsSrc.endTime);
            this._jsSrc.draw(this.ctx);
            const currentTimeEvent = new CustomEvent("currentTime", { detail: value });
            this.dispatchEvent(currentTimeEvent);
        }
    }
    /**
     * @public
     * @returns {number}
     */
		get playTime(){
			return this._playTime;
		}

    /**
     * @private
     * @param {number} time
     * @returns {void}
     */
    newFrame(time) {
        if (!this._isPlaying) {
            return;
        }
        if (this.start === undefined) {
            this.start = time - this._playTime;
        }
        this.playTime = time - this.start;
        if (this._jsSrc !== undefined && this._playTime >= this._jsSrc.endTime) {
						this._playTime = this._jsSrc.endTime;
            this.pause();
            return;
        }
        window.requestAnimationFrame(this.newFrame);
    }
}
