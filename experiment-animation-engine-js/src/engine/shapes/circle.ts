import type { Color } from "../core/animation_color"
import { TimelineColor } from "../core/animation_color"
import { TimelineNumber } from "../core/animation_number"
import type { DrawingContext } from "../core/scene"

export interface CircleProps {
	x: number
	y: number
	radius: number
	background: Color
	strokeWidth: number
	stroke: Color
	arc?: number
}

export default class Circle {
	public x: TimelineNumber
	public y: TimelineNumber
	public radius: TimelineNumber
	public strokeWidth: TimelineNumber
	public arc: TimelineNumber

	private background: TimelineColor
	private stroke: TimelineColor

	constructor(opts: CircleProps) {
		this.x = new TimelineNumber(opts.x)
		this.y = new TimelineNumber(opts.y)
		this.radius = new TimelineNumber(opts.radius)
		this.strokeWidth = new TimelineNumber(opts.strokeWidth)

		if (opts.arc === undefined) {
			opts.arc = Math.PI * 2;
		}
		this.arc = new TimelineNumber(opts.arc)

		this.background = new TimelineColor(opts.background);
		this.stroke = new TimelineColor(opts.stroke);
	}

	update(time: number) {
		this.x.update(time);
		this.y.update(time);
		this.radius.update(time);
		this.strokeWidth.update(time);
		this.arc.update(time);
		this.background.update(time);
		this.stroke.update(time);
	}

	draw(ctx: DrawingContext) {
		ctx.beginPath();

		ctx.fillStyle = this.background.value.toString();
		ctx.strokeStyle = this.stroke.value.toString();

		ctx.arc(this.x.value, this.y.value, this.radius.value, 0, this.arc.value);
		ctx.fill();

		if (this.strokeWidth.value > 0) {
			ctx.lineWidth = this.strokeWidth.value;
			ctx.stroke();
		}
	}
}
