import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Route, Link } from "react-router-dom";
import QuestionPage from "../../views/QuestionPage/QuestionPage.jsx";

const styles = {
  card: {
    marginTop: 5,
    marginBottom: 5
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 24
  },
  details: {
    marginTop: 30
  },
  description: {
    marginTop: 20
  },
  button: {
    margin: 5
  }
};

function TaskCard(props) {
  const {classes, title, ownership, details, match} = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">
          发布者：{ownership}
        </Typography>
        <Typography className={classes.details} variant="body2" component="p">
          报酬：{details.reward} 金币/人 <br />
          类型：{details.missionType} <br />
          发布时间：{details.startTime} <br />
          终止时间：{details.endTime} <br />
          完成情况：{details.finishedNumber} / {details.totalNumber}
        </Typography>
        <Typography className={classes.description}>
          描述：{details.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={match.url + "/" + details.taskID}>
          <Button className={classes.button} variant="contained" size="small" color={"primary"}>START</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(TaskCard);
