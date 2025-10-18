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
	doc: `import { chain, group, Scene } from "${window.location}/engine/index.js";

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

// $editor.dispatchEvent(new FocusEvent("blur"))
//
// TODO
//
// Make exporter
//
// Make text editor
