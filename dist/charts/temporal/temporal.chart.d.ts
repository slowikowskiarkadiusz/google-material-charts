import { Chart, ChartConfig, SvgLine } from "../chart";
export declare abstract class TemporalChart<TData extends TemporalData, TConfig extends ChartConfig> extends Chart<TData, TConfig> {
    verticalLines: SvgLine[];
    protected horizontalLinesGroup?: SVGGElement;
    protected bottomLine?: SVGElement;
    protected constructor(parent: HTMLDivElement, title: string, data: TData, maxValue: number, configs: TConfig[]);
    protected renderSvg(data: TData, maxValue: number, configs: TConfig[], fontSize: number): void;
    protected abstract renderTemporalSvg(data: TData, maxValue: number, configs: TConfig[], fontSize: number): void;
    protected renderLegend(data: TemporalData, configs: TConfig[]): void;
    private putAllLabels;
    private putLabelsSubsequently;
    private isTextOverlapping;
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
