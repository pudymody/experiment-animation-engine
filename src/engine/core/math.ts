export function Clamp01(n: number): number {
	return Math.max(Math.min(n, 1), 0);
}

export function Lerp(from: number, to: number, t: number): number {
	return t * (to - from) + from;
}
