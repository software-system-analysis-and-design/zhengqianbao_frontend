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
  if(!localStorage.getItem('user-token')){
    props.history.push('/login');
  }
  const { classes, match } = props;

  const [warning, setWarning] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({
    title: "保存成功",
    content: ""
  });
  const [qdata, setQuestionData] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [money, setMoney] = React.useState(0);

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
        setMoney(parseInt(response.money));
        setQuestionData(response.chooseData);
      });
  };

  React.useEffect(fetchQuestion(match.params.taskID), []);

  const parseJson = json => {
    let ret = new FormData();
    ret.append("data", JSON.stringify(json));
    return ret;
  };

  const updateMoney = () => {
    let data = new FormData();
    data.append("money", localStorage.getItem("user-remain") + money);

    const apiUrl = "https://littlefish33.cn:8080/user/updatemoney";
    const requestOption = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token")
      },
      body: data
    };
    fetch(apiUrl, requestOption)
      .then(handleResponse)
      .then(response => {
        console.log(response);
      });
  };

  const save = () => {
    for (let i = 0; i < qdata.length; i++) {
      console.log("Require" + i);
      console.log(qdata[i].required);
      if (qdata[i].required && (answers[i] === undefined || answers[i] === "")) {
        setWarning(true);
        return;
      }
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
      userID: localStorage.getItem("userID"),
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
          updateMoney();
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
        content = {...content, ["title"]: elem.title, ["arr"]: arr};
        ret = <SingleChoiceCard content={content} warning={warning && qdata[index].required} callback={setAns(index)} />;
        break;

      case 3:
        for (let j = 0; j < elem.dataContent.length; j++) {
          arr.push(elem.dataContent[j].content);
        }
        content = {...content, ["title"]: elem.title, ["arr"]: arr, ["minNum"]: 1, ["maxNum"]: arr.length};
        ret = <MultiChoiceCard content={content} warning={warning && qdata[index].required} callback={setAns(index)} />;
        break;

      case 1:
        content = {...content, ["title"]: elem.title};
        ret = <ShortAnswerCard content={content} warning={warning && qdata[index].required} callback={setAns(index)} />;
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
      <Button variant="contained" color="secondary" className={classes.button} onClick={ () => props.history.push("/tasksquare")}>
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
