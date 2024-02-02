import styles from './chart.scss';

export abstract class Chart {
    protected static readonly svgNS = "http://www.w3.org/2000/svg";
    
    protected svg!: SVGElement;

    protected constructor(private parent: HTMLDivElement, title: string) {
        parent.classList.add(styles.__chart);

        const header = this.parent.ownerDocument.createElement('h1');
        header.innerText = title;
        header.classList.add(styles.__chartHeader);
        parent.append(header);

        this.svg = document.createElementNS(Chart.svgNS, "svg");
        this.svg.setAttribute("viewBox", "0 0 100 100");
        this.svg.classList.add(styles.__chartContent);
        parent.append(this.svg);

        const legend = this.parent.ownerDocument.createElement('div');
        legend.classList.add(styles.__chartLegend);
        parent.append(legend);
    }
}