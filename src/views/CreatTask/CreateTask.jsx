import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    margin: "auto"
  },
  paper: {
    height: 90,
    width: 240,
    margin: "120px auto",
    padding: "1rem"
  },
  text: {
    margin: "2px"
  },
  button: {
    align: "center"
  }
});

function CreateTask(props) {
  if (!localStorage.getItem("user-token")) {
    props.history.push("/login");
  }
  const { classes, transferMsg, path, display } = props;

  const toQuestionnairePath = path + "/createTask/Questionnaire";
  const toCommissionPath = path + "/createTask/commission";

  const jumpToQ = async () => {
    transferMsg("2Q");
  };

  const jumpToC = async () => {
    transferMsg("2C");
  };

  return (
    <div>
      {display && (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                  <Typography
                    variant="h5"
                    display="block"
                    gutterBottom
                    align="center"
                  >
                    创建问卷任务
                  </Typography>
                  <div align="center">
                    <Link to={toQuestionnairePath}>
                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.className}
                        onClick={() => {
                          jumpToQ();
                        }}
                      >
                        开始
                      </Button>
                    </Link>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                  <Typography
                    variant="h5"
                    display="block"
                    gutterBottom
                    align="center"
                  >
                    创建委托任务
                  </Typography>
                  <div align="center">
                    <Link to={toCommissionPath}>
                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.className}
                        onClick={jumpToC}
                      >
                        开始
                      </Button>
                    </Link>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

CreateTask.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateTask);
