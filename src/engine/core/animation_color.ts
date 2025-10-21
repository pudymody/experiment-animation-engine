import type { Keyframe, KeyframeProps, Timeline } from "./animation"
import type { Easing } from "./easing"

import { linear } from "./easing"
import { Clamp01, Lerp } from "./math"

export class Color {
	public r: number;
	public g: number;
	public b: number;
	public a: number;

	constructor(r: number, g: number, b: number, a: number) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toString() {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	}
}

const Colors = {
	RED: new Color(255, 0, 0, 255),
	GREEN: new Color(0, 255, 0, 255),
	BLUE: new Color(0, 0, 255, 255),
	BLACK: new Color(0, 0, 0, 255),
	WHITE: new Color(255, 255, 255, 255),
	TRANSPARENT: new Color(255, 255, 255, 0),
}
export { Colors };

export class KeyframeColor implements Keyframe<Color> {
	private from: Color;
	public to: Color;
	private duration: number;
	public at: number;
	private ease: Easing;

	constructor(opts: KeyframeProps<Color>) {
		this.from = opts.from;
		this.to = opts.to;
		this.duration = opts.duration || 0;
		this.at = opts.at || 0;
		this.ease = opts.ease || linear;
	}

	value(time: number): Color {
		if (this.duration == 0) {
			return this.to;
		}

		const t = Clamp01((time - this.at) / this.duration);
		return new Color(
			Lerp(this.from.r, this.to.r, this.ease(t)),
			Lerp(this.from.g, this.to.g, this.ease(t)),
			Lerp(this.from.b, this.to.b, this.ease(t)),
			Lerp(this.from.a, this.to.a, this.ease(t)),
		);
	}

	get endTime(): number {
		return this.at + this.duration;
	}
}

export class TimelineColor implements Timeline<Color> {
	private _keyframes: KeyframeColor[];
	private _currentValue: Color;

	constructor(start: Color) {
		this._keyframes = [
			new KeyframeColor({
				from: start,
				to: start,
				duration: 0,
				at: 0,
				ease: linear,
			})
		]
		this._currentValue = start;
	}

	to(opts: Omit<KeyframeProps<Color>, "from">): Keyframe<Color> {
		const lastFrame = this._keyframes.at(-1);
		if (lastFrame === undefined) {
			throw new Error("tried to get last frame from timeline but array is empty");
		}

		const to = new Color(
			opts.to.r - this.endValue.r,
			opts.to.g - this.endValue.g,
			opts.to.b - this.endValue.b,
			opts.to.a - this.endValue.a,
		);
		let at = lastFrame.endTime;
		if (opts.at !== undefined) {
			at = opts.at;
		}

		const newKeyframe = new KeyframeColor({
			from: new Color(0, 0, 0, 0),
			to: to,
			duration: opts.duration,
			at: at,
			ease: opts.ease,
		})
		this._keyframes.push(newKeyframe)
		return newKeyframe
	}

	private get endValue() {
		let value = new Color(0, 0, 0, 0);
		for (let k of this._keyframes) {
			value.r = value.r + k.to.r;
			value.g = value.g + k.to.g;
			value.b = value.b + k.to.b;
			value.a = value.a + k.to.a;
		}

		return value;
	}
	update(t: number) {
		let value = new Color(0, 0, 0, 0);
		for (let k of this._keyframes) {
			value.r = value.r + k.value(t).r;
			value.g = value.g + k.value(t).g;
			value.b = value.b + k.value(t).b;
			value.a = value.a + k.value(t).a;
		}

		this._currentValue = value;
	}

	get value(): Color {
		return this._currentValue;
	}
}
