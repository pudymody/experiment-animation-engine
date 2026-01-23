export default class MyScene {
  constructor(){
    this.width = 1920;
    this.height = 1920;
    this.endTime = 1000;
  }

  async setup(){
    
  }

  draw(ctx){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,this.width,this.height);
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "100px monospace";
    ctx.fillText(Math.floor(this.currentTime).toString(), 1920/2, 1920/2);
  }
}
