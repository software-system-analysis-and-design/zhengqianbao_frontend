import React from "react";
import PropTypes from "prop-types";
import TaskContent from "../../components/TaskContent/TaskContent.jsx";

import { handleResponse, parseParams } from "variables/serverFunc.jsx";

const apiUrl = "https://littlefish33.cn:8080";

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
        alert(response.msg);
        if (response.code === 200) {
          removeTaskByID(taskID);
        }
      });
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
    // transferMsg("Return"); // 刷新页面
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
              publishTime={item.publishTime}
              endTime={item.endTime}
              taskState="进行中"
              transferMsg={transferMsg}
              removeTask={removeTask}
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
