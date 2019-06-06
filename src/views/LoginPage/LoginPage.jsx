import React from 'react';
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.jsx";
import {handleResponse, parseParams, apiUrl} from "variables/serverFunc.jsx"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            userphone: null,
            password: null,
            submitted: false,
            responseMsg:" ",
            user_error:false,
            password_error:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({responseMsg: ""});
    }

    login(userphone, password){
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: parseParams({"phone":userphone, "password":password})
        };
        fetch(apiUrl+"/login",requestOptions)
        .then(handleResponse)
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(response.code === 200){
                localStorage.setItem('user-token', response.data.token);
                this.props.history.push('/');
            }else{
                const msg = response.msg;
                this.setState({responseMsg: msg});
                if(response.code === 400)
                    this.setState({user_error: true, password_error: false});
                else if(response.code === 401)
                    this.setState({user_error: false, password_error: true});
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userphone, password } = this.state;
        const { dispatch } = this.props;
        if (userphone && password) {
            this.login(userphone, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { userphone, password, submitted, responseMsg, user_error, password_error } = this.state;
        return (
		<div>
			<GridContainer justify="center" direction="column" alignItems="center">
            <div className="col-md-6 col-md-offset-3" style={{width:"400px"}}>
				<h2>登录</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !userphone ? ' has-error' : '')}>
						<TextField
							id="phone"
							label="手机号"
							type="text"
							className="form-control"
							value={userphone}
							onChange={this.handleChange}
							margin="normal"
							inputProps={{
							name: 'userphone',
							}}
							fullWidth
						  />
                        {submitted && !userphone &&
                            <div className="help-block" style={{color: "red"}}>手机号不可为空</div>
                        }
                        {submitted && userphone && user_error &&
                            <div className="help-block" style={{color: "red"}}>{responseMsg}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <TextField
							id="password"
							label="密码"
							className="form-control"
							type="password"
							value={password}
							autoComplete="current-password"
							onChange={this.handleChange}
							margin="normal"
							inputProps={{
							name: 'password',
							}}
							fullWidth
						  />
						  {submitted && !password &&
                            <div className="help-block" style={{color: "red"}}>密码不可为空</div>
                          }
                          {submitted && password && !user_error && password_error &&
                            <div className="help-block" style={{color: "red"}}>{responseMsg}</div>
						  }
                    </div>
                    <div className="form-group">
                        <Button className="btn btn-primary" color="primary" type="submit">登录</Button>
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/register" >
							<Button color="primary">注册</Button>
						</Link>
                    </div>
                </form>
            </div>
			</GridContainer>
		</div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
};
export default LoginPage;