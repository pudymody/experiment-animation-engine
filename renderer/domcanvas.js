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
     * @default HTMLInputElement
     */
    $range = document.createElement("input");
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

			div {
				display: flex;
				box-sizing: border-box;
				gap: 0.5rem;
				padding: 0.5rem;
				background: #2a2b2b;
				width: 100%;
			}

			input {
				margin: 0;
				flex: 1;
			}
		`;
        const $playButton = document.createElement("button");
        $playButton.innerHTML = "Play/Pause";
        $playButton.addEventListener("click", () => this.toggle());
        const $stopButton = document.createElement("button");
        $stopButton.innerHTML = "Stop";
        $stopButton.addEventListener("click", () => this.reset());
        this.$range.type = "range";
        this.$range.min = "0";
        this.$range.max = "0";
        this.$range.addEventListener("input", (e) => {
            this.playTime = e.target.valueAsNumber;
        });
        const $div = document.createElement("div");
        $div.appendChild($style);
        $div.appendChild($playButton);
        $div.appendChild($stopButton);
        $div.appendChild(this.$range);
        this.$shadowRoot.appendChild($div);
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
     * @returns {any}
     */
    get src() {
        return this._src;
    }
    /**
     * @param {string} src
     */
    set src(src) {
        import(src)
            .then(({ default: scene }) => scene)
            .then(scene => {
            if (scene === undefined) {
                throw new Error("Invalid scene, make sure you are exporting it as the default");
            }
            const src = new scene();
            this.$canvas.width = src.width;
            this.$canvas.height = src.height;
            this._src = src;
            this.$range.max = src.endTime.toString();
            this.reset();
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
    }
    /**
     * @returns {void}
     */
    reset() {
        this._isPlaying = false;
        this.start = undefined;
        this.playTime = 0;
    }
    /**
     * @param {number} value
     */
    set playTime(value) {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this._playTime = value;
        if (this._src !== undefined) {
            this._src.currentTime = value;
            this._src.draw(this.ctx);
            const currentTimeEvent = new CustomEvent("currentTime", { detail: value });
            this.dispatchEvent(currentTimeEvent);
            this.$range.valueAsNumber = value;
        }
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
        if (this._src !== undefined && this._playTime > this._src.endTime) {
            this.pause();
            return;
        }
        window.requestAnimationFrame(this.newFrame);
    }
}
