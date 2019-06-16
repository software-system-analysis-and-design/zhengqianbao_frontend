import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { handleResponse } from "variables/serverFunc.jsx";
import { withStyles } from "@material-ui/core/styles";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";

const style = {
  container: {
    padding: 75
  },
  item: {
    padding: 15
  }
}

function TaskArray(props) {
  const { classes, match } = props;

  const [tasks, setTasks] = useState([]);
  // 需要仅在更新或渲染时调用异步请求数据，使用useEffect会一直请求，不知为何
  const [test, setTest] = useState(fetchTaskList);

  function fetchTaskList() {
    const apiUrl = "https://littlefish33.cn:8080/questionnaire/previews";
    const requestOption = {
      method: "GET"
    };

    fetch(apiUrl, requestOption)
      .then(handleResponse)
      .then(response => {
        let ret = [];
        for (let i = 0; i < response.length; i++) {
          let task = response[i];
          let title = task.taskName;
          let ownership = task.creator;
          let details = {
            taskID: task.taskID,
            reward: task.money,
            missionType: task.taskType,
            finishedNumber: task.finishedNumber,
            totalNumber: task.number,
            startTime: task.publishTime,
            endTime: task.endTime,
            description: task.description
          };
          ret.push(
            <Grid className={classes.item} item xs={4}>
              <TaskCard title={title} ownership={ownership} details={details} match={match} />
            </Grid>
          );
        }
        setTasks(ret);
      });
  }
  return (
    <Grid className={classes.container} container spacing={2}>
      {tasks}
    </Grid>
  );
}

export default withStyles(style)(TaskArray);