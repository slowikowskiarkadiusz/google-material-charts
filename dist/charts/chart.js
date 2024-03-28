import styles from './chart.scss';
export class Chart {
    constructor(parent, title, data, maxValue, configs) {
        this.parent = parent;
        this.currentInstance = -1;
        this.currentInstance = ++Chart.instance;
        console.log(this.currentInstance);
        parent.classList.add(styles.chart);
        const header = this.parent.ownerDocument.createElement('h1');
        header.innerText = title;
        header.classList.add(styles.chartHeader);
        parent.append(header);
        this.svg = document.createElementNS(Chart.svgNS, "svg");
        this.svg.classList.add(styles.chartContent);
        parent.append(this.svg);
        this.legend = this.parent.ownerDocument.createElement('div');
        this.legend.classList.add(styles.chartLegend);
        parent.append(this.legend);
        setTimeout(() => {
            const fontSize = parseInt(this.svg.computedStyleMap().get('font-size').toString().replace('px', ''));
            this.renderLegend(data, configs);
            this.renderSvg(data, maxValue, configs, fontSize);
            this.svg.classList.remove(styles.chartContent);
            this.svg.style.overflow = 'visible';
            window.addEventListener('resize', e => {
                console.log('resize');
                // this.svg.innerHTML = '';
                // this.renderSvg(data, maxValue, configs, fontSize);
            });
        });
    }
    makeBubble() {
        this.bubble?.remove();
        this.bubble = this.parent.ownerDocument.createElement('div');
        this.bubble.classList.add(styles.bubble);
        this.parent.append(this.bubble);
        setTimeout(() => { if (this.bubble)
            this.bubble.style.transition = 'all 0.07s'; }, 0);
    }
    moveBubbleTo(newPos) {
        this.bubble.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
    }
    removeBubble() {
        this.bubble?.remove();
        this.bubble = undefined;
    }
}
Chart.svgNS = "http://www.w3.org/2000/svg";
Chart.instance = 0;
