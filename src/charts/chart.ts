import { v2d } from "../v2d";

export abstract class Chart<TData, TConfig extends ChartConfig> {
  protected static readonly svgNS = "http://www.w3.org/2000/svg";
  protected static instance = 0;
  protected readonly currentInstance: number = -1;

  protected svg: SVGElement;
  protected legend: HTMLDivElement;
  protected bubble?: HTMLDivElement;
  protected parent: HTMLDivElement;

  protected constructor(parent: HTMLDivElement, title: string, data: TData, maxValue: number, configs: TConfig[]) {
    this.currentInstance = ++Chart.instance;

    this.parent = parent.ownerDocument.createElement('div');
    this.parent.style.setProperty('height', `calc(${ parent.style.height } - 2em - 2px`);
    parent.style.setProperty('display', 'flex');
    parent.append(this.parent);

    this.parent.classList.add('__chart');

    const header = this.parent.ownerDocument.createElement('h1');
    header.innerText = title;
    header.classList.add('__chartHeader');
    this.parent.append(header);

    this.svg = document.createElementNS(Chart.svgNS, "svg");
    // this.svg.style.setProperty('height', '1px');
    this.svg.classList.add('__chartContent');
    this.parent.append(this.svg);

    this.legend = this.parent.ownerDocument.createElement('div');
    this.legend.classList.add('__chartLegend');
    this.parent.append(this.legend);

    setTimeout(() => {
      const fontSize = parseInt((this.svg as any).computedStyleMap().get('font-size')!.toString().replace('px', ''));
      this.renderLegend(data, configs);
      // this.svg.setAttribute("viewBox", `0 0 ${ this.svg.clientWidth } ${ this.svg.clientHeight + 2 * fontSize }`)
      this.renderSvg(data, maxValue, configs, fontSize);
      this.svg.classList.remove('__chartContent');
      this.svg.style.overflow = 'visible';
    });
  }

  protected abstract renderSvg(data: TData, maxValue: number, configs: TConfig[], fontSize: number): void;
  protected abstract renderLegend(data: TData, configs: TConfig[]): void;

  protected makeBubble() {
    this.bubble?.remove();
    this.bubble = this.parent.ownerDocument.createElement('div');
    this.bubble.classList.add('__bubble');
    this.parent.append(this.bubble);
    setTimeout(() => this.bubble!.style.transition = 'all 0.07s', 0);
  }

  protected moveBubbleTo(newPos: { x: number; y: number }) {
    this.bubble!.style.transform = `translate(${ newPos.x }px, ${ newPos.y }px)`;
  }

  protected removeBubble() {
    this.bubble?.remove();
    this.bubble = undefined;
  }
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