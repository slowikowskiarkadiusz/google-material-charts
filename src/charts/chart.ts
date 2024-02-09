import styles from './chart.scss';
import { v2d } from "../v2d";

export abstract class Chart {
  protected static readonly svgNS = "http://www.w3.org/2000/svg";

  protected svg: SVGElement;
  protected legend: HTMLDivElement;

  protected constructor(protected parent: HTMLDivElement, title: string) {
    parent.classList.add(styles.__chart);

    const header = this.parent.ownerDocument.createElement('h1');
    header.innerText = title;
    header.classList.add(styles.__chartHeader);
    parent.append(header);

    this.svg = document.createElementNS(Chart.svgNS, "svg");
    this.svg.classList.add(styles.__chartContent);
    parent.append(this.svg);

    this.legend = this.parent.ownerDocument.createElement('div');
    this.legend.classList.add(styles.__chartLegend);
    parent.append(this.legend);
    
    // const ratio = this.svg.clientWidth / this.svg.clientHeight;
    // console.log(this.svg.clientWidth, this.svg.clientHeight, ratio);
  }
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