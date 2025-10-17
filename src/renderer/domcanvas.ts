interface Scene {
	width: number;
	height: number;
	background: string;
	currentTime: number,
	endTime: number,
	draw(ctx: CanvasRenderingContext2D): void
}

export default class DOMCanvas extends HTMLElement {
	private $canvas: HTMLCanvasElement;
	private $range: HTMLInputElement;
	private ctx: CanvasRenderingContext2D;
	private _isPlaying: boolean = false;
	private $shadowRoot: ShadowRoot;

	private start: number | undefined;
	private _playTime: number = 0;

	private _src: Scene | undefined;

	constructor() {
		super();

		this.newFrame = this.newFrame.bind(this);
		this.$shadowRoot = this.attachShadow({ mode: "closed" });

		this.$canvas = document.createElement("canvas");
		const ctx = this.$canvas.getContext("2d");
		if (ctx === null) {
			throw new Error("could not get context from canvas");
		}
		this.ctx = ctx;
		this.$shadowRoot.appendChild(this.$canvas);

		this._buildUI();
	}

	private _buildUI() {
		const $style = document.createElement("style");
		$style.innerHTML = `
			:host {
				display: block;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				border: 1px solid #2a2b2b;
			}

			canvas {
				display: block;
				width: 100%;
			}

			div {
				display: flex;
				box-sizing: border-box;
				gap: 0.5rem;
				padding: 0.5rem;
				background: #2a2b2b;
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

		const $range = document.createElement("input");
		$range.type = "range";
		$range.min = "0";
		$range.max = "0";
		$range.addEventListener("input", (e) => {
			this.playTime = (e.target as HTMLInputElement).valueAsNumber;
		});
		this.$range = $range;

		const $div = document.createElement("div");
		$div.appendChild($style);
		$div.appendChild($playButton);
		$div.appendChild($stopButton);
		$div.appendChild($range);

		this.$shadowRoot.appendChild($div);
	}

	toggle() {
		if (this.isPlaying) {
			this.pause();
		} else {
			this.play();
		}
	}

	get src(): Scene | undefined {
		return this._src;
	}

	set src(src: Scene) {
		this.$canvas.width = src.width;
		this.$canvas.height = src.height;
		this._src = src;
		this.$range.max = src.endTime.toString();
		this.reset();
	}

	play() {
		if (this._isPlaying) {
			return
		}
		this._isPlaying = true;
		window.requestAnimationFrame(this.newFrame);
	}

	get isPlaying(): boolean {
		return this._isPlaying
	}

	pause() {
		if (!this._isPlaying) {
			return;
		}
		this._isPlaying = false;
		this.start = undefined;
	}

	reset() {
		this._isPlaying = false;
		this.start = undefined;
		this.playTime = 0;
	}

	set playTime(value: number) {
		this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

		this._playTime = value;

		if (this._src !== undefined) {
			this._src.currentTime = value;

			this.ctx.fillStyle = this._src.background;
			this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
			this._src.draw(this.ctx);

			const currentTimeEvent = new CustomEvent("currentTime", { detail: value });
			this.dispatchEvent(currentTimeEvent);
			this.$range.valueAsNumber = value;
		}
	}

	private newFrame(time: number) {
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

