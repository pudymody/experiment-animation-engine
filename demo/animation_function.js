import { DefaultScene, Colors, Easing, TimelineFunction } from "engine";

export default class extends DefaultScene {
	async setup() {
		const c = this.Circle();
		c.x = new TimelineFunction( (t) => ((Math.cos(t/1000) + 1)/2) * 1920 );
		this.wait(5000);
	}
}
