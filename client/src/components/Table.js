import React, { Component } from "react";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const headingsInfo = {
  Symbol: { name: "Ticker", viewing: true },
  EVToEBITDA: { name: "EV / EBITDA", viewing: true },
  TrailingPE: { name: "Trailing PE", viewing: true },
  ForwardPE: { name: "Forward PE", viewing: true },
  ReturnOnEquityTTM: { name: "ROE (TTM)", viewing: true },
  RevenueTTM: { name: "Revenue (TTM)", viewing: true },
  BookValue: { name: "Book Value", viewing: true },
  Beta: { name: "Beta", viewing: true },
};

const TableHeader = (props) => {
  const headings = [];
  const { tableHeadings } = props;

  for (let heading in tableHeadings) {
    if (tableHeadings[heading]) {
      headings.push(<th>{headingsInfo[heading].name}</th>);
    }
  }
  return (
    <thead style={{ wordWrap: "break-word" }}>
      <tr>
        {headings}
        <th>Remove</th>
        <th>Row</th>
      </tr>
    </thead>
  );
};

class TableRow extends Component {
  state = {
    stateData: {},
  };

  componentDidMount() {
    const { data } = this.props;
  }

  render() {
    const { data, removeStock, index, tableHeadings } = this.props;
    const elements = [];
    for (let heading in tableHeadings) {
      if (tableHeadings[heading]) {
        elements.push(<td>{data[heading]}</td>);
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
        <td>{index}</td>
      </tr>
    );
  }
}

const TableBody = (props) => {
  const { stockData, removeStock, tableHeadings } = props;
  const rows = stockData.map((data, index) => {
    return (
      <TableRow
        index={index}
        data={data}
        removeStock={removeStock}
        tableHeadings={tableHeadings}
      />
    );
  });
  return <tbody>{rows}</tbody>;
};

class Table extends Component {
  render() {
    //passed from App component
    const { stockData, removeStock, tableHeadings } = this.props;

    return (
      <table>
        <TableHeader tableHeadings={tableHeadings} />
        <TableBody
          stockData={stockData}
          removeStock={removeStock}
          tableHeadings={tableHeadings}
        />
      </table>
    );
  }
}

export default Table;
