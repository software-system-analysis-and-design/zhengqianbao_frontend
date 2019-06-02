import React from 'react';
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.jsx";
//import { userActions } from '../_actions';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
		//this.props.router = props;
        this.state = {
            user: {
                username: '',
                password: '',
				age: null,
				class: null,
				university:''
            },
            submitted: false,
			confirm_password:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
        });
    }

    handleSubmit(event) {
        event.preventDefault();
		this.props.history.push('/');
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            //dispatch(userActions.register(user));
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
							fullWidth
						  />
                        {submitted && !user.firstName &&
                            <div className="help-block">UserName is required</div>
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
							fullWidth
						  />
                        {submitted && !user.password &&
                            <div className="help-block">Confirming password is required</div>
                        }
                    </div>
					<div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
						<TextField
							id="age"
							label="Age"
							className="form-control"
							type="number"
							value={user.age}
							onChange={this.handleChange}
							margin="normal"
							fullWidth
						  />
                        {submitted && !user.password &&
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
						<MenuItem value={1}>one</MenuItem>
						<MenuItem value={2}>two</MenuItem>
						<MenuItem value={3}>three</MenuItem>
						<MenuItem value={4}>four</MenuItem>
					</Select>
					<div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
						<TextField
							id="university"
							label="university"
							className="form-control"
							value={user.university}
							onChange={this.handleChange}
							margin="normal"
							fullWidth
						  />
                        {submitted && !user.firstName &&
                            <div className="help-block">University is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <Button className="btn btn-primary" color="primary" type="submit">Register</Button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login">Cancel</Link>
                    </div>
                </form>
            </div>
			</GridContainer>
		</div>
        );
    }
}

export default RegisterPage