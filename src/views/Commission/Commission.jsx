import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    margin: "10px auto"
  }
});

function Commission(props){
  const { classes, transferMsg } = props;

  useEffect(() => {
    return () => {
      transferMsg("Return");
    };
  });

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        创建委托任务
      </Typography>
    </div>
  )
}

Commission.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Commission);
