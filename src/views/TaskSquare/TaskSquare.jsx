import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import QuestionPage from "../QuestionPage/QuestionPage.jsx";
import TaskArray from "../TaskArray/TaskArray.jsx";

// 任务广场界面，作为主界面，主要展示一些发布的任务，目前仅考虑支持问卷。

function TaskSquare(props) {
  const { match } = props;

  return (
    <div>
      <Route
        exact
        path={match.path}
        component={() => <TaskArray match={match} />}
      />
      <Route path={match.path + "/" + ":taskID"} component={QuestionPage} />
    </div>
  );
}

export default TaskSquare;
