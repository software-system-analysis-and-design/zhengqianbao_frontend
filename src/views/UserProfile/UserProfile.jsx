import React from "react";
//import ReactDOM feom "react-dom"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
import user from 'variables/global.jsx'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

var state={
	isEdit: false,
	isView: false
};

function initialUser(){
	user.name = "邵梓硕";
	user.age = 22;
	user.agenda = "男";
	user.university = "中山大学";
	user.company = "无";
	user.class = "大四";
}

class UserProfile extends React.Component{
	_props;
	constructor(props){
        super(props)
        this._props = props;
		this.state = {
            value: '',
			isView: true
        };
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.editUserInfo = this.editUserInfo.bind(this);
		initialUser();
    }
	

	updateUserInfo(){
		this.setState({isView: true});
	}

	editUserInfo(){
		this.setState({isView: false});
	}

	agendaChange(e){
		user.agenda = e.target.value;
	}

	nameChange(e){
		user.name = e.target.value;
	}

	ageChange(e){
		user.age = e.target.value;
	}

	classChange(e){
		user.class = e.target.value;
	}

	universityChange(e){
		user.university = e.target.value;
	}

	render(){
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
					<h6 >CEO / STUDENT</h6>
					<h4 >{user.name}</h4>
					<p >
					Don't be scared of the truth because we need to restart the
					human foundation in truth And I love you like Kanye loves Kanye
					I love Rick Owens’ bed design but the back is...
					</p>
				</CardBody>
				</Card>
			</GridItem>
			<GridItem xs={12} sm={12} md={8}>
				<Card>
				<CardHeader color="primary">
					<GridContainer justify="center" direction="column" alignItems="center">
						<h4 >Your Profile</h4>
						<Button color="primary" onClick={this.editUserInfo}>Edit</Button>
					</GridContainer>
              
				</CardHeader>
				<CardBody>
					<p >
					You can click the "edit" button above to edit your profile, and then click "update" button
					 to save your input as your new profile.
					</p>
					<GridContainer>
					<GridItem xs={12} sm={12} md={6} style={{display: (this.state.isView) ? "inline":"none"}}>
						<p style={{fontSize:"14pt"}}>Name : {user.name}</p>
					</GridItem>
					<GridItem xs={12} sm={12} md={6} style={{display: (this.state.isView) ? "inline":"none"}}>
						<p style={{fontSize:"14pt"}}>Agender : {user.agenda}</p>
					</GridItem>
					</GridContainer>
					<GridContainer>
					<GridItem xs={12} sm={12} md={6} style={{display: (this.state.isView) ? "inline":"none"}}>
						<p style={{fontSize:"14pt"}}>class : {user.class}</p>
					</GridItem>
					<GridItem xs={12} sm={12} md={6} style={{display: (this.state.isView) ? "inline":"none"}}>
						<p style={{fontSize:"14pt"}}>Age : {user.age}</p>
					</GridItem>
					</GridContainer>
					<GridContainer>
					<GridItem xs={12} sm={12} md={6} style={{display: (this.state.isView) ? "inline":"none"}}>
						<p style={{fontSize:"14pt"}}>university: {user.university}</p>
					</GridItem>
					</GridContainer>
					<GridContainer style={{display: (this.state.isView) ? "none":"inline"}}>
					<GridItem xs={12} sm={12} md={6}>
						<CustomInput
						labelText="Name"
						id="student-name"
						formControlProps={{
							fullWidth: true
						}}
						onChange={(e)=>this.nameChange(e)}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<CustomInput
						labelText="Agender"
						id="student-agender"
						formControlProps={{
							fullWidth: true
						}}
						onChange={(e)=>this.agendaChange(e)}
						/>
					</GridItem>
					
					</GridContainer>
					<GridContainer  style={{display: (this.state.isView) ? "none":"inline"}}>
					<GridItem xs={12} sm={12} md={6}>
						<CustomInput
						labelText="class"
						id="student-class"
						formControlProps={{
							fullWidth: true
						}}
						onChange={(e)=>this.classChange(e)}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<CustomInput
						labelText="Age"
						id="student-age"
						formControlProps={{
							fullWidth: true
						}}
						onChange={(e)=>this.ageChange(e)}
						/>
					</GridItem>
					</GridContainer>
					<GridContainer style={{display: (this.state.isView) ?  "none":"inline"}}>
					<GridItem xs={12} sm={12} md={12}>
						<CustomInput
						labelText="University/Company"
						id="university"
						formControlProps={{
							fullWidth: true
						}}
						onChange={(e)=>this.universityChange(e)}
						/>
					</GridItem>
					</GridContainer>
					<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
						<CustomInput
						labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
						id="about-me"
						formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							multiline: true,
							rows: 5
						}}
						/>
					</GridItem>
					</GridContainer>
				</CardBody>
				<CardFooter>
					<Button color="primary" style={{display: (this.state.isView) ? "none":"inline"}} onClick={this.updateUserInfo}>Update Profile</Button>
				</CardFooter>
				</Card>
			</GridItem>
			</GridContainer>
		</div>
		);
    }
    
};

export default UserProfile;
/*
function UserProfile(props) {
  const { classes } = props;
  initialUser();
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
              <h6 className={classes.cardCategory}>CEO / STUDENT</h6>
              <h4 className={classes.cardTitle}>{user.name}</h4>
              <p className={classes.description}>
                Don't be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Your Profile</h4>
			  <GridContainer justify="flex-end" direction="row" alignItems="center">
				  <Button color="primary" style={{marginRight:"30px"}} onClick={editUserInfo}>Edit</Button>
			  </GridContainer>
              
            </CardHeader>
            <CardBody>
			  <GridContainer className={classes.viewMode} style={{display: (state.isView) ? "run-in":"none"}}>
				<GridItem xs={12} sm={12} md={6}>
                  <p style={{fontSize:"14pt"}}>Agender : {user.agenda}</p>
                </GridItem>
				<GridItem xs={12} sm={12} md={6}>
                  <p style={{fontSize:"14pt"}}>Age : {user.age}</p>
                </GridItem>
			  </GridContainer>
			  <GridContainer className={classes.viewMode} style={{display: (state.isView) ? "run-in":"none"}}>
				<GridItem xs={12} sm={12} md={6}>
                  <p style={{fontSize:"14pt"}}>class : {user.class}</p>
                </GridItem>
			   </GridContainer>
			   <GridContainer className={classes.viewMode} style={{display: (state.isView) ? "run-in":"none"}}>
				<GridItem xs={12} sm={12} md={12}>
                  <p style={{fontSize:"14pt"}}>University : {user.university}</p>
                </GridItem>
				<GridItem xs={12} sm={12} md={12}>
                  <p style={{fontSize:"14pt"}}>Company : {user.company}</p>
                </GridItem>
			  </GridContainer>
              <GridContainer className={classes.editMode} style={{display: !(state.isView) ? "run-in":"none"}}>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Agender"
                    id="student-agender"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<CustomInput
					labelText="Age"
					id="student-age"
					formControlProps={{
						fullWidth: true
					}}
					/>
				</GridItem>
              </GridContainer>
              <GridContainer className={classes.editMode} style={{display: !(state.isView) ? "run-in":"none"}}>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="className"
                    id="student-className"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer className={classes.editMode} style={{display: !(state.isView) ? "run-in":"none"}}>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="University"
                    id="university"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Company"
                    id="company"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" style={{display: !(state.isView) ? "run-in":"none"}} onClick={updateUserInfo}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(UserProfile);
*/