/** @import { Keyframe } from '../core/animation' */
/** @import { CircleProps } from '../shapes/circle' */
import { Colors } from "./animation_color.js";
import Circle from "../shapes/circle.js";
import Point from "../shapes/point.js";
import Polygon from "../shapes/polygon.js";
import Rectangle from "../shapes/rectangle.js";
import EngineImage from "../shapes/image.js";
import Text from "../shapes/text.js";
import TextLine from "../shapes/textline.js";
;

export class DefaultScene {
    /**
     * @private
     * @default undefined[]
     */
    _objects = [];
    /**
     * @private
     * @default 0
     */
    _currentTime = 0;
    /**
     * @protected
     * @default 0
     */
    _endTime = 0;
    /**
     * @public
     * @default 0
     */
    width = 1920;
    /**
     * @public
     * @default 0
     */
    height = 1080;
    /**
     * @public
     * @default "white"
     */
    background = Colors.WHITE;
    /**
     * @param {Object} o
     * @returns {void}
     */
    add(o) {
        this._objects.push(o);
    }
    /**
     * @returns {number}
     */
    get endTime() {
        return this._endTime;
    }
    /**
     * @returns {number}
     */
    get currentTime() {
        return this._currentTime;
    }
    /**
     * @param {number} value
     */
    set currentTime(value) {
        this.update(value);
    }
    /**
     * @param {number} time
     * @returns {void}
     */
    update(time) {
        this._currentTime = Math.min(time, this._endTime);
        for (let o of this._objects) {
            o.update(this._currentTime);
        }
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
        ctx.fillStyle = this.background.toString();
        ctx.fillRect(0, 0, this.width, this.height);
        for (let o of this._objects) {
            o.draw(ctx);
        }
    }
    /**
     * @param {number} ms
     * @returns {void}
     */
    wait(ms) {
        this._endTime += ms;
    }
    /**
     * @param {any} frame
     * @returns {void}
     */
    play(frame) {
        if (Array.isArray(frame)) {
            this._group(frame);
            return;
        }
        if ("at" in frame && "endTime" in frame) {
            this._chain(frame);
            return;
        }
    }
    /**
     * @param {Pick<Keyframe<any>, "at" | "endTime">[]} frames
     * @returns {void}
     */
    _group(frames) {
        const offset = this._endTime;
        frames.forEach(f => {
            f.at = offset;
        });
        this._endTime = Math.max(...frames.map(f => f.endTime));
    }
    /**
     * @param {Pick<Keyframe<any>, "at" | "endTime">} frame
     * @returns {void}
     */
    _chain(frame) {
        frame.at = this._endTime;
        this._endTime = frame.endTime;
    }
    /**
     * @param {CircleProps} opts
     * @returns {Circle}
     */
    Circle(opts) {
        let c = new Circle(opts);
        this.add(c);
        return c;
    }
    /**
     * @param {PolygonProps} opts
     * @returns {Polygon}
     */
    Polygon(opts) {
        let c = new Polygon(opts);
        this.add(c);
        return c;
    }
    /**
     * @param {RectangleProps} opts
     * @returns {Rectangle}
     */
    Rectangle(opts) {
        let c = new Rectangle(opts);
        this.add(c);
        return c;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {Point}
     */
    Point(x, y) {
        return new Point(x, y);
    }

    /**
     * @param {ImageProps} opts
     * @returns {Image}
     */
    async Image(opts) {
			const image = await imageBitmapFromURL(opts.url);
			const img = new EngineImage({
				...opts,
				src: image,
			});
			this.add(img);
			return img;
    }

    /**
     * @param {TextProps} opts
     * @returns {Text}
     */
    Text(opts) {
			let t = new Text(opts);
			this.add(t);
			return t;
    }

    /**
     * @param {Text[]} texts 
     * @returns {TextLine}
     */
    TextLine(texts) {
			let t = new TextLine(texts);
			this.add(t);
			return t;
    }

    /**
     * @param {string} text
     * @param {TextProps} opts
     * @returns {TextLine}
     */
    TextLineFromStr(text, opts) {
			let t = new TextLine(
				text.split(" ").map( w => new Text({
					...opts,
					text: w + " ",
				}) )
			);
			this.add(t);
			return t;
    }
}

async function imageBitmapFromURL(url){
	return new Promise(function(resolve,reject){
		const image = new Image();
		image.crossOrigin = "anonymous";
		image.onload = function () {
			createImageBitmap(image).then(resolve, reject);
		};
		image.src = url;
	})
}
/**
 * @typedef {Object} DrawingContext
 */
/**
 * @typedef {Object} Object
 */
/**
 * @typedef {Object} Scene
 * @property {number} width
 * @property {number} height
 * @property {string} background
 * @property {number} currentTime
 * @property {number} endTime
 */
