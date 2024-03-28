export declare class v2d {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static copy(from: v2d): v2d;
    static get zero(): v2d;
    static get one(): v2d;
    static get nOne(): v2d;
    static get up(): v2d;
    static get down(): v2d;
    static get left(): v2d;
    static get right(): v2d;
    static get leftDown(): v2d;
    static get leftUp(): v2d;
    static get rightDown(): v2d;
    static get rightUp(): v2d;
    copy(): v2d;
    add(v: v2d): v2d;
    sub(v: v2d): v2d;
    mul(scalar: number): v2d;
    div(scalar: number): v2d;
    mag(): number;
    norm(): v2d;
    eq(other: v2d): boolean;
    updt(to: v2d): v2d;
    static dot(v1: v2d, v2: v2d): number;
    static distance(v1: v2d, v2: v2d): number;
}
