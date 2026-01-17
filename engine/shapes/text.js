/** @import { Color } from '../core/animation_color' */
import { TimelineColor, Colors } from "../core/animation_color.js";
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
				this.text = new TimelineString(opts.text);
        this.x = new TimelineNumber(opts.x);
        this.y = new TimelineNumber(opts.y);
        this.strokeWidth = new TimelineNumber(opts.strokeWidth);
        this.background = new TimelineColor(opts.background);
        this.stroke = new TimelineColor(opts.stroke);
        this.opacity = new TimelineNumber(opts.opacity);
        this.rotate = new TimelineNumber(opts.rotate);
        this.size = new TimelineNumber(opts.size);
        this.font = new TimelineString(opts.font);
        this.align = new TimelineString(opts.align);
        this.baseline = new TimelineString(opts.baseline);
        this.direction = new TimelineString(opts.direction);
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
