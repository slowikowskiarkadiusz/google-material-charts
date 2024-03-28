import { Chart, ChartConfig, SvgLine } from "../chart";
import lineStyles from "./line/line.chart.scss";

export abstract class TemporalChart<TData extends TemporalData, TConfig extends ChartConfig> extends Chart<TData, TConfig> {
  public verticalLines!: SvgLine[];
  protected horizontalLinesGroup?: SVGGElement;
  protected bottomLine?: SVGElement;

  protected constructor(parent: HTMLDivElement, title: string, data: TData, maxValue: number, configs: TConfig[]) {
    super(parent, title, data, maxValue, configs);
  }

  protected renderSvg(data: TData, maxValue: number, configs: TConfig[], fontSize: number) {
    const { clientHeight, clientWidth } = this.svg;
    const spaceForChart = clientHeight - 2 * fontSize;
    const chartScale = spaceForChart / clientHeight;
    const scaledHeight = clientHeight * chartScale;

    this.horizontalLinesGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
    this.svg.append(this.horizontalLinesGroup);
    const longestValueLength = data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c).toString().length;
    const horizontalLinesCount = 4;
    for (let i = 0; i <= horizontalLinesCount; i++) {
      const line = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
      line.setAttribute('x1', `${ 0 }`);
      line.setAttribute('x2', `${ clientWidth - fontSize * longestValueLength }`);
      line.setAttribute('y1', `${ (scaledHeight) * (i) / 4 }`);
      line.setAttribute('y2', `${ (scaledHeight) * (i) / 4 }`);
      line.classList.add(i === horizontalLinesCount ? lineStyles.bottomHorizontalLine : lineStyles.horizontalLine);
      this.horizontalLinesGroup.append(this.bottomLine = line);
    }

    this.horizontalLinesGroup.classList.add(lineStyles.group);
    this.horizontalLinesGroup.style.pointerEvents = 'bounding-box';
    const horizontalLinesLabelsCount = this.horizontalLinesGroup.childElementCount;

