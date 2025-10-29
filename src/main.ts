import { javascript } from "@codemirror/lang-javascript"
import { EditorView, basicSetup } from "codemirror"
import DOMCanvas from "./renderer/domcanvas";
import MP4Renderer from "./renderer/mp4";
import type { ProgressEvent } from "./renderer/mp4"

customElements.define("canvas-player", DOMCanvas);

const $player = document.querySelector<DOMCanvas>("canvas-player");
if ($player === null) {
	throw new Error("could not get canvas preview player");
}

const $editor = document.querySelector("#editor")
if ($editor === null) {
	throw new Error("could not get editor");
}

const $exporter = document.querySelector("#export");
if ($exporter === null) {
	throw new Error("could not get export button");
}

const $progress = document.querySelector("#progress");
if ($progress === null) {
	throw new Error("could not get progress container");
}

let videoURL: string;
$exporter.addEventListener("click", function(_) {
	if (url === undefined) {
		return;
	}

	$progress.innerHTML = "";
	import(url)
		.then(({ default: scene }) => scene)
		.then(scene => {
			if (scene === undefined) {
				throw new Error("Invalid scene, make sure you are exporting it as the default")
			}

			const src = new scene();
			const renderer = new MP4Renderer(src);
			renderer.addEventListener("progress", (e: CustomEventInit<ProgressEvent>) => {
				if (e.detail === undefined) {
					return;
				}
				$progress.innerHTML = `${e.detail.percentage.toFixed(2)}%`;
			})
			renderer.export().then(blob => {
				if (videoURL !== undefined) {
					window.URL.revokeObjectURL(videoURL);
				}
				videoURL = window.URL.createObjectURL(blob);
				window.open(videoURL, "_blank");
			});
		});
})

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
	doc: `import { chain, group, DefaultScene, Colors, Easing } from "${window.location}engine.js";

// TODO:
// 	- Rectangle
// 	- Polygon
// 	- Line
// 	- Text?
// 	- Latex?
// 	- Code?
export default class extends DefaultScene {
	constructor() {
		super();

		this.width = 1920;
		this.height = 1080;

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

		this._endTime = chain([
			c.arc.to({
				to: Math.PI * 2,
				duration: 750,
				ease: Easing.easeOutQuad,
			}),
			new group([
				c.background.to({
					to: Colors.RED,
					ease: Easing.easeInQuad,
					duration: 500,
				}),
				c.stroke.to({
					to: Colors.RED,
					ease: Easing.easeInQuad,
					duration: 500,
				}),
			]),

			c.radius.to({
				to: 1000,
				duration: 1000,
				ease: Easing.easeInExpo
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
