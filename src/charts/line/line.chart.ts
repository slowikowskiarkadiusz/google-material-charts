import { Chart, SvgLine, SvgPolygon } from "../chart";
import lineStyles from './line.chart.scss'
import { v2d } from "../../v2d";
import styles from "../chart.scss";

const defaultConfigs: LineConfig[] = [
  { color: '#E40303', isDotted: false },
  { color: '#FF8C00', isDotted: false },
  { color: '#FFED00', isDotted: false },
  { color: '#008026', isDotted: false },
  { color: '#24408E', isDotted: false },
  { color: '#732982', isDotted: false },
];

export class LineChart extends Chart {
  private static instance = 0;
  private verticalLines!: SvgLine[];
  private mouseVerticalLine?: SVGLineElement;

  constructor(parent: HTMLDivElement, title: string, data: LineChartData, configs?: LineConfig[]) {
    LineChart.instance++;
    super(parent, title);
    const fontSize = parseInt(this.svg.computedStyleMap().get('font-size')!.toString().replace('px', ''));

    const lineConfigs = configs ?? defaultConfigs;
    this.renderLegend(data, lineConfigs);
    this.svg.setAttribute("viewBox", `0 0 ${ this.svg.clientWidth } ${ this.svg.clientHeight + fontSize }`)
    this.renderSvg(data, lineConfigs, fontSize);
    this.svg.classList.remove(styles.chartContent);
  }

  private renderSvg(data: LineChartData, configs: LineConfig[], fontSize: number) {
    const { clientHeight, clientWidth } = this.svg;
    const horizontalLinesGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    this.svg.append(horizontalLinesGroup);
    const longestValueLength = data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c).toString().length;
    const horizontalLinesCount = 4;
    for (let i = 0; i <= horizontalLinesCount; i++) {
      const line = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
      line.setAttribute('x1', `${ 0 }`);
      line.setAttribute('x2', `${ clientWidth - fontSize * longestValueLength }`);
      line.setAttribute('y1', `${ clientHeight * (i) / 4 }`);
      line.setAttribute('y2', `${ clientHeight * (i) / 4 }`);
      line.classList.add(i === horizontalLinesCount ? lineStyles.bottomHorizontalLine : lineStyles.horizontalLine);
      horizontalLinesGroup.append(line);
    }

