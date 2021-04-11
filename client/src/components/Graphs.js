import React, { Component } from "react";
//import ShowcaseButton from "../showcase-components/showcase-button";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries,
  FlexibleWidthXYPlot,
  ChartLabel,
} from "react-vis";

export default class Graphs extends React.Component {
  state = {
    useCanvas: false,
  };

  render() {
    const { stockData, tableHeadings } = this.props;
    const { useCanvas } = this.state;
    const content = useCanvas ? "TOGGLE TO SVG" : "TOGGLE TO CANVAS";
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    //console.log(stockData);
    const heading = tableHeadings[2];
    const graphData = [];
    stockData.forEach((element, index) => {
      graphData.push({ x: element["Symbol"], y: element["EVToEBITDA"] });
    });
    console.log(graphData);
    const labelData = graphData.map((d, idx) => ({
      x: d.x,
      y: Math.max(graphData[idx].y, graphData[idx].y),
    }));

    return (
      <div>
        {/* <ShowcaseButton
          onClick={() => this.setState({ useCanvas: !useCanvas })}
          buttonContent={content}
        /> */}
        <FlexibleWidthXYPlot
          xType="ordinal"
          //   width={300}
          height={300}
          xDistance={1000000}
          yDomain={[0, 200]}
          margin={{ left: 100 }}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <ChartLabel
            text="EVToEBITDA"
            className="alt-y-label"
            includeMargin={true}
            xPercent={0.02}
            yPercent={0.02}
            style={{
              transform: "rotate(-90)",
              textAnchor: "end",
            }}
          />
          <BarSeries className="vertical-bar-series-example" data={graphData} />
          {/* <BarSeries data={blueData} /> */}
          {/* <LabelSeries data={labelData} getLabel={(d) => d.x} /> */}
          <LabelSeries data={labelData} />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
