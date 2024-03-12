import lineStyles from './line.chart.scss'
import { TemporalChart, TemporalData, TemporalItem, TemporalLegendConfig } from "../temporal.chart";
import { v2d } from "../../../v2d";
import { Chart, ChartConfig, SvgPolygon } from "../../chart";

export interface LineChartOptions {
  configs?: LineChartConfig[],
}

export interface LineChartConfig extends ChartConfig {
  isDotted: boolean;
}

interface LineChartLegendConfig extends TemporalLegendConfig {
  isDotted: boolean;
}

export const defaultConfigs: LineChartConfig[] = [
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

  constructor(parent: HTMLDivElement, title: string, data: TemporalData, private isStacked: boolean = false, configs?: LineChartConfig[]) {
    const maxValue = isStacked
      ? data.dates.map((_, i) => data.items.map(v => v.values[i]).reduce((p, c) => p + c)).reduce((p, c) => p > c ? p : c)
      : data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c);
    super(parent, title, data, maxValue, configs ?? defaultConfigs);
  }

  protected renderTemporalSvg(data: TemporalData, maxValue: number, configs: LineChartConfig[], fontSize: number) {
    const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
    const polygonsData = makePolygons(data.items, this.horizontalLinesGroup!.getBBox().width, this.horizontalLinesGroup!.getBBox().height, 0, maxValue, 0, this.isStacked);
    const backgroundColor = getBackgroundColor(this.svg);

    polygonsData
      .forEach((x, i) => {
        if (this.isStacked) {
          const polygon = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'polygon');
          polygon.setAttribute('points', x.polygon);
          polygon.setAttribute('stroke', configs[i].color);
          polygon.setAttribute('stroke-width', '2');
          polygon.setAttribute('fill', configs[i].color);
          valuesPolygonsGroup.append(polygon);
        }
      });

    polygonsData
      .forEach((x, i, c) => {
        if (this.isStacked && i === c.length - 1) return;
        const path = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'path');
        path.setAttribute('d', x.path);
        path.setAttribute('stroke', this.isStacked ? backgroundColor : configs[i].color);
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

  private addBubbleEvents(eventParent: SVGElement, data: TemporalData, configs: LineChartConfig[]) {
    const backgroundColor = getBackgroundColor(this.svg);
    eventParent.style.pointerEvents = 'all';
    eventParent.addEventListener('mouseover', (e: MouseEvent) => {
      this.makeBubble();

      this.backgroundDot = eventParent.ownerDocument.createElementNS(Chart.svgNS, 'circle');
      this.backgroundDot.setAttribute('r', '12');
      this.backgroundDot.style.pointerEvents = 'none';
      this.backgroundDot.style.opacity = '0.5';
      this.svg.append(this.backgroundDot);
    });

    let delay: NodeJS.Timeout | undefined = undefined;

    eventParent.addEventListener('mousemove', (e: MouseEvent) => {
      const clientRect = eventParent.getBoundingClientRect();
      let mousePos = new v2d(e.x - clientRect.x, e.y - clientRect.y);

      if (this.verticalLines?.length > 0) {
        const closestVerticalLine = this.verticalLines.reduce((p, c) => Math.abs(c.x1 - mousePos.x) < Math.abs(p.x1 - mousePos.x) ? c : p);
        const indexOfTheClosestLine = this.verticalLines.findIndex(v => v.y1 === closestVerticalLine.y1 && v.x1 === closestVerticalLine.x1 && v.y2 === closestVerticalLine.y2 && v.x2 === closestVerticalLine.x2);
        this.mouseVerticalLine?.remove();
        this.mouseVerticalLine = this.svg.ownerDocument.createElementNS(Chart.svgNS, 'line');
        this.mouseVerticalLine.style.pointerEvents = 'none';
        this.svg.append(this.mouseVerticalLine);
        this.mouseVerticalLine.classList.add(lineStyles.verticalLine);
        this.mouseVerticalLine.setAttribute('x1', closestVerticalLine.x1.toString());
        this.mouseVerticalLine.setAttribute('y1', closestVerticalLine.y1.toString());
        this.mouseVerticalLine.setAttribute('x2', closestVerticalLine.x2.toString());
        this.mouseVerticalLine.setAttribute('y2', closestVerticalLine.y2.toString());
        this.mouseVerticalLine.parentElement?.insertBefore(this.mouseVerticalLine, this.mouseVerticalLine.parentElement.firstChild);

        this.dots ??= data.items.map((x, i) => {
          const dot = eventParent.ownerDocument.createElementNS(Chart.svgNS, 'circle');
          dot.setAttribute('fill', this.isStacked ? backgroundColor : configs[i].color);
          dot.setAttribute('r', vertexDotRadius);
          dot.style.pointerEvents = 'none';
          dot.style.transition = 'all 0.07s';
          this.svg.append(dot);
          return dot;
        });

        let closestDotDistance = Number.MAX_VALUE;
        let closestDotIndex = -1;
        this.dots.forEach((dot, i) => {
          const vertex = this.vertices[i][indexOfTheClosestLine];
          dot.setAttribute('cx', vertex.x.toString());
          dot.setAttribute('cy', vertex.y.toString());

          const currDistance = Math.abs(mousePos.y - dot.cy.animVal.value);
          if (closestDotDistance > currDistance) {
            closestDotDistance = currDistance;
            closestDotIndex = i;
          }
        });

        if (delay) {
          clearTimeout(delay);
          delay = undefined;
        }

        delay = setTimeout(() => {
          if (closestDotIndex > -1 && this.dots)
            this.svg.append(this.dots![closestDotIndex]);
          delay = undefined;
        }, 36);

        this.dots.forEach((dot, i) => {
          dot.setAttribute('r', i === closestDotIndex ? closestVertexDotRadius : vertexDotRadius);
          if (i === closestDotIndex) {
            dot.setAttribute('stroke', this.isStacked ? backgroundColor : configs[closestDotIndex].color)
            dot.setAttribute('fill', !this.isStacked ? backgroundColor : configs[i].color);
            // dot.classList.add(lineStyles.closestDot);
          } else {
            dot.setAttribute('fill', this.isStacked ? backgroundColor : configs[i].color);
            dot.removeAttribute('stroke-width');
            dot.removeAttribute('stroke');
            // dot.classList.remove(lineStyles.closestDot);
          }
        });

        if (this.backgroundDot) {
          setTimeout(() => this.backgroundDot!.style.transition = 'all 0.07s', 1);
          this.backgroundDot.setAttribute('fill', this.isStacked ? backgroundColor : configs[closestDotIndex].color);
          this.backgroundDot.setAttribute('cx', this.dots[closestDotIndex].cx.animVal.valueAsString);
          this.backgroundDot.setAttribute('cy', this.dots[closestDotIndex].cy.animVal.valueAsString);
        }

        if (this.bubble) {
          const valueSpan = eventParent.ownerDocument.createElement('div');
          valueSpan.style.textAlign = 'center';
          valueSpan.innerHTML = `<b>${ data.items[closestDotIndex].values[indexOfTheClosestLine].toString() }</b><div style="font-size: 0.75em">${ data.dates[indexOfTheClosestLine] }</div>`;
          this.bubble.replaceChildren(valueSpan);

          const newPos = {
            x: this.dots[closestDotIndex].cx.animVal.value - this.bubble.offsetWidth / 2,
            y: this.dots[closestDotIndex].cy.animVal.value - this.bubble.offsetHeight / 2 - 15,
          }

          this.moveBubbleTo(newPos);
        }
      }
    });

    eventParent.addEventListener('mouseleave', (e: MouseEvent) => {
      this.mouseVerticalLine?.remove();

      this.removeBubble();

      this.backgroundDot?.remove();
      this.backgroundDot = undefined;

      this.dots?.forEach(dot => dot.remove());
      this.dots = undefined;
    });
  }
}

