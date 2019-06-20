import React from "react";
import { handleResponse, parseParams } from "variables/serverFunc.jsx"
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

// TODO FIX BUGS
function QuestionPage(props) {
  const {classes, match} = props;

  const [questions, setQuestions] = React.useState(null);
  const [warning, setWarning] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("保存成功");
  const [qdata, setQuestionData] = React.useState([]);
  const [answers, setAns] = React.useState({});

  const fetchQuestion = questionID => () => {
    const apiUrl = "https://littlefish33.cn:8080/questionnaire/select";
    const requestOption = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
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
        let data = response.chooseData;
        setQuestionData(response.chooseData);
        for (let i = 0; i < data.length; i++) {
          let content = {};
          let arr = [];
          switch (data[i].dataType) {
            case 2:
              for (let j = 0; j < data[i].dataContent.length; j++) {
                arr.push(data[i].dataContent[j].content);
              }
              content = {...content, ["title"]: data[i].title, ["arr"]: arr};
              ret.push(
                <SingleChoiceCard content={content} warning={warning} callback={setAnswers(i)}/>
              );
              break;

            case 3:
              for (let j = 0; j < data[i].dataContent.length; j++) {
                arr.push(data[i].dataContent[j].content);
              }
              content = {...content, ["title"]: data[i].title, ["arr"]: arr, ["minNum"]: 0, ["maxNum"]: 1000};
              ret.push(
                <MultiChoiceCard content={content} warning={warning} callback={setAnswers(i)}/>
              );
              break;

            case 1:
              content = {...content, ["title"]: data[i].title};
              ret.push(
                <ShortAnswerCard content={content} warning={warning} callback={setAnswers(i)}/>
              );
              break;
          }
        }
        let defaultAnswers = {};
        for (let i = 0; i < data.length; i++) {
          defaultAnswers = {...defaultAnswers, [i]:""};
        }
        setAns(defaultAnswers);
        setQuestions(ret);
      });
  }

  React.useEffect(fetchQuestion(match.params.taskID), []);

  const setAnswers = index => answer => {
    console.log(answers);
    setAns({...answers, [index]: answer});
  };

  function save() {
    if (Object.keys(answers).length == qdata.length) {
      for (let i = 0; i < Object.keys(answers).length; i++) {
        if (answers == "") {
          setWarning(true);
          return;
        }
      }
    } else {
      setWarning(true);
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
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: "Bearer " + localStorage.getItem("user-token"),
      },
      body: parseParams({ data: postData })
    };

    console.log(postData);
    console.log(qdata);
    console.log(answers);
    console.log(answerData);

    fetch(apiUrl, requestOption)
      .then(handleResponse)
      .then(response => {
        if (response.code == 200) {
          setDialogTitle("保存成功");
          setOpen(true);
        } else {
          setDialogTitle("保存失败");
          setErrorMsg(response.msg);
          setOpen(true);
        }
      });
  };

  const handleClose = (success, props) => () => {
    setOpen(false);
    if (success) {
      props.history.push("/tasksquare");
    }
  }

  return (
    <div>
      {questions}
      <Button variant="contained" color="primary" className={classes.button} onClick={save}>
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
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(dialogTitle == "保存成功", props)} color="primary">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(style)(QuestionPage);
