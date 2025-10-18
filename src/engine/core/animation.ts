import type { Easing } from "./easing"

export interface KeyframeProps<T> {
	from: T
	to: T
	duration?: number,
	at?: number,
	ease?: Easing,
}

// make keyframe have everything as public so we can chain them or in parallel with helper tools
export interface Keyframe<T> {
	value: (t: number) => T,
	to: T,
	endTime: number
	at: number
}

export interface Timeline<T> {
	update: (t: number) => void,
	value: T,
}

export function chain(frames: Pick<Keyframe<any>, "at" | "endTime">[]): number {
	if (frames.length === 0) {
		throw new Error("empty frame list given to chain method")
	}

	if (frames.length == 1) {
		return frames[0].endTime;
	}

	let prev = frames[0];

	for (let i = 1; i < frames.length; i++) {
		const currentFrame = frames[i];
		currentFrame.at = prev.endTime;
		prev = currentFrame;
	}

	return prev.endTime
}

export class group {
	private _keyframes: Pick<Keyframe<any>, "at" | "endTime">[];

	constructor(frames: Pick<Keyframe<any>, "at" | "endTime">[]) {
		this._keyframes = frames;
	}

	get at(): number {
		return Math.min(...this._keyframes.map(f => f.at))
	}

	set at(value: number) {
		this._keyframes.forEach(f => {
			f.at = value;
		})
	}

	get endTime(): number {
		return Math.max(...this._keyframes.map(f => f.endTime))
	}
}
