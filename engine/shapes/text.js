/** @import { Color } from '../core/animation_color' */
import { TimelineColor, Colors, Color } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
import { TimelineString } from "../core/animation_string.js";
export default class Text {
		/**
     * @public
     */
		static DEFAULT = {
			opacity: 1,
			size: 48,
			font: "sans-serif",
			align: "start",
			baseline: "alphabetic",
			direction: "inherit",
			strokeWidth: 1,
			stroke: Colors.BLACK,
			background: Colors.WHITE,
			x: 0,
			y: 48,
			rotate: 0,
		}
    /**
     * @public
     */
    text;
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
    size;
    /**
     * @public
     */
    font;
    /**
     * @public
     */
    align;
    /**
     * @public
     */
    baseline;
    /**
     * @public
     */
    direction;
    /**
     * public@
     */
    rotate;
    /**
     * @param {TextProps} opts
     */
    constructor(buildOpts) {
				const opts = Object.assign({}, Text.DEFAULT, buildOpts);
				this.text = (typeof opts.text === "string" ? new TimelineString(opts.text) : opts.text);
        this.x = (typeof opts.x === "number" ? new TimelineNumber(opts.x) : opts.x);
        this.y = (typeof opts.y === "number" ? new TimelineNumber(opts.y) : opts.y);
        this.strokeWidth = (typeof opts.strokeWidth === "number" ? new TimelineNumber(opts.strokeWidth) : opts.strokeWidth);
        this.background = (opts.background instanceof Color ? new TimelineColor(opts.background) : opts.background);
        this.stroke = (opts.stroke instanceof Color ? new TimelineColor(opts.stroke) : opts.stroke);
        this.opacity = (typeof opts.opacity === "number" ? new TimelineNumber(opts.opacity) : opts.opacity);
        this.rotate = (typeof opts.rotate === "number" ? new TimelineNumber(opts.rotate) : opts.rotate);
        this.size = (typeof opts.size === "number" ? new TimelineNumber(opts.size) : opts.size);
        this.font = (typeof opts.font === "string" ? new TimelineString(opts.font) : opts.font);
        this.align = (typeof opts.align === "string" ? new TimelineString(opts.align) : opts.align);
        this.baseline = (typeof opts.baseline === "string" ? new TimelineString(opts.baseline) : opts.baseline);
        this.direction = (typeof opts.direction === "string" ? new TimelineString(opts.direction) : opts.direction);
    }
    /**
     * @param {number} time
     * @returns {void}
     */
    update(time) {
        this.x.update(time);
        this.y.update(time);
        this.strokeWidth.update(time);
        this.background.update(time);
        this.stroke.update(time);
        this.opacity.update(time);
        this.rotate.update(time);
        this.size.update(time);
        this.text.update(time);
        this.font.update(time);
        this.align.update(time);
        this.baseline.update(time);
        this.direction.update(time);
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

        ctx.font = `${this.size.value}px ${this.font.value}`;
				ctx.textAlign = this.align.value;
				ctx.textBaseline = this.baseline.value;
				ctx.direction = this.direction.value;

        ctx.strokeStyle = this.stroke.value.toString();
        ctx.fillStyle = this.background.value.toString();

				ctx.fillText(this.text.value, this.x.value, this.y.value);
        if (this.strokeWidth.value > 0) {
            ctx.lineWidth = this.strokeWidth.value;
						ctx.strokeText(this.text.value, this.x.value, this.y.value);
        }

				ctx.restore();
    }
}
/**
 * @typedef {Object} TexeProps
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {Color} background
 * @property {number} strokeWidth
 * @property {Color} stroke
 */