    this.addBubbleEvents(horizontalLinesGroup);
    horizontalLinesGroup.classList.add(lineStyles.group);
    horizontalLinesGroup.style.pointerEvents = 'bounding-box';
    const eventRect = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'rect');
    setTimeout(() => {
      eventRect.setAttribute('width', (clientWidth - fontSize * longestValueLength).toString())
      eventRect.setAttribute('height', clientHeight.toString());
      eventRect.setAttribute('fill', 'transparent');
      eventRect.style.pointerEvents = 'bounding-box';
      horizontalLinesGroup.append(eventRect);
    });
    const horizontalLinesLabelsCount = horizontalLinesGroup.childElementCount;

    const horizontalLinesLabelsGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    this.svg.append(horizontalLinesLabelsGroup);
    const maxLabel = data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c);
    for (let i = 0; i < horizontalLinesLabelsCount; i++) {
      const line = horizontalLinesGroup.children[i] as SVGLineElement;
      const path = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'path');
      path.setAttribute('d', `M${ line.x2.animVal.value + this.svg.clientWidth * 0.05 },${ line.y1.animVal.value } L${ line.x2.animVal.value + this.svg.clientWidth * 0.5 },${ line.y1.animVal.value }`);
      const id = `horizontalLine${ LineChart.instance }${ i }`;
      path.setAttribute('id', id);
      const text = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
      const textPath = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'textPath');
      textPath.setAttribute('href', `#${ id }`);
      textPath.classList.add(lineStyles.horizontalLineLabel);
      textPath.innerHTML = `${ Math.floor(maxLabel - maxLabel * (i) / 4) }`;
      text.append(textPath);
      horizontalLinesLabelsGroup.append(path, text);
    }

    horizontalLinesLabelsGroup.setAttribute('transform', `translate(0, ${ fontSize })`);
    horizontalLinesLabelsGroup.classList.add(lineStyles.group);

    const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    makePolygons(data.items, horizontalLinesGroup.getBBox().width, horizontalLinesGroup.getBBox().height, 0, data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c), 0)
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

    this.svg.append(valuesPolygonsGroup);
    valuesPolygonsGroup.classList.add(lineStyles.group);

    const { width, height } = horizontalLinesGroup.getBBox();
    this.verticalLines = makeVerticalLines(data, width, height);
  }

  private renderLegend(data: LineChartData, lineConfigs: LineConfig[]) {
    const legendData: LineChartLegendConfig[] = data.items.map((dataItem, i) => {
      return {
        label: dataItem.label,
        color: lineConfigs[i].color,
        count: dataItem.values.reduce((p, c) => p + c),
        isDotted: lineConfigs[i].isDotted
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

  private addBubbleEvents(eventParent: SVGElement) {
    eventParent.style.pointerEvents = 'all';
    eventParent.addEventListener('mouseover', (e: MouseEvent) => {
      this.bubble?.remove();
      this.bubble = this.parent.ownerDocument.createElement('div');
      this.bubble.innerText = 'abc';
      this.bubble.classList.add(styles.bubble);
      this.parent.append(this.bubble);
    });

    eventParent.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.bubble) {
        const clientRect = eventParent.getBoundingClientRect();
        let mousePos = {
          x: e.x - clientRect.x,
          y: e.y - clientRect.y,
        };

        if (this.verticalLines?.length > 0) {
          let closestVerticalLine = this.verticalLines.reduce((p, c) => Math.abs(c.x1 - mousePos.x) < Math.abs(p.x1 - mousePos.x) ? c : p);
          this.mouseVerticalLine?.remove();
          this.mouseVerticalLine = this.svg.ownerDocument.createElementNS(LineChart.svgNS, 'line');
          this.mouseVerticalLine.style.pointerEvents = 'none';
          this.svg.append(this.mouseVerticalLine);
          this.mouseVerticalLine.classList.add(lineStyles.verticalLine);
          this.mouseVerticalLine.setAttribute('x1', closestVerticalLine.x1.toString());
          this.mouseVerticalLine.setAttribute('y1', closestVerticalLine.y1.toString());
          this.mouseVerticalLine.setAttribute('x2', closestVerticalLine.x2.toString());
          this.mouseVerticalLine.setAttribute('y2', closestVerticalLine.y2.toString());
          this.mouseVerticalLine.parentElement?.insertBefore(this.mouseVerticalLine, this.mouseVerticalLine.parentElement.firstChild);
        }


        // const bounds = this.bubble.getBoundingClientRect();
        // this.bubble!.style.top = `${ e.pageY - bounds.height - 10 }px`;
        // this.bubble!.style.left = `${ e.pageX - bounds.width / 2 }px`;
      }
    });

    eventParent.addEventListener('mouseleave', (e: MouseEvent) => {
      this.mouseVerticalLine?.remove();
      this.bubble?.remove();
    });
  }
}

function makePolygons(items: LineChartItem[], width: number, height: number, offset: number, maxValue: number, minValue: number): SvgPolygon[] {
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

function makeVerticalLines(data: LineChartData, width: number, height: number): SvgLine[] {
  return data.dates
    .map((v, i, c) => {
      return {
        x1: width * i / (c.length - 1),
        y1: 0,
        x2: width * i / (c.length - 1),
        y2: height,
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

export interface LineConfig {
  color: string;
  isDotted: boolean;
}

export interface LineChartData {
  items: LineChartItem[];
  dates: string[];
}

export interface LineChartItem {
  values: number[];
  label: string;
}

interface LineChartLegendConfig {
  label: string;
  color: string;
  isDotted: boolean;
  count: number;
}