    const horizontalLinesLabelsGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
    this.svg.append(horizontalLinesLabelsGroup);
    for (let i = 0; i < horizontalLinesLabelsCount; i++) {
      const line = this.horizontalLinesGroup.children[i] as SVGLineElement;
      const path = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'path');
      path.setAttribute('d', `M${ line.x2.animVal.value + fontSize },${ line.y1.animVal.value } L${ line.x2.animVal.value + fontSize * 3 },${ line.y1.animVal.value }`);
      const id = `horizontalLine${ this.currentInstance }${ i }`;
      path.setAttribute('id', id);
      const text = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
      const textPath = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'textPath');
      textPath.setAttribute('href', `#${ id }`);
      textPath.classList.add(lineStyles.horizontalLineLabel);
      textPath.innerHTML = `${ Math.floor(maxValue - maxValue * (i) / 4) }`;
      text.append(textPath);
      horizontalLinesLabelsGroup.append(path, text);
    }

    horizontalLinesLabelsGroup.setAttribute('transform', `translate(0, ${ fontSize / 3 })`);
    horizontalLinesLabelsGroup.classList.add(lineStyles.group);

    const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
    // const polygonsData = makePolygons(data.items, this.horizontalLinesGroup.getBBox().width, this.horizontalLinesGroup.getBBox().height, 0, data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c), 0);
    // polygonsData
    //   .forEach((x, i) => {
    //     const path = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'path');
    //     path.setAttribute('d', x.path);
    //     path.setAttribute('stroke', configs[i].color);
    //     if (configs[i].isDotted)
    //       path.setAttribute('stroke-dasharray', '7');
    //     path.setAttribute('stroke-width', '2');
    //     path.setAttribute('fill', 'none');
    //     valuesPolygonsGroup.append(path);
    //   });
    // this.vertices = polygonsData.map(x => x.vertices.map(y => new v2d(y.x, y.y)));

    this.svg.append(valuesPolygonsGroup);
    valuesPolygonsGroup.classList.add(lineStyles.group);

    const { width, height } = this.horizontalLinesGroup.getBBox();
    this.verticalLines = makeVerticalLines(data, width, height);

    this.putAllLabels(data, scaledHeight, fontSize, clientWidth, longestValueLength);

    this.renderTemporalSvg(data, maxValue, configs, fontSize);
  }

  protected abstract renderTemporalSvg(data: TData, maxValue: number, configs: TConfig[], fontSize: number): void;

  protected renderLegend(data: TemporalData, configs: TConfig[]) {
    const legendData: (ChartConfig & { label: string, count: number })[] = data.items.map((dataItem, i) => {
      return {
        label: dataItem.label,
        color: configs[i].color,
        count: dataItem.values.reduce((p, c) => p + c),
        // isDotted: configs[i].isDotted
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

  private putAllLabels(data: TData, scaledHeight: number, fontSize: number, clientWidth: number, longestValueLength: number) {
    const leftText = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
    leftText.textContent = data.dates[0];
    leftText.classList.add(lineStyles.horizontalLineLabel);
    leftText.setAttribute('x', '0');
    leftText.setAttribute('y', `${ (scaledHeight) + 1.5 * fontSize }`);
    const leftLine = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
    leftLine.setAttribute('x1', '1');
    leftLine.setAttribute('x2', '1');
    leftLine.setAttribute('y1', `${ (scaledHeight) }`);
    leftLine.setAttribute('y2', `${ (scaledHeight) + fontSize / 3 }`);
    leftLine.classList.add(lineStyles.bottomHorizontalLine);
    this.svg.append(leftText, leftLine);

    const rightText = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
    rightText.classList.add(lineStyles.horizontalLineLabel);
    rightText.textContent = data.dates[data.dates.length - 1];
    const rightLine = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
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

    const eventRect = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'rect');
    eventRect.setAttribute('width', (clientWidth - fontSize * longestValueLength).toString())
    eventRect.setAttribute('height', (scaledHeight).toString());
    eventRect.setAttribute('fill', 'transparent');
    eventRect.style.pointerEvents = 'bounding-box';
    this.horizontalLinesGroup!.append(eventRect);

    this.putLabelsSubsequently(data.dates, scaledHeight + 1.5 * fontSize, { start: scaledHeight, end: (scaledHeight) + fontSize / 3 }, [], [leftText, rightText].map(t => t.getBBox()));
  }

  private putLabelsSubsequently(allDates: string[], textY: number, lineY: { start: number, end: number }, debugDots: SVGCircleElement[], textBboxes: DOMRect[]) {
    const newTexts: SVGTextElement[] = [];
    allDates.forEach((x, i) => {
      const newText = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
      newText.classList.add(lineStyles.horizontalLineLabel);
      newText.textContent = allDates[i];
      this.svg.append(newText);
      const newTextLength = newText.getComputedTextLength().valueOf();
      newText.setAttribute('x', `${ this.verticalLines[i].x1 - newTextLength / 2 }`);
      newText.setAttribute('y', `${ textY }`);
      const nextLine = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
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

      newTexts.push(newText);
      textBboxes.push(newText.getBBox());
    })

    newTexts
      .forEach(x => x.style.fontSize = '0.65em');
  }

  private isTextOverlapping(allTexts: DOMRect[], newText: DOMRect) {
    return allTexts.some(rect => !(rect.x + rect.width < newText.x ||
      newText.x + newText.width < rect.x ||
      rect.y + rect.height < newText.y ||
      newText.y + newText.height < rect.y));
  }
}

function makeVerticalLines(data: TemporalData, width: number, height: number): SvgLine[] {
  return data.dates
    .map((v: any, i: number, c: string | any[]) => {
      return {
        x1: width * i / (c.length - 1),
        y1: 0,
        x2: width * i / (c.length - 1),
        y2: height,
      }
    });
}

export interface TemporalData {
  items: TemporalItem[];
  dates: string[];
}

export interface TemporalItem {
  values: number[];
  label: string;
}

export interface TemporalLegendConfig {
  label: string;
  color: string;
  count: number;
}