import React from "react";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";

class CreateTask extends React.Component {
  render() {
    return <Button>准备创建任务吧</Button>;
  }
}

CreateTask.propTypes = {
  classes: PropTypes.object.isRequired
};

export default CreateTask;
