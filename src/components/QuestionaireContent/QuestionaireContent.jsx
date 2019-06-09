import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// UI 组件
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const style = theme => ({
  paper: {
    margin: "auto",
    maxWidth: "760px",
    padding: "20px"
  },
  essayQuesstion: {
    margin: "15px"
  },
  button: {
    margin: "10px 0px 0px 5px"
  }
});

/*
问卷字段设计：

state = {
  choose_data:[
    {  // 问答题的字段格式
      title_num: 1,   // 题目的编号
      id: 1           // 题目的 id 
      title: "这是问答题的问题"  
      data_type: 1 （1 表示是问答题)
      required: 1    (1 表示是必选题目， 0 非必选题)
      data_content: "这是回答的数据，默认为空"
    }
    { // 单选题的字段格式
      title_num: 2
      id: 2
      title: "这是一道单选题"
      data_type: 2  (2表示是单选题)
      required: 0
      data_content:[
        {
          id: 1 // 选项的id
          content: "选项的内容"
        }
        {
          id: 2 
          content: "2113"
        }
      ]
    }  // 多选题的字段格式
    {
      title_num: 3
      id: 3
      title: "多选题目"
      data_type: 3
      data_content:[
        {
          id: 1
          content: "asdasd"
        }
      ]
    }
  ]
}
*/

