import { DefaultScene, Colors, Easing, Shapes } from "engine";

// TODO:
// 	- Rectangle and polygon drawable animation
// 	- Latex?
// 	- Code?

class CustomWidget {
	update(time){
      this.text = Math.floor(time).toString()
	}

	draw(ctx){
      ctx.fillStyle = "black";
      ctx.font = "100px monospace"
      ctx.fillText(this.text, 100, 1060)
	}
}

export default class extends DefaultScene {
	async setup() {
		const customWidget = new CustomWidget();
		this.add(customWidget);

		const SPACING = 100;
		const CIRCLE_COUNT = 5;
		const CIRCLE_RADIUS = (this.width - (CIRCLE_COUNT + 1)*SPACING) / CIRCLE_COUNT / 2;
		const CIRCLE_COLORS = [Colors.RED, Colors.GREEN, Colors.BLUE, Colors.BLACK, Colors.WHITE];
		const CIRCLES = [];
		for(let i = 0; i < CIRCLE_COUNT; i++){
			const c = this.Circle({
				x: (i+1)*SPACING + i*CIRCLE_RADIUS*2 + CIRCLE_RADIUS,
				y: (this.height / 2) + CIRCLE_RADIUS / 2, 
				radius: CIRCLE_RADIUS,
				strokeWidth: 1,
				background: CIRCLE_COLORS[i],
			});
			CIRCLES.push(c);
		}

		this.play(CIRCLES.map( (c,i) => c.y.to({
			to: CIRCLE_RADIUS+SPACING,
			duration: 500,
			ease: Easing.easeInQuint,
			delay: i * 50,
		})))

		this.wait(2000);

		this.play(CIRCLES.map( (c,i) => c.y.to({
			to: this.height - CIRCLE_RADIUS - SPACING,
			duration: 500,
			ease: Easing.easeInQuint,
			delay: i * 50,
		})))

		this.play(CIRCLES[0].background.to({
			to: Colors.BLACK,
			duration: 500,
			ease: Easing.easeInQuint,
		}))
		this.play(CIRCLES[1].background.to({
			to: Colors.BLACK,
			duration: 500,
			ease: Easing.easeInQuint,
		}))
		this.play(CIRCLES[2].background.to({
			to: Colors.BLACK,
			duration: 500,
			ease: Easing.easeInQuint,
		}))
		this.play(CIRCLES[3].background.to({
			to: Colors.BLACK,
			duration: 500,
			ease: Easing.easeInQuint,
		}))
		this.play(CIRCLES[4].background.to({
			to: Colors.BLACK,
			duration: 500,
			ease: Easing.easeInQuint,
		}))
	}
}
