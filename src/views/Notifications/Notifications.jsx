/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  card: {
    maxWidth: 850,
    margin: "auto",
    overflow: "hidden",
  },
  button: {
    margin: "0px 0 0 80%"
  },
  paper: {
    padding: "20px",
    margin: "10px 0 0 0"
  },
  typography: {
    margin: "0 10% 0 0"
  }
};


function MessageBox (props) {
  const {classes, MsgID, Time, Content, Title, deleteOneMsg, hiddenAll} = props;

  const [show, setShow] = React.useState("not null");

  function deleteMsg() {
    deleteOneMsg(MsgID);  // 通知父组件删除该消息
    setShow(null);
    console.log("delete")
  }

  return (
    <div>
      {
        show !== null && hiddenAll !==null ? (
        <Paper className={classes.paper}> 
          <AddAlert /> {"  "}{"【"} <strong>{Title}</strong>  {"】 "}{Time.replace("T", " ")}  
          <Typography variant="body1" gutterBottom className={classes.typography}>
            {Content}
            <IconButton onClick={deleteMsg}>
              <DeleteOutlinedIcon color="inherit"/>
            </IconButton>
          </Typography>
        </Paper>):(null)
      }
    </div>
  )
}



function Notifications (props) {
  const { classes } = props;

  const [msgList, setMsgList] = React.useState([]);
  
  const [hiddenAll, setHiddenAll] = React.useState("show") // if it's null, all msgs will be hidden.


  React.useEffect(()=>{
    // TODO  Get消息列表数据，存入msglist内部
  }, [])

  const clearMsg = async ()=> {
    // 一键清空所有的消息  TODO
    let msgs = msgList;
    if (msgs.length === 0){
      alert("暂无可清除的消息");
    }
    for (let i = 0; i < msgs.length; i++){
      deleteOneMsg(msgs[i].MsgID);  // 在该函数种会对msglist进行set操作
    }
    setHiddenAll(null);
  }

  function deleteOneMsg(msgID) {
    let msgs = msgList;
    let index = 0;
    for (let i = 0; i < msgs.length; i++){
      if (msgs[i].MsgID === msgID){
        index = i;
        break;
      }
    }

    // TODO 发送post请求，删除该条消息

    msgs.splice(index, 1);
    setMsgList(msgs);
  }

  return (
    <div className={classes.card}>
      <Card>
        <CardHeader color="primary">
          <h3 className={classes.cardTitleWhite}>消息通知列表</h3>
          <Button className={classes.button} variant="contained" color="primary" onClick={clearMsg}>清空消息</Button>
        </CardHeader>
        <CardBody>
        {
        msgList.length === 0 ? (
          <Typography variant="body1" gutterBottom className={classes.typography}>暂无消息通知。</Typography>
        ) : (
            <GridContainer>
              <GridItem xs={12}>
                {
                  msgList.map(msg => (
                    <MessageBox 
                      MsgID={msg.MsgID}
                      Time={msg.Time}
                      Content={msg.Content}
                      Title={msg.Title}
                      classes={classes}
                      deleteOneMsg={deleteOneMsg}
                      hiddenAll={hiddenAll}
                    />
                  ))
                }
              </GridItem>
            </GridContainer>)
        }
        </CardBody>
      </Card>
    </div>
  );
}


Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);
