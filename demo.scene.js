import { DefaultScene, Colors, Easing } from "engine";

// TODO:
// 	- Text?
//	- Opacity
// 	- Rectangle and polygon drawable animation
// 	- Rotate/Scale?
// 	- Latex?
// 	- Code?
export default class extends DefaultScene {
	constructor() {
		super();

		this.width = 1920;
		this.height = 1080;
		this.background = Colors.BLUE;
	}

	async setup() {
		const image = await this.Image({ url: "2.jpg", x: 200,y: 200, width: 1000, height: 429 });
		this.play([
			image.width.to({
				to: 2000,
				delay: 500,
				ease: Easing.easeInQuad,
				duration: 500,
			}),
			image.height.to({
				to: 859,
				delay: 500,
				ease: Easing.easeInQuad,
				duration: 500,
			}),
			image.x.to({
				to: 0,
				ease: Easing.easeInQuad,
				duration: 500,
			}),
			image.y.to({
				to: 0,
				ease: Easing.easeInQuad,
				duration: 500,
			}),
		])

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
			stroke: Colors.TRANSPARENT,
			strokeWidth: 0
		});

		const p = this.Polygon({
			points: [
				this.Point(800, 800),
				this.Point(1000, 1000),
				this.Point(600, 1000)
			],
			background: Colors.TRANSPARENT,
			stroke: Colors.TRANSPARENT,
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
