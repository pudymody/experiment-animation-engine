import { DefaultScene, Colors, Easing } from "engine";

// https://developer.mozilla.org/en-US/play?uuid=6be7ec759ec06e8f8d2a1bec081004382edb9eee&state=dVFLT8MwDP4rUU5Bqtq1Q6Cxx2EDJG5IcMylSkxblDpTY8omxH%2FHUSqG0HbKl%2B%2FhxPaXbKl38k6uTI1jHURn11omrOVmVSS40SgzaUJgJ4P3eBqPgcQUWwvrzUcPSHkD9OAgwu3xyapTtaulxilEB04kPvp3HgkOxN7KJp%2FGohC7AWoCsa%2Bp1eiAxABN55GjCJ%2FimenqXkV34vPej%2FDq1XyWicXsD%2B86jHxZslCdEaprFsr5GeXmklAuLtW6%2Ff%2B6cT5A%2FKz6beyxc25qi0eRv%2FH1hY4OuDMtmwEAtVyeNJUqZSzCCOjtNCTeBLU8aV6G65qW5PcP&srcPrefix=%2Fen-US%2Fdocs%2FWeb%2FAPI%2FCanvasRenderingContext2D%2Ffill%2F
export default class Scene {
	constructor(){
		this.width = 1920;
		this.height = 1080;
		this.background = Colors.WHITE;

		this.endTime = 5000;
	}

	update(time){}
	draw(ctx){
		ctx.beginPath()
		ctx.moveTo(30, 90);
		ctx.lineTo(110, 20);
		ctx.lineTo(240, 130);
		ctx.lineTo(60, 130);
		ctx.lineTo(190, 20);
		ctx.lineTo(270, 90);
		ctx.closePath();

		// Fill path
		ctx.fillStyle = "green";
		ctx.fill();
	}
}
// TODO:
// 	- Rectangle and polygon drawable animation
// 	- Rotate/Scale?
// 	- Image
// 	- Text?
// 	- Latex?
// 	- Code?
export class Pepito extends DefaultScene {
	constructor() {
		super();

		this.width = 1920;
		this.height = 1080;
		this.background = Colors.BLUE;
		this.setup();
	}

	update(time) {
		super.update(time);
	}

	setup() {
		const circleRadius = 10;
		const c = this.Circle({
			x: this.width / 2 - circleRadius,
			y: this.height / 2 - circleRadius,
			radius: circleRadius,
			background: Colors.TRANSPARENT,
			strokeWidth: 2,
			stroke: Colors.BLACK,
			arc: 0,
		});

		const r = this.Rectangle({
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			background: Colors.WHITE,
			stroke: Colors.BLACK,
			strokeWidth: 5
		});

		const p = this.Polygon({
			points: [
				this.Point(800, 800),
				this.Point(1000, 1000),
				this.Point(600, 1000)
			],
			background: Colors.TRANSPARENT,
			stroke: Colors.BLACK,
			strokeWidth: 0
		});

		this.play(c.arc.to({
			to: Math.PI * 2,
			duration: 750,
			ease: Easing.easeOutQuad,
		}));

		this.play([
			c.background.to({
				to: Colors.RED,
				ease: Easing.easeInQuad,
				duration: 500,
			}),
			c.stroke.to({
				to: Colors.RED,
				ease: Easing.easeInQuad,
				duration: 500,
			})
		])

		this.wait(5000);

		this.play(c.radius.to({
			to: 2203,
			duration: 1000,
			ease: Easing.easeInExpo
		}))

		this.play([
			r.width.to({
				to: this.width,
				duration: 750,
				ease: Easing.easeOutQuad,
			}),
			r.height.to({
				to: this.height,
				duration: 750,
				ease: Easing.easeOutQuad,
			})
		]);

		this.play(p.background.to({
			to: Colors.GREEN,
			ease: Easing.easeInQuad,
			duration: 500,
		}));
	}
}