function makePolygons(items: TemporalItem[], width: number, height: number, offset: number, maxValue: number, minValue: number, isStacked: boolean): SvgPolygon[] {
  maxValue *= 1.25;
  let lastItems: number[] | undefined = undefined;
  let lastPoints: v2d[] | undefined = undefined;

  return items
    .map(item => {
      let items = item.values.map((x, i) => x + (isStacked && lastItems ? lastItems[i] : 0));
      lastItems = items;
      let points = items
        .map(x => x / maxValue)
        .map((v, i, c) => new v2d(
          i * width / (c.length - 1) + (i === 0 ? -1 : (i === c.length - 1 ? 1 : 0)) * offset,
          height - c[i] * height))
        .map(point => new v2d(parseFloat(point.x.toString().replaceAll(',', '.')), parseFloat(point.y.toString().replaceAll(',', '.'))));

      let polygon = [
        ...points.map((v) => `${ v.x },${ v.y }`),
      ];

      if (lastPoints)
        polygon.reverse().splice(0, 0, ...lastPoints.map((v) => `${ v.x },${ v.y }`),)
      else
        polygon.splice(0, 0, `${ width + offset },${ height + offset }`, `${ -offset },${ height + offset }`,);

      lastPoints = points;

      return {
        path: points.map((point, i) => `${ (!i ? 'M' : 'L') }${ point.x } ${ point.y }`).join(' '),
        polygon: polygon
          .join(' '),
        vertices: [...points],
      }
    });
}

function getBackgroundColor(element: Element): string {
  const styleMap = window.getComputedStyle(element);
  const backgroundColor = styleMap.getPropertyValue('background-color');
  if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)')
    return backgroundColor.toString();
  else if (element.parentElement)
    return getBackgroundColor(element.parentElement);
  else
    return 'rgba(255, 255, 255, 1)';
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

