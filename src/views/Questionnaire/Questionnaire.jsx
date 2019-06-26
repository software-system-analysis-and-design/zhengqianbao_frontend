import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

/*
 * 时间判断比较相关函数 *********************
 */
function stringToDate(time) {
  // 一个字符串  2019-06-12T12:00 转为 Date对象
  // let time = _time.toString();
  let year = time.slice(0, 4);
  let month = time.slice(5, 7);
  let day = time.slice(8, 10);
  let min = time.slice(11, 13);
  let sec = time.slice(14, 16);
  let date = new Date(year, month - 1, day, min, sec);
  return date;
}

function judgeTime(time) {
  // 用于时间的分钟检查  2019-06-12T12:00
  // time 从时间选择器返回的字符串
  // 内容为空，则允许，需要手动发布
  // 内容若不为空，则需要精确到分钟，且时间必须在当前时间之后，否则不予发布
  // let time = _time.toString();
  if (time.length === 0) {
    return true;
  } else if (time.length === 16) {
    let currentTime = new Date();
    let cmpTime = stringToDate(time);
    if (cmpTime > currentTime) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function compareTime(publishTime, endTime) {
  // publishTime，endTime是经过分钟检查之后的字段，为空字段或者完整字段，并且时间都在当前时间之后
  // 有以下情况：
  // 0. 发布时间和结束时间都为空，正常返回 1
  // 1. 发布时间为空，结束时间不为空，异常返回  0
  // 2. 发布时间不为空，结束时间为空 ，正常返回 1
  // 3. 时间都不为空，发布时间在结束时间之后，异常返回 2
  // 4. 时间都不为空，发布时间在结束时间之前，正常返回 1
  // 时间示例： 2019-06-12T12:00
  if (publishTime.length === 0 && endTime.length === 0) {
    return 1;
  } else if (publishTime.length === 0 && endTime.length !== 0) {
    return 0;
  } else if (publishTime.length !== 0 && endTime.length === 0) {
    return 1;
  } else {
    let date1 = stringToDate(publishTime.toString());
    let date2 = stringToDate(endTime.toString());
    if (date1 < date2) {
      return 1;
    } else {
      return 2;
    }
  }
}

function Questionnaire(props) {
  if (!localStorage.getItem("user-token")) {
    props.history.push("/login");
  }
  const { classes, transferMsg, taskID } = props;

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

    if (judgeTime(values.publishTime) === false) {
      alert("发布时间不合法，必须完整且大于当前时间或者不设置");
      return null;
    }

    if (judgeTime(values.endTime) === false) {
      alert("截止时间不合法，必须完整且大于当前时间或者不设置");
      return null;
    }

    let timeState = compareTime(values.publishTime, values.endTime);
    if (timeState === 0) {
      alert("不允许发布时间为空，截止时间不为空!");
      return null;
    }
    if (timeState === 2) {
      alert(" 发布时间在截止时间之后，不合法！");
      return null;
    }

    // 检查当前余额是否足够支付，如果够则支付，然后进行更新，如果不够支付，那么就 alert提示，然后返回。
    let currentMoney = localStorage.getItem("user-remain");
    let payMoney = values.money * values.number;
    if (currentMoney < payMoney) {
      alert(
        "【余额不足】 \n 你需要支付" +
          payMoney +
          " 金币, 但你的余额仅剩 " +
          currentMoney.toString() +
          " 金币"
      );
      return null;
    }

    // 金额足够，那么需要提前扣除token，然后发送更新金额请求，然后再进行更新和创建任务
    let data = new FormData();
    data.append("money", currentMoney - payMoney);
    const requestUpdateMoney = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token")
      },
      body: data
    };

    let isError = false;

    fetch(apiUrl + "/user/updatemoney", requestUpdateMoney)
      .then(handleResponse)
      .then(response => {
        if (response.code === 200) {
          localStorage.setItem("user-remain", currentMoney - payMoney);
        }
      })
      .catch(() => {
        alert("扣除金币出现错误，请检查你的网络环境！");
        isError = true;
        return null;
      });

    if (isError) return null;

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

      let data = new FormData();
      data.append("data", JSON.stringify(allData));
      data.append("id", taskID);

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
          // console.log(response);
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
            alert(
              "创建任务成功， 你被扣除" +
                parseInt(values.money) * parseInt(values.number) +
                "金币"
            );
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
      // console.log(requestOptions);
      fetch(apiUrl + "/questionnaire/select", requestOptions)
        .then(handleResponse)
        .then(response => {
          // console.log(response);
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
