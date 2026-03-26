import { DefaultScene, Colors, Easing } from "engine";

export default class extends DefaultScene {
	async setup() {
		const t = this.Text({
			text: "Hola!",
			// x: 1920 / 2,
			// y: 1080 /2,
			// strokeWidth: 1,
			// background: Colors.WHITE,
			// stroke: Colors.BLACK,
			// opacity: 1,
			// size: 48,
			// font: "sans-serif",
			// align: "start",
			// baseline: "alphabetic",
			// direction: "inherit",
			// rotate: 0,
		});
		const t2 = this.TextLineFromStr("Hola! Este es un mensaje", {
			// x: 1920 / 2,
			y: 100,
			// strokeWidth: 1,
			// strokeWidth: 1,
			// background: Colors.WHITE,
			// stroke: Colors.BLACK,
			// opacity: 1,
			// size: 48,
			// font: "sans-serif",
			// align: "start",
			// baseline: "alphabetic",
			// direction: "inherit",
			// rotate: 0,
		});

		this.wait(1000);
		this.play(t.text.to({ to: "Hola! Este es un mensaje" }))
		this.wait(1000);

		this.wait(1000);
		this.play(t2.texts[1].background.to({ to: Colors.RED,duration: 1250, ease: Easing.easeInOutCubic  }))
		this.wait(1000);
	}
}
