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

const vertexDotRadius = '4';
const closestVertexDotRadius = '6';

export class LineChart extends Chart {
  private static instance = 0;
  private readonly currentInstance: number = -1;
  private verticalLines!: SvgLine[];
  private mouseVerticalLine?: SVGLineElement;
  private vertices: v2d[][] = [];
  private dots?: SVGCircleElement[];
  private backgroundDot?: SVGCircleElement;

  constructor(parent: HTMLDivElement, title: string, data: LineChartData, configs?: LineConfig[]) {
    super(parent, title);
    this.currentInstance = LineChart.instance++;

    const originalHeight = this.svg.clientHeight;

    setTimeout(() => {
      const fontSize = parseInt(this.svg.computedStyleMap().get('font-size')!.toString().replace('px', ''));
      const lineConfigs = configs ?? defaultConfigs;
      this.renderLegend(data, lineConfigs);
      // this.svg.setAttribute("viewBox", `0 0 ${ this.svg.clientWidth } ${ this.svg.clientHeight + 2 * fontSize }`)
      this.renderSvg(data, lineConfigs, fontSize);
      this.svg.classList.remove(styles.chartContent);
      this.svg.style.overflow = 'visible';
    }, 0);
  }

  private renderSvg(data: LineChartData, configs: LineConfig[], fontSize: number) {
    const { clientHeight, clientWidth } = this.svg;
    const spaceForChart = clientHeight - 2 * fontSize;
    const chartScale = spaceForChart / clientHeight;
    const scaledHeight = clientHeight * chartScale;

    const horizontalLinesGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
    this.svg.append(horizontalLinesGroup);
    const longestValueLength = data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c).toString().length;
    const horizontalLinesCount = 4;
    for (let i = 0; i <= horizontalLinesCount; i++) {
      const line = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
      line.setAttribute('x1', `${ 0 }`);
      line.setAttribute('x2', `${ clientWidth - fontSize * longestValueLength }`);
      line.setAttribute('y1', `${ (scaledHeight) * (i) / 4 }`);
      line.setAttribute('y2', `${ (scaledHeight) * (i) / 4 }`);
      line.classList.add(i === horizontalLinesCount ? lineStyles.bottomHorizontalLine : lineStyles.horizontalLine);
      horizontalLinesGroup.append(line);
    }

    // [leftText, rightText].map(x => x.getComputedTextLength().valueOf())

    // if (data.dates.length % 2 === 1) {
    //   let i = Math.floor(data.dates.length / 2);
    //   const middleText = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
    //   middleText.classList.add(lineStyles.horizontalLineLabel);
    //   middleText.textContent = data.dates[data.dates.length - 1];
    //   middleText.setAttribute('x', `${ x - middleText.getComputedTextLength().valueOf() }`);
    //   middleText.setAttribute('y', `${ (scaledHeight) + 1.5 * fontSize }`);
    // }


