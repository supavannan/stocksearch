import React, { Component } from "react";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const TableHeader = (props) => {
  const headings = [];
  const { tableHeadings, headingsInfo } = props;

  for (let heading in tableHeadings) {
    if (tableHeadings[heading]) {
      if (headingsInfo[heading]) {
        headings.push(<th>{headingsInfo[heading].name}</th>);
      } else {
        headings.push(<th>{heading}</th>);
      }
    }
  }
  return (
    <thead style={{ wordWrap: "break-word" }}>
      <tr>
        {headings}
        <th>Remove</th>
        {/* <th>Row</th> */}
      </tr>
    </thead>
  );
};

const formatFigure = (figure) => {
  let newFigure = Number(figure);
  return newFigure / 2.0;
};

function convertToCurrencySystem(labelValue) {
  const sign = Math.sign(Number(labelValue));
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e12
    ? sign * (Math.abs(Number(labelValue)) / 1.0e12).toFixed(2) + "T"
    : Math.abs(Number(labelValue)) >= 1.0e9
    ? sign * (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? sign * (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? sign * (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : sign * Math.abs(Number(labelValue));
}

class TableRow extends Component {
  state = {
    stateData: {},
  };

  componentDidMount() {
    const { data } = this.props;
  }

  formatFigure(figure) {
    let newFigure = figure;
    return figure / 2.0;
  }

  render() {
    const {
      data,
      removeStock,
      index,
      tableHeadings,
      headingsInfo,
    } = this.props;
    const elements = [];
    for (let heading in tableHeadings) {
      if (tableHeadings[heading]) {
        if (headingsInfo[heading].viewing == "big") {
          //elements.push(<td>{formatFigure(Number(data[heading]))}</td>);
          elements.push(<td>{convertToCurrencySystem(data[heading])}</td>);
        } else if (headingsInfo[heading].viewing == "small") {
          //elements.push(<td>{formatFigure(Number(data[heading]))}</td>);
          elements.push(<td>{Number(data[heading]).toFixed(2)}</td>);
        } else {
          elements.push(<td>{data[heading]}</td>);
        }
      }
    }
    return (
      <tr key={index}>
        {elements}
        <td>
          <IconButton aria-label="delete" onClick={() => removeStock(index)}>
            <DeleteIcon />
          </IconButton>
        </td>
        {/* <td>{index}</td> */}
      </tr>
    );
  }
}

const TableBody = (props) => {
  const { stockData, removeStock, tableHeadings, headingsInfo } = props;
  const rows = stockData.map((data, index) => {
    return (
      <TableRow
        index={index}
        data={data}
        removeStock={removeStock}
        tableHeadings={tableHeadings}
        headingsInfo={headingsInfo}
      />
    );
  });
  return <tbody>{rows}</tbody>;
};

class Table extends Component {
  render() {
    //passed from App component
    const { stockData, removeStock, tableHeadings, headingsInfo } = this.props;

    return (
      <table>
        <TableHeader
          tableHeadings={tableHeadings}
          headingsInfo={headingsInfo}
        />
        <TableBody
          stockData={stockData}
          removeStock={removeStock}
          tableHeadings={tableHeadings}
          headingsInfo={headingsInfo}
        />
      </table>
    );
  }
}

export default Table;
