import React, { Component } from "react";
import { Button } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CustomCheckbox = (props) => {
  const { tableHeadings, updateHeadings, name, headingsInfo } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={tableHeadings[name]}
          onChange={() => updateHeadings(name, !tableHeadings[name])}
          name={name}
          color="primary"
        />
      }
      label={headingsInfo[name].name}
    />
  );
};

class CheckboxOptions extends Component {
  render() {
    const { tableHeadings, updateHeadings, headingsInfo } = this.props;
    const checkboxes = [];
    for (let heading in tableHeadings) {
      //don't add a checkbox for ticker Symbol
      if (heading !== "Symbol") {
        checkboxes.push(
          <CustomCheckbox
            tableHeadings={tableHeadings}
            updateHeadings={updateHeadings}
            headingsInfo={headingsInfo}
            name={heading}
          />
        );
      }
    }
    return <FormGroup row>{checkboxes}</FormGroup>;
  }
}

export default CheckboxOptions;
