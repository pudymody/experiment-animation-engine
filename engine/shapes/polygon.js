/** @import { Color } from '../core/animation_color' */
import { TimelineColor } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
export default class Polygon {
    /**
     * @public
     */
    points;
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
     * @param {PolygonProps} opts
     */
    constructor(opts) {
        if (opts.points === undefined || opts.points.length < 2) {
            throw new Error("Polygon constructor must have more than 2 points");
        }
        this.points = opts.points;
        this.strokeWidth = new TimelineNumber(opts.strokeWidth);
        this.background = new TimelineColor(opts.background);
        this.stroke = new TimelineColor(opts.stroke);
    }
    /**
     * @param {number} time
     * @returns {void}
     */
    update(time) {
        for (let p of this.points) {
            p.update(time);
        }
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
        ctx.moveTo(this.points[0].x.value, this.points[0].y.value);
        for (let i = 1; i < this.points.length; i++) {
            const currPoint = this.points[i];
            ctx.lineTo(currPoint.x.value, currPoint.y.value);
        }
        ctx.closePath();
        ctx.fill();
        if (this.strokeWidth.value > 0) {
            ctx.lineWidth = this.strokeWidth.value;
            ctx.stroke();
        }
    }
}
/**
 * @typedef {Object} PolygonProps
 * @property {Point[]} points
 * @property {Color} background
 * @property {number} strokeWidth
 * @property {Color} stroke
 */
