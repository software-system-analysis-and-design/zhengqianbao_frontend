import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import avatar from "assets/img/faces/marc.jpg";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { handleResponse, parseParams, apiUrl } from "variables/serverFunc.jsx";

const cardText =
  "____________________________________________________________________________________________________________ ";
const classes = ["none", "2015", "2016", "2017", "2018"];

class UserProfile extends React.Component {
  _props;
  constructor(props) {
    super(props);
    if (!localStorage.getItem("user-token")) {
      this.props.history.push("login");
    }
    this._props = props;

    this.state = {
      value: "",
      isView: true,
      isUpdateMoney: false,
      addMoney: 0,
      user: {
        name: null,
        phone: null,
        password: null,
        age: null,
        agenda: null,
        university: null,
        company: null,
        class: null,
        iscow: null,
        description: null,
        remain: null
      },
      tempUser: {
        name: null,
        phone: null,
        password: null,
        age: null,
        agenda: null,
        university: null,
        company: null,
        class: null,
        iscow: null,
        description: null,
        remain: null
      }
    };
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.editUserInfo = this.editUserInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.updateMoney = this.updateMoney.bind(this);
    this.cancelUpdateMooney = this.cancelUpdateMooney.bind(this);
    this.ensureUpdateMooney = this.ensureUpdateMooney.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    if (!localStorage.getItem("user-token")) {
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        }
      };
      console.log(requestOptions);
      fetch(apiUrl + "/profile", requestOptions)
        .then(handleResponse)
        .then(response => {
          this.setState({ user: response, tempUser: response });
        });
    }
  }

  updateMoney() {
    this.setState({ isUpdateMoney: true });
  }

  cancelUpdateMooney() {
    this.setState({ isUpdateMoney: false, money: 0 });
  }

  ensureUpdateMooney() {
    var money = parseInt(parseInt(this.state.user.remain) + parseInt(this.state.money));
    console.log(money);
    var data = new FormData();
    data.append("money", money);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token")
      },
      body: data
    };

    fetch(apiUrl + "/updatemoney", requestOptions)
      .then(handleResponse)
      .then(response => {
        console.log(response);
        if (response.code === 200) {
          const { user, tempUser } = this.state;
          this.setState({
            user: {
              ...user,
              remain: money
            },
            tempUser: {
              ...tempUser,
              remain: money
            },
            isUpdateMoney: false,
            money: 0
          });
        }
      });
  }

  componentDidMount() {
    if (!localStorage.getItem("user-token")) {
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user-token")
        }
      };

      fetch(apiUrl + "/profile", requestOptions)
        .then(handleResponse)
        .then(response => {
          this.setState({ user: response, tempUser: response });
        });
    }
  }

  updateUserInfo() {
    console.log(this.state.tempUser);
    var updateInfo = this.state.tempUser;
    updateInfo.gender = this.state.tempUser.gender === 1 ? "男" : "女";
    updateInfo.class = classes[this.state.tempUser.class];
    console.log(this.state.tempUser);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user-token"),
        "content-type": "application/x-www-form-urlencoded"
      },
      body: parseParams(updateInfo)
    };
    console.log(requestOptions);
    fetch(apiUrl + "/update", requestOptions)
      .then(handleResponse)
      .then(response => {
        if (response.code === 200) {
          this.setState({ user: updateInfo });
        }
      });

    this.setState({ isView: true });
  }

  cancelUpdate() {
    this.setState({ isView: true, tempUser: this.state.user });
  }

  editUserInfo() {
    this.setState({ isView: false });
    const tempUserInfo = this.state.tempUser;
    console.log(tempUserInfo);
    this.setState({
      tempUser: {
        ...tempUserInfo,
        gender: tempUserInfo.gender === "男" ? 1 : 2,
        class: getIndex(tempUserInfo.class)
      }
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name === "remain") {
      this.setState({ money: value });
      return;
    }
    const { tempUser } = this.state;
    this.setState({
      tempUser: {
        ...tempUser,
        [name]: value
      }
    });
  }

  logout(){
    localStorage.setItem("user-token", "");
    this.props.history.push("/login");
  }

  render() {
    const { user, tempUser } = this.state;
    return (
      <div>
        <GridContainer justify="center" direction="column" alignItems="center">
          <GridItem xs={12} sm={12} md={8}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6>{user.iscow ? "奶牛" : "学生"}</h6>
                <h4>{user.name}</h4>
                <p style={{ fontSize: "11pt" }}>余额：{user.remain}</p>
								<Button onClick={this.logout}>退出登录</Button>
                <p>
                  {
                    "____________________________________________________________________________________________________________ "
                  }
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <GridContainer
                  justify="center"
                  direction="column"
                  alignItems="center"
                >
                  <h4>用户信息</h4>
                  <Button color="primary" onClick={this.editUserInfo}>
                    编辑
                  </Button>
                </GridContainer>
              </CardHeader>
              <CardBody style={{ display: user.iscow ? "none" : "block" }}>
                <p>{cardText}</p>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>昵称 : {user.name}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>性别 : {user.gender}</p>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>年级 : {user.class}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>年龄 : {user.age}</p>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>学校 : {user.university}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>手机号 : {user.phone}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "10pt" }}>关于我 :</p>
                    <p style={{ fontSize: "14pt" }}>{user.description}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <div
                      style={{
                        display: this.state.isUpdateMoney ? "inline" : "none"
                      }}
                    >
                      <CustomInput
                        labelText="充值金额"
                        id="money"
                        type="number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "remain"
                        }}
                        onChange={this.handleChange}
                      />
                      <Button color="primary" fontSize="5pt" onClick={this.ensureUpdateMooney}>
                        确定
                      </Button>
                      <Button color="primary" fontSize="5pt" onClick={this.cancelUpdateMooney}>
                        取消
                      </Button>
                    </div>
                    <Button
                      style={{
                        display: this.state.isUpdateMoney ? "none" : "inline"
                      }}
                      color="primary"
                      fontSize="5pt"
                      onClick={this.updateMoney}
                    >
                      充值
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{ display: this.state.isView ? "none" : "inline" }}
                >
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="昵称"
                      id="student-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "name"
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel
                      htmlFor="user-gender"
                      style={{ fontSize: "11pt", color: "grey" }}
                      fullWidth
                    >
                      性别
                    </InputLabel>
                    <Select
                      value={tempUser.gender}
                      onChange={this.handleChange}
                      inputProps={{
                        name: "gender",
                        id: "user-gender"
                      }}
                      fullWidth
                    >
                      <MenuItem value={1}>男</MenuItem>
                      <MenuItem value={2}>女</MenuItem>
                    </Select>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{ display: this.state.isView ? "none" : "inline" }}
                >
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel
                      htmlFor="class-simple"
                      style={{ fontSize: "11pt", color: "grey" }}
                      fullWidth
                    >
                      年级
                    </InputLabel>
                    <Select
                      value={tempUser.class}
                      onChange={this.handleChange}
                      inputProps={{
                        name: "class",
                        id: "class-simple"
                      }}
                      fullWidth
                    >
                      <MenuItem value={1}>2015</MenuItem>
                      <MenuItem value={2}>2016</MenuItem>
                      <MenuItem value={3}>2017</MenuItem>
                      <MenuItem value={4}>2018</MenuItem>
                    </Select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="年龄"
                      id="student-age"
                      type="number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "age"
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{ display: this.state.isView ? "none" : "inline" }}
                >
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="学校"
                      id="university"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "university"
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{ display: this.state.isView ? "none" : "inline" }}
                >
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>关于我</InputLabel>
                    <CustomInput
                      labelText={user.description}
                      id="about-me"
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        name: "description"
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardBody style={{ display: user.iscow ? "block" : "none" }}>
                <p>{cardText}</p>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>昵称 : {user.name}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>手机号 : {user.phone}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "14pt" }}>企业 : {user.company}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <p style={{ fontSize: "10pt" }}>关于我 :</p>
                    <p style={{ fontSize: "14pt" }}>{user.description}</p>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ display: this.state.isView ? "inline" : "none" }}
                  >
                    <div
                      style={{
                        display: this.state.isUpdateMoney ? "inline" : "none"
                      }}
                    >
                      <CustomInput
                        labelText="充值金额"
                        id="money"
                        type="number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "remain"
                        }}
                        onChange={this.handleChange}
                      />
                      <Button color="primary" fontSize="5pt" onClick={this.ensureUpdateMooney}>
                        确定
                      </Button>
                      <Button color="primary" fontSize="5pt" onClick={this.cancelUpdateMooney}>
                        取消
                      </Button>
                    </div>
                    <Button
                      style={{
                        display: this.state.isUpdateMoney ? "none" : "inline"
                      }}
                      color="primary"
                      fontSize="5pt"
                      onClick={this.updateMoney}
                    >
                      充值
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{ display: this.state.isView ? "none" : "inline" }}
                >
                  <GridItem xs={12} sm={12} md={6}>
										<p>昵称</p>
                    <CustomInput
                      value={user.name}
                      id="student-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "name"
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
										<p>企业</p>
                    <CustomInput
                      value={user.company}
                      id="company"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "company"
                      }}
                      onChange={this.handleChange}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <p>关于我</p>
                    <CustomInput
                      value={user.description}
                      id="about-me"
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: false,
                        rows: 5,
                        name: "description"
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  style={{ display: this.state.isView ? "none" : "inline" }}
                  onClick={this.updateUserInfo}
                >
                  更新
                </Button>
                <Button
                  color="primary"
                  style={{ display: this.state.isView ? "none" : "inline" }}
                  onClick={this.cancelUpdate}
                >
                  取消
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

function getIndex(the_class) {
  for (var i = 0; i < classes.length; i++) {
    if (the_class === classes[i]) {
      return i;
    }
  }
  return 0;
}

export default UserProfile;
