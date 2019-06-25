import React from "react";
import PropTypes from "prop-types";
import TaskContent from "../../components/TaskContent/TaskContent.jsx";
import { exportExcel } from "xlsx-oc";
import { handleResponse, parseParams } from "variables/serverFunc.jsx";

const apiUrl = "https://littlefish33.cn:8080";

function timeToString(time) {
  // 将时间类型，将其转为字符串，示例：2019-06-12T12:00
  let now = time;

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

function TaskList(props) {
  if (!localStorage.getItem("user-token")) {
    props.history.push("/login");
  }

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
    // 1. state = "publish"  :  从未发布到发布状态；发布时间设置为当前时间，终止日期若在当前时间之前，则置空
    // 2. state = "stop" : 从运行状态到终止状态；终止日期设置为当前时间；
    // 3. state = "restart": 从终止到再次发布，发布时间设置为当前时间，终止日期置为空
    // 通过修改发布和截止时间修改问卷状态，

    // 根据特定的ID获取相应的任务，
    // 根据 state 修改任务的时间数据，发送给后台进行更新；

    // 根据taskID，获取问卷数据
    const requestOptions1 = {
      method: "POST",
      headers: {
        //Authorization: "Bearer " + localStorage.getItem("user-token"),
        Accept: "application/json",
        "content-type": "application/x-www-form-urlencoded"
      },
      body: parseParams({ id: taskID })
    };
    // console.log(requestOptions);
    fetch(apiUrl + "/questionnaire/select", requestOptions1)
      .then(handleResponse)
      .then(response => {
        // console.log(response);
        let taskData = response;
        if (state === "publish") {
          taskData.publishTime = timeToString(new Date());
          let cmpResult = compareTime(taskData.publishTime, taskData.endTime);
          if (cmpResult === 2) {
            // 当前任务的截止时间在当前时间之前，置为空。
            taskData.endTime = "";
          }
        } else if (state === "stop") {
          // 任务手动终止，截止日期置为当前时间
          taskData.endTime = timeToString(new Date());
        } else if (state === "restart") {
          // 任务重启，发布日期置为当前时间，终止日期置空。
          taskData.publishTime = timeToString(new Date());
          taskData.endTime = "";
        }
        let data = new FormData();
        data.append("data", JSON.stringify(taskData));
        data.append("id", taskID);

        const requestOptions2 = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user-token")
          },
          body: data
        };

        // 更新
        fetch(apiUrl + "/questionnaire/update", requestOptions2)
          .then(handleResponse)
          .then(response => {
            if (response.code === 200) {
              alert(response.msg + "请刷新查看！");
            } else {
              alert(response.msg);
            }
          });
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
  }

  function downloadTaskData(taskID) {
    // 下载某一份任务的数据
    // 获取对应任务的题目信息
    // 根据taskID，获取问卷数据

    // 问卷的格式是：
    // 列头：序号  问题1  2   3  4
    const requestOptions1 = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/x-www-form-urlencoded"
      },
      body: parseParams({ id: taskID })
    };
    fetch(apiUrl + "/questionnaire/select", requestOptions1)
      .then(handleResponse)
      .then(responseInfo => {
        // 对应的问卷信息
        return responseInfo;
      })
      .then(responseInfo => {
        // 下载用户的答案数据
        let data = new FormData();
        data.append("taskID", taskID);
        const requestOptions2 = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user-token")
          },
          body: data
        };
        fetch(apiUrl + "/record/getall", requestOptions2)
          .then(handleResponse)
          .then(responseData => {
            console.log(responseInfo);
            console.log(responseData);
            let taskName = responseInfo.taskName;
            
            let dataSource = []; // 存储回答的字段和数据
            let dataHeader = []; // 存储列表头部字段

            let key = 0; // 起始的键名

            let keyList = ["序号","回答者"]; // 存储每一个回答对应的键名
            dataHeader.push({k: "序号", v: "序号"})
            dataHeader.push({k: "回答者", v: "回答者"})
            // 填充 header
            let chooseData = responseInfo.chooseData;
            for (let i = 0; i < chooseData.length; i++) {
              let header = { k: i.toString(), v: chooseData[i].titleNum };
              keyList.push(i.toString());
              dataHeader.push(header);
            }

            // 填充 source
            for (let i = 0; i < responseData.length; i++) {
              let data = responseData[i].data;
              let source = {};
              source[keyList[0]] = i + 1;                    // 序号
              source[keyList[1]] =  responseData[i].userID;  // 回答者

              for (let j = 0; j < data.length; j++) {
                source[keyList[j + 2]] = data[j].content;
                console.log(data[j].content)
              }
              console.log("source")
              console.log(source);
              dataSource.push(source);
            }
            exportExcel(dataHeader, dataSource);
            console.log(dataHeader)
            console.log(dataSource)
            console.log("expor excel");
          });
      });
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
          item.inTrash !== 1 &&
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
              downloadTaskData={downloadTaskData}
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
