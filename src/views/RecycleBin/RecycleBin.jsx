import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { handleResponse } from "variables/serverFunc.jsx";
const apiUrl = "https://littlefish33.cn:8080";

const styles = {
  paper: {
    width: "80%",
    margin: "auto"
  },
  root: {
    width: "100%"
  },
  tableWrapper: {
    margin: "20px"
  },
  button: {
    margin: "2% 72%",
    width: "20%"
  }
};

function createData(taskID, taskName, taskType, taskDeleteTime) {
  return { taskID, taskName, taskType, taskDeleteTime };
}

function RecycleBin(props) {
  const { classes } = props;
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  // 记录选中or不选中的check box。
  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }

  // 换页
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  // 设置每一页的行数
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  // 恢复任务
  function recoverTask() {
    for (let i = 0; i < selected.length; i++) {
      let data = new FormData();
      data.append("id", selected[i]);
      data.append("inTrash", 1); // 移出回收站
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        },
        body: data
      };
      fetch(apiUrl + "/questionaire/trash", requestOptions)
        .then(handleResponse)
        .then(response => {
          console.log(response);
        });
    }
    removeData(selected); // 选中项的row数据删除
    setSelected([]); // 选中项置为空
  }

  // 彻底删除任务
  function deleteTask() {
    for (let i = 0; i < selected.length; i++) {
      let data = new FormData();
      data.append("id", selected[i]);
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        },
        body: data
      };
      fetch(apiUrl + "/questionaire/delete", requestOptions)
        .then(handleResponse)
        .then(response => {
          console.log(response);
        });
    }
    removeData(selected); // 选中项的row数据删除
    setSelected([]); // 选中项置为空
  }

  // 指定 id 从 row 中移除
  function removeData(taskIDList) {
    let newRows = rows;
    for (let i = 0; i < taskIDList.length; i++) {
      for (let j = 0; j < newRows.length; j++) {
        if (newRows[j].taskID === taskIDList[i]) {
          newRows.splice(j, 1);
          break;
        }
      }
    }
    setRows(newRows);
  }

  // 加载组件时，获取数据到rows中；
  React.useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET"
      };
      fetch(apiUrl + "/questionnaire/previews", requestOptions)
        .then(handleResponse)
        .then(response => {
          let res = response.reverse();
          let rowData = [];
          for (let i = 0; i < res.length; i++) {
            if (response[i].inTrash === 1) // 数据在回收站中
              rowData.append(
                createData(
                  res[i].taskID,
                  res[i].taskName,
                  res[i].taskType,
                  "未知"
                )
              );
          }
          setRows(rowData);
        });
    };
    fetchData(); // 请求数据
  }, []);

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableBody>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell component="th" scope="row" padding="none">
                  任务ID
                </TableCell>
                <TableCell align="right">任务名</TableCell>
                <TableCell align="right">类型</TableCell>
                <TableCell align="right">删除时间</TableCell>
              </TableRow>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = isSelected(row.taskID);
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.taskID)}
                      role="checkbox"
                      key={row.taskID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.taskID}
                      </TableCell>
                      <TableCell align="right">{row.taskName}</TableCell>
                      <TableCell align="right">{row.taskType}</TableCell>
                      <TableCell align="right">{row.taskDeleteTime}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "前一页"
          }}
          nextIconButtonProps={{
            "aria-label": "后一页"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <div className={classes.button}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={recoverTask}>
              恢复任务
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={deleteTask}>
              彻底删除
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

RecycleBin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecycleBin);