function QuestionaireContent(props) {
  const { classes, title, description } = props;
  /***************************************************
   *  定义 本组件使用的状态变量
   *****************************************************/

  const [Content, setContent] = React.useState({
    chooseData: []
  }); // 存放页面数据

  // 由于在map 中的state变量无法触发更新组件，我们需要使用一个额外的变量来进行触发
  const [load, setLoad] = React.useState(0);

  // 我们需要设置一个问卷题目编辑器的显示信号  1 显示问答题  2 显示选择题  0 not show
  const [show, setShow] = React.useState(0);

  const [questionType, setQuestionType] = React.useState({
    essayQuesstion: 1,
    singleChoice: 2,
    multiChoice: 3
  });

  // 设置是否必选，以及是否为单选题或者多选题
  const [required, setRequired] = React.useState({
    essayQuestion: false, // 判断是否问答题为必答
    choice: false, // 选择题是否为必答
    singleOrMulti: false // 选择题是单选还是多选
  });

  // 这里存放编辑过程中的题目变量
  const [questionTitle, setQuestionTitle] = React.useState("");

  // 存放选择题定义过程中的选项变量
  const [questionChoice, setQuestionChoice] = React.useState({
    chooseData: [
      {
        id: 1,
        content: "" // 第一个默认选项
      }
    ]
  });

  /***************************************************
   *  定义 本组件使用的事件处理逻辑
   *****************************************************/
  // 控制复选框的正负值
  const handleChange = name => event => {
    setRequired({ ...required, [name]: event.target.checked });
    setLoad(0);
  };

  // 控制标题实时写入title state变量
  const handleTitlechange = name => event => {
    setQuestionTitle(event.target.value);
    setLoad(0);
  }

  // 控制选择题选项内容的实时写入state
  const handelChoiceItemChange = id => event => {
    let tmpChoiceItem = questionChoice.chooseData;
    tmpChoiceItem[id].content = event.target.value;
    setQuestionChoice({ chooseData: tmpChoiceItem });
    setLoad(0);
  }

  // 显示问答题编辑栏
  const showEssayQuestion = () => {
    setShow(1);
  };

  // 不显示编辑栏
  const notShow = () => {
    setShow(0);
  };

  //  添加问答题
  const addEssayQuestion = () => {
    if (questionTitle === ""){
      alert("标题不能为空");
    }
    let titleNum = Content.chooseData.length + 1;
    let id = titleNum;
    let tmpChooseData = Content.chooseData;
    tmpChooseData.push({
      titleNum: titleNum,
      id: id,
      title: questionTitle, // 全局state 问题的题目
      dataType: questionType.essayQuesstion,
      required: required.essayQuestion === true ? 1 : 0, // 获取必选或者非必选
      dataContent: ""
    });
    setContent({ chooseData: tmpChooseData });
    setQuestionTitle("0"); // 重新置空
    setRequired({
      essayQuestion: false, // 判断是否问答题为必答
      choice: false, // 选择题是否为必答
      singleOrMulti: false // 选择题是单选还是多选
    });
    setLoad(0);
  };

  // 显示选择题编辑栏
  const showSingleChoice = () => {
    setShow(2);
  };

  // 添加选项
  const addChoiceItem = () => {
    let tmpQuestionChoice = questionChoice.chooseData;
    tmpQuestionChoice.push({
      id: questionChoice.chooseData.length + 1,
      content: ""
    });
    setQuestionChoice({ chooseData: tmpQuestionChoice });
    setLoad(0);
  };

  // 删除选项
  const deleteChoiceItem = () => {};

  // 添加选择题
  const addChoice = () => {
    let titleNum = Content.chooseData.length;
    let id = titleNum;
    let tmpChooseData = Content.chooseData;
    let dataType =
      required.singleOrMulti === true
        ? questionType.multiChoice
        : questionType.singleChoice;
    tmpChooseData.push({
      titleNum: titleNum,
      id: id,
      title: questionTitle,
      dataType: dataType,
      required: required.choice === true ? 1 : 0,
      dataContent: questionChoice.chooseData
    });
    setContent({ chooseData: tmpChooseData });

    // 重置选项
    setLoad(0);
    setQuestionChoice({
      chooseData: [
        {
          id: 1,
          content: "" // 第一个默认选项
        }
      ]
    });
  };

  return (
    <Paper className={classes.paper}>
      {!title && (
        <Typography variant="h5" gutterBottom align="center">
          这里是问卷内容
        </Typography>
      )}
      <Typography variant="h5" gutterBottom align="center">
        {title}
      </Typography>
      <Typography gutterBottom>{description}</Typography>
      <List subheader={<li />}>
        {Content.chooseData.map(item => (
          <ListItem key={item.id}>
            <ul>
              <ListSubheader>{item.title}</ListSubheader>
            </ul>
          </ListItem>
        ))}
      </List>
      <Grid container align="center">
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={showEssayQuestion}
          >
            添加问答题
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={showSingleChoice}
          >
            添加选择题
          </Button>
        </Grid>
      </Grid>
      {show === 1 && (
        <div className={classes.essayQuesstion}>
          <Typography gutterBottom>
            题目：
            <TextField
              id="standard-bare"
              className={classes.textField}
              placeholder="写下你的问题"
              onChange={handleTitlechange("title")}
              fullWidth="true"
              margin="normal"
              inputProps={{ "aria-label": "bare" }}
            />
          </Typography>
          <Typography gutterBottom>
            回答：
            <TextField
              id="standard-bare"
              className={classes.textField}
              placeholder="无须填写"
              disabled
              margin="normal"
              fullWidth="true"
              inputProps={{ "aria-label": "bare" }}
            />
          </Typography>
          <Typography>
            是否必选：
            <Switch
              checked={required.essayQuesstion}
              onChange={handleChange("essayQuestion")}
              value="essayQuestion"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={addEssayQuestion}
          >
            确定
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={notShow}
          >
            取消
          </Button>
        </div>
      )}
      {show === 2 && (
        <div className={classes.essayQuesstion}>
          <Typography gutterBottom>
            题目：
            <TextField
              id="standard-bare"
              className={classes.textField}
              placeholder="写下你的问题"
              fullWidth="true"
              margin="normal"
              inputProps={{ "aria-label": "bare" }}
            />
          </Typography>
          <Typography gutterBottom>
            选项：
            {questionChoice.chooseData.map(item => (
              <Grid container key={item.id}>
                <Grid item xs={1}>
                  <Radio gutterBottom />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="standard-bare"
                    placeholder="写下选项"
                    margin="normal"
                    fullWiidth="true"
                    value={item.content}
                    onChange={handelChoiceItemChange(item.id)}
                    inputProps={{ "aria-label": "bare" }}
                    gutterBottom
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    aria-label="Delete"
                    onClick={deleteChoiceItem}
                    value={item.id}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Typography>
          <Typography>
            添加选项：{" "}
            <Fab
              size="small"
              color="secondary"
              aria-label="Add"
              className={classes.margin}
              onClick={addChoiceItem}
            >
              <AddIcon />
            </Fab>
          </Typography>
          <Typography>
            是否必选：
            <Switch
              checked={required.choice}
              onChange={handleChange("choice")}
              value="choice"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Typography>
          <Typography>
            是否多选：
            <Switch
              checked={required.singleOrMulti}
              onChange={handleChange("singleOrMulti")}
              value="singleOrMulti"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={addChoice}
          >
            确定
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={notShow}
          >
            取消
          </Button>
        </div>
      )}
    </Paper>
  );
}

QuestionaireContent.prototype = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(QuestionaireContent);
