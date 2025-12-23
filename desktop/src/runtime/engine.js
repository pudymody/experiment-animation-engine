const r = Math.pow, k = Math.sqrt, d = Math.sin, _ = Math.cos, c = Math.PI, v = 1.70158, g = v * 1.525, T = v + 1, p = 2 * c / 3, y = 2 * c / 4.5;
function w(e) {
  return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
}
function E(e) {
  return e * e;
}
function V(e) {
  return 1 - (1 - e) * (1 - e);
}
function C(e) {
  return e < 0.5 ? 2 * e * e : 1 - r(-2 * e + 2, 2) / 2;
}
function M(e) {
  return e * e * e;
}
function Q(e) {
  return 1 - r(1 - e, 3);
}
function j(e) {
  return e < 0.5 ? 4 * e * e * e : 1 - r(-2 * e + 2, 3) / 2;
}
function B(e) {
  return e * e * e * e;
}
function R(e) {
  return 1 - r(1 - e, 4);
}
function A(e) {
  return e < 0.5 ? 8 * e * e * e * e : 1 - r(-2 * e + 2, 4) / 2;
}
function K(e) {
  return e * e * e * e * e;
}
function N(e) {
  return 1 - r(1 - e, 5);
}
function $(e) {
  return e < 0.5 ? 16 * e * e * e * e * e : 1 - r(-2 * e + 2, 5) / 2;
}
function L(e) {
  return 1 - _(e * c / 2);
}
function q(e) {
  return d(e * c / 2);
}
function z(e) {
  return -(_(c * e) - 1) / 2;
}
function D(e) {
  return e === 0 ? 0 : r(2, 10 * e - 10);
}
function F(e) {
  return e === 1 ? 1 : 1 - r(2, -10 * e);
}
function G(e) {
  return e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? r(2, 20 * e - 10) / 2 : (2 - r(2, -20 * e + 10)) / 2;
}
function H(e) {
  return 1 - k(1 - r(e, 2));
}
function U(e) {
  return k(1 - r(e - 1, 2));
}
function J(e) {
  return e < 0.5 ? (1 - k(1 - r(2 * e, 2))) / 2 : (k(1 - r(-2 * e + 2, 2)) + 1) / 2;
}
function X(e) {
  return T * e * e * e - v * e * e;
}
function Y(e) {
  return 1 + T * r(e - 1, 3) + v * r(e - 1, 2);
}
function Z(e) {
  return e < 0.5 ? r(2 * e, 2) * ((g + 1) * 2 * e - g) / 2 : (r(2 * e - 2, 2) * ((g + 1) * (e * 2 - 2) + g) + 2) / 2;
}
function x(e) {
  return e === 0 ? 0 : e === 1 ? 1 : -r(2, 10 * e - 10) * d((e * 10 - 10.75) * p);
}
function tt(e) {
  return e === 0 ? 0 : e === 1 ? 1 : r(2, -10 * e) * d((e * 10 - 0.75) * p) + 1;
}
function et(e) {
  return e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(r(2, 20 * e - 10) * d((20 * e - 11.125) * y)) / 2 : r(2, -20 * e + 10) * d((20 * e - 11.125) * y) / 2 + 1;
}
function nt(e) {
  return 1 - w(1 - e);
}
function rt(e) {
  return e < 0.5 ? (1 - w(1 - 2 * e)) / 2 : (1 + w(2 * e - 1)) / 2;
}
function f(e) {
  return e;
}
const it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bounceOut: w,
  easeInBack: X,
  easeInBounce: nt,
  easeInCirc: H,
  easeInCubic: M,
  easeInElastic: x,
  easeInExpo: D,
  easeInOutBack: Z,
  easeInOutBounce: rt,
  easeInOutCirc: J,
  easeInOutCubic: j,
  easeInOutElastic: et,
  easeInOutExpo: G,
  easeInOutQuad: C,
  easeInOutQuart: A,
  easeInOutQuint: $,
  easeInOutSine: z,
  easeInQuad: E,
  easeInQuart: B,
  easeInQuint: K,
  easeInSine: L,
  easeOutBack: Y,
  easeOutCirc: U,
  easeOutCubic: Q,
  easeOutElastic: tt,
  easeOutExpo: F,
  easeOutQuad: V,
  easeOutQuart: R,
  easeOutQuint: N,
  easeOutSine: q,
  linear: f
}, Symbol.toStringTag, { value: "Module" }));
function S(e) {
  return Math.max(Math.min(e, 1), 0);
}
function l(e, t, n) {
  return n * (t - e) + e;
}
class a {
  r;
  g;
  b;
  a;
  constructor(t, n, i, u) {
    this.r = t, this.g = n, this.b = i, this.a = u;
  }
  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
const st = {
  RED: new a(255, 0, 0, 255),
  GREEN: new a(0, 255, 0, 255),
  BLUE: new a(0, 0, 255, 255),
  BLACK: new a(0, 0, 0, 255),
  WHITE: new a(255, 255, 255, 255),
  TRANSPARENT: new a(255, 255, 255, 0)
};
class b {
  from;
  to;
  duration;
  at;
  ease;
  constructor(t) {
    this.from = t.from, this.to = t.to, this.duration = t.duration || 0, this.at = t.at || 0, this.ease = t.ease || f;
  }
  value(t) {
    if (this.duration == 0)
      return this.to;
    const n = S((t - this.at) / this.duration);
    return new a(
      l(this.from.r, this.to.r, this.ease(n)),
      l(this.from.g, this.to.g, this.ease(n)),
      l(this.from.b, this.to.b, this.ease(n)),
      l(this.from.a, this.to.a, this.ease(n))
    );
  }
  get endTime() {
    return this.at + this.duration;
  }
}
class o {
  _keyframes;
  _currentValue;
  constructor(t) {
    this._keyframes = [
      new b({
        from: t,
        to: t,
        duration: 0,
        at: 0,
        ease: f
      })
    ], this._currentValue = t;
  }
  to(t) {
    const n = this._keyframes.at(-1);
    if (n === void 0)
      throw new Error("tried to get last frame from timeline but array is empty");
    const i = new a(
      t.to.r - this.endValue.r,
      t.to.g - this.endValue.g,
      t.to.b - this.endValue.b,
      t.to.a - this.endValue.a
    );
    let u = n.endTime;
    t.at !== void 0 && (u = t.at);
    const h = new b({
      from: new a(0, 0, 0, 0),
      to: i,
      duration: t.duration,
      at: u,
      ease: t.ease
    });
    return this._keyframes.push(h), h;
  }
  get endValue() {
    let t = new a(0, 0, 0, 0);
    for (let n of this._keyframes)
      t.r = t.r + n.to.r, t.g = t.g + n.to.g, t.b = t.b + n.to.b, t.a = t.a + n.to.a;
    return t;
  }
  update(t) {
    let n = new a(0, 0, 0, 0);
    for (let i of this._keyframes)
      n.r = n.r + i.value(t).r, n.g = n.g + i.value(t).g, n.b = n.b + i.value(t).b, n.a = n.a + i.value(t).a;
    this._currentValue = n;
  }
  get value() {
    return this._currentValue;
  }
}
class m {
  from;
  to;
  duration;
  at;
  ease;
  constructor(t) {
    this.from = t.from, this.to = t.to, this.duration = t.duration || 0, this.at = t.at || 0, this.ease = t.ease || f;
  }
  value(t) {
    if (this.duration == 0)
      return this.to;
    const n = S((t - this.at) / this.duration);
    return l(this.from, this.to, this.ease(n));
  }
  get endTime() {
    return this.at + this.duration;
  }
}
class s {
  _keyframes;
  _currentValue;
  constructor(t) {
    this._keyframes = [
      new m({
        from: t,
        to: t,
        duration: 0,
        at: 0,
        ease: f
      })
    ], this._currentValue = t;
  }
  to(t) {
    const n = this._keyframes.at(-1);
    if (n === void 0)
      throw new Error("tried to get last frame from timeline but array is empty");
    const i = t.to - this.endValue;
    let u = n.endTime;
    t.at !== void 0 && (u = t.at);
    const h = new m({
      from: 0,
      to: i,
      duration: t.duration,
      at: u,
      ease: t.ease
    });
    return this._keyframes.push(h), h;
  }
  get endValue() {
    let t = 0;
    for (let n of this._keyframes)
      t = t + n.to;
    return t;
  }
  update(t) {
    let n = 0;
    for (let i of this._keyframes)
      n = n + i.value(t);
    this._currentValue = n;
  }
  get value() {
    return this._currentValue;
  }
}
class I {
  x;
  y;
  radius;
  strokeWidth;
  arc;
  background;
  stroke;
  constructor(t) {
    this.x = new s(t.x), this.y = new s(t.y), this.radius = new s(t.radius), this.strokeWidth = new s(t.strokeWidth), t.arc === void 0 && (t.arc = Math.PI * 2), this.arc = new s(t.arc), this.background = new o(t.background), this.stroke = new o(t.stroke);
  }
  update(t) {
    this.x.update(t), this.y.update(t), this.radius.update(t), this.strokeWidth.update(t), this.arc.update(t), this.background.update(t), this.stroke.update(t);
  }
  draw(t) {
    t.beginPath(), t.fillStyle = this.background.value.toString(), t.strokeStyle = this.stroke.value.toString(), t.arc(this.x.value, this.y.value, this.radius.value, 0, this.arc.value), t.fill(), this.strokeWidth.value > 0 && (t.lineWidth = this.strokeWidth.value, t.stroke()), t.closePath();
  }
}
class O {
  points;
  strokeWidth;
  background;
  stroke;
  constructor(t) {
    if (t.points === void 0 || t.points.length < 2)
      throw new Error("Polygon constructor must have more than 2 points");
    this.points = t.points, this.strokeWidth = new s(t.strokeWidth), this.background = new o(t.background), this.stroke = new o(t.stroke);
  }
  update(t) {
    for (let n of this.points)
      n.update(t);
    this.strokeWidth.update(t), this.background.update(t), this.stroke.update(t);
  }
  draw(t) {
    t.fillStyle = this.background.value.toString(), t.strokeStyle = this.stroke.value.toString(), t.beginPath(), t.moveTo(this.points[0].x.value, this.points[0].y.value);
    for (let n = 1; n < this.points.length; n++) {
      const i = this.points[n];
      t.lineTo(i.x.value, i.y.value);
    }
    t.closePath(), t.fill(), this.strokeWidth.value > 0 && (t.lineWidth = this.strokeWidth.value, t.stroke());
  }
}
class W {
  x;
  y;
  constructor(t, n) {
    this.x = new s(t), this.y = new s(n);
  }
  update(t) {
    this.x.update(t), this.y.update(t);
  }
}
class P {
  x;
  y;
  width;
  height;
  strokeWidth;
  background;
  stroke;
  constructor(t) {
    this.x = new s(t.x), this.y = new s(t.y), this.width = new s(t.width), this.height = new s(t.height), this.strokeWidth = new s(t.strokeWidth), this.background = new o(t.background), this.stroke = new o(t.stroke);
  }
  update(t) {
    this.x.update(t), this.y.update(t), this.width.update(t), this.height.update(t), this.strokeWidth.update(t), this.background.update(t), this.stroke.update(t);
  }
  draw(t) {
    t.fillStyle = this.background.value.toString(), t.strokeStyle = this.stroke.value.toString(), t.beginPath(), t.moveTo(this.x.value, this.y.value), t.lineTo(this.x.value + this.width.value, this.y.value), t.lineTo(this.x.value + this.width.value, this.y.value + this.height.value), t.lineTo(this.x.value, this.y.value + this.height.value), t.closePath(), t.fill(), this.strokeWidth.value > 0 && (t.lineWidth = this.strokeWidth.value, t.stroke());
  }
}
const at = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Circle: I,
  Point: W,
  Polygon: O,
  Rectangle: P
}, Symbol.toStringTag, { value: "Module" }));
class ut {
  _objects = [];
  _currentTime = 0;
  _endTime = 0;
  width = 0;
  height = 0;
  background = "white";
  add(t) {
    this._objects.push(t);
  }
  get endTime() {
    return this._endTime;
  }
  get currentTime() {
    return this._currentTime;
  }
  set currentTime(t) {
    this.update(t);
  }
  update(t) {
    this._currentTime = t;
    for (let n of this._objects)
      n.update(t);
  }
  draw(t) {
    t.fillStyle = this.background.toString(), t.fillRect(0, 0, this.width, this.height);
    for (let n of this._objects)
      n.draw(t);
  }
  wait(t) {
    this._endTime += t;
  }
  play(t) {
    if (Array.isArray(t)) {
      this._group(t);
      return;
    }
    if ("at" in t && "endTime" in t) {
      this._chain(t);
      return;
    }
  }
  _group(t) {
    const n = this._endTime;
    t.forEach((i) => {
      i.at = n;
    }), this._endTime = Math.max(...t.map((i) => i.endTime));
  }
  _chain(t) {
    t.at = this._endTime, this._endTime = t.endTime;
  }
  Circle(t) {
    let n = new I(t);
    return this.add(n), n;
  }
  Polygon(t) {
    let n = new O(t);
    return this.add(n), n;
  }
  Rectangle(t) {
    let n = new P(t);
    return this.add(n), n;
  }
  Point(t, n) {
    return new W(t, n);
  }
}
export {
  S as Clamp01,
  a as Color,
  st as Colors,
  ut as DefaultScene,
  it as Easing,
  b as KeyframeColor,
  m as KeyframeNumber,
  l as Lerp,
  at as Shapes,
  o as TimelineColor,
  s as TimelineNumber
};
