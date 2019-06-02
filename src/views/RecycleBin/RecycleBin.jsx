import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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

function createData(taskID, taskName, taskType, taskDeleteTime){
  return { taskID, taskName, taskType, taskDeleteTime };
}

const rows = [
  createData("0001", "任务1", "问卷", "2019-01-02"),
  createData("0002", "任务2", "问卷", "2019-01-03")
];

function RecycleBin(props) {
  const { classes } = props;
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

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
                <TableCell padding="checkbox"></TableCell>
                <TableCell component="th" scope="row" padding="none">任务ID</TableCell>
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
            <Button variant="contained" color="secondary">
              恢复任务
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary">
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
