import { TimelineNumber } from "../core/animation_number.js";
export default class Point {
    /**
     * @public
     */
    x;
    /**
     * @public
     */
    y;
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = new TimelineNumber(x);
        this.y = new TimelineNumber(y);
    }
    /**
     * @param {number} time
     * @returns {void}
     */
    update(time) {
        this.x.update(time);
        this.y.update(time);
    }
}
