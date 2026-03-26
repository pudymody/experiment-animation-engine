/** @import { Text } from './text' */
export default class TextLine {
	/**
	 * @public
	 */
	texts = [];

	constructor(texts){
		this.texts = texts;
	}

	/**
	 * @param {number} time
	 * @returns {void}
	 */
	update(time){
		for(let t of this.texts){
			t.update(time);
		}
	}

	/**
	 * @param {DrawingContext} ctx
	 * @returns {void}
	 */
	draw(ctx) {
		if( this.texts.length == 0 ){
			return;
		}

		this.texts[0].draw(ctx);
		let currX = this.texts[0].x.value + this.texts[0].width;

		for(let i = 1; i < this.texts.length; i++){
			this.texts[i].x.to({ to: currX });
			this.texts[i].draw(ctx);
			currX += this.texts[i].width;
		}
	}
}
