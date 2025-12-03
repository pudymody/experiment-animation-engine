import type { Color } from "../core/animation_color"
import { TimelineColor } from "../core/animation_color"
import { TimelineNumber } from "../core/animation_number"
import type { DrawingContext } from "../core/scene"
import type Point from "./point"

export interface PolygonProps {
	points: Point[]
	background: Color
	strokeWidth: number
	stroke: Color
}

export default class Polygon {
	public points: Point[]
	public strokeWidth: TimelineNumber

	private background: TimelineColor
	private stroke: TimelineColor

	constructor(opts: PolygonProps) {
		if (opts.points === undefined || opts.points.length < 2) {
			throw new Error("Polygon constructor must have more than 2 points");
		}
		this.points = opts.points;
		this.strokeWidth = new TimelineNumber(opts.strokeWidth)
		this.background = new TimelineColor(opts.background);
		this.stroke = new TimelineColor(opts.stroke);
	}

	update(time: number) {
		for (let p of this.points) {
			p.update(time);
		}

		this.strokeWidth.update(time);
		this.background.update(time);
		this.stroke.update(time);
	}

	draw(ctx: DrawingContext) {

		ctx.fillStyle = this.background.value.toString();
		ctx.strokeStyle = this.stroke.value.toString();

		ctx.beginPath();
		ctx.moveTo(this.points[0].x.value, this.points[0].y.value);
		for (let i = 1; i < this.points.length; i++) {
			const currPoint = this.points[i];
			ctx.lineTo(currPoint.x.value, currPoint.y.value);
		}
		ctx.closePath();

		ctx.fill();
		if (this.strokeWidth.value > 0) {
			ctx.lineWidth = this.strokeWidth.value;
			ctx.stroke();
		}
	}
}
