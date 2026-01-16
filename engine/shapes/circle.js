/** @import { Color } from '../core/animation_color' */
import { TimelineColor } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
export default class Circle {
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
    constructor(opts) {
        this.x = new TimelineNumber(opts.x);
        this.y = new TimelineNumber(opts.y);
        this.radius = new TimelineNumber(opts.radius);
        this.strokeWidth = new TimelineNumber(opts.strokeWidth);
        if (opts.arc === undefined) {
            opts.arc = Math.PI * 2;
        }
        this.arc = new TimelineNumber(opts.arc);
				if( opts.opacity === undefined ){
					opts.opacity = 1;
				}
        this.opacity = new TimelineNumber(opts.opacity);
        this.background = new TimelineColor(opts.background);
        this.stroke = new TimelineColor(opts.stroke);
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
        this.background.update(time);
        this.stroke.update(time);
        this.opacity.update(time);
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
				const prevOpacity = ctx.globalAlpha;
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
	
				ctx.globalAlpha = prevOpacity;
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
