/** @import { Keyframe, KeyframeProps, Timeline } from './animation' */
/** @import { Easing } from './easing' */
export class TimelineFunction {
    /**
     * @private
     */
    generator;
    /**
     * @private
     */
    _currentValue;
    /**
     * @param {function}generator 
     */
    constructor(generator) {
				this.generator = generator;
        this._currentValue = generator(0);
    }
    /**
     * @param {number} t
     * @returns {void}
     */
    update(t) {
        this._currentValue = this.generator(t);
    }
    /**
     * @returns {number}
     */
    get value() {
        return this._currentValue;
    }
}
