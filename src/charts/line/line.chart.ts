import { ChartConfig, SvgPolygon } from "../chart";
import lineStyles from './line.chart.scss'
import { v2d } from "../../v2d";
import styles from "../chart.scss";
import { TemporalChart, TemporalData, TemporalItem, TemporalLegendConfig } from "../temporal/temporal.chart";

export interface LineChartOptions {
  configs?: LineChartConfig[],
}

export interface LineChartConfig extends ChartConfig {
  isDotted: boolean;
}

interface LineChartLegendConfig extends TemporalLegendConfig {
  isDotted: boolean;
}

const defaultConfigs: LineChartConfig[] = [
  { color: '#E40303', isDotted: false },
  { color: '#FF8C00', isDotted: false },
  { color: '#FFED00', isDotted: false },
  { color: '#008026', isDotted: false },
  { color: '#24408E', isDotted: false },
  { color: '#732982', isDotted: false },
];

const vertexDotRadius = '4';
const closestVertexDotRadius = '6';

export class LineChart extends TemporalChart<TemporalData, LineChartConfig> {
  private mouseVerticalLine?: SVGLineElement;
  private vertices: v2d[][] = [];
  private dots?: SVGCircleElement[];
  private backgroundDot?: SVGCircleElement;
  private aabc = (() => {
    console.log('aabcaabc');
    return 'a'
  })();

  constructor(parent: HTMLDivElement, title: string, data: TemporalData, configs?: LineChartConfig[]) {
    super(parent, title, data, configs ?? defaultConfigs);

    //
    // // setTimeout(() => {
    //   const fontSize = parseInt(this.svg.computedStyleMap().get('font-size')!.toString().replace('px', ''));
    //   this.renderLegend(data);
    //   // this.svg.setAttribute("viewBox", `0 0 ${ this.svg.clientWidth } ${ this.svg.clientHeight + 2 * fontSize }`)
    //   this.lineConfigs = lineConfigs;
    //   this.renderSvg(data, this.lineConfigs, fontSize);
    //   this.svg.classList.remove(styles.chartContent);
    //   this.svg.style.overflow = 'visible';
    // // }, 1);
  }

