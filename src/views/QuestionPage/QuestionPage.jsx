import React from "react";

function QuestionPage(props) {
  const {classes, match} = props;

  return (
    <div>{match.params.taskID}</div>
  );
}

export default QuestionPage;
