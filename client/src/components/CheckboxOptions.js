import React, { Component } from "react";
import { Button } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CustomCheckbox = (props) => {
  const headings = [];
  const { tableHeadings, updateHeadings, name } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={tableHeadings[name]}
          onChange={() => updateHeadings(name, !tableHeadings[name])}
          name={name}
        />
      }
      label={name}
    />
  );
};

class CheckboxOptions extends Component {
  render() {
    const { tableHeadings, updateHeadings } = this.props;
    const checkboxes = [];
    for (let heading in tableHeadings) {
      checkboxes.push(
        <CustomCheckbox
          tableHeadings={tableHeadings}
          updateHeadings={updateHeadings}
          name={heading}
        />
      );
    }
    return <FormGroup row>{checkboxes}</FormGroup>;
  }
}

export default CheckboxOptions;
