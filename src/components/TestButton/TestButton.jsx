import React from "react";
import Button from "@material-ui/core/Button";

function TestButton(props) {
  const { callback, step } = props;

  console.log("re-render TestButton");
  const handleClick = (event) => {
    callback(step);
  }

  return (
    <Button variant="contained" color="secondary" onClick={handleClick} >TEST</Button>
  );
}

export default TestButton;