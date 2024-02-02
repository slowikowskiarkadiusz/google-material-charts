import * as styles from './chart.scss';

export abstract class Chart {
    private readonly svgNS = "http://www.w3.org/2000/svg";

    protected constructor(private parent: HTMLElement, title: string) {
        const div = this.parent.ownerDocument.createElement('div');
        div.classList.add(styles.__chart);
        parent.append(div);

        const header = this.parent.ownerDocument.createElement('h1');
        header.innerText = title;
        header.classList.add(styles.__chartHeader);
        div.append(header);

        const svg = document.createElementNS(this.svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.classList.add(styles.__chartContent);
        div.append(svg);

        const legend = this.parent.ownerDocument.createElement('h1');
        legend.classList.add(styles.__chartLegend);
        div.append(legend);
        
        console.log(styles);
    }
}