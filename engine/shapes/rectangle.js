/** @import { Color } from '../core/animation_color' */
import { TimelineColor } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
export default class Rectangle {
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
     * @param {RectangleProps} opts
     */
    constructor(opts) {
        this.x = new TimelineNumber(opts.x);
        this.y = new TimelineNumber(opts.y);
        this.width = new TimelineNumber(opts.width);
        this.height = new TimelineNumber(opts.height);
        this.strokeWidth = new TimelineNumber(opts.strokeWidth);
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
        this.width.update(time);
        this.height.update(time);
        this.strokeWidth.update(time);
        this.background.update(time);
        this.stroke.update(time);
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
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
