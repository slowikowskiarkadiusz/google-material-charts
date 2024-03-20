import { v2d } from "../v2d";
export declare abstract class Chart<TData, TConfig extends ChartConfig> {
    protected static readonly svgNS = "http://www.w3.org/2000/svg";
    protected static instance: number;
    protected readonly currentInstance: number;
    protected svg: SVGElement;
    protected legend: HTMLDivElement;
    protected bubble?: HTMLDivElement;
    protected parent: HTMLDivElement;
    protected constructor(parent: HTMLDivElement, title: string, data: TData, maxValue: number, configs: TConfig[]);
    protected abstract renderSvg(data: TData, maxValue: number, configs: TConfig[], fontSize: number): void;
    protected abstract renderLegend(data: TData, configs: TConfig[]): void;
    protected makeBubble(): void;
    protected moveBubbleTo(newPos: {
        x: number;
        y: number;
    }): void;
    protected removeBubble(): void;
}
export interface ChartConfig {
    color: string;
}
export interface SvgLine {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface SvgText {
    x: number;
    y: number;
    text: string;
}
export interface SvgPolygon {
    path: string;
    polygon: string;
    vertices: v2d[];
}
