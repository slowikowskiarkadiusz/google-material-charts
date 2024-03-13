export function addStyles() {
  const lineChartStyles = `
.__chart {
    @media (prefers-color-scheme: dark) {
        color: rgb(224, 224, 224);
        border: 1px rgb(97, 97, 97) solid;
    }
    @media (prefers-color-scheme: light) {
        color: rgb(97, 97, 97);
        border: 1px rgb(224, 224, 224) solid;
    }

    display: grid;
    grid-template-rows: min-content auto min-content;
    height: 100%;
    width: 100%;
    font-family: "Roboto", serif;
    padding: 1em;
    gap: 1em;
}


.__chartHeader {
    margin: 0;
    font-size: 1.25em;
    font-weight: normal;
}

.__chartContent {
    width: 100%;
    height: 100%;
}

.__chartLegend {
    height: min-content;
    min-height: min-content;
}

.__bubble {
    @media (prefers-color-scheme: light) {
        background-color: white;
        color: rgb(97, 97, 97);
    }
    @media (prefers-color-scheme: dark) {
        background-color: #282828;
        color: rgb(224, 224, 224);
    }

    pointer-events: none;
    position: absolute;
    padding: 1em;
    display: block;;
    box-shadow: 0 2px 10px 0px #b2b2b2;
    //border: 1px black solid;
    border-radius: 0.25em;
    transform-origin: bottom center;
}

.__bubble::after {
    @media (prefers-color-scheme: light) {
        border-top: 10px solid white;
    }
    @media (prefers-color-scheme: dark) {
        border-top: 10px solid #282828;
    }
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: calc(50% - 10px);
    bottom: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
}


.__horizontalLine {
    @media (prefers-color-scheme: light) {
        stroke: rgb(224, 224, 224);
    }
    @media (prefers-color-scheme: dark) {
        stroke: rgb(97, 97, 97);
    }
    stroke-width: 1;
}

.__verticalLine {
    @media (prefers-color-scheme: light) {
        stroke: rgb(224, 224, 224);
    }
    @media (prefers-color-scheme: dark) {
        stroke: rgb(97, 97, 97);
    }
    stroke-width: 1;
    stroke-dasharray: 2;
}

.__horizontalLineLabel {
    @media (prefers-color-scheme: light) {
        fill: rgb(97, 97, 97);
    }
    @media (prefers-color-scheme: dark) {
        fill: rgb(224, 224, 224);
    }
    font-size: 0.75em;
}

.__bottomHorizontalLine {
    @extend .horizontalLine;

    stroke-width: 2;
}

.__closestDot {
    @media (prefers-color-scheme: light) {
        fill: white;
    }
    @media (prefers-color-scheme: dark) {
        fill: #282828;
    }

    stroke-width: 2;
}

.__group {
    * {
        pointer-events: none;
    }
}`;

  var style = document.createElement('style');
  style.type = 'text/css';

// Add the CSS string to the style element
  style.textContent = lineChartStyles;

// Append the style element to the head of the document
  document.head.appendChild(style);
}