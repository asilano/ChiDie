import Colours from "./Colours";

export default ChartTheme = {
  bar: {
    style: {
      data: {
        fill: Colours.chart,
        strokeWidth: 0
      },
      labels: {
        fill: Colours.chart,
        padding: 10
      }
    }
  },
  axis: {
    style: {
      axis: {
        fill: "transparent",
        stroke: Colours.chart,
        strokeWidth: 1
      },
      ticks: {
        fill: Colours.chart,
        size: 5,
        stroke: Colours.chart
      },
      tickLabels: {
        angle: -45,
        fill: Colours.chart,
        padding: 10,
        textAnchor: "end"
      }
    }
  },
}
