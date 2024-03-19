import { TemporalData } from "./src/charts/temporal/temporal.chart";
import { LineChart } from "./src/charts/temporal/line/line.chart";
import { addStyles } from "./src/add-styles";
//
// const lineChartData: TemporalData = {
//   "items": [
//     {
//       "values": [250, 315, 275, 420, 370, 290, 435, 395, 310, 450, 516, 467, 519, 450, 413, 376, 408, 434, 457, 503, 599, 505, 496, 487, 570, 558, 652, 646, 654],
//       "label": "Item 1"
//     },
//     {
//       "values": [540, 610, 580, 735, 670, 560, 720, 690, 640, 750, 701, 677, 769, 755, 687, 636, 622, 635, 569, 527, 587, 629, 676, 750, 757, 774, 844, 930, 986],
//       "label": "Item 2"
//     },
//     {
//       "values": [810, 860, 830, 920, 875, 895, 940, 900, 855, 965, 1001, 1099, 1016, 1018, 925, 978, 1070, 1078, 1117, 1122, 1140, 1219, 1255, 1173, 1147, 1184, 1229, 1282, 1376],
//       "label": "Item 3"
//     },
//     {
//       "values": [200, 260, 215, 395, 350, 270, 400, 360, 290, 410, 505, 454, 386, 375, 319, 257, 202, 186, 234, 210, 291, 367, 404, 315, 312, 291, 207, 178, 204],
//       "label": "Item 4"
//     },
//     // {
//     // "values": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -18, -65, 4, -82, -25, -3, -15, -7, 53, -37, 11, -13, -65, -62, -153, -183, -229, -300, -258, -238],
//     // "values": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 65, 4, 82, 25, 3, 15, 7, 53, 37, 11, 13, 65, 62, 153, 183, 229, 300, 258, 238],
//     // "label": "Item 5"
//     // }
//   ],
//   "dates": [
//     "2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10",
//     "2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20",
//     "2024-01-21", "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25", "2024-01-26", "2024-01-27", "2024-01-28", "2024-01-29"
//   ]
// };
//
// new LineChart(document.getElementById('diagram-container') as HTMLDivElement, 'All Campaigns', lineChartData, true);
// new LineChart(document.getElementById('diagram-container2') as HTMLDivElement, 'All Campaigns', lineChartData);
// new LineChart(document.getElementById('diagram-container3') as HTMLDivElement, 'All Campaigns', lineChartData);

addStyles();

export { LineChart, TemporalData }