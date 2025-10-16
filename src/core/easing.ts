export type Easing = (t: number) => number;

export function Linear(t: number): number {
	return t;
}
