/** @import { Keyframe, KeyframeProps, Timeline } from './animation' */
/** @import { Easing } from './easing' */
import { linear } from "./easing.js";
import { Clamp01, Lerp } from "./math.js";
export class KeyframeString {
    /**
     * @public
     */
    value;
    /**
     * @public
     */
    at;
    /**
     * @public
     */
    delay;
    /**
     * @param {KeyframeProps<number>} opts
     */
    constructor(opts) {
        this.value = opts.value;
        this.at = opts.at || 0;
        this.delay = opts.delay || 0;
    }
    /**
     * @param {number} time
     * @returns {number}
     */
    value(time) {
    	return this.value;
    }
    /**
     * @returns {number}
     */
    get endTime() {
        return this.at + this.delay;
    }
}
export class TimelineString {
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
            new KeyframeString({
            		value: start,
                at: 0,
								delay: 0,
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
        let at = lastFrame.endTime;
        if (opts.at !== undefined) {
            at = opts.at;
        }
        const newKeyframe = new KeyframeString({
						value: opts.to,
            at: at,
						delay: opts.delay,
        });
        this._keyframes.push(newKeyframe);
        return newKeyframe;
    }
    /**
     * @private
     * @returns {number}
     */
    get endValue() {
				return this._keyframes.at(-1).value;
    }
    /**
     * @param {number} t
     * @returns {void}
     */
    update(t) {
        this._currentValue = this._keyframes.findLast(k => k.at + k.delay <= t).value;
    }
    /**
     * @returns {number}
     */
    get value() {
        return this._currentValue;
    }
}
