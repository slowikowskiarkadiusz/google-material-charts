import { LineChart, TemporalData } from "../src";

const lineChartData: TemporalData = {
  "items": [
    {
      'label': 'Item 1',
      'values': [18, 22, 19, 30, 26, 21, 31, 28, 22, 32, 37, 33, 37, 32, 30, 27, 29, 31, 33, 36, 43, 36, 36, 35, 41, 40, 47, 46, 47]
    },
    {
      'label': 'Item 2',
      'values': [39, 44, 42, 53, 48, 40, 52, 50, 46, 54, 50, 49, 55, 54, 49, 46, 45, 46, 41, 38, 42, 45, 49, 54, 55, 56, 61, 67, 71]
    },
    {
      'label': 'Item 3',
      'values': [58, 62, 60, 66, 63, 65, 68, 65, 62, 70, 72, 79, 73, 73, 67, 71, 77, 78, 81, 81, 82, 88, 91, 85, 83, 86, 89, 93, 100]
    },
    {
      'label': 'Item 4',
      'values': [14, 18, 15, 28, 25, 19, 29, 26, 21, 29, 36, 32, 28, 27, 23, 18, 14, 13, 17, 15, 21, 26, 29, 22, 22, 21, 15, 12, 14]
    },
    // {
    //   'label': 'Item 5',
    //   'values': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 5, 1, 0, 1, 0, 3, 2, 0, 0, 4, 4, 11, 13, 16, 21, 18, 17]
    // }
  ]
  ,
  "dates": [
    "2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10",
    "2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20",
    "2024-01-21", "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25", "2024-01-26", "2024-01-27", "2024-01-28", "2024-01-29"
  ]
};

new LineChart(document.getElementById('diagram-container') as HTMLDivElement, 'All Campaigns', { items: lineChartData.items.map(x => { return { label: x.label, values: [...x.values].reverse() } }), dates: lineChartData.dates }, true);
new LineChart(document.getElementById('diagram-container2') as HTMLDivElement, 'All Campaigns', lineChartData);
new LineChart(document.getElementById('diagram-container3') as HTMLDivElement, 'All Campaigns', lineChartData);