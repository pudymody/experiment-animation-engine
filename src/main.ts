// import MyScene from "./customScene";
import DOMCanvas from "./renderer/domcanvas";

customElements.define("canvas-player", DOMCanvas);

const $player = document.querySelector<DOMCanvas>("canvas-player");
if ($player !== null) {
	// $player.src = new MyScene;
}

// TODO
//
// Make exporter
//
// Make text editor
