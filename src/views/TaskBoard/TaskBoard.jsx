import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
// components
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import SubjectIcon from "@material-ui/icons/Subject";
// papges
import CreateTask from "../CreatTask/CreateTask";
import TaskList from "../TaskList/TaskList";
import RecycleBin from "../RecycleBin/RecycleBin";
import Commission from "../Commission/Commission.jsx";
import Questionaire from "../Questionaire/Questionaire.jsx";

const styles = {
  contentWrapper: {
    top: "1rem"
  },
  buttonWrapper: {
    maxWidth: 400,
    margin: "auto",
    overflow: "hidden"
  }
};

function TaskBoard(props) {
  // eslint-disable-next-line react/prop-types
  const { classes, match } = props;
  // eslint-disable-next-line no-console
  // = 1 进入问卷  = 2 进入委托任务
  const [ToTask, setToTask] = useState(0); // 用于条件渲染，如果进入创建问卷页面，将不会显示三个按钮;

  // 用于与子组件进行通信，解析来自子组件的操作
  function transferMsg(msg) {
    // eslint-disable-next-line no-console
    // console.log("transfer the msg: " + msg);
    if (msg === "2Q") {
      setToTask(1);
    } else if (msg === "2C") {
      setToTask(2);
    } else if (msg === "Return") {
      setToTask(0);
    }
  }

  return (
    <div>
      {ToTask === 0 && (
        <div>
          <Grid container className={classes.buttonWrapper}>
            <Grid item xs={4}>
              <Link to={`${match.url}`}>
                <Button variant="contained" color="primary">
                  <SubjectIcon />
                  任务列表
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link to={`${match.url}/createtask`}>
                <Button variant="contained" color="primary">
                  <AddIcon /> 创建任务
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link to={`${match.url}/recyclebin`}>
                <Button variant="contained" color="primary">
                  <DeleteTwoToneIcon />
                  进入回收站
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      )}
      <Route exact path={`${match.path}`} component={TaskList} />
      <Route
        path={`${match.path}/createtask`}
        component={() => (
          <CreateTask
            transferMsg={transferMsg}
            path={match.url}
            display={ToTask === 0}
          />
        )}
      />
      <Route path={`${match.path}/recyclebin`} component={RecycleBin} />
      <Route
        path={`${match.path}/createtask/questionaire`}
        component={() => (
          <Questionaire transferMsg={transferMsg} path={match.url} />
        )}
      />
      <Route
        path={`${match.path}/createtask/commission`}
        component={() => (
          <Commission transferMsg={transferMsg} path={match.url} />
        )}
      />
    </div>
  );
}

TaskBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskBoard);
