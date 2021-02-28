import React, { Component, useState } from "react";
import Table from "./Table";
import Form from "./Form";
import CheckboxOptions from "./CheckboxOptions";

const tableHeadings = {
  Symbol: true,
  EVToEBITDA: true,
  TrailingPE: true,
  ForwardPE: true,
  ReturnOnEquityTTM: true,
  RevenueTTM: true,
  BookValue: false,
  Beta: false,
};

class App extends Component {
  state = {
    stocks: [],
    tableHeadings: tableHeadings,
  };

  removeStock = (index) => {
    const { stocks } = this.state;
    console.log(index);
    console.log(stocks);
    this.setState({
      //filter out the given index and return new array
      stocks: stocks.filter((stock, i) => {
        return i !== index;
      }),
    });
    //console.log(stocks);
  };

  updateHeadings = (heading, newCheckState) => {
    const { tableHeadings } = this.state;
    this.setState({
      //flip the state of the given heading (true to false, false to true)
      tableHeadings: { ...tableHeadings, [heading]: newCheckState },
    });
  };

  //   xhandleTickerSubmit = (stock) => {
  //     fetch(endpoint)
  //       .then((result) => result.json())
  //       .then((result) => {
  //         this.setState({
  //           stocks: [...this.state.stocks, result],
  //         });
  //       });
  //   };

  //function will be passed as a prop to the Form component
  handleTickerSubmit = async (stock) => {
    const apiURL = "https://www.alphavantage.co/query?function=OVERVIEW";
    const apiKEY = "IJB337MGMJOWQIB0";
    const ticker = stock.ticker.toUpperCase();
    let endpoint = apiURL + "&symbol=" + ticker + "&apikey=" + apiKEY;
    //fetch and add to list of stocks held in app state
    const result = await fetch(endpoint);
    const resultJSON = await result.json();
    //add to array of stocks
    this.setState({
      stocks: [...this.state.stocks, resultJSON],
    });
  };

  render() {
    const { stocks, tableHeadings } = this.state;
    return (
      <div className="container">
        <Table
          stockData={stocks}
          removeStock={this.removeStock}
          tableHeadings={tableHeadings}
        />
        <Form handleSubmit={this.handleTickerSubmit} />
        <CheckboxOptions
          tableHeadings={tableHeadings}
          updateHeadings={this.updateHeadings}
        />
      </div>
    );
  }
}

export default App;
