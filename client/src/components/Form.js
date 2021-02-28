import React, { Component } from "react";
import { Button } from "@material-ui/core";

class Form extends Component {
  initialState = {
    ticker: "",
    other: "",
  };

  state = this.initialState;

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  submitTickerForm = () => {
    //this.state holds "ticker"
    this.props.handleSubmit(this.state);
    //reset form state to initial state to clear form
    this.setState(this.initialState);
  };

  render() {
    const { ticker, other } = this.state;
    return (
      <form style={{ width: "90%" }}>
        <label htmlFor="name">Ticker</label>
        <input
          type="text"
          name="ticker"
          id="ticker"
          value={ticker}
          onChange={this.handleChange}
          style={{ width: "100%" }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.submitTickerForm}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default Form;