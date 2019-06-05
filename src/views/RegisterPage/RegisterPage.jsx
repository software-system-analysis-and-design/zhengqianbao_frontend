import React from 'react';
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.jsx";
import { userActions } from '../_actions';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const classes = ["2015", "2016", "2017", "2018"];

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
		//this.props.router = props;
        this.state = {
            user: {
                username: null,
				role: null,
				userphone:null,
                password: null,
				age: null,
				class: null,
				university:null,
				company:null,
				gender: null
            },
            submitted: false,
			confirm_password:null
			
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
		var input_value = value;
		if(name == "confirm_password"){
			this.setState({[name]:input_value});
		}else{
			this.setState({
				user: {
					...user,
					[name]: input_value
				},
			});
		}
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
		if(user.role && user.role == 1){
			user.company = " ";
			user.class = classes[user.class-1];
		}else if(user.role && user.role == 2){
			user.gender = " ";
			user.university = " ";
			user.class = -1;
			user.age = -1;
		}
        if (user.username && user.password && user.userphone && 
			this.state.confirm_password && user.role && user.class && user.university && user.company) {
            console.log("register");
			userActions.register(user);
			//this.props.history.push('/');
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
		<div>
			<GridContainer justify="center" direction="column" alignItems="center" >
            <div className="col-md-6 col-md-offset-3" style={{width:"400px"}}>
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
						<TextField
							id="username"
							label="Name"
							className="form-control"
							value={user.username}
							onChange={this.handleChange}
							margin="normal"
							inputProps={{
							name: 'username',
							}}
							fullWidth
						  />
                        {submitted && !user.username &&
                            <div className="help-block">UserName is required</div>
                        }
                    </div>
					<div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
						<TextField
							id="userphone"
							label="Phone"
							className="form-control"
							value={user.userphone}
							onChange={this.handleChange}
							margin="normal"
							inputProps={{
							name: 'userphone',
							}}
							fullWidth
						  />
                        {submitted && !user.userphone &&
                            <div className="help-block">Phone is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
						<TextField
							id="password"
							label="Password"
							className="form-control"
							type="password"
							value={user.password}
							autoComplete="current-password"
							onChange={this.handleChange}
							margin="normal"
							inputProps={{
							name: 'password',
							}}
							fullWidth
						  />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
					<div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
						<TextField
							id="confirm-password"
							label="confirm Password"
							className="form-control"
							type="password"
							value={this.state.confirm_password}
							autoComplete="current-password"
							onChange={this.handleChange}
							margin="normal"
							inputProps={{
							name: 'confirm_password',
							}}
							fullWidth
						  />
                        {submitted && !this.state.confirm_password &&
                            <div className="help-block">Confirming password is required</div>
                        }
						{submitted && this.state.confirm_password && user.password && (this.state.confirm_password != user.password) &&
							<div className="help-block">Confirm password is not the same</div>
						}
                    </div>
					<InputLabel htmlFor="user-role" fullWidth>Role</InputLabel>
					<Select
						value={user.role}
						onChange={this.handleChange}
						inputProps={{
						name: 'role',
						id: 'user-role',
						}}
						fullWidth
					>
						<MenuItem value={1}>Student</MenuItem>
						<MenuItem value={2}>Cow</MenuItem>
					</Select>
					{submitted && !user.role &&
						<div className="help-block">Role is required</div>
					}
					<div style={{display: (user.role == 1)? "block":"none"}}>
						<InputLabel htmlFor="user-gender" fullWidth>Gender</InputLabel>
						<Select
							value={user.gender}
							onChange={this.handleChange}
							inputProps={{
							name: 'gender',
							id: 'user-gender',
							}}
							fullWidth
						>
							<MenuItem value={1}>Male</MenuItem>
							<MenuItem value={2}>Female</MenuItem>
						</Select>
						{submitted && !user.gender &&
							<div className="help-block">Gender is required</div>
						}
						<div className={'form-group' + (submitted && !user.age ? ' has-error' : '')}>
							<TextField
								id="age"
								label="Age"
								className="form-control"
								type="number"
								value={user.age}
								onChange={this.handleChange}
								margin="normal"
								inputProps={{
								name: 'age',
								}}
								fullWidth
							  />
							{submitted && !user.age &&
								<div className="help-block">Age is required</div>
							}
						</div>
						<InputLabel htmlFor="class-simple" fullWidth>Class</InputLabel>
						<Select
							value={user.class}
							onChange={this.handleChange}
							inputProps={{
							name: 'class',
							id: 'class-simple',
							}}
							fullWidth
						>
							<MenuItem value={1}>2015</MenuItem>
							<MenuItem value={2}>2016</MenuItem>
							<MenuItem value={3}>2017</MenuItem>
							<MenuItem value={4}>2018</MenuItem>
						</Select>
						{submitted && !user.class &&
								<div className="help-block">Class is required</div>
							}
						<div className={'form-group' + (submitted && !user.university ? ' has-error' : '')}>
							<TextField
								id="university"
								label="university"
								className="form-control"
								value={user.university}
								onChange={this.handleChange}
								margin="normal"
								inputProps={{
								name: 'university',
								}}
								fullWidth
							  />
							{submitted && !user.firstName &&
								<div className="help-block">University is required</div>
							}
						</div>
					</div>
					<div style={{display: (user.role == 2)? "block":"none"}}>
						<div className={'form-group' + (submitted && !user.company ? ' has-error' : '')}>
							<TextField
								id="company"
								label="Company"
								className="form-control"
								value={user.company}
								onChange={this.handleChange}
								margin="normal"
								inputProps={{
								name: 'company',
								}}
								fullWidth
							  />
							{submitted && !user.company &&
								<div className="help-block">Company is required</div>
							}
						</div>
					</div>
					<div className="form-group">
						<Button className="btn btn-primary" color="primary" type="submit">Register</Button>
						{registering && 
							<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
						}
						<Link to="/login">
						<Button color="primary">Cancel</Button>
						</Link>
					</div>
					
                </form>
            </div>
			</GridContainer>
		</div>
        );
    }
}

export default RegisterPage