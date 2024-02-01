export class LineChart {
    private maxChartValue: number = 0;
    private minChartValue: number = 0;
    private maxItemsInRow: number = 6;
    private lineChartColors: string[] = [
        '#E40303',
        '#FF8C00',
        '#FFED00',
        '#008026',
        '#24408E',
        '#732982',
    ];

    constructor(private parent: HTMLElement) {
        const div = this.parent.ownerDocument.createElement('div');
        parent.append(div);

        const svg = this.parent.ownerDocument.createElement('svg');
        console.log('svg');
        
        div.append(svg);
    }

    private makeMainDiv() {
    }
}