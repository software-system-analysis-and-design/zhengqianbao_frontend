import React from "react";
import PropTypes from "prop-types";
import TaskContent from "../../components/TaskContent/TaskContent.jsx";

function TaskList(props) {
  return (
    <TaskContent
      taskName="任务示例"
      taskState="进行中"
      taskType="问卷"
      taskReward="100"
      taskStartTime="2019-06-01"
      taskEndTime="2019-06-02"
      taskSpentTime="14min"
      numOfFinishedTasks="12"
      numOfAllTasks="300"
    />
  );
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default TaskList;
