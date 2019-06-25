import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { handleResponse } from "variables/serverFunc.jsx";
import { withStyles } from "@material-ui/core/styles";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import {Button, Typography} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Collapse from '@material-ui/core/Collapse';

const style = {
  container: {
    paddingLeft: 75,
    paddingRight: 75
  },
  nav: {
  },
  item: {
    padding: 15
  },
  button: {
    margin: 10
  },
  root: {
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    height: 60
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 35,
    margin: 4,
  },
};


function TaskArray(props) {
  if (!localStorage.getItem("user-token")) {
    props.history.push("/login");
  }
  const { classes, match } = props;

  const [tasks, setTasks] = useState([]);
  const [filtedTask, setFiltedTask] = useState([]);
  const [values, setValues] = useState({});
  const [checked, setChecked] = useState(false);

  React.useEffect(fetchTaskList, []);

  function fetchTaskList() {
    const apiUrl = "https://littlefish33.cn:8080/questionnaire/previews/valid";
    const requestOption = {
      method: "GET"
    };

    fetch(apiUrl, requestOption)
      .then(handleResponse)
      .then(response => {
        let ret = [];
        if (response !== null) {
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
        }
        setTasks(ret);
        setFiltedTask(ret);
      });
  }

  const createViews = elem => {
    return (
      <Grid className={classes.item} item xs={4}>
        <TaskCard
          title={elem.title}
          ownership={elem.ownership}
          details={elem.details}
          match={match}
        />
      </Grid>
    );
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const filterButtonClick = () => {
    let moneyParam = {
      min: parseInt(values.moneyMin),
      max: parseInt(values.moneyMax)
    }
    let temp = stateFilter(tasks, moneyFilter, moneyParam);

    let searchParam = {
      keyWord: values.search
    }
    temp = stateFilter(temp, searchFilter, searchParam);

    // let timeParam = {
    //   begin: values.beginTime,
    //   end: values.endTime
    // };
    // console.log("time filter");
    //temp = stateFilter(temp, timeFilter, timeParam);

    setFiltedTask(temp);
  }

  const stateFilter = (arr, func, param) => {
    console.log("state filter");
    let ret = [];
    for (let task of arr) {
      console.log(task);
      if (func(task, param)) ret.push(task);
    }
    return ret;
  };

  const searchFilter = (task, param) => {
    return (
      param.keyWord == null ||
      param.keyWord == "" ||
      task.title.indexOf(param.keyWord) !== -1
    );
  }

  const moneyFilter = (task, param) => {
    let money = parseInt(task.details.reward);
    return (
      (isNaN(param.min) || money >= param.min) &&
      (isNaN(param.max) || money <= param.max)
    );
  };

  // function stringToDate(time) {
  //   // 一个字符串  2019-06-12T12:00 转为 Date对象
  //   // let time = _time.toString();
  //   console.log("stringToDate");
  //   if (time.length !== 16) return null;
  //   console.log("stringToDate valid");
  //   let year = time.slice(0, 4);
  //   let month = time.slice(5, 7);
  //   let day = time.slice(8, 10);
  //   let min = time.slice(11, 13);
  //   let sec = time.slice(14, 16);
  //   let date = new Date(year, month - 1, day, min, sec);
  //   return date;
  // }
  // const timeFilter = (task, param) => {
  //   let taskBegin = stringToDate(task.details.startTime);
  //   let taskEnd = stringToDate(task.details.endTime);
  //   let paramBegin = stringToDate(param.begin);
  //   let paramEnd = stringToDate(param.end);
  //
  //   console.log(taskBegin);
  //   console.log(taskEnd);
  //   console.log(paramBegin);
  //   console.log(paramEnd);
  //   return (
  //     (paramBegin === null || taskBegin >= paramBegin) &&
  //     (paramEnd === null || (taskEnd !== null && taskEnd <= paramEnd))
  //   );
  // };

  return (
    <div>
      <Grid className={classes.nav} container spacing={2} justify={"center"}>
        <Grid className={classes.item} item xs={8}>
          <Paper className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="Menu" onClick={() => setChecked(prev => !prev)}>
              <MenuIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ "aria-label": "Search" }}
              value={values.search}
              onChange={handleChange("search")}
            />
            <Divider className={classes.divider} />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={filterButtonClick}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Collapse in={checked}>
        <Grid className={classes.nav} container spacing={2}>
          <Grid className={classes.item} item xs={3} />
          <Grid className={classes.item} item xs={2}>
            <TextField
              id="outlined-number"
              label="最小金额"
              value={values.moneyMin}
              onChange={handleChange("moneyMin")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid className={classes.item} item xs={2}>
            <TextField
              id="outlined-number"
              label="最大金额"
              value={values.moneyMax}
              onChange={handleChange("moneyMax")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Collapse>
      <Grid className={classes.container} container spacing={2}>
        {filtedTask.map(createViews)}
      </Grid>
    </div>
  );
}

export default withStyles(style)(TaskArray);
