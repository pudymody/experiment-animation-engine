interface Scene {
	width: number;
	height: number;
	background: string;
	currentTime: number,
	endTime: number,
	draw(ctx: CanvasRenderingContext2D): void
}

export default class DOMCanvas extends EventTarget {
	public readonly $canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private _isPlaying: boolean = false;

	private start: number | undefined;
	private _playTime: number = 0;

	private _src: Scene | undefined;

	constructor() {
		super();

		this.$canvas = document.createElement("canvas");
		const ctx = this.$canvas.getContext("2d");
		if (ctx === null) {
			throw new Error("could not get context from canvas");
		}
		this.ctx = ctx;
		this.newFrame = this.newFrame.bind(this);
	}

	get src(): Scene | undefined {
		return this._src;
	}

	set src(src: Scene) {
		this.$canvas.width = src.width;
		this.$canvas.height = src.height;
		this._src = src;
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

