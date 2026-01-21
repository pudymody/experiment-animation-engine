/** @import { Color } from '../core/animation_color' */
import { TimelineColor } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";
export default class Image {
    /**
     * @public
     */
		static DEFAULT = {
			x: 0,
			y: 0,
			sx: 0,
			sy: 0,
			opacity: 1,
			rotate: 0,
		};
    /**
     * @private
     */
    _src;
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
    sx;
    /**
     * @public
     */
    sy;
    /**
     * @public
     */
    sWidth;
    /**
     * @public
     */
    sHeight;
    /**
     * @public
     */
    opacity;
    /**
     * @public
     */
    rotate;
    /**
     * @param {ImageProps} opts
     */
    constructor(buildOpts) {
				const opts = Object.assign({}, Image.DEFAULT, buildOpts);
				if( opts.width === undefined ){
					opts.width = opts.src.width;
				}
				if( opts.height === undefined ){
					opts.height = opts.src.height;
				}
				if( opts.sWidth === undefined ){
					opts.sWidth = opts.src.width;
				}
				if( opts.sHeight === undefined ){
					opts.sHeight = opts.src.height;
				}
        this.x = (typeof opts.x === "number" ? new TimelineNumber(opts.x) : opts.x);
        this.y = (typeof opts.y === "number" ? new TimelineNumber(opts.y) : opts.y);
        this.width = (typeof opts.width === "number" ? new TimelineNumber(opts.width) : opts.width);
        this.height = (typeof opts.height === "number" ? new TimelineNumber(opts.height) : opts.height);
        this.sx = (typeof opts.sx === "number" ? new TimelineNumber(opts.sx) : opts.sx);
        this.sy = (typeof opts.sy === "number" ? new TimelineNumber(opts.sy) : opts.sy);
        this.sWidth = (typeof opts.sWidth === "number" ? new TimelineNumber(opts.sWidth) : opts.sWidth);
        this.sHeight = (typeof opts.sHeight === "number" ? new TimelineNumber(opts.sHeight) : opts.sHeight);
        this.opacity = (typeof opts.opacity === "number" ? new TimelineNumber(opts.opacity) : opts.opacity);
        this.rotate = (typeof opts.rotate === "number" ? new TimelineNumber(opts.rotate) : opts.rotate);
				this._src = opts.src;
    }
		/**
     * @returns {number}
     */	
		get aspectRatioWidth(){
			return this._src.width/this._src.height;
		}
		/**
     * @returns {number}
     */	
		get aspectRatioHeight(){
			return this._src.height/this._src.width;
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
        this.sx.update(time);
        this.sy.update(time);
        this.sWidth.update(time);
        this.sHeight.update(time);
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

			ctx.drawImage(this._src, this.sx.value, this.sy.value, this.sWidth.value, this.sHeight.value, this.x.value, this.y.value, this.width.value, this.height.value);

			ctx.restore();
    }
}
/**
 * @typedef {Object} ImageProps
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string} url 
 */
