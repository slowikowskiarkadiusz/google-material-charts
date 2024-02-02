"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
const styles = __importStar(require("./chart.scss"));
class Chart {
    constructor(parent, title) {
        this.parent = parent;
        this.svgNS = "http://www.w3.org/2000/svg";
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
exports.Chart = Chart;
//# sourceMappingURL=chart.js.map