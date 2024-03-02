import styles from './chart.scss';
import { v2d } from "../v2d";

export abstract class Chart<TData, TConfig extends ChartConfig> {
  protected static readonly svgNS = "http://www.w3.org/2000/svg";
  protected static instance = 0;
  protected readonly currentInstance: number = -1;

  protected svg: SVGElement;
  protected legend: HTMLDivElement;
  protected bubble?: HTMLDivElement;

  protected constructor(protected parent: HTMLDivElement, title: string, data: TData, configs: TConfig[]) {
    this.currentInstance = ++Chart.instance;
    console.log(this.currentInstance);
    parent.classList.add(styles.chart);

    const header = this.parent.ownerDocument.createElement('h1');
    header.innerText = title;
    header.classList.add(styles.chartHeader);
    parent.append(header);

    this.svg = document.createElementNS(Chart.svgNS, "svg");
    
    
    this.svg.classList.add(styles.chartContent);
    parent.append(this.svg);

    this.legend = this.parent.ownerDocument.createElement('div');
    this.legend.classList.add(styles.chartLegend);
    parent.append(this.legend);

    // setTimeout(() => {
    const fontSize = parseInt(this.svg.computedStyleMap().get('font-size')!.toString().replace('px', ''));
    this.renderLegend(data, configs);
    // this.svg.setAttribute("viewBox", `0 0 ${ this.svg.clientWidth } ${ this.svg.clientHeight + 2 * fontSize }`)
    // this.lineConfigs = lineConfigs;
    this.renderSvg(data, configs, fontSize);
    this.svg.classList.remove(styles.chartContent);
    this.svg.style.overflow = 'visible';
  }

  protected abstract renderSvg(data: TData, configs: TConfig[], fontSize: number): void;
  protected abstract renderLegend(data: TData, configs: TConfig[]): void;
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