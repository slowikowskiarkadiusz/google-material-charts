import { Chart } from "../chart";
import lineStyles from './line.chart.scss'

export class LineChart extends Chart {
    constructor(parent: HTMLDivElement, title: string) {
        super(parent, title);

        this.render();
    }

    private render() {
        const { clientHeight, clientWidth } = this.svg;
        console.log(clientHeight, clientWidth);
        const horizontalLinesGroup = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'g');
        this.svg.append(horizontalLinesGroup);
        const horizontalLinesCount = 4;
        for (let i = 0; i <= horizontalLinesCount; i++) {
            const line = this.parent.ownerDocument.createElementNS(LineChart.svgNS, 'line');
            line.setAttribute('x1', `${ 0 }`);
            line.setAttribute('x2', `${ clientWidth }`);
            line.setAttribute('y1', `${ clientHeight * (i + 0.5) / 4 }`);
            line.setAttribute('y2', `${ clientHeight * (i + 0.5) / 4 }`);
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
        
        //calosc 720
        //lewy margin 42 - 0.583 - 1/15
        //linia 548 - 137/180 - 13/17
        //linia i text margin 14 - 1/50
    }
}

interface LineChartData {
    items: LineChartItem[];
    dates: string[];
}

interface LineChartItem {
    values: number[];
    label: string;
}