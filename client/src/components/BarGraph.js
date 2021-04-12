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

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect(props) {
  const { updateMetric, selectedMetric, tableHeadings, headingsInfo } = props;
  const classes = useStyles();
  //const [metric, setMetric] = React.useState("");

  const handleChange = (event) => {
    //setMetric(event.target.value);
    updateMetric(event.target.value);
  };

  const dropdownOptions = [];
  for (let heading in tableHeadings) {
    if (tableHeadings[heading]) {
      if (headingsInfo[heading].name !== "Symbol") {
        dropdownOptions.push(
          <MenuItem value={heading}>{headingsInfo[heading].name}</MenuItem>
        );
        console.log(tableHeadings[heading]);
      }
    }
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Metric</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedMetric}
          onChange={handleChange}
          label="Metric"
        >
          {dropdownOptions}
        </Select>
        <FormHelperText>Select a Metric to graph</FormHelperText>
      </FormControl>
    </div>
  );
}

export default class BarGraph extends React.Component {
  state = {
    useCanvas: false,
    selectedMetric: "MarketCapitalization",
  };

  updateMetric = (metric) => {
    const { selectedMetric } = this.state;
    this.setState({
      selectedMetric: metric,
    });
  };

  render() {
    const { stockData, tableHeadings, headingsInfo } = this.props;
    const { useCanvas, selectedMetric } = this.state;
    const content = useCanvas ? "TOGGLE TO SVG" : "TOGGLE TO CANVAS";
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    const graphData = [];
    let tempElement = 0;
    stockData.forEach((element, index) => {
      tempElement = isNaN(element[selectedMetric])
        ? 0
        : element[selectedMetric];
      graphData.push({
        x: element["Symbol"],
        y: Number(tempElement),
      });
    });

    if (stockData.length > 1) {
      return (
        <div>
          {/* <ShowcaseButton
          onClick={() => this.setState({ useCanvas: !useCanvas })}
          buttonContent={content}
        /> */}
          <SimpleSelect
            updateMetric={this.updateMetric}
            selectedMetric={selectedMetric}
            tableHeadings={tableHeadings}
            headingsInfo={headingsInfo}
          />
          <br />
          <h2 style={{ textAlignVertical: "center", textAlign: "center" }}>
            {headingsInfo[selectedMetric].name}
          </h2>
          <FlexibleWidthXYPlot
            xType="ordinal"
            height={300}
            // width={300}
            // xDistance={1000000}
            // yDomain={[0, 2000000000]}
            margin={{ left: 150 }}
            padding={{ left: 300 }}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <BarSeries
              className="vertical-bar-series-example"
              data={graphData}
            />
            {/* <BarSeries data={blueData} /> */}
            {/* <LabelSeries data={labelData} getLabel={(d) => d.x} /> */}
          </FlexibleWidthXYPlot>
        </div>
      );
    } else {
      return <div>Add at least 2 stocks to display a graph</div>;
    }
  }
}
