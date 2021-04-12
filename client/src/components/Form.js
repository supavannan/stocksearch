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

  submitTickerForm = (e) => {
    //this.state holds "ticker"
    //handleSubmit refers to the handleTickerSubmit function passed by "App"
    this.props.handleSubmit(this.state);
    //reset form state to initial state to clear form
    this.setState(this.initialState);
    e.preventDefault();
  };

  render() {
    const { ticker, other } = this.state;
    return (
      <form style={{ width: "100%" }} onSubmit={this.submitTickerForm}>
        <label htmlFor="ticker">Ticker</label>
        <input
          type="text"
          name="ticker"
          id="ticker"
          value={ticker}
          onChange={this.handleChange}
          style={{ width: "50%" }}
          style={{ boxShadow: "0px 0px 2px 1px" }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.submitTickerForm}
          style={{ background: "#0d824b" }}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default Form;
