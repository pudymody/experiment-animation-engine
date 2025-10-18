import type { CircleProps } from "../shapes/circle"
import Circle from "../shapes/circle";

interface Object {
	update(time: number): void
	draw(ctx: CanvasRenderingContext2D): void
}

export class Scene {
	private _objects: Object[] = [];
	private _currentTime: number = 0;
	protected _endTime: number = 0;

	public width: number = 0;
	public height: number = 0;
	public background: string = "white";

	add(o: Object): void {
		this._objects.push(o);
	}

	get endTime(): number {
		return this._endTime;
	}

	get currentTime(): number {
		return this._currentTime;
	}

	set currentTime(value: number) {
		this.update(value);
	}

	update(time: number): void {
		this._currentTime = time;
		for (let o of this._objects) {
			o.update(time);
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		for (let o of this._objects) {
			o.draw(ctx);
		}
	}

	Circle(opts: CircleProps): Circle {
		let c = new Circle(opts);
		this.add(c);
		return c;
	}
}
