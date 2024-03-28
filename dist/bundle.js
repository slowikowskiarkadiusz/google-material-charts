(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["google-material-charts"] = factory();
	else
		root["google-material-charts"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 235:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.chart__chart___f4ctQ{display:grid;grid-template-rows:min-content auto min-content;height:100%;width:100%;font-family:"Roboto",serif;padding:1em;gap:1em;background-color:#fff}@media(prefers-color-scheme: light){.chart__chart___f4ctQ{color:#616161;border:1px #e0e0e0 solid}}.chart__chart___f4ctQ .chart__chartHeader___orL0U{margin:0;font-size:1.25em;font-weight:normal}.chart__chart___f4ctQ .chart__chartContent___kMqHX{width:100%;height:100%}.chart__chart___f4ctQ .chart__chartLegend___ZcX1i{height:min-content;min-height:min-content}.chart__chart___f4ctQ .chart__bubble___lfOZg{pointer-events:none;position:absolute;padding:1em;display:block;box-shadow:0 2px 10px 0px #b2b2b2;border-radius:.25em;transform-origin:bottom center}@media(prefers-color-scheme: light){.chart__chart___f4ctQ .chart__bubble___lfOZg{background-color:#fff;color:#616161}}.chart__chart___f4ctQ .chart__bubble___lfOZg::after{content:"";position:absolute;width:0;height:0;left:calc(50% - 10px);bottom:-10px;border-left:10px solid rgba(0,0,0,0);border-right:10px solid rgba(0,0,0,0);border-top:10px solid #fff}@media(prefers-color-scheme: light){.chart__chart___f4ctQ .chart__bubble___lfOZg::after{border-top:10px solid #fff}}`, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"chart": `chart__chart___f4ctQ`,
	"chartHeader": `chart__chartHeader___orL0U`,
	"chartContent": `chart__chartContent___kMqHX`,
	"chartLegend": `chart__chartLegend___ZcX1i`,
	"bubble": `chart__bubble___lfOZg`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 787:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.line-chart__chart___c3Fz6{display:grid;grid-template-rows:min-content auto min-content;height:100%;width:100%;font-family:"Roboto",serif;padding:1em;gap:1em;background-color:#fff}@media(prefers-color-scheme: light){.line-chart__chart___c3Fz6{color:#616161;border:1px #e0e0e0 solid}}.line-chart__chart___c3Fz6 .line-chart__chartHeader___nPl_H{margin:0;font-size:1.25em;font-weight:normal}.line-chart__chart___c3Fz6 .line-chart__chartContent___iIfSt{width:100%;height:100%}.line-chart__chart___c3Fz6 .line-chart__chartLegend___Q1IYW{height:min-content;min-height:min-content}.line-chart__chart___c3Fz6 .line-chart__bubble___ZnKTF{pointer-events:none;position:absolute;padding:1em;display:block;box-shadow:0 2px 10px 0px #b2b2b2;border-radius:.25em;transform-origin:bottom center}@media(prefers-color-scheme: light){.line-chart__chart___c3Fz6 .line-chart__bubble___ZnKTF{background-color:#fff;color:#616161}}.line-chart__chart___c3Fz6 .line-chart__bubble___ZnKTF::after{content:"";position:absolute;width:0;height:0;left:calc(50% - 10px);bottom:-10px;border-left:10px solid rgba(0,0,0,0);border-right:10px solid rgba(0,0,0,0);border-top:10px solid #fff}@media(prefers-color-scheme: light){.line-chart__chart___c3Fz6 .line-chart__bubble___ZnKTF::after{border-top:10px solid #fff}}.line-chart__horizontalLine___WW3Rl,.line-chart__bottomHorizontalLine___uHUiN{stroke-width:1}@media(prefers-color-scheme: light){.line-chart__horizontalLine___WW3Rl,.line-chart__bottomHorizontalLine___uHUiN{stroke:#e0e0e0}}.line-chart__verticalLine___ReBsq{stroke-width:1;stroke-dasharray:2}@media(prefers-color-scheme: light){.line-chart__verticalLine___ReBsq{stroke:#e0e0e0}}.line-chart__horizontalLineLabel___yX3fe{font-size:.75em}@media(prefers-color-scheme: light){.line-chart__horizontalLineLabel___yX3fe{fill:#616161}}.line-chart__bottomHorizontalLine___uHUiN{stroke-width:2}.line-chart__closestDot___BXxvr{stroke-width:2}@media(prefers-color-scheme: light){.line-chart__closestDot___BXxvr{fill:#fff}}.line-chart__group___KdjoR *{pointer-events:none}`, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"chart": `line-chart__chart___c3Fz6`,
	"chartHeader": `line-chart__chartHeader___nPl_H`,
	"chartContent": `line-chart__chartContent___iIfSt`,
	"chartLegend": `line-chart__chartLegend___Q1IYW`,
	"bubble": `line-chart__bubble___ZnKTF`,
	"horizontalLine": `line-chart__horizontalLine___WW3Rl`,
	"bottomHorizontalLine": `line-chart__bottomHorizontalLine___uHUiN`,
	"verticalLine": `line-chart__verticalLine___ReBsq`,
	"horizontalLineLabel": `line-chart__horizontalLineLabel___yX3fe`,
	"closestDot": `line-chart__closestDot___BXxvr`,
	"group": `line-chart__group___KdjoR`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 601:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  LineChart: () => (/* reexport */ LineChart)
});

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/charts/temporal/line/line.chart.scss
var line_chart = __webpack_require__(787);
;// CONCATENATED MODULE: ./src/charts/temporal/line/line.chart.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(line_chart/* default */.A, options);




       /* harmony default export */ const line_line_chart = (line_chart/* default */.A && line_chart/* default */.A.locals ? line_chart/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/sass-loader/dist/cjs.js!./src/charts/chart.scss
var chart = __webpack_require__(235);
;// CONCATENATED MODULE: ./src/charts/chart.scss

      
      
      
      
      
      
      
      
      

var chart_options = {};

chart_options.styleTagTransform = (styleTagTransform_default());
chart_options.setAttributes = (setAttributesWithoutAttributes_default());

      chart_options.insert = insertBySelector_default().bind(null, "head");
    
chart_options.domAPI = (styleDomAPI_default());
chart_options.insertStyleElement = (insertStyleElement_default());

var chart_update = injectStylesIntoStyleTag_default()(chart/* default */.A, chart_options);




       /* harmony default export */ const charts_chart = (chart/* default */.A && chart/* default */.A.locals ? chart/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./src/charts/chart.ts

class Chart {
    constructor(parent, title, data, maxValue, configs) {
        this.parent = parent;
        this.currentInstance = -1;
        this.currentInstance = ++Chart.instance;
        console.log(this.currentInstance);
        parent.classList.add(charts_chart.chart);
        const header = this.parent.ownerDocument.createElement('h1');
        header.innerText = title;
        header.classList.add(charts_chart.chartHeader);
        parent.append(header);
        this.svg = document.createElementNS(Chart.svgNS, "svg");
        this.svg.classList.add(charts_chart.chartContent);
        parent.append(this.svg);
        this.legend = this.parent.ownerDocument.createElement('div');
        this.legend.classList.add(charts_chart.chartLegend);
        parent.append(this.legend);
        setTimeout(() => {
            const fontSize = parseInt(this.svg.computedStyleMap().get('font-size').toString().replace('px', ''));
            this.renderLegend(data, configs);
            this.renderSvg(data, maxValue, configs, fontSize);
            this.svg.classList.remove(charts_chart.chartContent);
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
        this.bubble.classList.add(charts_chart.bubble);
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

;// CONCATENATED MODULE: ./src/charts/temporal/temporal.chart.ts


class TemporalChart extends Chart {
    constructor(parent, title, data, maxValue, configs) {
        super(parent, title, data, maxValue, configs);
    }
    renderSvg(data, maxValue, configs, fontSize) {
        const { clientHeight, clientWidth } = this.svg;
        const spaceForChart = clientHeight - 2 * fontSize;
        const chartScale = spaceForChart / clientHeight;
        const scaledHeight = clientHeight * chartScale;
        this.horizontalLinesGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
        this.svg.append(this.horizontalLinesGroup);
        const longestValueLength = data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c).toString().length;
        const horizontalLinesCount = 4;
        for (let i = 0; i <= horizontalLinesCount; i++) {
            const line = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
            line.setAttribute('x1', `${0}`);
            line.setAttribute('x2', `${clientWidth - fontSize * longestValueLength}`);
            line.setAttribute('y1', `${(scaledHeight) * (i) / 4}`);
            line.setAttribute('y2', `${(scaledHeight) * (i) / 4}`);
            line.classList.add(i === horizontalLinesCount ? line_line_chart.bottomHorizontalLine : line_line_chart.horizontalLine);
            this.horizontalLinesGroup.append(this.bottomLine = line);
        }
        this.horizontalLinesGroup.classList.add(line_line_chart.group);
        this.horizontalLinesGroup.style.pointerEvents = 'bounding-box';
        const horizontalLinesLabelsCount = this.horizontalLinesGroup.childElementCount;
        const horizontalLinesLabelsGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
        this.svg.append(horizontalLinesLabelsGroup);
        for (let i = 0; i < horizontalLinesLabelsCount; i++) {
            const line = this.horizontalLinesGroup.children[i];
            const path = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'path');
            path.setAttribute('d', `M${line.x2.animVal.value + fontSize},${line.y1.animVal.value} L${line.x2.animVal.value + fontSize * 3},${line.y1.animVal.value}`);
            const id = `horizontalLine${this.currentInstance}${i}`;
            path.setAttribute('id', id);
            const text = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
            const textPath = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'textPath');
            textPath.setAttribute('href', `#${id}`);
            textPath.classList.add(line_line_chart.horizontalLineLabel);
            textPath.innerHTML = `${Math.floor(maxValue - maxValue * (i) / 4)}`;
            text.append(textPath);
            horizontalLinesLabelsGroup.append(path, text);
        }
        horizontalLinesLabelsGroup.setAttribute('transform', `translate(0, ${fontSize / 3})`);
        horizontalLinesLabelsGroup.classList.add(line_line_chart.group);
        const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
        // const polygonsData = makePolygons(data.items, this.horizontalLinesGroup.getBBox().width, this.horizontalLinesGroup.getBBox().height, 0, data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c), 0);
        // polygonsData
        //   .forEach((x, i) => {
        //     const path = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'path');
        //     path.setAttribute('d', x.path);
        //     path.setAttribute('stroke', configs[i].color);
        //     if (configs[i].isDotted)
        //       path.setAttribute('stroke-dasharray', '7');
        //     path.setAttribute('stroke-width', '2');
        //     path.setAttribute('fill', 'none');
        //     valuesPolygonsGroup.append(path);
        //   });
        // this.vertices = polygonsData.map(x => x.vertices.map(y => new v2d(y.x, y.y)));
        this.svg.append(valuesPolygonsGroup);
        valuesPolygonsGroup.classList.add(line_line_chart.group);
        const { width, height } = this.horizontalLinesGroup.getBBox();
        this.verticalLines = makeVerticalLines(data, width, height);
        this.putAllLabels(data, scaledHeight, fontSize, clientWidth, longestValueLength);
        this.renderTemporalSvg(data, maxValue, configs, fontSize);
    }
    renderLegend(data, configs) {
        const legendData = data.items.map((dataItem, i) => {
            return {
                label: dataItem.label,
                color: configs[i].color,
                count: dataItem.values.reduce((p, c) => p + c),
                // isDotted: configs[i].isDotted
            };
        });
        this.legend.innerHTML = '';
        this.legend.style.display = 'grid';
        this.legend.style.gridTemplateColumns = 'auto auto';
        this.legend.style.gap = '0.5em';
        legendData.forEach(x => {
            const main = this.legend.ownerDocument.createElement('div');
            main.style.display = 'grid';
            main.style.gridTemplateColumns = '1em auto';
            main.style.gap = '0.5em';
            this.legend.append(main);
            const stripParent = this.legend.ownerDocument.createElement('div');
            stripParent.style.display = 'flex';
            stripParent.style.justifyContent = 'center';
            stripParent.style.alignItems = 'center';
            main.append(stripParent);
            const strip = this.legend.ownerDocument.createElement('div');
            strip.style.height = '0.11em';
            strip.style.width = '100%';
            strip.style.backgroundColor = x.color;
            stripParent.append(strip);
            const label = this.legend.ownerDocument.createElement('span');
            label.style.fontSize = '0.75em';
            label.innerText = `${x.label} (${x.count})`;
            main.append(label);
        });
    }
    putAllLabels(data, scaledHeight, fontSize, clientWidth, longestValueLength) {
        const leftText = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
        leftText.textContent = data.dates[0];
        leftText.classList.add(line_line_chart.horizontalLineLabel);
        leftText.setAttribute('x', '0');
        leftText.setAttribute('y', `${(scaledHeight) + 1.5 * fontSize}`);
        const leftLine = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
        leftLine.setAttribute('x1', '1');
        leftLine.setAttribute('x2', '1');
        leftLine.setAttribute('y1', `${(scaledHeight)}`);
        leftLine.setAttribute('y2', `${(scaledHeight) + fontSize / 3}`);
        leftLine.classList.add(line_line_chart.bottomHorizontalLine);
        this.svg.append(leftText, leftLine);
        const rightText = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
        rightText.classList.add(line_line_chart.horizontalLineLabel);
        rightText.textContent = data.dates[data.dates.length - 1];
        const rightLine = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
        this.svg.append(rightText, rightLine);
        const x = clientWidth - fontSize * longestValueLength;
        const rightTextX = x - rightText.getComputedTextLength().valueOf();
        rightText.setAttribute('x', `${rightTextX}`);
        rightText.setAttribute('y', `${(scaledHeight) + 1.5 * fontSize}`);
        rightLine.setAttribute('x1', `${x - 1}`);
        rightLine.setAttribute('x2', `${x - 1}`);
        rightLine.setAttribute('y1', `${(scaledHeight)}`);
        rightLine.setAttribute('y2', `${(scaledHeight) + fontSize / 3}`);
        rightLine.classList.add(line_line_chart.bottomHorizontalLine);
        const eventRect = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'rect');
        eventRect.setAttribute('width', (clientWidth - fontSize * longestValueLength).toString());
        eventRect.setAttribute('height', (scaledHeight).toString());
        eventRect.setAttribute('fill', 'transparent');
        eventRect.style.pointerEvents = 'bounding-box';
        this.horizontalLinesGroup.append(eventRect);
        this.putLabelsSubsequently(data.dates, scaledHeight + 1.5 * fontSize, { start: scaledHeight, end: (scaledHeight) + fontSize / 3 }, [], [leftText, rightText].map(t => t.getBBox()));
    }
    putLabelsSubsequently(allDates, textY, lineY, debugDots, textBboxes) {
        const newTexts = [];
        allDates.forEach((x, i) => {
            const newText = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'text');
            newText.classList.add(line_line_chart.horizontalLineLabel);
            newText.textContent = allDates[i];
            this.svg.append(newText);
            const newTextLength = newText.getComputedTextLength().valueOf();
            newText.setAttribute('x', `${this.verticalLines[i].x1 - newTextLength / 2}`);
            newText.setAttribute('y', `${textY}`);
            const nextLine = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'line');
            nextLine.setAttribute('x1', `${this.verticalLines[i].x1}`);
            nextLine.setAttribute('x2', `${this.verticalLines[i].x2}`);
            nextLine.setAttribute('y1', `${lineY.start}`);
            nextLine.setAttribute('y2', `${lineY.end}`);
            nextLine.classList.add(line_line_chart.bottomHorizontalLine);
            this.svg.append(newText, nextLine);
            if (this.isTextOverlapping(textBboxes, newText.getBBox())) {
                newText.remove();
                nextLine.remove();
                return;
            }
            newTexts.push(newText);
            textBboxes.push(newText.getBBox());
        });
        newTexts
            .forEach(x => x.style.fontSize = '0.65em');
    }
    isTextOverlapping(allTexts, newText) {
        return allTexts.some(rect => !(rect.x + rect.width < newText.x ||
            newText.x + newText.width < rect.x ||
            rect.y + rect.height < newText.y ||
            newText.y + newText.height < rect.y));
    }
}
function makeVerticalLines(data, width, height) {
    return data.dates
        .map((v, i, c) => {
        return {
            x1: width * i / (c.length - 1),
            y1: 0,
            x2: width * i / (c.length - 1),
            y2: height,
        };
    });
}

;// CONCATENATED MODULE: ./src/v2d.ts
class v2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static copy(from) {
        return new v2d(from.x, from.y);
    }
    static get zero() {
        return new v2d(0, 0);
    }
    static get one() {
        return new v2d(1, 1);
    }
    static get nOne() {
        return new v2d(-1, -1);
    }
    static get up() {
        return new v2d(0, -1);
    }
    static get down() {
        return new v2d(0, 1);
    }
    static get left() {
        return new v2d(-1, 0);
    }
    static get right() {
        return new v2d(1, 0);
    }
    static get leftDown() {
        return new v2d(-1, 1);
    }
    static get leftUp() {
        return new v2d(-1, -1);
    }
    static get rightDown() {
        return new v2d(1, 1);
    }
    static get rightUp() {
        return new v2d(1, -1);
    }
    copy() {
        return new v2d(this.x, this.y);
    }
    add(v) {
        return new v2d(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new v2d(this.x - v.x, this.y - v.y);
    }
    mul(scalar) {
        return new v2d(this.x * scalar, this.y * scalar);
    }
    ;
    div(scalar) {
        return new v2d(this.x / scalar, this.y / scalar);
    }
    ;
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    norm() {
        let vec = new v2d(this.x, this.y);
        return v2d.copy(vec.div(this.mag()));
    }
    eq(other) {
        let result = this.x == other.x && this.y == other.y;
        return result;
    }
    updt(to) {
        this.x = to.x;
        this.y = to.y;
        return this;
    }
    static dot(v1, v2) {
        let a = [v1.x, v1.y];
        let b = [v2.x, v2.y];
        let result = a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
        return result;
    }
    static distance(v1, v2) {
        let result = Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
        return result;
    }
}

;// CONCATENATED MODULE: ./src/charts/temporal/line/line.chart.ts




const defaultConfigs = [
    { color: '#E40303', isDotted: false },
    { color: '#FF8C00', isDotted: false },
    { color: '#FFED00', isDotted: false },
    { color: '#008026', isDotted: false },
    { color: '#24408E', isDotted: false },
    { color: '#732982', isDotted: false },
];
const vertexDotRadius = '4';
const closestVertexDotRadius = '6';
class LineChart extends TemporalChart {
    constructor(parent, title, data, isStacked = false, configs) {
        const maxValue = (isStacked
            ? data.dates.map((_, i) => data.items.map(v => v.values[i]).reduce((p, c) => p + c)).reduce((p, c) => p > c ? p : c)
            : data.items.flatMap(x => x.values).reduce((p, c) => p > c ? p : c)) * 1.1;
        super(parent, title, data, maxValue, configs ?? defaultConfigs);
        this.isStacked = isStacked;
        this.vertices = [];
    }
    renderTemporalSvg(data, maxValue, configs, fontSize) {
        const valuesPolygonsGroup = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'g');
        const polygonsData = makePolygons(data.items, this.horizontalLinesGroup.getBBox().width, this.horizontalLinesGroup.getBBox().height, 0, maxValue, 0, this.isStacked);
        const backgroundColor = getBackgroundColor(this.svg);
        if (this.isStacked) {
            polygonsData
                .forEach((x, i) => {
                const polygon = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'polygon');
                polygon.setAttribute('points', x.polygon);
                polygon.setAttribute('stroke', configs[i].color);
                polygon.setAttribute('stroke-width', '2');
                polygon.setAttribute('fill', configs[i].color);
                valuesPolygonsGroup.append(polygon);
                const rect = polygon.getBoundingClientRect();
                polygon.style.setProperty('transform', `translateY(-${rect.y + rect.height - this.bottomLine.getBoundingClientRect().y}px)`);
            });
        }
        polygonsData
            .forEach((x, i, c) => {
            if (this.isStacked && i === c.length - 1)
                return;
            const path = this.parent.ownerDocument.createElementNS(Chart.svgNS, 'path');
            path.setAttribute('d', x.path);
            path.setAttribute('stroke', this.isStacked ? backgroundColor : configs[i].color);
            if (configs[i].isDotted)
                path.setAttribute('stroke-dasharray', '7');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
            valuesPolygonsGroup.append(path);
            const rect = path.getBoundingClientRect();
            path.style.setProperty('transform', `translateY(-${rect.y + rect.height - this.bottomLine.getBoundingClientRect().y}px)`);
        });
        this.vertices = polygonsData.map(x => x.vertices.map(y => new v2d(y.x, y.y)));
        this.svg.append(valuesPolygonsGroup);
        valuesPolygonsGroup.classList.add(line_line_chart.group);
        this.addBubbleEvents(this.horizontalLinesGroup, data, configs);
    }
    addBubbleEvents(eventParent, data, configs) {
        const backgroundColor = getBackgroundColor(this.svg);
        eventParent.style.pointerEvents = 'all';
        eventParent.addEventListener('mouseover', (e) => {
            this.makeBubble();
            this.backgroundDot = eventParent.ownerDocument.createElementNS(Chart.svgNS, 'circle');
            this.backgroundDot.setAttribute('r', '12');
            this.backgroundDot.style.pointerEvents = 'none';
            this.backgroundDot.style.opacity = '0.5';
            this.svg.append(this.backgroundDot);
        });
        let delay = undefined;
        eventParent.addEventListener('mousemove', (e) => {
            const clientRect = eventParent.getBoundingClientRect();
            let mousePos = new v2d(e.x - clientRect.x, e.y - clientRect.y);
            if (this.verticalLines?.length > 0) {
                const closestVerticalLine = this.verticalLines.reduce((p, c) => Math.abs(c.x1 - mousePos.x) < Math.abs(p.x1 - mousePos.x) ? c : p);
                const indexOfTheClosestLine = this.verticalLines.findIndex(v => v.y1 === closestVerticalLine.y1 && v.x1 === closestVerticalLine.x1 && v.y2 === closestVerticalLine.y2 && v.x2 === closestVerticalLine.x2);
                this.mouseVerticalLine?.remove();
                this.mouseVerticalLine = this.svg.ownerDocument.createElementNS(Chart.svgNS, 'line');
                this.mouseVerticalLine.style.pointerEvents = 'none';
                this.svg.append(this.mouseVerticalLine);
                this.mouseVerticalLine.classList.add(line_line_chart.verticalLine);
                this.mouseVerticalLine.setAttribute('x1', closestVerticalLine.x1.toString());
                this.mouseVerticalLine.setAttribute('y1', closestVerticalLine.y1.toString());
                this.mouseVerticalLine.setAttribute('x2', closestVerticalLine.x2.toString());
                this.mouseVerticalLine.setAttribute('y2', closestVerticalLine.y2.toString());
                this.mouseVerticalLine.parentElement?.insertBefore(this.mouseVerticalLine, this.mouseVerticalLine.parentElement.firstChild);
                this.dots ??= data.items.map((x, i) => {
                    const dot = eventParent.ownerDocument.createElementNS(Chart.svgNS, 'circle');
                    dot.setAttribute('fill', this.isStacked ? backgroundColor : configs[i].color);
                    dot.setAttribute('r', vertexDotRadius);
                    dot.style.pointerEvents = 'none';
                    dot.style.transition = 'all 0.07s';
                    this.svg.append(dot);
                    return dot;
                });
                let closestDotDistance = Number.MAX_VALUE;
                let closestDotIndex = -1;
                this.dots.forEach((dot, i) => {
                    const vertex = this.vertices[i][indexOfTheClosestLine];
                    dot.setAttribute('cx', vertex.x.toString());
                    dot.setAttribute('cy', vertex.y.toString());
                    const currDistance = Math.abs(mousePos.y - dot.cy.animVal.value);
                    if (closestDotDistance > currDistance) {
                        closestDotDistance = currDistance;
                        closestDotIndex = i;
                    }
                });
                if (delay) {
                    clearTimeout(delay);
                    delay = undefined;
                }
                delay = setTimeout(() => {
                    if (closestDotIndex > -1 && this.dots)
                        this.svg.append(this.dots[closestDotIndex]);
                    delay = undefined;
                }, 36);
                this.dots.forEach((dot, i) => {
                    dot.setAttribute('r', i === closestDotIndex ? closestVertexDotRadius : vertexDotRadius);
                    if (i === closestDotIndex) {
                        dot.setAttribute('stroke', this.isStacked ? backgroundColor : configs[closestDotIndex].color);
                        dot.setAttribute('fill', !this.isStacked ? backgroundColor : configs[i].color);
                        // dot.classList.add(lineStyles.closestDot);
                    }
                    else {
                        dot.setAttribute('fill', this.isStacked ? backgroundColor : configs[i].color);
                        dot.removeAttribute('stroke-width');
                        dot.removeAttribute('stroke');
                        // dot.classList.remove(lineStyles.closestDot);
                    }
                });
                if (this.backgroundDot) {
                    setTimeout(() => { if (this.backgroundDot)
                        this.backgroundDot.style.transition = 'all 0.07s'; }, 1);
                    this.backgroundDot.setAttribute('fill', this.isStacked ? backgroundColor : configs[closestDotIndex].color);
                    this.backgroundDot.setAttribute('cx', this.dots[closestDotIndex].cx.animVal.valueAsString);
                    this.backgroundDot.setAttribute('cy', this.dots[closestDotIndex].cy.animVal.valueAsString);
                }
                if (this.bubble) {
                    const valueSpan = eventParent.ownerDocument.createElement('div');
                    valueSpan.style.textAlign = 'center';
                    valueSpan.innerHTML = `<b>${data.items[closestDotIndex].values[indexOfTheClosestLine].toString()}</b><div style="font-size: 0.75em">${data.dates[indexOfTheClosestLine]}</div>`;
                    this.bubble.replaceChildren(valueSpan);
                    const newPos = {
                        x: this.dots[closestDotIndex].cx.animVal.value - this.bubble.offsetWidth / 2,
                        y: this.dots[closestDotIndex].cy.animVal.value - this.bubble.offsetHeight / 2 - 15,
                    };
                    this.moveBubbleTo(newPos);
                }
            }
        });
        eventParent.addEventListener('mouseleave', (e) => {
            this.mouseVerticalLine?.remove();
            this.removeBubble();
            this.backgroundDot?.remove();
            this.backgroundDot = undefined;
            this.dots?.forEach(dot => dot.remove());
            this.dots = undefined;
        });
    }
}
function makePolygons(items, width, height, offset, maxValue, minValue, isStacked) {
    maxValue *= 1.25;
    let lastItems = undefined;
    let lastPoints = undefined;
    return items
        .map(item => {
        let items = item.values.map((x, i) => x + (isStacked && lastItems ? lastItems[i] : 0));
        lastItems = items;
        let points = items
            .map(x => x / maxValue)
            .map((v, i, c) => new v2d(i * width / (c.length - 1) + (i === 0 ? -1 : (i === c.length - 1 ? 1 : 0)) * offset, height - c[i] * height))
            .map(point => new v2d(parseFloat(point.x.toString().replaceAll(',', '.')), parseFloat(point.y.toString().replaceAll(',', '.'))));
        let polygon = [
            ...points.map((v) => `${v.x},${v.y}`),
        ];
        if (lastPoints)
            polygon.reverse().splice(0, 0, ...lastPoints.map((v) => `${v.x},${v.y}`));
        else
            polygon.splice(0, 0, `${width + offset},${height + offset}`, `${-offset},${height + offset}`);
        lastPoints = points;
        return {
            path: points.map((point, i) => `${(!i ? 'M' : 'L')}${point.x} ${point.y}`).join(' '),
            polygon: polygon
                .join(' '),
            vertices: [...points],
        };
    });
}
function getBackgroundColor(element) {
    const styleMap = window.getComputedStyle(element);
    const backgroundColor = styleMap.getPropertyValue('background-color');
    if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)')
        return backgroundColor.toString();
    else if (element.parentElement)
        return getBackgroundColor(element.parentElement);
    else
        return 'rgba(255, 255, 255, 1)';
}
function createSmoothPath(points) {
    let pathData = `M ${points[0].x},${points[0].y} `;
    for (let i = 1; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const controlPointX = (current.x + next.x) / 2;
        const controlPointY = (current.y + next.y) / 2;
        pathData += `Q ${current.x},${current.y} ${controlPointX},${controlPointY} `;
    }
    // Line to the last point
    if (points.length > 1) {
        const lastPoint = points[points.length - 1];
        pathData += `L ${lastPoint.x},${lastPoint.y}`;
    }
    return pathData;
}

;// CONCATENATED MODULE: ./src/index.ts



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});