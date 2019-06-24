import React from "react";
import { Link } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import logo from "assets/img/logo.jpg";
import {handleResponse, parseParams, apiUrl} from "variables/serverFunc.jsx";

const classes = ["none", "2015", "2016", "2017", "2018"];

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    //this.props.router = props;
    this.state = {
      user: {
        username: null,
        role: null,
        userphone: null,
        password: null,
        age: null,
        class: null,
        university: null,
        company: null,
        gender: null
      },
      submitted: false,
      confirm_password: null,
      error_msg: " "
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    var input_value = value;
    if (name === "confirm_password") {
      this.setState({ [name]: input_value });
    } else {
      if (name === "userphone") {
        this.setState({ error_msg: "" });
      }
      this.setState({
        user: {
          ...user,
          [name]: input_value
        }
      });
    }
  }

  register(user) {
    const inputInfo = {
      phone: user.userphone,
      iscow: user.role === 1 ? 0 : 1,
      name: user.username,
      password: user.password,
      gender: user.gender === 1 ? "男" : "女",
      age: user.age,
      university: user.university,
      company: user.company,
      description: "",
      class: classes[user.class]
    };
    console.log(inputInfo);
    console.log(parseParams(inputInfo));
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/x-www-form-urlencoded"
      },
      body: parseParams(inputInfo)
    };
    fetch(apiUrl + "/register", requestOptions)
      .then(handleResponse)
      .then(response => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // console.log(response);
        if (response.code === 200) {
          localStorage.setItem("user", inputInfo);
          this.props.history.push("/login");
        } else {
          const msg = response.msg;
          this.setState({ error_msg: msg });
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.role && user.role === 1) {
      user.company = " ";
    } else if (user.role && user.role === 2) {
      user.gender = " ";
      user.university = " ";
      user.class = 0;
      user.age = -1;
    }
    if (
      user.username &&
      user.password &&
      user.userphone &&
      this.state.confirm_password &&
      user.role &&
      user.class != null &&
      user.university &&
      user.company
    ) {
      this.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted, error_msg } = this.state;
    return (
      <div>
        <GridContainer justify="center" direction="column" alignItems="center">
          <div className="col-md-6 col-md-offset-3" style={{ width: "400px" }}>
            <div style={{marginTop: "100px", textAlign: "center"}}>
              <img style={{verticalAlign: "middle"}} src={logo} width='70px' height='70px' alt='.....'/>
              <span style={{fontSize:"30pt", verticalAlign:"middle", marginLeft:"10px"}}>挣钱宝</span>
            </div>
            <h3>注册</h3>
            <form name="form" onSubmit={this.handleSubmit}>
              <div
                className={
                  "form-group" +
                  (submitted && !user.firstName ? " has-error" : "")
                }
              >
                <TextField
                  id="username"
                  label="昵称"
                  className="form-control"
                  value={user.username}
                  onChange={this.handleChange}
                  margin="normal"
                  inputProps={{
                    name: "username"
                  }}
                  fullWidth
                />
                {submitted && !user.username && (
                  <div className="help-block" style={{ color: "red" }}>
                    昵称不可为空
                  </div>
                )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.firstName ? " has-error" : "")
                }
              >
                <TextField
                  id="userphone"
                  label="手机号"
                  className="form-control"
                  value={user.userphone}
                  onChange={this.handleChange}
                  margin="normal"
                  inputProps={{
                    name: "userphone"
                  }}
                  fullWidth
                />
                {submitted && !user.userphone && (
                  <div className="help-block" style={{ color: "red" }}>
                    手机号不可为空
                  </div>
                )}
                {submitted && user.userphone && (
                  <div className="help-block" style={{ color: "red" }}>
                    {error_msg}
                  </div>
                )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.password ? " has-error" : "")
                }
              >
                <TextField
                  id="password"
                  label="密码"
                  className="form-control"
                  type="password"
                  value={user.password}
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  margin="normal"
                  inputProps={{
                    name: "password"
                  }}
                  fullWidth
                />
                {submitted && !user.password && (
                  <div className="help-block" style={{ color: "red" }}>
                    密码不可为空
                  </div>
                )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.password ? " has-error" : "")
                }
              >
                <TextField
                  id="confirm-password"
                  label="确认密码"
                  className="form-control"
                  type="password"
                  value={this.state.confirm_password}
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  margin="normal"
                  inputProps={{
                    name: "confirm_password"
                  }}
                  fullWidth
                />
                {submitted && !this.state.confirm_password && (
                  <div className="help-block" style={{ color: "red" }}>
                    确认密码不可为空
                  </div>
                )}
                {submitted &&
                  this.state.confirm_password &&
                  user.password &&
                  this.state.confirm_password !== user.password && (
                    <div className="help-block" style={{ color: "red" }}>
                      密码不同
                    </div>
                  )}
              </div>
              <InputLabel htmlFor="user-role" fullWidth>
                角色
              </InputLabel>
              <Select
                value={user.role}
                onChange={this.handleChange}
                inputProps={{
                  name: "role",
                  id: "user-role"
                }}
                fullWidth
              >
                <MenuItem value={1}>学生</MenuItem>
                <MenuItem value={2}>奶牛</MenuItem>
              </Select>
              {submitted && !user.role && (
                <div className="help-block" style={{ color: "red" }}>
                  角色不可为空
                </div>
              )}
              <div style={{ display: user.role === 1 ? "block" : "none" }}>
                <InputLabel htmlFor="user-gender" fullWidth>
                  性别
                </InputLabel>
                <Select
                  value={user.gender}
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
                {submitted && !user.gender && (
                  <div className="help-block" style={{ color: "red" }}>
                    性别不可为空
                  </div>
                )}
                <div
                  className={
                    "form-group" + (submitted && !user.age ? " has-error" : "")
                  }
                >
                  <TextField
                    id="age"
                    label="年龄"
                    className="form-control"
                    type="number"
                    value={user.age}
                    onChange={this.handleChange}
                    margin="normal"
                    inputProps={{
                      name: "age"
                    }}
                    fullWidth
                  />
                  {submitted && !user.age && (
                    <div className="help-block" style={{ color: "red" }}>
                      年龄不可为空
                    </div>
                  )}
                </div>
                <InputLabel htmlFor="class-simple" fullWidth>
                  年级
                </InputLabel>
                <Select
                  value={user.class}
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
                {submitted && !user.class && (
                  <div className="help-block" style={{ color: "red" }}>
                    年级不可为空
                  </div>
                )}
                <div
                  className={
                    "form-group" +
                    (submitted && !user.university ? " has-error" : "")
                  }
                >
                  <TextField
                    id="university"
                    label="学校"
                    className="form-control"
                    value={user.university}
                    onChange={this.handleChange}
                    margin="normal"
                    inputProps={{
                      name: "university"
                    }}
                    fullWidth
                  />
                  {submitted && !user.university && (
                    <div className="help-block" style={{ color: "red" }}>
                      大学不可为空
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: user.role === 2 ? "block" : "none" }}>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.company ? " has-error" : "")
                  }
                >
                  <TextField
                    id="company"
                    label="企业"
                    className="form-control"
                    value={user.company}
                    onChange={this.handleChange}
                    margin="normal"
                    inputProps={{
                      name: "company"
                    }}
                    fullWidth
                  />
                  {submitted && !user.company && (
                    <div className="help-block" style={{ color: "red" }}>
                      “企业不可为空”
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <Button
                  className="btn btn-primary"
                  color="primary"
                  type="submit"
                >
                  注册
                </Button>
                {registering && (
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                )}
                <Link to="/login">
                  <Button color="primary">取消</Button>
                </Link>
              </div>
            </form>
          </div>
        </GridContainer>
      </div>
    );
  }
}

export default RegisterPage;
