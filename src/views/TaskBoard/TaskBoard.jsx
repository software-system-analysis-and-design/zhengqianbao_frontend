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
import Questionnaire from "../Questionnaire/Questionnaire.jsx";

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

/*
任务预览字段：
{
  [
    taskName: "任务名"
    taskID: "任务ID"
    taskState: "进行中 / 待发布 / 已终止"
    taskType: "问卷"
    number: 100         // 任务要求个数 
    finishedNumber: 30 // 已完成的个数
    publishTime: ""    // 任务发布时间
    endTime: ""       // 任务截止时间
  ]
}
*/
function TaskBoard(props) {
  // eslint-disable-next-line react/prop-types
  const { classes, match, history } = props;

  // eslint-disable-next-line no-console
  // = 1 进入问卷  = 2 进入委托任务
  const [ToTask, setToTask] = useState(0); // 用于条件渲染，如果进入创建问卷页面，将不会显示三个按钮;
  const [taskID, setTaskID] = useState(""); // 用于接收来点击任务的taskID

  const createTask = "创建";
  const nullTaskID = "";
  const updateTask = "更新";

  // 用于与子组件进行通信，解析来自子组件的操作
  function transferMsg(msg) {
    // eslint-disable-next-line no-console
    console.log("transfer the msg: " + msg);
    if (msg === "2Q") {
      // 进入问卷编辑页面
      setToTask(1);
    } else if (msg === "2C") {
      // 进入委托任务页面
      setToTask(2);
    } else if (msg === "Return") {
      // 返回到主页面
      setToTask(0);
    } else if (msg.length === 14) {
      // 更新编辑问卷
      // 。。。。{`${match.path}/updatetask/Questionnaire`}
      let url = match.url + "/updatetask/Questionnaire";
      setTaskID(msg);
      history.push(url);  // 跳转到页面进行编辑
      setToTask(1);
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
      <Route
        exact
        path={`${match.path}`}
        component={() => <TaskList transferMsg={transferMsg} />}
      />
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
        path={`${match.path}/createtask/Questionnaire`}
        component={() => (
          <Questionnaire
            transferMsg={transferMsg}
            path={match.url}
            taskID={nullTaskID}
            state={createTask}
          />
        )}
      />
      <Route
        path={`${match.path}/updatetask/Questionnaire`}
        component={() => (
          <Questionnaire
            transferMsg={transferMsg}
            path={match.url}
            taskID={taskID}
            state={updateTask}
          />
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
