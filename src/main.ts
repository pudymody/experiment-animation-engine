import MyScene from "./customScene";
import DOMCanvas from "./renderer/domcanvas";

const video = new MyScene;
const player = new DOMCanvas();
player.src = video;

// TODO
//
// Make this a webcomponent
// Make exporter
document.querySelector("#preview")?.prepend(player.$canvas);
document.querySelector("#play")?.addEventListener("click", function(_) {
	if (player.isPlaying) {
		player.pause();
	} else {
		player.play();
	}
})
document.querySelector("#stop")?.addEventListener("click", function(_) {
	player.reset();
})

const $slider = document.querySelector<HTMLInputElement>("#position");
if ($slider !== null) {
	$slider.max = video.endTime.toString();
	$slider.addEventListener("input", function(_) {
		player.playTime = $slider.valueAsNumber;
	})
	player.addEventListener("currentTime", function(e) {
		$slider.valueAsNumber = e.detail;
	})
}
