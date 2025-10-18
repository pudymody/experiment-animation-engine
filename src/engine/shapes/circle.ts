import { TimelineNumber } from "../core/animation_number"

export interface CircleProps {
	x: number
	y: number
	radius: number
	background: string
	strokeWidth: number
	stroke: string
}

export default class Circle {
	public x: TimelineNumber
	public y: TimelineNumber
	public radius: TimelineNumber
	public strokeWidth: TimelineNumber

	private background: string
	private stroke: string

	constructor(opts: CircleProps) {
		this.x = new TimelineNumber(opts.x)
		this.y = new TimelineNumber(opts.y)
		this.radius = new TimelineNumber(opts.radius)
		this.strokeWidth = new TimelineNumber(opts.strokeWidth)

		this.background = opts.background;
		this.stroke = opts.stroke;
	}

	update(time: number) {
		this.x.update(time);
		this.y.update(time);
		this.radius.update(time);
		this.strokeWidth.update(time);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();

		ctx.fillStyle = this.background;
		ctx.strokeStyle = this.stroke;

		ctx.lineWidth = this.strokeWidth.value;
		ctx.arc(this.x.value, this.y.value, this.radius.value, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
}
