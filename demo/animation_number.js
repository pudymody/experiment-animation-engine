import { DefaultScene, Colors, Easing } from "engine";

export default class extends DefaultScene {
	async setup() {
		const c = this.Circle({
			x: 1920 / 2 + 50,
			y: 1080 / 2 + 50,
			radius: 100,
		});

		this.play(c.radius.to({
			to: 200,

			duration: 1000,
			// at: 0,
			// delay: 0,

			// ease: Easing.linear (default)
			// ease: Easing.bounceOut
			// ease: Easing.easeInBack
			// ease: Easing.easeInBounce
			// ease: Easing.easeInCirc
			// ease: Easing.easeInCubic
			// ease: Easing.easeInElastic
			// ease: Easing.easeInExpo
			// ease: Easing.easeInOutBack
			// ease: Easing.easeInOutBounce
			// ease: Easing.easeInOutCirc
			// ease: Easing.easeInOutCubic
			// ease: Easing.easeInOutElastic
			// ease: Easing.easeInOutExpo
			// ease: Easing.easeInOutQuad
			// ease: Easing.easeInOutQuart
			// ease: Easing.easeInOutQuint
			// ease: Easing.easeInOutSine
			// ease: Easing.easeInQuad
			// ease: Easing.easeInQuart
			// ease: Easing.easeInQuint
			// ease: Easing.easeInSine
			// ease: Easing.easeOutBack
			// ease: Easing.easeOutCirc
			// ease: Easing.easeOutCubic
			// ease: Easing.easeOutElastic
			// ease: Easing.easeOutExpo
			// ease: Easing.easeOutQuad
			// ease: Easing.easeOutQuart
			// ease: Easing.easeOutQuint
			// ease: Easing.easeOutSine
		}))
	}
}
