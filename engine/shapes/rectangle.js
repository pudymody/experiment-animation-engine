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
			dashOffset: 0,
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
     * @public
     */
    dashOffset;
    /**
     * @param {RectangleProps} opts
     */
    constructor(buildOpts) {
				const opts = Object.assign({}, Rectangle.DEFAULT, buildOpts);
        this.x = (typeof opts.x === "number" ? new TimelineNumber(opts.x) : opts.x);
        this.y = (typeof opts.y === "number" ? new TimelineNumber(opts.y) : opts.y);
        this.width = (typeof opts.width === "number" ? new TimelineNumber(opts.width) : opts.width);
        this.height = (typeof opts.height === "number" ? new TimelineNumber(opts.height) : opts.height);
        this.strokeWidth = (typeof opts.strokeWidth === "number" ? new TimelineNumber(opts.strokeWidth) : opts.strokeWidth);
        this.background = (opts.background instanceof Color ? new TimelineColor(opts.background) : opts.background);
        this.stroke = (opts.stroke instanceof Color ? new TimelineColor(opts.stroke) : opts.stroke);
        this.opacity = (typeof opts.opacity === "number" ? new TimelineNumber(opts.opacity) : opts.opacity);
        this.rotate = (typeof opts.rotate === "number" ? new TimelineNumber(opts.rotate) : opts.rotate);
        this.dashOffset = (typeof opts.dashOffset === "number" ? new TimelineNumber(opts.dashOffset) : opts.dashOffset);
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
        this.dashOffset.update(time);
    }
    /**
     * @param {Pick<Keyframe<any>, "at" | "endTime">[]} frames
     * @returns {void}
     */
    spawn(opts) {
			return [
				this.dashOffset.to({...opts, to: this.width.value * 2 + this.height.value*2, duration: 0}),
				this.dashOffset.to({ ...opts, to: 0 })
			]
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
				ctx.setLineDash([this.width.value*2 + this.height.value*2]);
				ctx.lineDashOffset = this.dashOffset.value;
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
