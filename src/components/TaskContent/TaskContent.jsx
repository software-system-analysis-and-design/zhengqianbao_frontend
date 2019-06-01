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

const styles = theme => ({
  paper: {
    maxWidth: 820,
    margin: "auto",
    overflow: "hidden"
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
                  <DeleteOutlinedIcon color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={4} sm={1}>
              <Tooltip title="刷新">
                <IconButton>
                  <RefreshIcon color="inherit" />
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
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
