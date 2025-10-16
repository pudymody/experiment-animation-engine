import type { Keyframe, KeyframeProps, Timeline } from "./animation.ts"
import type { Easing } from "./easing.ts"

import { Linear } from "./easing.ts"
import { Clamp01, Lerp } from "./math.ts"

export class KeyframeNumber implements Keyframe<number> {
	private from: number;
	public to: number;
	private duration: number;
	public at: number;
	private ease: Easing;

	constructor(opts: KeyframeProps<number>) {
		this.from = opts.from;
		this.to = opts.to;
		this.duration = opts.duration || 0;
		this.at = opts.at || 0;
		this.ease = opts.ease || Linear;
	}

	value(time: number): number {
		if (this.duration == 0) {
			return this.to;
		}

		const t = Clamp01((time - this.at) / this.duration);
		return Lerp(this.from, this.to, this.ease(t));
	}

	get endTime(): number {
		return this.at + this.duration;
	}
}

export class TimelineNumber implements Timeline<number> {
	private _keyframes: KeyframeNumber[];
	private _currentValue: number;

	constructor(start: number) {
		this._keyframes = [
			new KeyframeNumber({
				from: start,
				to: start,
				duration: 0,
				at: 0,
				ease: Linear,
			})
		]
		this._currentValue = start;
	}

	to(opts: Omit<KeyframeProps<number>, "from">): Keyframe<number> {
		const lastFrame = this._keyframes.at(-1);
		if (lastFrame === undefined) {
			throw new Error("tried to get last frame from timeline but array is empty");
		}

		const to = opts.to - this.endValue;
		let at = lastFrame.endTime;
		if (opts.at !== undefined) {
			at = opts.at;
		}

		const newKeyframe = new KeyframeNumber({
			from: 0,
			to: to,
			duration: opts.duration,
			at: at,
			ease: opts.ease,
		})
		this._keyframes.push(newKeyframe)
		return newKeyframe
	}

	private get endValue() {
		let value = 0;
		for (let k of this._keyframes) {
			value = value + k.to;
		}

		return value;
	}
	update(t: number) {
		let value = 0;
		for (let k of this._keyframes) {
			value = value + k.value(t);
		}

		this._currentValue = value;
	}

	get value(): number {
		return this._currentValue;
	}
}