  protected renderTemporalSvg(data: TemporalData, configs: LineChartConfig[], fontSize: number) {
    const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    const polygonsData = makePolygons(data.items, this.horizontalLinesGroup!.getBBox().width, this.horizontalLinesGroup!.getBBox().height, 0, data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c), 0);
    polygonsData
      .forEach((x, i) => {
        const path = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'path');
        path.setAttribute('d', x.path);
        path.setAttribute('stroke', configs[i].color);
        if (configs[i].isDotted)
          path.setAttribute('stroke-dasharray', '7');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        valuesPolygonsGroup.append(path);
      });
    this.vertices = polygonsData.map(x => x.vertices.map(y => new v2d(y.x, y.y)));

    this.svg.append(valuesPolygonsGroup);
    valuesPolygonsGroup.classList.add(lineStyles.group);

    this.addBubbleEvents(this.horizontalLinesGroup!, data, configs);
  }

  protected renderLegend(data: TemporalData, configs: LineChartConfig[]) {
    this.aabc = 'b';
    let thisaabc = (this as any).aabc;
    let self = this as any;
    this.svg.addEventListener('mousemove', (e: MouseEvent) => {
      console.log(thisaabc, self.aabc, this.aabc);
    });
    const legendData: LineChartLegendConfig[] = data.items.map((dataItem, i) => {
      return {
        label: dataItem.label,
        color: configs[i].color,
        count: dataItem.values.reduce((p, c) => p + c),
        isDotted: configs[i].isDotted
      }
    });

    this.legend.innerHTML = '';
    this.legend.style.display = 'grid';
    this.legend.style.gridTemplateColumns = 'auto auto';
    this.legend.style.gap = '0.5em';

    legendData.forEach(x => {
      const main = this.legend.ownerDocument.createElement('div');
      main.style.display = 'grid';
      main.style.gridTemplateColumns = '1em auto';
      main.style.gap = '0.5em';
      this.legend.append(main);
      const stripParent = this.legend.ownerDocument.createElement('div');
      stripParent.style.display = 'flex';
      stripParent.style.justifyContent = 'center';
      stripParent.style.alignItems = 'center';
      main.append(stripParent);
      const strip = this.legend.ownerDocument.createElement('div');
      strip.style.height = '0.11em';
      strip.style.width = '100%';
      strip.style.backgroundColor = x.color;
      stripParent.append(strip);
      const label = this.legend.ownerDocument.createElement('span');
      label.style.fontSize = '0.75em';
      label.innerText = `${ x.label } (${ x.count })`;
      main.append(label);
    });
  }

  private addBubbleEvents(eventParent: SVGElement, data: TemporalData, configs: LineChartConfig[]) {
    eventParent.style.pointerEvents = 'all';
    eventParent.addEventListener('mouseover', (e: MouseEvent) => {
      this.bubble?.remove();
      this.bubble = this.parent.ownerDocument.createElement('div');
      this.bubble.classList.add(styles.bubble);
      this.parent.append(this.bubble);
      setTimeout(() => this.bubble!.style.transition = 'all 0.07s', 0);

      this.backgroundDot = eventParent.ownerDocument.createElementNS(LineChart.svgNS, 'circle');
      this.backgroundDot.setAttribute('r', '12');
      this.backgroundDot.style.pointerEvents = 'none';
      this.backgroundDot.style.opacity = '0.5';
      this.svg.append(this.backgroundDot);
    });

    let delay: NodeJS.Timeout | undefined = undefined;

    // eventParent.addEventListener('mousemove', (e: MouseEvent) => {
    //   const clientRect = eventParent.getBoundingClientRect();
    //   let mousePos = new v2d(e.x - clientRect.x, e.y - clientRect.y);
    //
    //   console.log(thisabc, self.abc);
    //   if (self.verticalLines?.length > 0) {
    //     const closestVerticalLine = this.verticalLines.reduce((p, c) => Math.abs(c.x1 - mousePos.x) < Math.abs(p.x1 - mousePos.x) ? c : p);
    //     const indexOfTheClosestLine = this.verticalLines.findIndex(v => v.y1 === closestVerticalLine.y1 && v.x1 === closestVerticalLine.x1 && v.y2 === closestVerticalLine.y2 && v.x2 === closestVerticalLine.x2);
    //     this.mouseVerticalLine?.remove();
    //     this.mouseVerticalLine = this.svg.ownerDocument.createElementNS(LineChart.svgNS, 'line');
    //     this.mouseVerticalLine.style.pointerEvents = 'none';
    //     this.svg.append(this.mouseVerticalLine);
    //     this.mouseVerticalLine.classList.add(lineStyles.verticalLine);
    //     this.mouseVerticalLine.setAttribute('x1', closestVerticalLine.x1.toString());
    //     this.mouseVerticalLine.setAttribute('y1', closestVerticalLine.y1.toString());
    //     this.mouseVerticalLine.setAttribute('x2', closestVerticalLine.x2.toString());
    //     this.mouseVerticalLine.setAttribute('y2', closestVerticalLine.y2.toString());
    //     this.mouseVerticalLine.parentElement?.insertBefore(this.mouseVerticalLine, this.mouseVerticalLine.parentElement.firstChild);
    //
    //     this.dots ??= data.items.map((x, i) => {
    //       const dot = eventParent.ownerDocument.createElementNS(LineChart.svgNS, 'circle');
    //       dot.setAttribute('fill', configs[i].color);
    //       dot.setAttribute('r', vertexDotRadius);
    //       dot.style.pointerEvents = 'none';
    //       dot.style.transition = 'all 0.07s';
    //       this.svg.append(dot);
    //       return dot;
    //     });
    //
    //     let closestDotDistance = Number.MAX_VALUE;
    //     let closestDotIndex = -1;
    //     this.dots.forEach((dot, i) => {
    //       const vertex = this.vertices[i][indexOfTheClosestLine];
    //       dot.setAttribute('cx', vertex.x.toString());
    //       dot.setAttribute('cy', vertex.y.toString());
    //
    //       const currDistance = Math.abs(mousePos.y - dot.cy.animVal.value);
    //       if (closestDotDistance > currDistance) {
    //         closestDotDistance = currDistance;
    //         closestDotIndex = i;
    //       }
    //     });
    //
    //     if (delay) {
    //       clearTimeout(delay);
    //       delay = undefined;
    //     }
    //
    //     delay = setTimeout(() => {
    //       if (closestDotIndex > -1 && this.dots)
    //         this.svg.append(this.dots![closestDotIndex]);
    //       delay = undefined;
    //     }, 36);
    //
    //     this.dots.forEach((dot, i) => {
    //       dot.setAttribute('r', i === closestDotIndex ? closestVertexDotRadius : vertexDotRadius);
    //       if (i === closestDotIndex) {
    //         dot.setAttribute('stroke', configs[closestDotIndex].color)
    //         dot.classList.add(lineStyles.closestDot);
    //       } else {
    //         dot.setAttribute('fill', configs[i].color);
    //         dot.removeAttribute('stroke-width');
    //         dot.removeAttribute('stroke');
    //         dot.classList.remove(lineStyles.closestDot);
    //       }
    //     });
    //
    //     if (this.backgroundDot) {
    //       setTimeout(() => this.backgroundDot!.style.transition = 'all 0.07s', 1);
    //       this.backgroundDot.setAttribute('fill', configs[closestDotIndex].color);
    //       this.backgroundDot.setAttribute('cx', this.dots[closestDotIndex].cx.animVal.valueAsString);
    //       this.backgroundDot.setAttribute('cy', this.dots[closestDotIndex].cy.animVal.valueAsString);
    //     }
    //
    //     if (this.bubble) {
    //       const valueSpan = eventParent.ownerDocument.createElement('div');
    //       valueSpan.style.textAlign = 'center';
    //       valueSpan.innerHTML = `<b>${ data.items[closestDotIndex].values[indexOfTheClosestLine].toString() }</b><div style="font-size: 0.75em">${ data.dates[indexOfTheClosestLine] }</div>`;
    //       this.bubble.replaceChildren(valueSpan);
    //
    //       const newPos = {
    //         x: this.dots[closestDotIndex].cx.animVal.value - this.bubble.offsetWidth / 2,
    //         y: this.dots[closestDotIndex].cy.animVal.value - this.bubble.offsetHeight / 2 - 15,
    //       }
    //       this.bubble.style.transform = `translate(${ newPos.x }px, ${ newPos.y }px)`;
    //     }
    //   }
    // });

    eventParent.addEventListener('mouseleave', (e: MouseEvent) => {
      this.mouseVerticalLine?.remove();

      this.bubble?.remove();
      this.bubble = undefined;

      this.backgroundDot?.remove();
      this.backgroundDot = undefined;

      this.dots?.forEach(dot => dot.remove());
      this.dots = undefined;
    });
  }

  // currentTextWidths: number[], isFar: [boolean, boolean]


  pizda(e: MouseEvent) {
    let a = this.verticalLines?.length;
    console.log(this, a);
  }
}

