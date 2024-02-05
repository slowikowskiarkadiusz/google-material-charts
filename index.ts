import { LineChart, LineChartData } from "./src/charts/line/line.chart";

const lineChartData: LineChartData = {
  items: [
    {
      values: [250, 315, 275, 420, 370, 290, 435, 395, 310, 450], // Varies within a 200 range, not linear
      label: "Item 1",
    },
    {
      values: [540, 610, 580, 735, 670, 560, 720, 690, 640, 750], // Varies within a 200 range, not linear
      label: "Item 2",
    },
    {
      values: [810, 860, 830, 920, 875, 895, 940, 900, 855, 965], // Varies within a 200 range, not linear
      label: "Item 3",
    },
    {
      values: [200, 260, 215, 395, 350, 270, 400, 360, 290, 410], // Varies within a 200 range, not linear
      label: "Item 4",
    },
    {
      values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Varies within a 200 range, not linear
      label: "Item 4",
    }
  ],
  dates: [
    "2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04",
    "2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08",
    "2024-01-09", "2024-01-10"
  ]
};

new LineChart(document.getElementById('diagram-container') as HTMLDivElement, 'All Campaigns', lineChartData);