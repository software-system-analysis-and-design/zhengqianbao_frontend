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
  }
});

function Content(props) {
  // 使用use state 声明全局变量
  const [open_delete, setOpen_delete] = React.useState(false);
  const [open_refresh, setOpen_refresh] = React.useState(false);

  function handleClickOpen_delete() {
    setOpen_delete(true);
  }
  function handleClose_delete() {
    setOpen_delete(false);
  }

  function handleClickOpen_refresh() {
    setOpen_refresh(true);
  }
  function handleClose_refresh() {
    setOpen_refresh(false);
  }

  const {
    classes,
    taskName,
    taskState,
    taskType,
    taskReward,
    taskStartTime,
    taskEndTime,
    taskSpentTime,
    numOfFinishedTasks,
    numOfAllTasks
  } = props;

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
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h5" display="block" gutterBottom>
                  {taskName}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {taskState}
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
                <Tooltip title="刷新">
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
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                类型：{taskType}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                报酬：{taskReward} 金币/个
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                任务时间：from {taskStartTime} to {taskEndTime}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" gutterBottom>
                预计花费时间：{taskSpentTime}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                完成个数：{numOfFinishedTasks}/{numOfAllTasks}
              </Typography>
              <Button variant="contained" color="secondary">
                下载任务数据
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
            <Button onClick={handleClose_delete} color="primary">
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
              任务数据已刷新
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_refresh} color="primary">
              确定
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
