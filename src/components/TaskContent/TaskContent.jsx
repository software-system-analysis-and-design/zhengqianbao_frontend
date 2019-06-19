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

import { handleResponse } from "variables/serverFunc.jsx";

const apiUrl = "https://littlefish33.cn:8080";

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

function Content(props) {
  // 使用use state 声明全局变量
  const [open_delete, setOpen_delete] = React.useState(false);
  const [open_refresh, setOpen_refresh] = React.useState(false);
  const [open_stop, setOpen_stop] = React.useState(false);

  const {
    classes,
    taskName,
    taskState,
    taskID,
    taskType,
    money,
    publishTime,
    endTime,
    finishedNumber,
    number
  } = props;

  const [taskButtonState, setTaskButtonState] = React.useState("");

  // 点击删除图标按钮，弹出对话框
  function handleClickOpen_delete() {
    setOpen_delete(true);
  }

  // 点击否，关闭对话框
  function handleClose_delete() {
    setOpen_delete(false);
  }

  // 移入回收站
  function deleteToTrash() {
    setOpen_delete(false);
    let data = new FormData();
    data.append("id", taskID);
    data.append("inTrash", 0);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token")
      },
      body: data
    };
    fetch(apiUrl + "/questionaire/trash", requestOptions)
      .then(handleResponse)
      .then(response => {
        console.log(response);
      });
    handleClose_delete(); // 关闭对话框
  }

  // 点击任务，开始启动任务
  function handleClickOpen_refresh() {
    setOpen_refresh(true);
  }

  // 点击按钮，关闭启动对话框
  function handleClose_refresh() {
    setOpen_refresh(false);
  }

  // 终止任务，弹出对话框
  function handleClickOpen_stop() {
    setOpen_stop(true);
  }

  // 关闭弹出对话框
  function handleClose_stop() {
    setOpen_stop(false);
  }

  // 点击编辑任务
  function editTask() {
    // 点击按钮编辑任务，首先必须进行页面跳转，然后获取数据，并填充
  }

  React.useEffect(() => {
    if (taskState === "进行中") {
      setTaskButtonState("终止任务");
    }
    if (taskState === "待发布" || taskState === "已终止") {
      setTaskButtonState("发布任务");
    }
  });

  return (
    <div>
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
                    <EditIcon color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={4} sm={1}>
                <Tooltip title="预览">
                  <IconButton>
                    <DetailsIcon color="inherit" />
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
              <Grid item xs={4} sm={1}>
                <Tooltip title="启动任务">
                  <IconButton>
                    <RefreshIcon
                      color="inherit"
                      onClick={handleClickOpen_refresh}
                    />
                    <Typography variant="subtitle1" />
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
                onClick={handleClickOpen_stop}
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
          open={open_refresh}
          onClose={handleClose_refresh}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              任务已启动
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_refresh} color="primary">
              确定
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open_stop}
          onClose={handleClose_stop}
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
            <Button onClick={handleClose_stop} color="primary">
              嗯嗯
            </Button>
            <Button onClick={handleClose_stop} color="primary" autoFocus>
              容我三思
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
