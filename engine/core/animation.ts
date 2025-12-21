import type { Easing } from "./easing.ts"

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