function makePolygons(items: TemporalItem[], width: number, height: number, offset: number, maxValue: number, minValue: number): SvgPolygon[] {
  maxValue *= 1.25;
  return items
    .map(item => {
      let points = item
        .values
        .map(x => x / maxValue)
        .map((v, i, c) => new v2d(i * width / (c.length - 1) + (i === 0 ? -1 : (i === c.length - 1 ? 1 : 0)) * offset, height - c[i] * height))
        .map(point => new v2d(parseFloat(point.x.toString().replaceAll(',', '.')), parseFloat(point.y.toString().replaceAll(',', '.'))));

      return {
        path: points.map((point, i) => `${ (!i ? 'M' : 'L') }${ point.x } ${ point.y }`).join(' '),
        polygon: [
          `${ -offset },${ height + offset }`,
          ...points.map((v) => `${ v.x },${ v.y }`),
          `${ width + offset },${ height + offset }`,
        ]
          .join(' '),
        vertices: [...points],
      }
    });
}

function createSmoothPath(points: v2d[]): string {
  let pathData: string = `M ${ points[0].x },${ points[0].y } `;

  for (let i = 1; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlPointX = (current.x + next.x) / 2;
    const controlPointY = (current.y + next.y) / 2;

    pathData += `Q ${ current.x },${ current.y } ${ controlPointX },${ controlPointY } `;
  }

  // Line to the last point
  if (points.length > 1) {
    const lastPoint = points[points.length - 1];
    pathData += `L ${ lastPoint.x },${ lastPoint.y }`;
  }

  return pathData;
}
