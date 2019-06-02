import React from "react";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";

class RecycleBin extends React.Component {
  render() {
    return <Button> 回收站 </Button>;
  }
}

RecycleBin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default RecycleBin;
