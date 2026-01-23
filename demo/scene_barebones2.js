export default class MyScene {
  constructor(){
    this.width = 1920;
    this.height = 1920;
    this.endTime = 3000;
  }

  async setup(){
    
  }

  draw(ctx){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,this.width,this.height);

		const circleRadius = 50;

		const t1 = Math.min(this.currentTime, 1000) / 1000;
		const x = circleRadius + t1*(this.width - circleRadius*2);

		const t2 = Math.min(Math.max(this.currentTime - 2000, 0), 1000) / 1000;
		const y = circleRadius + t2*(this.height - circleRadius*2);

    ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
		ctx.fill();
  }
}
