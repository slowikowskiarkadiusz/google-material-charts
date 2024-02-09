import { Chart, SvgPolygon } from "../chart";
import lineStyles from './line.chart.scss'
import { v2d } from "../../v2d";

const defaultConfigs: LineConfig[] = [
  { color: '#E40303', isDotted: false },
  { color: '#FF8C00', isDotted: false },
  { color: '#FFED00', isDotted: false },
  { color: '#008026', isDotted: false },
  { color: '#24408E', isDotted: false },
  { color: '#732982', isDotted: false },
];

export class LineChart extends Chart {
  constructor(parent: HTMLDivElement, title: string, data: LineChartData, configs?: LineConfig[]) {
    super(parent, title);

    let legendData = this.renderSvg(data, configs ?? defaultConfigs);
    this.renderLegend(legendData);
  }

  private renderSvg(data: LineChartData, configs: LineConfig[]): LineChartLegendConfig[] {
    const { clientHeight, clientWidth } = this.svg;
    const horizontalLinesGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    // horizontalLinesGroup.setAttribute('transform', `translate(${ horizontalLinesGroup.getBoundingClientRect().x - this.svg.getBoundingClientRect().x }, 10)`);
    this.svg.append(horizontalLinesGroup);
    const horizontalLinesCount = 4;
    // const horizontalLinesBackground = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'rect');
    // horizontalLinesGroup.append(horizontalLinesBackground);
    // horizontalLinesBackground.setAttribute('width', `${ clientWidth }`);
    // horizontalLinesBackground.setAttribute('height', `${ clientHeight }`);
    // horizontalLinesBackground.setAttribute('fill', `red`);
    for (let i = 0; i <= horizontalLinesCount; i++) {
      const line = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
      line.setAttribute('x1', `${ 0 }`);
      line.setAttribute('x2', `${ clientWidth }`);
      line.setAttribute('y1', `${ clientHeight * (i) / 4 }`);
      line.setAttribute('y2', `${ clientHeight * (i) / 4 }`);
      line.classList.add(i === horizontalLinesCount ? lineStyles.bottomHorizontalLine : lineStyles.horizontalLine);
      horizontalLinesGroup.append(line);
    }

    horizontalLinesGroup.setAttribute('transform', 'scale(1, 1)');

    const horizontalLinesLabelsGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    this.svg.append(horizontalLinesLabelsGroup);
    const horizontalLinesLabelsCount = horizontalLinesGroup.childElementCount;
    const maxLabel = data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c);
    for (let i = 0; i < horizontalLinesLabelsCount; i++) {
      const line = horizontalLinesGroup.children[i] as SVGLineElement;
      const path = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'path');
      path.setAttribute('d', `M${ line.x2.animVal.value + this.svg.clientWidth * 0.05 },${ line.y1.animVal.value } L${ line.x2.animVal.value + this.svg.clientWidth * 0.5 },${ line.y1.animVal.value }`);
      const id = `horizontalLine${ i }`;
      path.setAttribute('id', id);
      const text = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
      const textPath = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'textPath');
      textPath.setAttribute('href', `#${ id }`);
      textPath.classList.add(lineStyles.horizontalLineLabel);
      textPath.innerHTML = `${ maxLabel - maxLabel * (i) / 4 }`;
      text.append(textPath);
      horizontalLinesLabelsGroup.append(path, text);
    }

    horizontalLinesLabelsGroup.setAttribute('transform', `translate(0, ${ this.svg.computedStyleMap().get('font-size')!.toString().replace('px', '') }) scale(1, 1)`);

    const legendData: LineChartLegendConfig[] = [];
    const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    makePolygons(data.items, horizontalLinesGroup.getBBox().width, horizontalLinesGroup.getBBox().height, 0, data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c), 0)
      .forEach((x, i) => {
        const path = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'path');
        path.setAttribute('d', x.path);
        path.setAttribute('stroke', configs[i].color);
        if (configs[i].isDotted)
          path.setAttribute('stroke-dasharray', '7');
        path.setAttribute('stroke-width', '3px');
        path.setAttribute('fill', 'none');
        valuesPolygonsGroup.append(path);
        legendData.push({
          label: data.items[i].label,
          color: configs[i].color,
          count: data.items[i].values.reduce((p, c) => p + c),
          isDotted: configs[i].isDotted
        });
      });

    valuesPolygonsGroup.setAttribute('transform', 'scale(1, 1)');

    this.svg.append(valuesPolygonsGroup);

    return legendData;

    //calosc 720
    //lewy margin 42 - 0.583 - 1/15
    //linia 548 - 137/180 - 13/17
    //linia i text margin 14 - 1/50
  }

  private renderLegend(configs: LineChartLegendConfig[]) {
    this.legend.style.display = 'grid';
    this.legend.style.gridTemplateColumns = 'auto auto';
    this.legend.style.gap = '0.5em';

    configs
      .forEach(x => {
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