    this.addBubbleEvents(horizontalLinesGroup, data, configs);
    horizontalLinesGroup.classList.add(lineStyles.group);
    horizontalLinesGroup.style.pointerEvents = 'bounding-box';
    const eventRect = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'rect');
    setTimeout(() => {
      eventRect.setAttribute('width', (clientWidth - fontSize * longestValueLength).toString())
      eventRect.setAttribute('height', (scaledHeight).toString());
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
      const id = `horizontalLine${ this.currentInstance }${ i }`;
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
    const polygonsData = makePolygons(data.items, horizontalLinesGroup.getBBox().width, horizontalLinesGroup.getBBox().height, 0, data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c), 0);
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

    const { width, height } = horizontalLinesGroup.getBBox();
    this.verticalLines = makeVerticalLines(data, width, height);

    this.putAllLabels(data, scaledHeight, fontSize, clientWidth, longestValueLength);
  }

  private putAllLabels(data: LineChartData, scaledHeight: number, fontSize: number, clientWidth: number, longestValueLength: number) {
    const leftText = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
    leftText.textContent = data.dates[0];
    leftText.classList.add(lineStyles.horizontalLineLabel);
    leftText.setAttribute('x', '0');
    leftText.setAttribute('y', `${ (scaledHeight) + 1.5 * fontSize }`);
    const leftLine = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
    leftLine.setAttribute('x1', '1');
    leftLine.setAttribute('x2', '1');
    leftLine.setAttribute('y1', `${ (scaledHeight) }`);
    leftLine.setAttribute('y2', `${ (scaledHeight) + fontSize / 3 }`);
    leftLine.classList.add(lineStyles.bottomHorizontalLine);
    this.svg.append(leftText, leftLine);

    const rightText = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
    rightText.classList.add(lineStyles.horizontalLineLabel);
    rightText.textContent = data.dates[data.dates.length - 1];
    const rightLine = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
    this.svg.append(rightText, rightLine);
    const x = clientWidth - fontSize * longestValueLength;
    const rightTextX = x - rightText.getComputedTextLength().valueOf();
    rightText.setAttribute('x', `${ rightTextX }`);
    rightText.setAttribute('y', `${ (scaledHeight) + 1.5 * fontSize }`);
    rightLine.setAttribute('x1', `${ x - 1 }`);
    rightLine.setAttribute('x2', `${ x - 1 }`);
    rightLine.setAttribute('y1', `${ (scaledHeight) }`);
    rightLine.setAttribute('y2', `${ (scaledHeight) + fontSize / 3 }`);
    rightLine.classList.add(lineStyles.bottomHorizontalLine);

    // this.putLabelsAround(data.dates, data.dates.map((v, i) => i), scaledHeight + 1.5 * fontSize, { start: scaledHeight, end: (scaledHeight) + fontSize / 3 }, [], [leftText, rightText].map(t => t.getBBox()));
    this.putLabelsSubsequently(data.dates, scaledHeight + 1.5 * fontSize, { start: scaledHeight, end: (scaledHeight) + fontSize / 3 }, [], [leftText, rightText].map(t => t.getBBox()));
  }

  private putLabelsSubsequently(allDates: string[], textY: number, lineY: { start: number, end: number }, debugDots: SVGCircleElement[], textBboxes: DOMRect[]) {
    allDates.forEach((x, i) => {
      const newText = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
      newText.classList.add(lineStyles.horizontalLineLabel);
      newText.textContent = allDates[i];
      this.svg.append(newText);
      const newTextLength = newText.getComputedTextLength().valueOf();
      newText.setAttribute('x', `${ this.verticalLines[i].x1 - newTextLength / 2 }`);
      newText.setAttribute('y', `${ textY }`);
      const nextLine = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
      nextLine.setAttribute('x1', `${ this.verticalLines[i].x1 }`);
      nextLine.setAttribute('x2', `${ this.verticalLines[i].x2 }`);
      nextLine.setAttribute('y1', `${ lineY.start }`);
      nextLine.setAttribute('y2', `${ lineY.end }`);
      nextLine.classList.add(lineStyles.bottomHorizontalLine);
      this.svg.append(newText, nextLine);

      if (this.isTextOverlapping(textBboxes, newText.getBBox())) {
        newText.remove();
        nextLine.remove();
        return;
      }

      textBboxes.push(newText.getBBox());
    })
  }

  private putLabelsAround(allDates: string[], indices: number[], textY: number, lineY: { start: number, end: number }, debugDots: SVGCircleElement[], textBboxes: DOMRect[]) {
    const indexI = Math.round(indices.length / 2);
    if (indices.length <= indexI) return;

    let i = indices[indexI];

    const newText = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'text');
    newText.classList.add(lineStyles.horizontalLineLabel);
    newText.textContent = allDates[i];
    this.svg.append(newText);
    const newTextLength = newText.getComputedTextLength().valueOf();
    newText.setAttribute('x', `${ this.verticalLines[i].x1 - newTextLength / 2 }`);
    newText.setAttribute('y', `${ textY }`);
    const nextLine = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
    nextLine.setAttribute('x1', `${ this.verticalLines[i].x1 }`);
    nextLine.setAttribute('x2', `${ this.verticalLines[i].x2 }`);
    nextLine.setAttribute('y1', `${ lineY.start }`);
    nextLine.setAttribute('y2', `${ lineY.end }`);
    nextLine.classList.add(lineStyles.bottomHorizontalLine);
    this.svg.append(newText, nextLine);

    newText.setAttribute('stroke', 'red');
    if (this.isTextOverlapping(textBboxes, newText.getBBox())) {
      newText.remove();
      nextLine.remove();
      return;
    }
    newText.setAttribute('stroke', 'black');

    if (indices.length <= 1) return;

    textBboxes.push(newText.getBBox());

    const leftIndices = indices.slice(0, indexI);
    this.putLabelsAround(allDates, leftIndices, textY, lineY, debugDots, textBboxes);

    const rightIndices = indices.slice(indexI);
    this.putLabelsAround(allDates, rightIndices, textY, lineY, debugDots, textBboxes);
  }

  private isTextOverlapping(allTexts: DOMRect[], newText: DOMRect) {
    return allTexts.some(rect => !(rect.x + rect.width < newText.x ||
      newText.x + newText.width < rect.x ||
      rect.y + rect.height < newText.y ||
      newText.y + newText.height < rect.y));
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

  private addBubbleEvents(eventParent: SVGElement, data: LineChartData, configs: LineConfig[]) {
    eventParent.style.pointerEvents = 'all';
    eventParent.addEventListener('mouseover', (e: MouseEvent) => {
      this.bubble?.remove();
      this.bubble = this.parent.ownerDocument.createElement('div');
      this.bubble.classList.add(styles.bubble);
      this.parent.append(this.bubble);
      // this.bubble.style.transition = 'all 0.1s';

      this.backgroundDot = eventParent.ownerDocument.createElementNS(LineChart.svgNS, 'circle');
      this.backgroundDot.setAttribute('r', '12');
      this.backgroundDot.style.pointerEvents = 'none';
      this.backgroundDot.style.opacity = '0.5';
      this.svg.append(this.backgroundDot);
    });

    eventParent.addEventListener('mousemove', (e: MouseEvent) => {
      const clientRect = eventParent.getBoundingClientRect();
      let mousePos = new v2d(e.x - clientRect.x, e.y - clientRect.y);

      if (this.verticalLines?.length > 0) {
        const closestVerticalLine = this.verticalLines.reduce((p, c) => Math.abs(c.x1 - mousePos.x) < Math.abs(p.x1 - mousePos.x) ? c : p);
        const indexOfTheClosestLine = this.verticalLines.findIndex(v => v.y1 === closestVerticalLine.y1 && v.x1 === closestVerticalLine.x1 && v.y2 === closestVerticalLine.y2 && v.x2 === closestVerticalLine.x2);
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

        this.dots ??= data.items.map((x, i) => {
          const dot = eventParent.ownerDocument.createElementNS(LineChart.svgNS, 'circle');
          dot.setAttribute('fill', configs[i].color);
          dot.setAttribute('r', vertexDotRadius);
          dot.style.pointerEvents = 'none';
          // dot.style.transition = 'all 0.1s';
          this.svg.append(dot);
          return dot;
        });

        let closestDot = this.dots[0];
        let closestDotDistance = Number.MAX_VALUE;
        let closestDotIndex = 0;
        this.dots.forEach((dot, i) => {
          const vertex = this.vertices[i][indexOfTheClosestLine];
          dot.setAttribute('cx', vertex.x.toString());
          dot.setAttribute('cy', vertex.y.toString());

          const currDistance = Math.abs(mousePos.y - dot.cy.animVal.value);
          if (closestDotDistance > currDistance) {
            closestDot = dot;
            closestDotDistance = currDistance;
            closestDotIndex = i;
          }
        });

        this.dots.forEach((dot, i) => {
          dot.setAttribute('r', vertexDotRadius);
          dot.setAttribute('fill', configs[i].color);
          dot.removeAttribute('stroke-width');
          dot.removeAttribute('stroke');
        });
        closestDot.setAttribute('r', closestVertexDotRadius);
        closestDot.setAttribute('stroke', configs[closestDotIndex].color)
        closestDot.setAttribute('fill', 'white');
        closestDot.setAttribute('stroke-width', '2');
        this.svg.append(closestDot);

        if (this.backgroundDot) {
          this.backgroundDot.setAttribute('fill', configs[closestDotIndex].color);
          this.backgroundDot.setAttribute('cx', closestDot.cx.animVal.valueAsString);
          this.backgroundDot.setAttribute('cy', closestDot.cy.animVal.valueAsString);
        }

        if (this.bubble) {
          const valueSpan = eventParent.ownerDocument.createElement('div');
          valueSpan.style.textAlign = 'center';
          valueSpan.innerHTML = `<b>${ data.items[closestDotIndex].values[indexOfTheClosestLine].toString() }</b><div style="font-size: 0.75em">${ data.dates[indexOfTheClosestLine] }</div>`;
          this.bubble.replaceChildren(valueSpan);

          const newPos = {
            x: closestDot.cx.animVal.value - this.bubble.offsetWidth / 2,
            y: closestDot.cy.animVal.value - this.bubble.offsetHeight / 2 - 15,
          }
          this.bubble.style.transform = `translate(${ newPos.x }px, ${ newPos.y }px)`;
        }
      }
    });

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