/** @import { Color } from '../core/animation_color' */
import { TimelineColor, Colors } from "../core/animation_color.js";
import { TimelineNumber } from "../core/animation_number.js";

function area(pts){
   var area=0;
   var nPts = pts.length;
   var j=nPts-1;
   var p1; var p2;

   for (var i=0;i<nPts;j=i++) {
      p1=pts[i]; p2=pts[j];
      area+=p1.x.value*p2.y.value;
      area-=p1.y.value*p2.x.value;
   }
   area/=2;
    
   return area;
};

function centroid(pts) {
   var nPts = pts.length;
   var x=0; var y=0;
   var f;
   var j=nPts-1;
   var p1; var p2;

   for (var i=0;i<nPts;j=i++) {
      p1=pts[i]; p2=pts[j];
      f=p1.x.value*p2.y.value-p2.x.value*p1.y.value;
      x+=(p1.x.value+p2.x.value)*f;
      y+=(p1.y.value+p2.y.value)*f;
   }

   f=area(pts)*6;
    
   return [x/f, y/f];
};

export default class Polygon {
    /**
     * @public
     */
		static DEFAULT = {
			strokeWidth: 1,
			background: Colors.WHITE,
			stroke: Colors.BLACK,
			opacity: 1,
			rotate: 0,
		};
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
     * @private
     */
    opacity;
    /**
     * @private
     */
    rotate;
    /**
     * @param {PolygonProps} opts
     */
    constructor(buildOpts) {
        if (buildOpts.points === undefined || buildOpts.points.length < 2) {
            throw new Error("Polygon constructor must have more than 2 points");
        }
        this.points = buildOpts.points;

				const opts = Object.assign({}, Polygon.DEFAULT, buildOpts);
        this.strokeWidth = new TimelineNumber(opts.strokeWidth);
        this.background = new TimelineColor(opts.background);
        this.stroke = new TimelineColor(opts.stroke);
        this.opacity = new TimelineNumber(opts.opacity);
        this.rotate = new TimelineNumber(opts.rotate);
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
        this.opacity.update(time);
        this.rotate.update(time);
    }
    /**
     * @param {DrawingContext} ctx
     * @returns {void}
     */
    draw(ctx) {
				ctx.save();
				let [cx, cy] = centroid(this.points); 
				ctx.translate(cx, cy);
				ctx.rotate(this.rotate.value);
				ctx.translate(-cx, -cy);

				ctx.globalAlpha = this.opacity.value;

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

				ctx.restore();
    }
}
/**
 * @typedef {Object} PolygonProps
 * @property {Point[]} points
 * @property {Color} background
 * @property {number} strokeWidth
 * @property {Color} stroke
 */
