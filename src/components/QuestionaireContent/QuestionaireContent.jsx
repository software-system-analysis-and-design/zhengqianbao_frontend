import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


const style = theme => ({
  paper: {
    margin: "auto",
    maxWidth: "760px",
    padding: "20px"
  }
});

function QuestionaireContent(props) {
  const { classes, title, description } = props;


  return (
    <Paper className={classes.paper}>
      {!title && (
        <Typography variant="h5" gutterBottom align="center">
          这里呈现问卷内容
        </Typography>
      )}
      <Typography variant="h5" gutterBottom align="center">
        {title}
      </Typography>
      <Typography gutterBottom>{description}</Typography>
      {}
      <Typography gutterBottom align="center">
        --------------------------------------------------------------------------------------------------------------------------------------------------------------------
      </Typography>
      <Grid container align="center">
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="secondary">
            添加问答题
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="secondary">
            添加单选题
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" color="secondary">
            添加多选题
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

QuestionaireContent.prototype = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(QuestionaireContent);
