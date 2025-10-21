import { javascript } from "@codemirror/lang-javascript"
import { EditorView, basicSetup } from "codemirror"
import DOMCanvas from "./renderer/domcanvas.ts";

customElements.define("canvas-player", DOMCanvas);

const $player = document.querySelector<DOMCanvas>("canvas-player");
if ($player === null) {
	throw new Error("could not get canvas preview player");
}

const $editor = document.querySelector("#editor")
if ($editor === null) {
	throw new Error("could not get editor");
}

let url: string;
function updatePreview() {
	if ($player === null) {
		return;
	}

	const value = view.state.doc.toString();
	if (value.length === 0) {
		return;
	}

	if (url !== undefined) {
		window.URL.revokeObjectURL(url);
	}

	url = window.URL.createObjectURL(new Blob([value], { type: "application/javascript" }));
	$player.src = url;
}

const view = new EditorView({
	doc: `import { chain, group, Scene, RED, TRANSPARENT, BLACK, easeOutQuad,easeInQuad, easeInExpo } from "${window.location}engine/index.js";

export default class extends Scene {
	constructor() {
		super();

		this.width = 800;
		this.height = 600;

		const circleRadius = 10;
		const c = this.Circle({
			x: this.width / 2 - circleRadius,
			y: this.height / 2 - circleRadius,
			radius: circleRadius,
			background: TRANSPARENT,
			strokeWidth: 2,
			stroke: BLACK,
			arc: 0,
		});

		this._endTime = chain([
			c.arc.to({
				to: Math.PI * 2,
				duration: 750,
				ease: easeOutQuad,
			}),
			new group([
				c.background.to({
					to: RED,
					ease: easeInQuad,
					duration: 500,
				}),
				c.stroke.to({
					to: RED,
					ease: easeInQuad,
					duration: 500,
				}),
			]),

			c.radius.to({
				to: 1000,
				duration: 1000,
				ease: easeInExpo
			})
		]);
	}
}`,
	parent: $editor,
	extensions: [
		basicSetup,
		javascript({ typescript: true }),
		EditorView.domEventObservers({
			"blur": updatePreview
		})
	]
})
updatePreview();
