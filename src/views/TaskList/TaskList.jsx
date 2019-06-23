import React from "react";
import PropTypes from "prop-types";
import TaskContent from "../../components/TaskContent/TaskContent.jsx";

import { handleResponse, parseParams } from "variables/serverFunc.jsx";

const apiUrl = "https://littlefish33.cn:8080";


function CurentTime(time) {
  // 将时间类型，将其转为字符串，示例：2019-06-12T12:00
  let now = time

  let year = now.getFullYear(); //年
  let month = now.getMonth() + 1; //月
  let day = now.getDate(); //日

  let hh = now.getHours(); //时
  let mm = now.getMinutes(); //分

  var clock = year + "-";

  if (month < 10) clock += "0";

  clock += month + "-";

  if (day < 10) clock += "0";

  clock += day + "T";

  if (hh < 10) clock += "0";

  clock += hh + ":";
  if (mm < 10) clock += "0";
  clock += mm;
  return clock;
}

function TaskList(props) {
  const { transferMsg } = props;

  const [taskContent, setTaskContent] = React.useState([]);

  function removeTask(taskID) {
    // 从列表中将某一任务移到回收站；
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token"),
        Accept: "application/json",
        "content-type": "application/x-www-form-urlencoded"
      },
      body: parseParams({ id: taskID, inTrash: 1 })
    };
    // console.log(requestOptions);
    fetch(apiUrl + "/questionnaire/trash", requestOptions)
      .then(handleResponse)
      .then(response => {
        alert("任务已经移入回收站");
        if (response.code === 200) {
          removeTaskByID(taskID);
        }
      });
  }

  function modifyTaskState(taskID, state) {
    // 修改子组件的状态：
    // 1. state = "publish"  :  从未发布到发布状态；发布时间设置为当前时间，前提要求存在终止日期，否则需要进行编辑设置
    // 2. state = "stop" : 从运行状态到终止状态；终止日期设置为当前时间；
    // 3. state = "restart": 从终止到再次发布，发布时间设置为当前时间，终止日期置为空
    // TODO 通过修改发布和截止时间修改问卷状态，
  }

  function removeTaskByID(taskID) {
    // 删除子组件，重新渲染
    let newContent = taskContent;
    let index = 0;
    for (let i = 0; i < newContent.length; i++) {
      if (newContent[i].taskID === taskID) {
        index = i;
        break;
      }
    }
    newContent.splice(index, 1);
    setTaskContent(newContent);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET"
      };
      fetch(apiUrl + "/questionnaire/previews", requestOptions)
        .then(handleResponse)
        .then(response => {
          response = response.reverse();
          setTaskContent(response);
        });
    };
    fetchData(); // 请求数据
  }, []);

  return (
    <div>
      {taskContent.map(
        item =>
          item.inTrash === 0 &&
          item.creator === localStorage.getItem("userID") && (
            <TaskContent
              taskName={item.taskName}
              taskID={item.taskID}
              taskType={item.taskType}
              money={item.money}
              number={item.number}
              finishedNumber={item.finishedNumber}
              publishTime={item.publishTime.replace("T", " ")}
              endTime={item.endTime.replace("T", " ")}
              transferMsg={transferMsg}
              removeTask={removeTask}
              modifyTaskState={modifyTaskState}
            />
          )
      )}
    </div>
  );
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default TaskList;
