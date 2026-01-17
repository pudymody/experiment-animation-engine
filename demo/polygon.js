import { DefaultScene, Colors } from "engine";

export default class extends DefaultScene {
	async setup() {
		const p = this.Polygon({
			points: [
				this.Point(800, 800),
				this.Point(1000, 1000),
				this.Point(600, 1000)
			],
			// background: Colors.WHITE,
			// stroke: Colors.BLACK,
			// strokeWidth: 1
			// opacity: 1,
			// rotate: 0,
		});
	}
}
