import styles from './chart.scss';
import { v2d } from "../v2d";

export abstract class Chart {
  protected static readonly svgNS = "http://www.w3.org/2000/svg";

  protected svg: SVGElement;
  protected legend: HTMLDivElement;
  protected bubble?: HTMLDivElement;

  protected constructor(protected parent: HTMLDivElement, title: string) {
    parent.classList.add(styles.chart);

    const header = this.parent.ownerDocument.createElement('h1');
    header.innerText = title;
    header.classList.add(styles.chartHeader);
    parent.append(header);

    this.svg = document.createElementNS(Chart.svgNS, "svg");
    this.svg.classList.add(styles.chartContent);
    this.svg.addEventListener('mouseover', (e: MouseEvent) => {
      this.bubble?.remove();
      this.bubble = this.parent.ownerDocument.createElement('div');
      this.bubble.innerText = 'abc';
      this.bubble.classList.add(styles.bubble);
      this.parent.append(this.bubble);
    });
    this.svg.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.bubble) {
        const bounds = this.bubble.getBoundingClientRect();
        this.bubble!.style.top = `${ e.pageY - bounds.height - 10 }px`;
        this.bubble!.style.left = `${ e.pageX - bounds.width / 2 }px`;
      }
    });
    this.svg.addEventListener('mouseleave', (e: MouseEvent) => {
      if (this.bubble) {
        // this.bubble!.remove();
      }
    });
    parent.append(this.svg);

    this.legend = this.parent.ownerDocument.createElement('div');
    this.legend.classList.add(styles.chartLegend);
    parent.append(this.legend);
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