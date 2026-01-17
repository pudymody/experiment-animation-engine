import { DefaultScene, Colors } from "engine";

export default class extends DefaultScene {
	async setup() {
		const image = await this.Image({
			url: "2.jpg",
			// x: 0,
			// sx: 0,
			// y: 0,
			// sy: 0,
			// width: src.width,
			// sWidth: src.width,
			// height: src.height,
			// sHeight: src.height,
			// opacity: 1,
		});
	}
}
