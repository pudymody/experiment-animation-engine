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
        this.x = new TimelineNumber(opts.x);
        this.y = new TimelineNumber(opts.y);
        this.width = new TimelineNumber(opts.width);
        this.height = new TimelineNumber(opts.height);
        this.sx = new TimelineNumber(opts.sx);
        this.sy = new TimelineNumber(opts.sy);
        this.sWidth = new TimelineNumber(opts.sWidth);
        this.sHeight = new TimelineNumber(opts.sHeight);
        this.opacity = new TimelineNumber(opts.opacity);
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
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
			const prevOpacity = ctx.globalAlpha;
			ctx.globalAlpha = this.opacity.value;

			ctx.drawImage(this._src, this.sx.value, this.sy.value, this.sWidth.value, this.sHeight.value, this.x.value, this.y.value, this.width.value, this.height.value);

			ctx.globalAlpha = prevOpacity;
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
