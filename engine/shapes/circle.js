/** @import { Color } from '../core/animation_color' */
import { TimelineColor, Color, Colors } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
export default class Circle {
    /**
     * @public
     */
		static DEFAULT = {
			x: 0, 
			y: 0,
			radius: 100,
			strokeWidth: 1,
			arc: Math.PI * 2,
			opacity: 1,
			background: Colors.WHITE,
			stroke: Colors.BLACK,
			rotate: 0,
		};
    /**
     * @public
     */
    x;
    /**
     * @public
     */
    y;
    /**
     * @public
     */
    radius;
    /**
     * @public
     */
    strokeWidth;
    /**
     * @public
     */
    arc;
    /**
     * @public
     */
    rotate;
    /**
     * @private
     */
    background;
    /**
     * @private
     */
    stroke;
    /**
     * @private
     */
    opacity;
    /**
     * @param {CircleProps} opts
     */
    constructor(buildOpts) {
				const opts = Object.assign({}, Circle.DEFAULT, buildOpts);
        this.x = (typeof opts.x === "number" ? new TimelineNumber(opts.x) : opts.x);
        this.y = (typeof opts.y === "number" ? new TimelineNumber(opts.y) : opts.y);
        this.radius = (typeof opts.radius === "number" ? new TimelineNumber(opts.radius) : opts.radius);
        this.strokeWidth = (typeof opts.strokeWidth === "number" ? new TimelineNumber(opts.strokeWidth): opts.strokeWidth);
        this.arc = (typeof opts.arc === "number" ? new TimelineNumber(opts.arc) : opts.arc);
        this.rotate = (typeof opts.rotate === "number" ? new TimelineNumber(opts.rotate) : opts.rotate);
        this.opacity = (typeof opts.opacity === "number" ? new TimelineNumber(opts.opacity) : opts.opacity);
        this.background = (opts.background instanceof Color ? new TimelineColor(opts.background) : opts.background);
        this.stroke = (opts.background instanceof Color ? new TimelineColor(opts.stroke) : opts.stroke);
    }
    /**
     * @param {number} time
     * @returns {void}
     */
    update(time) {
        this.x.update(time);
        this.y.update(time);
        this.radius.update(time);
        this.strokeWidth.update(time);
        this.arc.update(time);
        this.rotate.update(time);
        this.background.update(time);
        this.stroke.update(time);
        this.opacity.update(time);
    }
    /**
     * @param {Pick<Keyframe<any>, "at" | "endTime">[]} frames
     * @returns {void}
     */
    spawn(opts) {
			return [
				this.arc.to({...opts, to: 0, duration: 0,}),
				this.arc.to({ ...opts, to: Math.PI * 2 })
			]
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
				ctx.save();
				ctx.translate(this.x.value, this.y.value);
				ctx.rotate(this.rotate.value);
				ctx.translate(-this.x.value, -this.y.value);

				ctx.globalAlpha = this.opacity.value;

        ctx.beginPath();
        ctx.fillStyle = this.background.value.toString();
        ctx.strokeStyle = this.stroke.value.toString();
        ctx.arc(this.x.value, this.y.value, this.radius.value, 0, this.arc.value);
        ctx.fill();
        if (this.strokeWidth.value > 0) {
            ctx.lineWidth = this.strokeWidth.value;
            ctx.stroke();
        }
        ctx.closePath();
	
				ctx.restore();
    }
}
/**
 * @typedef {Object} CircleProps
 * @property {number} x
 * @property {number} y
 * @property {number} radius
 * @property {Color} background
 * @property {number} strokeWidth
 * @property {Color} stroke
 * @property {number} [arc]
 */
