import React, { Component, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Table from "./Table";
import Form from "./Form";
import CheckboxOptions from "./CheckboxOptions";

const tableHeadings = {
  Symbol: true,
  EVToEBITDA: true,
  TrailingPE: true,
  ForwardPE: true,
  PEGRatio: true,
  ReturnOnEquityTTM: true,
  RevenueTTM: true,
  BookValue: false,
  Beta: false,
};

//const Header = () => <h2>Stock Search</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const Configure = () => <h2>Configure</h2>;
const Landing = () => <h2>Welcome to Stock Search</h2>;

class App extends Component {
  state = {
    stocks: [],
    tableHeadings: tableHeadings,
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  removeStock = (index) => {
    const { stocks } = this.state;
    this.setState({
      //filter out (remove) given index and return new array
      stocks: stocks.filter((stock, i) => {
        return i !== index;
      }),
    });
  };

  updateHeadings = (heading, newCheckState) => {
    const { tableHeadings } = this.state;
    this.setState({
      //flip the state of the given heading (true to false, false to true)
      tableHeadings: { ...tableHeadings, [heading]: newCheckState },
    });
  };

  //function will be passed as a prop to the Form component
  handleTickerSubmit = async (stock) => {
    const apiBaseURL = "https://www.alphavantage.co/query?function=OVERVIEW";
    const apiKEY = "IJB337MGMJOWQIB0";
    const ticker = stock.ticker.toUpperCase();
    const endpoint = `${apiBaseURL}&symbol=${ticker}&apikey=${apiKEY}`;
    const result = await fetch(endpoint);
    const resultJSON = await result.json();
    //add to array of stocks which is stored in the app state
    this.setState({
      stocks: [...this.state.stocks, resultJSON],
    });
  };

  render() {
    const { stocks, tableHeadings } = this.state;
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/configure" component={Configure} />
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
        </BrowserRouter>
      </div>
    );
  }
}

//actions will be assigned as props to the App component
export default connect(null, actions)(App);
