/** @import { Keyframe, KeyframeProps, Timeline } from './animation' */
/** @import { Easing } from './easing' */
import { linear } from "./easing.js";
import { Clamp01, Lerp } from "./math.js";
export class KeyframeNumber {
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
     * @param {KeyframeProps<number>} opts
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
     * @returns {number}
     */
    value(time) {
        if (this.duration == 0) {
            return this.to;
        }
        const t = Clamp01((time - this.at - this.delay) / this.duration);
        return Lerp(this.from, this.to, this.ease(t));
    }
    /**
     * @returns {number}
     */
    get endTime() {
        return this.at + this.delay + this.duration;
    }
}
export class TimelineNumber {
    /**
     * @private
     */
    _keyframes;
    /**
     * @private
     */
    _currentValue;
    /**
     * @param {number} start
     */
    constructor(start) {
        this._keyframes = [
            new KeyframeNumber({
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
     * @param {Omit<KeyframeProps<number>, "from">} opts
     * @returns {Keyframe<number>}
     */
    to(opts) {
        const lastFrame = this._keyframes.at(-1);
        if (lastFrame === undefined) {
            throw new Error("tried to get last frame from timeline but array is empty");
        }
        const to = opts.to - this.endValue;
        let at = lastFrame.endTime;
        if (opts.at !== undefined) {
            at = opts.at;
        }
        const newKeyframe = new KeyframeNumber({
            from: 0,
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
     * @returns {number}
     */
    get endValue() {
        let value = 0;
        for (let k of this._keyframes) {
            value = value + k.to;
        }
        return value;
    }
    /**
     * @param {number} t
     * @returns {void}
     */
    update(t) {
        let value = 0;
        for (let k of this._keyframes) {
            value = value + k.value(t);
        }
        this._currentValue = value;
    }
    /**
     * @returns {number}
     */
    get value() {
        return this._currentValue;
    }
}
