import React from "react";
import { handleResponse, parseParams } from "variables/serverFunc.jsx";
import Typography from "@material-ui/core/Typography";
import SingleChoiceCard from "../../components/SingleChoiceCard/SingleChoiceCard";
import MultiChoiceCard from "../../components/MultiChoiceCard/MultiChoiceCard";
import ShortAnswerCard from "../../components/ShortAnswerCard/ShortAnswerCard";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles } from "@material-ui/core/styles";

const style = {
  title: {
    fontSize: 24
  },
  button: {
    margin: 10
  }
};

function QuestionPage(props) {
  const { classes, match } = props;

  const [warning, setWarning] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({
    title: "保存成功",
    content: ""
  });
  const [qdata, setQuestionData] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [testButton, setTestButton] = React.useState([]);

  const setAns = index => answer => {
    setAnswers({ ...answers, [index]: answer });
  };

  const fetchQuestion = questionID => () => {
    const apiUrl = "https://littlefish33.cn:8080/questionnaire/select";
    const requestOption = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/x-www-form-urlencoded"
      },
      body: parseParams({ id: questionID })
    };

    fetch(apiUrl, requestOption)
      .then(handleResponse)
      .then(response => {
        let ret = [];
        ret.push(
          <Typography className={classes.title} variant="h5" component="h2">
            {response.taskName}
          </Typography>
        );
        setQuestionData(response.chooseData);
      });
  };

  React.useEffect(fetchQuestion(match.params.taskID), []);

  const parseJson = json => {
    let ret = new FormData();
    ret.append("data", JSON.stringify(json));
    return ret;
  };

  const save = () => {
    if (Object.keys(answers).length == qdata.length) {
      for (let i = 0; i < Object.keys(answers).length; i++) {
        if (answers[i] === undefined) {
          setWarning(true);
          return;
        }
      }
    } else {
      setWarning(true);
      console.log("answers:");
      console.log(answers);
      console.log(qdata.length);
      return;
    }

    // upload answers
    let answerData = [];
    for (let i = 0; i < Object.keys(answers).length; i++) {
      answerData.push({
        id: qdata[i].id,
        type: qdata[i].dataType,
        content: answers[i]
      });
    }
    let postData = {
      taskID: match.params.taskID,
      userID: localStorage.getItem("user-id"),
      data: answerData
    };

    const apiUrl = "https://littlefish33.cn:8080/record/create";
    const requestOption = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token")
      },
      body: parseJson(postData)
    };

    console.log(JSON.stringify(postData));
    console.log("Bearer " + localStorage.getItem("user-token"));
    console.log(qdata);
    console.log(answers);
    console.log(answerData);

    fetch(apiUrl, requestOption)
      .then(handleResponse)
      .then(response => {
        if (response.code == 200) {
          setMessage({ ...message, title: "保存成功" });
          setOpen(true);
        } else {
          setMessage({
            title: "保存失败",
            content: response.msg
          });
          setOpen(true);
        }
      });
  };

  const handleClose = (success, props) => () => {
    setOpen(false);
    if (success) {
      props.history.push("/tasksquare");
    }
  };

  const createQuestionCard = (elem, index) => {
    let ret = null;
    let content = {};
    let arr = [];
    switch (elem.dataType) {
      case 2:
        for (let j = 0; j < elem.dataContent.length; j++) {
          arr.push(elem.dataContent[j].content);
        }
        content = { ...content, ["title"]: elem.title, ["arr"]: arr };

        ret = (
          <SingleChoiceCard
            content={content}
            warning={warning}
            callback={setAns(index)}
            answers={answers}
          />
        );
        break;

      case 3:
        for (let j = 0; j < elem.dataContent.length; j++) {
          arr.push(elem.dataContent[j].content);
        }
        content = {
          ...content,
          ["title"]: elem.title,
          ["arr"]: arr,
          ["minNum"]: 0,
          ["maxNum"]: 1000
        };
        ret = (
          <MultiChoiceCard
            content={content}
            warning={warning}
            callback={setAns(index)}
            answers={answers}
          />
        );
        break;

      case 1:
        content = { ...content, ["title"]: elem.title };
        ret = (
          <ShortAnswerCard
            content={content}
            warning={warning}
            callback={setAns(index)}
            answers={answers}
          />
        );
        break;
    }
    return ret;
  };

  return (
    <div>
      {qdata.map(createQuestionCard)}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={save}
      >
        保存
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        取消
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose(message.title == "保存成功", props)}
            color="primary"
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(style)(QuestionPage);
