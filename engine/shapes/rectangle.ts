import type { Color } from "../core/animation_color"
import { TimelineColor } from "../core/animation_color"
import { TimelineNumber } from "../core/animation_number"
import type { DrawingContext } from "../core/scene"

export interface RectangleProps {
	x: number,
	y: number,
	width: number,
	height: number,
	background: Color
	strokeWidth: number
	stroke: Color
}

export default class Rectangle {
	public x: TimelineNumber;
	public y: TimelineNumber;
	public width: TimelineNumber;
	public height: TimelineNumber;
	public strokeWidth: TimelineNumber

	private background: TimelineColor
	private stroke: TimelineColor

	constructor(opts: RectangleProps) {
		this.x = new TimelineNumber(opts.x);
		this.y = new TimelineNumber(opts.y);
		this.width = new TimelineNumber(opts.width);
		this.height = new TimelineNumber(opts.height);
		this.strokeWidth = new TimelineNumber(opts.strokeWidth)
		this.background = new TimelineColor(opts.background);
		this.stroke = new TimelineColor(opts.stroke);
	}

	update(time: number) {
		this.x.update(time);
		this.y.update(time);
		this.width.update(time);
		this.height.update(time);
		this.strokeWidth.update(time);
		this.background.update(time);
		this.stroke.update(time);
	}

	draw(ctx: DrawingContext) {

		ctx.fillStyle = this.background.value.toString();
		ctx.strokeStyle = this.stroke.value.toString();

		ctx.beginPath();
		ctx.moveTo(this.x.value, this.y.value);
		ctx.lineTo(this.x.value + this.width.value, this.y.value);
		ctx.lineTo(this.x.value + this.width.value, this.y.value + this.height.value);
		ctx.lineTo(this.x.value, this.y.value + this.height.value);
		ctx.closePath();

		ctx.fill();
		if (this.strokeWidth.value > 0) {
			ctx.lineWidth = this.strokeWidth.value;
			ctx.stroke();
		}
	}
}
