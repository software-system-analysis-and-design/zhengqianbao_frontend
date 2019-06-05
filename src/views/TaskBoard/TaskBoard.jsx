import React from "react";
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
  console.log(props);
  return (
    <div>
      <Grid container spacing={2} className={classes.buttonWrapper}>
        <Grid item xs={4}>
          <Link to={`${match.url}/tasklist`}>
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
      <Route exact path={`${match.path}/tasklist`} component={TaskList} />
      <Route path={`${match.path}/createtask`} component={CreateTask} />
      <Route path={`${match.path}/recyclebin`} component={RecycleBin} />
    </div>
  );
}

TaskBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskBoard);
