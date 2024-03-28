import { TemporalChart, TemporalData } from "../temporal.chart";
import { ChartConfig } from "../../chart";
export interface LineChartOptions {
    configs?: LineChartConfig[];
}
export interface LineChartConfig extends ChartConfig {
    isDotted: boolean;
}
export declare const defaultConfigs: LineChartConfig[];
export declare class LineChart extends TemporalChart<TemporalData, LineChartConfig> {
    private isStacked;
    private mouseVerticalLine?;
    private vertices;
    private dots?;
    private backgroundDot?;
    constructor(parent: HTMLDivElement, title: string, data: TemporalData, isStacked?: boolean, configs?: LineChartConfig[]);
    protected renderTemporalSvg(data: TemporalData, maxValue: number, configs: LineChartConfig[], fontSize: number): void;
    private addBubbleEvents;
}
