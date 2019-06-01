import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// components
import TaskContent from "components/TaskContent/TaskContent";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const styles = {
  contentWrapper: {
    top: "2rem"
  }
};

class TaskBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    var taskItem = [];
    for (var i = 0; i < 3; i++) {
      taskItem.push(
        <TaskContent
          taskName="任务名"
          taskState="进行中"
          taskType="问卷"
          taskReward="100"
          taskStartTime="06-01"
          taskEndTime="06-02"
          taskSpentTime="14min"
          numOfFinishedTasks="12"
          numOfAllTasks="300"
          className={classes.contentWrapper}
        />
      );
    }
    return (
      <div>
        <Button variant="contained" color="primary">
          <AddIcon /> 创建任务
        </Button>
        <div>{taskItem}</div>
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskBoard);
