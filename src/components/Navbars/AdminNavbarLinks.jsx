import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import { handleResponse } from "variables/serverFunc.jsx";
import { Link, Route } from "react-router-dom";

const apiUrl = "https://littlefish33.cn:8080";

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("user-token")) {
      this.props.history.push("/login");
    }
    this.state = {
      open: false,
      notReadNum: 0
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("user-token")) {
      //console.log("XXX");
    } else {
      // 获取未读消息数目,显示在logo上
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        }
      };
      fetch(apiUrl + "/message/count", requestOptions)
        .then(handleResponse)
        .then(response => {
          if (response.code === 200) {
            this.setState({ notReadNum: response.msg });
          }
        });
    }
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Link to="/taskboard">
          <Tooltip title="任务面板">
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Dashboard"
              className={classes.buttonLink}
            >
              <Dashboard className={classes.icons} />
              <Hidden mdUp implementation="css">
                <p className={classes.linkText}>Dashboard</p>
              </Hidden>
            </Button>
          </Tooltip>
        </Link>
        <div className={classes.manager}>
          <Link to="/notifications">
            <Tooltip title="消息通知">
              <Button
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                color={window.innerWidth > 959 ? "transparent" : "white"}
                justIcon={window.innerWidth > 959}
                simple={!(window.innerWidth > 959)}
                aria-owns={open ? "menu-list-grow" : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
                className={classes.buttonLink}
              >
                <Notifications className={classes.icons} />
                {this.state.notReadNum !== "0" && (
                  <span className={classes.notifications}>
                    {" "}
                    {this.state.notReadNum}{" "}
                  </span>
                )}
              </Button>
            </Tooltip>
          </Link>
        </div>
        <Link to="/user">
          <Tooltip title="个人信息">
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Person"
              className={classes.buttonLink}
            >
              <Person className={classes.icons} />
              <Hidden mdUp implementation="css">
                <p className={classes.linkText}>Profile</p>
              </Hidden>
            </Button>
          </Tooltip>
        </Link>
        <Route path="/notifications" />
        <Route path="/user" />
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
