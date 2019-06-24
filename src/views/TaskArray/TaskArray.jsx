import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { handleResponse } from "variables/serverFunc.jsx";
import { withStyles } from "@material-ui/core/styles";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import { Button } from "@material-ui/core";

const style = {
  container: {
    padding: 75
  },
  nav: {
    padding: 20
  },
  item: {
    padding: 15
  },
  button: {
    margin: 10
  }
}

function TaskArray(props) {
  const { classes, match } = props;

  const [tasks, setTasks] = useState([]);
  const [filtedTask, setFiltedTask] = useState([]);

  React.useEffect(fetchTaskList, []);

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
          ret.push({
            title: task.taskName,
            ownership: task.creator,
            details: details
          });
        }
        setTasks(ret);
      });
  }

  const createViews = elem => {
    return (
      <Grid className={classes.item} item xs={4}>
        <TaskCard title={elem.title} ownership={elem.ownership} details={elem.details} match={match}/>
      </Grid>
    );
  };

  const stateFilter = (tasks) => {

  };

  return (
    <div>
      <Grid className={classes.nav} container spacing={2}>
        <Grid className={classes.item} item xs={2}>
          <Button variant="contained" color="primary" className={classes.button}>
            筛选
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.container} container spacing={2}>
        {tasks.map(createViews)}
      </Grid>
    </div>
  );
}

export default withStyles(style)(TaskArray);