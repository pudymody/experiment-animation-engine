import {
    DefaultScene,
    Color,
    Colors,
    Easing,
    Shapes
} from "engine";

class Grid {
    constructor(size, width, height) {
        this.size = size;
        this.width = width;
        this.height = height;
        this.strokeWidth = 5;
        this.stroke = new Color(73, 80, 87, 255);

        this.vLines = [];
        for (let i = this.size; i < this.width; i += this.size) {
            this.vLines.push(new Shapes.Polygon({
                points: [new Shapes.Point(i, this.height / 2),
                    new Shapes.Point(i, this.height / 2)
                ],
                strokeWidth: this.strokeWidth,
                stroke: this.stroke
            }))
        }

        this.hLines = [];
        for (let i = this.size; i < this.height; i += this.size) {
            this.hLines.push(new Shapes.Polygon({
                points: [new Shapes.Point(this.width / 2, i),
                    new Shapes.Point(this.width / 2, i)
                ],
                strokeWidth: this.strokeWidth,
                stroke: this.stroke
            }))
        }
    }

    spawn() {
        const easing = Easing.easeInOutCubic;
        const duration = 350;

        const vAnimation = this.vLines.map(k => {
            return [
                k.points[0].y.to({
                    to: 0,
                    easing: easing,
                    duration: duration
                }),
                k.points[1].y.to({
                    to: this.height,
                    easing: easing,
                    duration: duration
                })
            ]
        })

        const hAnimation = this.hLines.map(k => {
            return [
                k.points[0].x.to({
                    to: 0,
                    easing: easing,
                    duration: duration
                }),
                k.points[1].x.to({
                    to: this.width,
                    easing: easing,
                    duration: duration
                })
            ]
        })

        return [...vAnimation, ...hAnimation].flat();
    }

    update(t) {
        for (let p of this.vLines) {
            p.update(t);
        }
        for (let p of this.hLines) {
            p.update(t);
        }
    }

    draw(ctx) {
        for (let p of this.vLines) {
            p.draw(ctx);
        }
        for (let p of this.hLines) {
            p.draw(ctx);
        }
    }
}

class SinTime {
    at = 0;
    _currentValue = 0;
    constructor(x, r) {
        this.x = x;
        this.r = r;
    }
    update(t) {
        const currentT = Math.max(0, t - this.at);
        this._currentValue = this.x + Math.sin(currentT / 1000 * Math.PI * 2) * this.r
    }

    get value() {
        return this._currentValue;
    }

}
class CosTime {
    at = 0;
    _currentValue = 0;
    constructor(x, r) {
        this.x = x;
        this.r = r;
    }
    update(t) {
        const currentT = Math.max(0, t - this.at);
        this._currentValue = this.x + Math.cos(currentT / 1000 * Math.PI * 2) * this.r
    }

    get value() {
        return this._currentValue;
    }

}
export default class extends DefaultScene {
    constructor() {
        super();
        this.width = 1920;
        this.height = 1920;
        this.background = new Color(52, 58, 64, 255)
    }
    async setup() {
        const gridCount = 10;
        const g = new Grid(this.width / gridCount, this.width, this.height);
        this.add(g);

        this.play(g.spawn());

        const c = this.Circle({
            radius: 20,
            strokeWidth: 0,
            background: Colors.RED,
            x: this.width / 2,
            y: this.height / 2
        })


        this.wait(150);
        this.play(
            c.x.to({
                to: this.width / 2 + this.width / gridCount * 2,
                easing: Easing.easeOutInCubic,
                duration: 300
            })
        );

        const sin = new SinTime(this.width / 2, this.width / gridCount * 2);
        sin.at = this.endTime;
        const cos = new CosTime(this.height / 2, this.width / gridCount * 2);
        cos.at = this.endTime;

        const c2 = this.Circle({
            x: cos,
            y: sin,
            radius: 20,
            strokeWidth: 0,
            background: Colors.RED,
            opacity: 0,
        });
        const c3 = this.Circle({
            x: this.width / 2,
            y: this.height / 2,
            radius: this.width / gridCount * 2,
            background: Colors.TRANSPARENT,
            strokeWidth: 15,
            stroke: Colors.RED,
            arc: 0
        })
        this.play([
            c.opacity.to({
                to: 0,
                duration: 0
            }),
            c2.opacity.to({
                to: 1,
                duration: 0
            })
        ]);
    

        this.play(c3.arc.to({
            to: Math.PI * 2,
            duration: 1000,
        }))
        this.play([
            c2.opacity.to({
                to: 0,
                duration: 0,
            }),
            c3.background.to({
                to: Colors.RED,
                duration: 400,
                ease: Easing.easeInOutCubic
            })
        ])
    }
}
