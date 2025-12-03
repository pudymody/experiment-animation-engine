import DOMCanvas from "./renderer/domcanvas";
import MP4Renderer from "./renderer/mp4";
import type { ProgressEvent } from "./renderer/mp4"


import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// @ts-ignore
self.MonacoEnvironment = {
	getWorker(_: any, label: string) {
		if (label === 'json') {
			return new jsonWorker();
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return new cssWorker();
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return new htmlWorker();
		}
		if (label === 'typescript' || label === 'javascript') {
			return new tsWorker();
		}
		return new editorWorker();
	}
};

customElements.define("canvas-player", DOMCanvas);

const $player = document.querySelector<DOMCanvas>("canvas-player");
if ($player === null) {
	throw new Error("could not get canvas preview player");
}

const $editor = document.querySelector<HTMLDivElement>("#editor")
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

	const value = monacoEditor.getValue();
	if (value.length === 0) {
		return;
	}

	if (url !== undefined) {
		window.URL.revokeObjectURL(url);
	}

	url = window.URL.createObjectURL(new Blob([value], { type: "application/javascript" }));
	$player.src = url;
}


const monacoEditor = monaco.editor.create($editor, {
	value: `import { DefaultScene, Colors, Easing } from "${window.location}src/engine/index.ts";

// TODO:
// 	- Rectangle and polygon drawable animation
// 	- Rotate/Scale?
// 	- Image
// 	- Typescript types for editor autocomplete
// 	- Text?
// 	- Latex?
// 	- Code?
export default class extends DefaultScene {
	constructor() {
		super();

		this.width = 1920;
		this.height = 1080;
		this.background = Colors.BLUE;
		this.setup();
	}

	setup() {
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
}`,
	language: "javascript",
	automaticLayout: true,
	minimap: {
		enabled: false
	},
	scrollBeyondLastLine: false
});

monacoEditor.onDidBlurEditorWidget(updatePreview);
updatePreview();
