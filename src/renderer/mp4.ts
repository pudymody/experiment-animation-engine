import {
	Output,
	Mp4OutputFormat,
	BufferTarget,
	CanvasSource,
	QUALITY_HIGH,
	getFirstEncodableVideoCodec
} from 'mediabunny';

interface Scene {
	width: number;
	height: number;
	background: string;
	currentTime: number,
	endTime: number,
	draw(ctx: CanvasRenderingContext2D): void
}

export default class MP4Renderer {
	private scene: Scene;
	private fps: number = 60;
	private canvas: OffscreenCanvas;
	private ctx: OffscreenCanvasRenderingContext2D;;

	constructor(scene: Scene) {
		this.scene = scene;
		this.canvas = new OffscreenCanvas(scene.width, scene.height)

		const ctx = this.canvas.getContext("2d");
		if (ctx === null) {
			throw new Error("could not get context for offscreen canvas");
		}
		this.ctx = ctx;
	}

	async export(): Promise<Blob> {
		const output = new Output({
			format: new Mp4OutputFormat(),
			target: new BufferTarget(),
		});

		const videoCodec = await getFirstEncodableVideoCodec(output.format.getSupportedVideoCodecs(), {
			width: this.canvas.width,
			height: this.canvas.height,
		});

		if (!videoCodec) {
			throw new Error('Your browser doesn\'t support video encoding.');
		}
		const canvasSource = new CanvasSource(this.canvas, {
			codec: videoCodec,
			bitrate: QUALITY_HIGH,
		});
		output.addVideoTrack(canvasSource, {
			frameRate: this.fps,
		});
		await output.start(); // Resolves once the output is ready to receive media data
		let interval = 1 / this.fps * 1000;
		let framesAdded = 0;
		for (let i = 0; i <= this.scene.endTime; i += interval) {
			this.scene.currentTime = i;
			this.scene.draw(this.ctx);

			const timestampInSeconds = framesAdded / this.fps;
			const durationInSeconds = 1 / this.fps;

			await canvasSource.add(timestampInSeconds, durationInSeconds);
			framesAdded++;
		}

		canvasSource.close();
		await output.finalize(); // Resolves once the output is finalized
		//
		if (output.target.buffer === null) {
			throw new Error("output target buffer is null")
		}
		const videoBlob = new Blob([output.target.buffer!], { type: output.format.mimeType });
		return videoBlob;
	}
}
