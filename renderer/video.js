import {
	Output,
	BufferTarget,
	Mp4OutputFormat,
	CanvasSource,
	QUALITY_HIGH,
	getFirstEncodableAudioCodec,
	getFirstEncodableVideoCodec,
	OutputFormat,
} from 'https://esm.sh/mediabunny';

export default class VideoRenderer extends EventTarget {
	constructor(){
		super();
	}

	render(src, frameRate = 60){
		return import(src)
			.then(({ default: scene }) => scene)
			.then(async scene => {
				if (scene === undefined) {
						throw new Error("Invalid scene, make sure you are exporting it as the default");
				}
				const src = new scene();
				await src.setup();

				const width = src.width;
				const height = src.height;
				let playTime = 0;

				// hardcoded 60fps for now
				const dt = 1000/frameRate;

				// Create a new output file
				const output = new Output({
					target: new BufferTarget(), // Stored in memory
					format: new Mp4OutputFormat(),
				});

				// Retrieve the first video codec supported by this browser that can be contained in the output format
				const videoCodec = await getFirstEncodableVideoCodec(output.format.getSupportedVideoCodecs(), {
					width: width,
					height: height,
				});
				if (!videoCodec) {
					throw new Error('Your browser doesn\'t support video encoding.');
				}

				// For video, we use a CanvasSource for convenience, as we're rendering to a canvas
				const $canvas = new OffscreenCanvas(width, height);
				const ctx = $canvas.getContext("2d");
				const canvasSource = new CanvasSource($canvas, {
					codec: videoCodec,
					bitrate: QUALITY_HIGH,
				});

				output.addVideoTrack(canvasSource, { frameRate });
				await output.start();
				while(playTime <= src.endTime){
					ctx.clearRect(0, 0, $canvas.width, $canvas.height);
					src.currentTime = playTime;
					src.draw(ctx);

					await canvasSource.add(playTime / 1000, dt / 1000);
					const progressEvent = new CustomEvent("progress", { detail: { current: playTime, total: src.endTime } });
					this.dispatchEvent(progressEvent);
					playTime += dt;
				}

				canvasSource.close();
				await output.finalize();
				const progressEvent = new CustomEvent("progress", { detail: { current: src.endTime, total: src.endTime } });
				this.dispatchEvent(progressEvent);
				return new Blob([output.target.buffer], { type: output.format.mimeType });
			});
	}
}
