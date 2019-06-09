import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import QuestionaireContent from "components/QuestionaireContent/QuestionaireContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    margin: "2px auto",
    maxWidth: "1300px",
    padding: "0px"
  },
  grid: {
    margin: "20px 0px 0px 0px"
  },
  container: {
    margin: "10px 0px 20px"
  },
  button: {
    margin: "10px 0 0 85%"
  }
});

function Questionaire(props) {
  const { classes, transferMsg, path } = props;

  const [values, setValues] = React.useState({
    title: "",
    description: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    transferMsg("2Q"); // 进入问卷组件
    return () => {
      transferMsg("Return"); // 离开问卷组件
    };
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" gutterBottom>
            创建问卷任务
          </Typography>
          <TextField
            label="问卷名称"
            type="search"
            value={values.title}
            onChange={handleChange("title")}
            fullWidth="true"
            placeholder="设置简洁准确的问卷名称哦"
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="问卷描述"
            type="search"
            fullWidth="true"
            placeholder="写下你清晰准确的描述吧"
            onChange={handleChange("description")}
            value={values.description}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="金币/次"
            type="number"
            className={classes.textField}
            placeholder="合理设置报酬哦！"
            fullWidth="true"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            label="问卷份数"
            type="number"
            className={classes.textField}
            placeholder="设置问卷份数，否则默认份数不限！"
            fullWidth="true"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="设置问卷发布时间"
              type="datetime-local"
              fullWidth="true"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="设置问卷截止时间"
              type="datetime-local"
              fullWidth="true"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <Link to={path}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              创建
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={8}>
          <QuestionaireContent
            title={values.title}
            description={values.description}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Questionaire.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Questionaire);
