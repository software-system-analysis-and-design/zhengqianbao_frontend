import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import QuestionnaireContent from "components/QuestionnaireContent/QuestionnaireContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { handleResponse, parseParams } from "variables/serverFunc.jsx";

const apiUrl = "https://littlefish33.cn:8080";

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

function Questionnaire(props) {
  const { classes, transferMsg, path, taskID } = props;

  // 存放问卷基本字段
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    money: 0,
    number: 0,
    publishTime: "",
    endTime: ""
  });

  const [Content, setContent] = React.useState({
    maxID: 0,
    chooseData: []
  }); // 存放问卷页面数据

  // create or update
  const [QState, setQState] = React.useState("创建");

  const submitQuestionnaire = () => {
    if (values.title === "") {
      alert("问卷标题不能为空");
      return null;
    }

    if (values.money < 0) {
      alert("金币不能小于0");
      return null;
    }

    if (Content.chooseData.length === 0) {
      alert("问卷不能为空");
      return null;
    }

    if (values.number <= 0) {
      alert("发布的问卷数必须为正数");
      return null;
    }

    // console.log(requestOptions);
    if (taskID.length === 14) {
      let allData = {
        taskName: values.title,
        taskID: taskID,
        inTrash: 0,
        taskType: "问卷",
        creator: localStorage.getItem("userID"),
        description: values.description,
        money: parseInt(values.money),
        number: parseInt(values.number),
        finishedNumber: 0,
        publishTime: values.publishTime,
        endTime: values.endTime,
        chooseData: Content.chooseData
      };
      // eslint-disable-next-line no-console
      // console.log(JSON.stringify(allData));
      let data = new FormData();
      data.append("data", JSON.stringify(allData));
      data.append("id", taskID);
      // console.log(taskID)
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        },
        body: data
      };

      // 更新
      fetch(apiUrl + "/questionnaire/update", requestOptions)
        .then(handleResponse)
        .then(response => {
          console.log(response);
          if (response.code === 200) {
            alert(response.msg);
          } else {
            alert(response.msg);
          }
        });
    } else {
      let allData = {
        taskName: values.title,
        taskID: "",
        inTrash: 0,
        taskType: "问卷",
        creator: localStorage.getItem("userID"),
        description: values.description,
        money: parseInt(values.money),
        number: parseInt(values.number),
        finishedNumber: 0,
        publishTime: values.publishTime,
        endTime: values.endTime,
        chooseData: Content.chooseData
      };
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(allData));
      let data = new FormData();
      data.append("data", JSON.stringify(allData));
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        },
        body: data
      };
      fetch(apiUrl + "/questionnaire/create", requestOptions)
        .then(handleResponse)
        .then(response => {
          if (response.code === 200) {
            alert("创建任务成功");
          } else {
            alert("创建任务失败");
          }
        });
    }
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    transferMsg("2Q"); // 更新组件
    if (taskID.length === 14) {
      // 传入了将要更新的任务的taskID
      setQState("更新");
      // 根据taskID，获取问卷数据
      const requestOptions = {
        method: "POST",
        headers: {
          //Authorization: "Bearer " + localStorage.getItem("user-token"),
          Accept: "application/json",
          "content-type": "application/x-www-form-urlencoded"
        },
        body: parseParams({ id: taskID })
      };
      console.log(requestOptions);
      fetch(apiUrl + "/questionnaire/select", requestOptions)
        .then(handleResponse)
        .then(response => {
          console.log(response);
          setValues({
            title: response.taskName,
            description: response.description,
            money: response.money + "",
            number: response.number + "",
            publishTime: response.publishTime,
            endTime: response.endTime
          });
          setContent({
            maxID: 100,
            chooseData: response.chooseData
          });
        });
    }
    return () => {
      transferMsg("Return"); // 离开问卷组件
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" gutterBottom>
            {QState}问卷任务
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
            onChange={handleChange("money")}
            value={values.money}
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
            onChange={handleChange("number")}
            value={values.number}
            fullWidth="true"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="设置问卷发布时间（不设置则可手动发布）"
              type="datetime-local"
              fullWidth="true"
              onChange={handleChange("publishTime")}
              value={values.publishTime}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="设置问卷截止时间（不设置则可手动停止）"
              type="datetime-local"
              placeholder="若不设置，则可选择手动停止"
              onChange={handleChange("endTime")}
              value={values.endTime}
              fullWidth="true"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={submitQuestionnaire}
          >
            {QState}
          </Button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <QuestionnaireContent
            title={values.title}
            description={values.description}
            Content={Content}
            setContent={setContent}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Questionnaire.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Questionnaire);
