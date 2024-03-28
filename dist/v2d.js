export class v2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static copy(from) {
        return new v2d(from.x, from.y);
    }
    static get zero() {
        return new v2d(0, 0);
    }
    static get one() {
        return new v2d(1, 1);
    }
    static get nOne() {
        return new v2d(-1, -1);
    }
    static get up() {
        return new v2d(0, -1);
    }
    static get down() {
        return new v2d(0, 1);
    }
    static get left() {
        return new v2d(-1, 0);
    }
    static get right() {
        return new v2d(1, 0);
    }
    static get leftDown() {
        return new v2d(-1, 1);
    }
    static get leftUp() {
        return new v2d(-1, -1);
    }
    static get rightDown() {
        return new v2d(1, 1);
    }
    static get rightUp() {
        return new v2d(1, -1);
    }
    copy() {
        return new v2d(this.x, this.y);
    }
    add(v) {
        return new v2d(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new v2d(this.x - v.x, this.y - v.y);
    }
    mul(scalar) {
        return new v2d(this.x * scalar, this.y * scalar);
    }
    ;
    div(scalar) {
        return new v2d(this.x / scalar, this.y / scalar);
    }
    ;
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    norm() {
        let vec = new v2d(this.x, this.y);
        return v2d.copy(vec.div(this.mag()));
    }
    eq(other) {
        let result = this.x == other.x && this.y == other.y;
        return result;
    }
    updt(to) {
        this.x = to.x;
        this.y = to.y;
        return this;
    }
    static dot(v1, v2) {
        let a = [v1.x, v1.y];
        let b = [v2.x, v2.y];
        let result = a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
        return result;
    }
    static distance(v1, v2) {
        let result = Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
        return result;
    }
}
