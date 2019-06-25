import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    margin: "auto",
    maxWidth: "900px",
    padding: "20px",
    overflow: "hidden"
  },
  task: {
    margin: "30px 20px"
  },
  button: {
    margin: "15px 0 0 92%"
  }
});

/*
 委托字段设计：
{
  taskName: "任务名"
  money: 100  // 任务报酬
  number: 100 // 任务次数
  tasKDescription: "任务描述"  // 任务描述
}
*/

function Commission(props) {
  if(!localStorage.getItem('user-token')){
    props.history.push('/login');
  }
  const { classes, transferMsg, path } = props;

  useEffect(() => {
    transferMsg("2C");
    return () => {
      transferMsg("Return");
    };
  }, []);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" gutterBottom align="center">
          创建委托任务
        </Typography>
        <Grid container className={classes.grid}>
          <Grid xs={12} sm={2}>
            <div className={classes.task}>
              <Typography className={classes.task}>任务名：</Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={10} className={classes.grid}>
            <TextField
              id="outlined-bare"
              className={classes.textField}
              margin="normal"
              label="名称"
              placeholder="起个简洁的任务名吧~"
              fullWidth="true"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid xs={12} sm={2}>
            <div className={classes.task}>
              <Typography className={classes.task}>任务报酬：</Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={10}>
            <TextField
              id="outlined-number"
              label="金币/次"
              type="number"
              className={classes.textField}
              placeholder="合理设置报酬哦！"
              fullWidth="true"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid xs={12} sm={2}>
            <div className={classes.task}>
              <Typography className={classes.task}>任务次数：</Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={10}>
            <TextField
              id="outlined-number"
              label="次数"
              type="number"
              placeholder="按需确定次数哦~"
              fullWidth="true"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid xs={12} sm={2}>
            <div className={classes.task}>
              <Typography className={classes.task}>任务描述：</Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={10}>
            <TextField
              id="outlined-multiline-static"
              label="描述"
              multiline
              rows="6"
              defaultValue=""
              className={classes.textField}
              fullWidth="true"
              margin="normal"
              variant="outlined"
              placeholder="留下你的任务描述"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
        <Link to={path}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            创建
          </Button>
        </Link>
      </Paper>
    </div>
  );
}

Commission.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Commission);
