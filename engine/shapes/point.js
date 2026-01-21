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
				if(x == undefined){
					x = 0;
				}
				if( y === undefined ){
					y = 0;
				}
        this.x = (typeof x === "number" ? new TimelineNumber(x) : x);
        this.y = (typeof y === "number" ? new TimelineNumber(y) : y);
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
