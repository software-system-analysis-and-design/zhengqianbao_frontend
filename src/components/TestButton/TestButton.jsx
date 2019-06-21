import React from "react";
import Button from "@material-ui/core/Button";

function TestButton(props) {
  const { callback } = props;

  return (
    <Button variant="contained" color="secondary" onClick={() => callback()} >取消</Button>
  );
}

export default TestButton;