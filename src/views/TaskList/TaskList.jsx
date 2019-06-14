import React from "react";
import PropTypes from "prop-types";
import TaskContent from "../../components/TaskContent/TaskContent.jsx";

import { handleResponse, parseParams } from "variables/serverFunc.jsx";
import user from "variables/global.jsx";

const apiUrl = "https://littlefish33.cn:8080";

function TaskList(props) {
  const [taskContent, setTaskContent] = React.useState([]);

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
          item.inTrash === 0 && (
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
