export class Chart {
    constructor(parent, title, data, maxValue, configs) {
        this.currentInstance = -1;
        this.currentInstance = ++Chart.instance;
        this.parent = parent.ownerDocument.createElement('div');
        this.parent.style.setProperty('height', `calc(${parent.style.height} - 2em - 2px`);
        parent.style.setProperty('display', 'flex');
        parent.append(this.parent);
        this.parent.classList.add('__chart');
        const header = this.parent.ownerDocument.createElement('h1');
        header.innerText = title;
        header.classList.add('__chartHeader');
        this.parent.append(header);
        this.svg = document.createElementNS(Chart.svgNS, "svg");
        // this.svg.style.setProperty('height', '1px');
        this.svg.classList.add('__chartContent');
        this.parent.append(this.svg);
        this.legend = this.parent.ownerDocument.createElement('div');
        this.legend.classList.add('__chartLegend');
        this.parent.append(this.legend);
        setTimeout(() => {
            const fontSize = parseInt(this.svg.computedStyleMap().get('font-size').toString().replace('px', ''));
            this.renderLegend(data, configs);
            // this.svg.setAttribute("viewBox", `0 0 ${ this.svg.clientWidth } ${ this.svg.clientHeight + 2 * fontSize }`)
            this.renderSvg(data, maxValue, configs, fontSize);
            this.svg.classList.remove('__chartContent');
            this.svg.style.overflow = 'visible';
        });
    }
    makeBubble() {
        this.bubble?.remove();
        this.bubble = this.parent.ownerDocument.createElement('div');
        this.bubble.classList.add('__bubble');
        this.parent.append(this.bubble);
        setTimeout(() => this.bubble.style.transition = 'all 0.07s', 0);
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
//# sourceMappingURL=chart.js.map