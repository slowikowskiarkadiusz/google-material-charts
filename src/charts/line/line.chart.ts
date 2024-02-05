import { Chart, SvgPolygon } from "../chart";
import lineStyles from './line.chart.scss'
import { v2d } from "../../v2d";

export class LineChart extends Chart {
  constructor(parent: HTMLDivElement, title: string, data: LineChartData) {
    super(parent, title);

    this.render(data);
  }

  private render(data: LineChartData) {
    const { clientHeight, clientWidth } = this.svg;
    const horizontalLinesGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
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

    const horizontalLinesLabelsGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    this.svg.append(horizontalLinesLabelsGroup);
    const horizontalLinesLabelsCount = horizontalLinesGroup.childElementCount;
    for (let i = 0; i < horizontalLinesLabelsCount; i++) {
      const line = horizontalLinesGroup.children[i] as SVGLineElement;
      const path = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'path');
      path.setAttribute('d', `M${ line.x2.animVal.value + this.svg.clientWidth * 0.05 },${ line.y1.animVal.value } L${ line.x2.animVal.value + this.svg.clientWidth * 0.15 },${ line.y1.animVal.value }`);
      const id = `horizontalLine${ i }`;
      path.setAttribute('id', id);
      const text = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
      const textPath = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'textPath');
      textPath.setAttribute('href', `#${ id }`);
      textPath.classList.add(lineStyles.horizontalLineLabel);
      textPath.innerHTML = 'abc';
      text.append(textPath);
      horizontalLinesLabelsGroup.append(path, text);
    }

    const lineChartColors: string[] = [
      '#E40303',
      '#FF8C00',
      '#FFED00',
      '#008026',
      '#24408E',
      '#732982',
    ];
    const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    makePolygons(data.items, horizontalLinesGroup.getBBox().width, horizontalLinesGroup.getBBox().height, 0, data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c), 0)
      .forEach((x, i) => {
        console.log(x);
        const path = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'path');
        path.setAttribute('d', x.path);
        path.setAttribute('stroke', lineChartColors[i]);
        path.setAttribute('stroke-width', '3px');
        path.setAttribute('fill', 'none');
        valuesPolygonsGroup.append(path);
      });

    this.svg.append(valuesPolygonsGroup);

    //calosc 720
    //lewy margin 42 - 0.583 - 1/15
    //linia 548 - 137/180 - 13/17
    //linia i text margin 14 - 1/50
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
  // Start the path data with the 'Move to' command for the first point
  let pathData: string = `M ${points[0].x},${points[0].y} `;

  for (let i = 1; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlPointX = (current.x + next.x) / 2;
    const controlPointY = (current.y + next.y) / 2;

    pathData += `Q ${current.x},${current.y} ${controlPointX},${controlPointY} `;
  }

  // Line to the last point
  if (points.length > 1) {
    const lastPoint = points[points.length - 1];
    pathData += `L ${lastPoint.x},${lastPoint.y}`;
  }

  return pathData;
}


export interface LineChartData {
  items: LineChartItem[];
  dates: string[];
}

export interface LineChartItem {
  values: number[];
  label: string;
}