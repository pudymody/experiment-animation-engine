/** @import { Color } from '../core/animation_color' */
import { TimelineColor, Colors } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
export default class Rectangle {
    /**
     * @public
     */
		static DEFAULT = {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			strokeWidth: 1,
			background: Colors.WHITE,
			stroke: Colors.BLACK,
			opacity: 1,
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
    width;
    /**
     * @public
     */
    height;
    /**
     * @public
     */
    strokeWidth;
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
     * @public
     */
    rotate;
    /**
     * @param {RectangleProps} opts
     */
    constructor(buildOpts) {
				const opts = Object.assign({}, Rectangle.DEFAULT, buildOpts);
        this.x = new TimelineNumber(opts.x);
        this.y = new TimelineNumber(opts.y);
        this.width = new TimelineNumber(opts.width);
        this.height = new TimelineNumber(opts.height);
        this.strokeWidth = new TimelineNumber(opts.strokeWidth);
        this.background = new TimelineColor(opts.background);
        this.stroke = new TimelineColor(opts.stroke);
        this.opacity = new TimelineNumber(opts.opacity);
        this.rotate = new TimelineNumber(opts.rotate);
    }
    /**
     * @param {number} time
     * @returns {void}
     */
    update(time) {
        this.x.update(time);
        this.y.update(time);
        this.width.update(time);
        this.height.update(time);
        this.strokeWidth.update(time);
        this.background.update(time);
        this.stroke.update(time);
        this.opacity.update(time);
        this.rotate.update(time);
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
				ctx.save();
				ctx.translate(this.x.value + this.width.value / 2, this.y.value + this.height.value / 2);
				ctx.rotate(this.rotate.value);
				ctx.translate(-(this.x.value + this.width.value / 2), -(this.y.value + this.height.value / 2));

				ctx.globalAlpha = this.opacity.value;

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

				ctx.restore();
    }
}
/**
 * @typedef {Object} RectangleProps
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {Color} background
 * @property {number} strokeWidth
 * @property {Color} stroke
 */
