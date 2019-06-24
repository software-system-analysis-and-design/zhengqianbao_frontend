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
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

const style = theme => ({
  paper: {
    margin: "auto",
    maxWidth: "760px",
    padding: "20px"
  },
  essayQuestion: {
    margin: "15px"
  },
  button: {
    margin: "10px 0px 0px 5px"
  },
  list: {
    maxHeight: "400px",
    position: "relative",
    overflow: "auto"
  }
});

function QuestionaireContent(props) {
  const { classes, title, description, Content, setContent } = props;
  /***************************************************
   *  定义 本组件使用的状态变量
   *****************************************************/
  // 这里存放问卷题目的数据
  /*
  const [Content, setContent] = React.useState({
    maxID: 0,
    chooseData: []
  }); // 存放页面数据
  */

  // 由于在map 中的state变量无法触发更新组件，我们需要使用一个额外的变量来进行触发
  const [load, setLoad] = React.useState(0);

  // 我们需要设置一个问卷题目编辑器的显示信号  1 显示问答题  2 显示选择题  0 not show
  const [show, setShow] = React.useState(0);

  // 设置问卷类型，相当于常量吧。。
  const [questionType, setQuestionType] = React.useState({
    essayQuestion: 1,
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
    maxID: 1, // 随着每一次增加选项 + 1， 保证每一个选项都有唯一的ID，不管其是否被删除。
    chooseData: [
      {
        id: 1,
        content: "" // 第一个默认选项
      }
    ]
  });

  // 如果问卷题目再次编辑，则update为true，此外点击，确定/取消/添加问答题/添加选择题/等按钮会触发update=false
  const [update, setUpdate] = React.useState(false);
  // 记录再次编辑的问卷题目在Content中的索引。
  const [updateIndex, setUpdateIndex] = React.useState(-1);

  /***************************************************
   *  定义 本组件使用的事件处理逻辑
   *****************************************************/
  // 控制复选框的正负值,实时记录是否必选
  const handleChange = name => event => {
    setRequired({ ...required, [name]: event.target.checked });
    setLoad(0);
  };

  // 控制标题实时写入title state变量
  const handleTitlechange = name => event => {
    setQuestionTitle(event.target.value);
    setLoad(0);
  };

  // 控制选择题选项内容的实时写入state
  const handelChoiceItemChange = id => event => {
    let tmpChoiceItem = questionChoice.chooseData;
    for (let i = 0; i < tmpChoiceItem.length; i++) {
      if (id === tmpChoiceItem[i].id) {
        tmpChoiceItem[i].content = event.target.value;
        break;
      }
    }
    setQuestionChoice({
      maxID: questionChoice.maxID,
      chooseData: tmpChoiceItem
    });
    setLoad(0);
  };

  // 显示问答题编辑栏
  const showEssayQuestion = () => {
    setQuestionTitle(""); // 重新置空
    setUpdate(false);
    setRequired({
      essayQuestion: false, // 判断是否问答题为必答
      choice: false, // 选择题是否为必答
      singleOrMulti: false // 选择题是单选还是多选
    });
    setShow(1);
  };

  // 不显示编辑栏
  const notShow = () => {
    setUpdate(false);
    setShow(0);
  };

  // 显示选择题编辑栏, 重置内容
  const showChoice = () => {
    setQuestionChoice({
      maxID: 1,
      chooseData: [
        {
          id: 1,
          content: "" // 第一个默认选项
        }
      ]
    });
    setRequired({
      essayQuestion: false, // 判断是否问答题为必答
      choice: false, // 选择题是否为必答
      singleOrMulti: false // 选择题是单选还是多选
    });
    setUpdate(false);
    setQuestionTitle(""); // 重新置空
    setShow(2);
  };

  //  添加问答题
  const addEssayQuestion = () => {
    if (questionTitle === "") {
      alert("标题不能为空");
      return null;
    }
    if (update) {
      // 更新题目
      let tmpChooseData = Content.chooseData;
      tmpChooseData[updateIndex] = {
        titleNum: tmpChooseData[updateIndex].titleNum,
        title: questionTitle,
        id: tmpChooseData[updateIndex].id,
        dataType: questionType.essayQuestion,
        required: required.essayQuestion,
        dataContent: [{ id: 0, content: "" }]
      };
      setContent({ maxID: Content.maxID, chooseData: tmpChooseData });
    } else {
      let titleNum = Content.chooseData.length + 1;
      let id = Content.maxID + 1;
      let tmpChooseData = Content.chooseData;
      // 添加问答题
      tmpChooseData.push({
        titleNum: titleNum,
        id: id,
        title: questionTitle, // 全局state 问题的题目
        dataType: questionType.essayQuestion,
        required: required.essayQuestion,
        dataContent: [{ id: 0, content: "" }]
      });
      setContent({ maxID: id, chooseData: tmpChooseData });
    }
    setQuestionTitle(""); // 重新置空
    setRequired({
      essayQuestion: false, // 判断是否问答题为必答
      choice: false, // 选择题是否为必答
      singleOrMulti: false // 选择题是单选还是多选
    });
    setLoad(0);
    setUpdate(false);
  };

  // 添加选项
  const addChoiceItem = () => {
    let tmpQuestionChoice = questionChoice.chooseData;
    let id = questionChoice.maxID + 1;
    tmpQuestionChoice.push({
      id: id,
      content: ""
    });
    setQuestionChoice({ maxID: id, chooseData: tmpQuestionChoice });
    setLoad(0);
  };

  // 删除选项
  const deleteChoiceItem = id => event => {
    if (questionChoice.chooseData.length === 1) {
      alert("不能删除，至少保留一个选项！");
      return null;
    }
    let tmpQuestionChoice = questionChoice.chooseData;

    let index = 0;
    for (let i = 0; i < tmpQuestionChoice.length; i++) {
      if (tmpQuestionChoice[i].id === id) {
        index = i;
        break;
      }
    }
    tmpQuestionChoice.splice(index, 1);
    setQuestionChoice({
      maxID: questionChoice.maxID,
      chooseData: tmpQuestionChoice
    });
    setLoad(0);
  };

  // 添加选择题
  const addChoice = () => {
    if (questionTitle === "") {
      alert("标题不能为空");
      return null;
    }
    if (questionChoice.chooseData.length <= 1) {
      alert("选项不能少于一个");
      return null;
    }
    for (let i = 0; i < questionChoice.chooseData.length; i++) {
      if (questionChoice.chooseData[i].content === "") {
        alert("选项不能为空！");
        return null;
      }
    }
    let tmpChooseData = Content.chooseData;
    if (update) {
      let dataType =
        required.singleOrMulti === true
          ? questionType.multiChoice
          : questionType.singleChoice;
      tmpChooseData[updateIndex] = {
        titleNum: tmpChooseData[updateIndex].titleNum,
        id: tmpChooseData[updateIndex].id,
        title: questionTitle,
        dataType: dataType,
        required: required.choice,
        dataContent: questionChoice.chooseData
      };
      setContent({ maxID: Content.maxID, chooseData: tmpChooseData });
    } else {
      // 添加选择题
      let titleNum = Content.chooseData.length + 1;
      let id = Content.maxID + 1;
      let dataType =
        required.singleOrMulti === true
          ? questionType.multiChoice
          : questionType.singleChoice;
      tmpChooseData.push({
        titleNum: titleNum,
        id: id,
        title: questionTitle,
        dataType: dataType,
        required: required.choice,
        dataContent: questionChoice.chooseData
      });
      setContent({ maxID: id, chooseData: tmpChooseData });
    }
    // 重置选项
    setLoad(0);
    setQuestionTitle(""); // 重新置空
    setRequired({
      essayQuestion: false, // 判断是否问答题为必答
      choice: false, // 选择题是否为必答
      singleOrMulti: false // 选择题是单选还是多选
    });
    setQuestionChoice({
      maxID: 1,
      chooseData: [
        {
          id: 1,
          content: "" // 第一个默认选项
        }
      ]
    });
    setUpdate(false);
  };

  // 删除已添加的问卷题目
  const deleteQuestion = id => event => {
    //todo
    let tmpChooseData = Content.chooseData;
    let index = 0;
    for (let i = 0; i < tmpChooseData.length; i++) {
      if (id === tmpChooseData.id) {
        index = i;
        break;
      }
    }
    tmpChooseData.splice(index, 1); // 删除该题目
    // 变动后续题目的titleNum依次-1
    for (let i = 0; i < tmpChooseData.length; i++) {
      if (i >= index) {
        tmpChooseData[i].titleNum = tmpChooseData[i].titleNum - 1;
      }
    }
    setContent({ maxID: Content.maxID, chooseData: Content.chooseData });
  };

  // 编辑已添加的问卷题目
  const editQuestion = id => event => {
    // 获取问卷问题数据
    let tmpChooseData = Content.chooseData;
    // 获取当前编辑标题数据
    let tmpQuestionTitle = questionTitle;
    // 获取当前编辑的选项数据
    let tmpQuestionChoice = questionChoice.chooseData;
    // 目标问题的索引
    let index = 0;
    for (var i = 0; i < tmpChooseData.length; i++) {
      if (tmpChooseData[i].id === id) {
        index = i;
        break;
      }
    }
    // 记录正在编辑的题目在content中的索引
    setUpdateIndex(index);
    if (tmpChooseData[index].dataType === 1) {
      // 显示问答题编辑栏
      showEssayQuestion();
    } else {
      // 显示单选题或者多选题编辑栏
      showChoice();
      // 获取选项数据,并设置选项数据
      tmpQuestionChoice = tmpChooseData[index].dataContent;
      setQuestionChoice({
        maxID: questionChoice.maxID,
        chooseData: tmpQuestionChoice
      });
    }

    // 显示编辑栏的标题
    tmpQuestionTitle = tmpChooseData[index].title;
    setQuestionTitle(tmpQuestionTitle);
    // 当存在必选时，确定是问答题还是选择题
    if (tmpChooseData[index].required === 1) {
      if (tmpChooseData[index].dataType === 1) {
        setRequired({
          essayQuestion: true,
          choice: false,
          singleOrMulti: false
        });
      } else if (tmpChooseData[index].dataType === 2) {
        setRequired({
          essayQuestion: false,
          choice: true,
          singleOrMulti: false
        });
      } else if (tmpChooseData[index].dataType === 3) {
        setRequired({
          essayQuestion: false,
          choice: true,
          singleOrMulti: true
        });
      }
    }
    setUpdate(true);
  };

  return (
    <Paper className={classes.paper}>
      {!title && (
        <Typography variant="h5" gutterBottom align="center">
          这里是问卷内容,请从输入问卷题目和描述开始~
        </Typography>
      )}
      <Typography variant="h5" gutterBottom align="center">
        {title}
      </Typography>
      <Typography gutterBottom>{description}</Typography>
      <List subheader={<li />} className={classes.list}>
        {Content.chooseData.map(item => {
          let required = "";
          if (item.required === true) {
            required = "【必答】";
          }
          let multiChoice = "";
          if (item.dataType === 3) {
            multiChoice = "【多选】";
          }

          return (
            <ListItem button key={item.id}>
              <li>
                <Typography variant="h6">
                  {item.titleNum}
                  {"."}
                  {item.title}
                  {required}
                  {multiChoice}
                </Typography>
                {item.dataType === 1 && (
                  <TextField
                    id="standard-bare"
                    className={classes.textField}
                    fullWidth="true"
                    margin="normal"
                    inputProps={{ "aria-label": "bare" }}
                  />
                )}
                {(item.dataType === 2 || item.dataType === 3) && (
                  <FormControl>
                    <RadioGroup>
                      {item.dataContent.map(_item => (
                        <div key={_item.id}>
                          <FormControlLabel
                            control={<Radio />}
                            label={_item.content}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              </li>
              <ListItemSecondaryAction>
                <Tooltip title="编辑">
                  <IconButton onClick={editQuestion(item.id)}>
                    <EditIcon color="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="删除">
                  <IconButton onClick={deleteQuestion(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
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
          <Button variant="contained" color="secondary" onClick={showChoice}>
            添加选择题
          </Button>
        </Grid>
      </Grid>
      {show === 1 && (
        <div className={classes.essayQuestion}>
          <Typography gutterBottom>
            题目：
            <TextField
              id="standard-bare"
              className={classes.textField}
              placeholder="写下你的问题"
              onChange={handleTitlechange("title")}
              value={questionTitle}
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
            是否必答：
            <Switch
              checked={required.essayQuestion}
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
        <div className={classes.essayQuestion}>
          <Typography gutterBottom>
            题目：
            <TextField
              id="standard-bare"
              className={classes.textField}
              placeholder="写下你的问题"
              value={questionTitle}
              fullWidth="true"
              onChange={handleTitlechange("title")}
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
                    onClick={deleteChoiceItem(item.id)}
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
            是否必答：
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
