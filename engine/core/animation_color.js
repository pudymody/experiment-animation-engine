/** @import { Keyframe, KeyframeProps, Timeline } from './animation' */
/** @import { Easing } from './easing' */
import { linear } from "./easing.js";
import { Clamp01, Lerp } from "./math.js";
export class Color {
    /**
     * @public
     */
    r;
    /**
     * @public
     */
    g;
    /**
     * @public
     */
    b;
    /**
     * @public
     */
    a;
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} a
     */
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * @returns {string}
     */
    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}
const Colors = {
    RED: new Color(255, 0, 0, 1),
    GREEN: new Color(0, 255, 0, 1),
    BLUE: new Color(0, 0, 255, 1),
    BLACK: new Color(0, 0, 0, 1),
    WHITE: new Color(255, 255, 255, 1),
    TRANSPARENT: new Color(0, 0, 0, 0),
};
export { Colors };
export class KeyframeColor {
    /**
     * @private
     */
    from;
    /**
     * @public
     */
    to;
    /**
     * @private
     */
    duration;
    /**
     * @public
     */
    at;
    /**
     * @public
     */
    delay;
    /**
     * @private
     */
    ease;
    /**
     * @param {KeyframeProps<Color>} opts
     */
    constructor(opts) {
        this.from = opts.from;
        this.to = opts.to;
        this.duration = opts.duration || 0;
        this.at = opts.at || 0;
        this.delay = opts.delay || 0;
        this.ease = opts.ease || linear;
    }
    /**
     * @param {number} time
     * @returns {Color}
     */
    value(time) {
        if (this.duration == 0) {
            return this.to;
        }
        const t = Clamp01((time - this.at - this.delay) / this.duration);
        return new Color(Lerp(this.from.r, this.to.r, this.ease(t)), Lerp(this.from.g, this.to.g, this.ease(t)), Lerp(this.from.b, this.to.b, this.ease(t)), Lerp(this.from.a, this.to.a, this.ease(t)));
    }
    /**
     * @returns {number}
     */
    get endTime() {
        return this.at + this.delay + this.duration;
    }
}
export class TimelineColor {
    /**
     * @private
     */
    _keyframes;
    /**
     * @private
     */
    _currentValue;
    /**
     * @param {Color} start
     */
    constructor(start) {
        this._keyframes = [
            new KeyframeColor({
                from: start,
                to: start,
                duration: 0,
                at: 0,
								delay: 0,
                ease: linear,
            })
        ];
        this._currentValue = start;
    }
    /**
     * @param {Omit<KeyframeProps<Color>, "from">} opts
     * @returns {Keyframe<Color>}
     */
    to(opts) {
        const lastFrame = this._keyframes.at(-1);
        if (lastFrame === undefined) {
            throw new Error("tried to get last frame from timeline but array is empty");
        }
        const to = new Color(opts.to.r - this.endValue.r, opts.to.g - this.endValue.g, opts.to.b - this.endValue.b, opts.to.a - this.endValue.a);
        let at = lastFrame.endTime;
        if (opts.at !== undefined) {
            at = opts.at;
        }
        const newKeyframe = new KeyframeColor({
            from: new Color(0, 0, 0, 0),
            to: to,
            duration: opts.duration,
            at: at,
						delay: opts.delay,
            ease: opts.ease,
        });
        this._keyframes.push(newKeyframe);
        return newKeyframe;
    }
    /**
     * @private
     * @returns {Color}
     */
    get endValue() {
        let value = new Color(0, 0, 0, 0);
        for (let k of this._keyframes) {
            value.r = value.r + k.to.r;
            value.g = value.g + k.to.g;
            value.b = value.b + k.to.b;
            value.a = value.a + k.to.a;
        }
        return value;
    }
    /**
     * @param {number} t
     * @returns {void}
     */
    update(t) {
        let value = new Color(0, 0, 0, 0);
        for (let k of this._keyframes.filter( k => k.at + k.delay <= t)) {
            value.r = value.r + k.value(t).r;
            value.g = value.g + k.value(t).g;
            value.b = value.b + k.value(t).b;
            value.a = value.a + k.value(t).a;
        }
        this._currentValue = value;
    }
    /**
     * @returns {Color}
     */
    get value() {
        return this._currentValue;
    }
}
