/** @import { Color } from '../core/animation_color' */
import { TimelineColor } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
export default class Text {
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
     * @param {TextProps} opts
     */
    constructor(opts) {
				if( opts.opacity === undefined ){
					opts.opacity = 1;
				}
				if( opts.size === undefined ){
					opts.size = 10;
				}
				if( opts.font === undefined ){
					opts.font = "sans-serif";
				}
				if( opts.align === undefined ){
					opts.align = "start";
				}
				if( opts.baseline === undefined ){
					opts.baseline = "alphabetic";
				}
				if( opts.direction === undefined ){
					opts.direction = "inherit";
				}
				this.text = opts.text;
        this.x = new TimelineNumber(opts.x);
        this.y = new TimelineNumber(opts.y);
        this.strokeWidth = new TimelineNumber(opts.strokeWidth);
        this.background = new TimelineColor(opts.background);
        this.stroke = new TimelineColor(opts.stroke);
        this.opacity = new TimelineNumber(opts.opacity);
        this.size = new TimelineNumber(opts.size);
        this.font = opts.font;
        this.align = opts.align;
        this.baseline = opts.baseline;
        this.direction = opts.direction;
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
        this.size.update(time);
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
				const prevOpacity = ctx.globalAlpha;
				ctx.globalAlpha = this.opacity.value;

        ctx.font = `${this.size.value}px ${this.font}`;
				ctx.textAlign = this.align;
				ctx.textBaseline = this.baseline;
				ctx.direction = this.direction;

        ctx.strokeStyle = this.stroke.value.toString();
        ctx.fillStyle = this.background.value.toString();

				ctx.fillText(this.text, this.x.value, this.y.value);
        if (this.strokeWidth.value > 0) {
            ctx.lineWidth = this.strokeWidth.value;
						ctx.strokeText(this.text, this.x.value, this.y.value);
        }

				ctx.globalAlpha = prevOpacity;
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
