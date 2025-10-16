import { chain, group } from "./core/animation";
import { Scene } from "./core/scene";

export default class MyScene extends Scene {
	constructor() {
		super();

		this.width = 800;
		this.height = 600;

		const c = this.Circle({
			x: 10,
			y: 10,
			radius: 10,
			background: "red",
			strokeWidth: 0,
			stroke: "transparent",
		});

		this._endTime = chain([
			c.x.to({
				to: 800 - 10,
				duration: 1000,
			}),
			c.y.to({
				to: 600 - 10,
				duration: 1000,
			}),
			c.x.to({
				to: 10,
				duration: 1000,
			}),
			c.y.to({
				to: 10,
				duration: 1000,
			}),
			new group([
				c.x.to({
					to: 400 - 10,
					duration: 1000,
				}),
				c.y.to({
					to: 300 - 10,
					duration: 1000,
				})
			]),
			c.radius.to({
				to: 1000,
				duration: 1000,
			})
		]);
	}
}
