import MyScene from "./customScene";
import DOMCanvas from "./renderer/domcanvas";

customElements.define("canvas-player", DOMCanvas);

const video = new MyScene;
const $player = document.querySelector<DOMCanvas>("canvas-player");
if ($player !== null) {
	$player.src = video;
}

// TODO
//
// Make exporter
