/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";
import DetailsIcon from "@material-ui/icons/Details";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  paper: {
    maxWidth: 1000,
    margin: "auto",
    overflow: "hidden",
    marginTop: "1rem"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  contentWrapper: {
    margin: "10px 20px"
  },
  iconWrapper: {
    marginRight: "2px"
  },
  button: {
    margin: "0px 8px"
  }
});

function stringToDate(time) {
  // 一个字符串  2019-06-12T12:00 转为 Date对象
  // let time = _time.toString();
  let year = time.slice(0, 4);
  let month = time.slice(5, 7);
  let day = time.slice(8, 10);
  let min = time.slice(11, 13);
  let sec = time.slice(14, 16);
  let date = new Date(year, month - 1, day, min, sec);
  return date;
}

function Content(props) {
  // 使用use state 声明全局变量
  const [open_delete, setOpen_delete] = React.useState(false);
  // const [open_refresh, setOpen_refresh] = React.useState(false);
  const [open_stop, setOpen_stop] = React.useState(false);
  // 确定是否显示组件，主要用于删除组件时，隐藏
  const [show, setShow] = React.useState("not null");

  const {
    classes,
    taskName,
    taskID,
    taskType,
    money,
    publishTime,
    endTime,
    finishedNumber,
    number,
    transferMsg,
    removeTask,
    modifyTaskState
  } = props;

  const [taskState, setTaskState] = React.useState("进行中"); 
  const [taskButtonState, setTaskButtonState] = React.useState("");

  // 点击删除图标按钮，弹出对话框
  function handleClickOpen_delete() {
    setOpen_delete(true);
  }

  // 点击否，关闭删除对话框
  function handleClose_delete() {
    setOpen_delete(false);
  }

  // 移入回收站
  function deleteToTrash() {
    setOpen_delete(false);
    removeTask(taskID);
    handleClose_delete(); // 关闭对话框
    setShow(null); // 不显示该组件
  }

  // 点击终止或者发布任务按钮，弹出对话框
  function handleTask() {
    setOpen_stop(true);
  }

  // 确定终止或者发布任务按钮，修改任务状态，并关闭对话框。
  function handleTask_modify() {
    let state = "";
    if (taskButtonState === "发布任务") {
      state = "publish";
    } else if (taskButtonState === "终止任务") {
      state = "stop";
    } else if (taskButtonState === "重启任务") {
      state = "restart";
    }
    // TODO  根据时间判断任务状态，修改按钮的显示字样
    modifyTaskState(taskID, state);
    setOpen_stop(false);
  }

  // 取消终止或发布的选择，关闭弹出对话框
  function handleTask_stop() {
    setOpen_stop(false);
  }

  // 点击编辑任务
  function editTask() {
    // 点击按钮编辑任务，传递给父组件点击的任务ID
    transferMsg(taskID);
  }

  React.useEffect(() => {
    let publishDate = stringToDate(publishTime);
    let endDate = stringToDate(endTime);
    let currentDate = new Date();
    if (publishDate > currentDate) {
      setTaskState("待发布");
      setTaskButtonState("发布任务");
    } else if (publishDate <= currentDate && endDate > currentDate) {
      setTaskState("进行中");
      setTaskButtonState("终止任务");
    } else if (endDate < currentDate) {
      setTaskState("已终止");
      setTaskButtonState("重启任务");
    }
  });

  return (
    <div>
      {show !== null ? (
        <Paper className={classes.paper}>
          <AppBar
            className={classes.searchBar}
            position="static"
            color="default"
            elevation={0}
          >
            <Toolbar>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="h5" display="block" gutterBottom>
                    {taskName}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    任务ID: {taskID} | 状态：{taskState}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={1}>
                  <Tooltip title="编辑">
                    <IconButton>
                      <EditIcon color="inherit" onClick={editTask} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={4} sm={1}>
                  <Tooltip title="删除">
                    <IconButton>
                      <DeleteOutlinedIcon
                        color="inherit"
                        onClick={handleClickOpen_delete}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="subtitle1" gutterBottom>
                  类型：{taskType}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  报酬：{money} 金币/个
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  完成个数：{finishedNumber}/{number}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" gutterBottom>
                  任务发布时间：{publishTime}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  任务截止时间：{endTime}
                </Typography>
                <Button variant="contained" color="secondary">
                  下载任务数据
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleTask}
                >
                  {taskButtonState}
                </Button>
              </Grid>
            </Grid>
          </div>
          <Dialog
            open={open_delete}
            onClose={handleClose_delete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"确定要删除该任务吗？"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                删除该任务后，会临时存放在回收站中。
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={deleteToTrash} color="primary">
                是
              </Button>
              <Button onClick={handleClose_delete} color="primary" autoFocus>
                否
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open_stop}
            onClose={handleTask_stop}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`确定要 ${taskButtonState} 吗？`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                你想好了没？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTask_modify} color="primary">
                嗯嗯
              </Button>
              <Button onClick={handleTask_stop} color="primary" autoFocus>
                容我三思
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      ) : null}
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
