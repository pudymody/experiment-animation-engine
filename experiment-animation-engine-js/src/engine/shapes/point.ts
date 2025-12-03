import { TimelineNumber } from "../core/animation_number"

export default class Point {
	public x: TimelineNumber;
	public y: TimelineNumber;

	constructor(x: number, y: number) {
		this.x = new TimelineNumber(x);
		this.y = new TimelineNumber(y);
	}

	update(time: number) {
		this.x.update(time);
		this.y.update(time);
	}
}
