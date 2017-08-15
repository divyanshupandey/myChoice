
import React from 'react';
import {Link} from 'react-router';
import {ScreenClassRender} from 'react-grid-system';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import CommunicationEmail from 'material-ui/svg-icons/Communication/email';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Container, Row, Col} from 'react-grid-system';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Request from 'superagent';
import Dialog from 'material-ui/Dialog';
import EntertainmentDashboard from './../entertainmentDashboard';
const styles = {
  msgStyle: {
    marginTop : 7,
    marginLeft : '20%',
    color : 'grey'
  },
  headline: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};
const imgStyle = (screenClass) => {
  if (screenClass === 'xl') {return { width: '350px', height:'300px' };}
  if (screenClass === 'lg') {return { width: '320px', height:'280px' };}
  if (screenClass === 'md') {return { width: '350px', height:'auto' };}
  if (screenClass === 'sm') {return { width: '320px', height:'auto'};}
  return { width: '280px', height: '280'};
};
const divStyle = (screenClass) => {
  if (screenClass === 'xl') {return { width: '57%',margin:"10% auto auto",
  backgroundColor:'white'};}
  if (screenClass === 'lg') {return { width: '56.7%',margin:"9% 10% 10% 22.9%",
  backgroundColor:'white'};}
  if (screenClass === 'md') {return { width: '350px',margin:"2% auto auto" };}
  if (screenClass === 'sm') {return { width: '320px',margin:"2% auto auto" };}
  return { width: '280px',margin:"2% auto auto"};

};
const backStyle = (screenClass) => {
  if (screenClass === 'xl') {return { height:'100%' };}
  if (screenClass === 'lg') {return { height:'100%' };}
  if (screenClass === 'md') {return { height:'100%' };}
  if (screenClass === 'sm') {return { height:'100%' };}
  return { height:'100%' };
};
const tfont={
  fontSize:'15px'
};
const tabStyle={
  backgroundColor:'grey'
};

const customContentStyle = {
  width: '50%',
  height: '30%',
  maxWidth: 'none'
};
const inputStyle = {
border: '1px solid grey',
width: '60%',
margin: '1.5% 20%',
borderRadius: '5px',
};
const Label={margfontWeight:'bold',
color:'grey',marginTop:'-5px'};


const errorMessages= {
  passwordError: 'Invalid password',
  emailError: 'email id not found'
} ;

export default class Opinion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    slideIndex : 0,
    canSubmit : false,
    canSignUP : false,
    errMsg : '',
    emails : [],
    otp : '# this is opinion otp by pandey #',
    email : '',
    password : '',
    name : '',
    errMsgSignUP : '',
    open : false,
    otpSubmit : false,
    token : '',
    img : './../assets/images/signin.jpg',
    guest : false
};
this.handleSubmit = this.handleSubmit.bind(this);
this.handleOTPSubmit = this.handleOTPSubmit.bind(this);
this.handleSubmitSignUP = this.handleSubmitSignUP.bind(this);
this.enableButton = this.enableButton.bind(this);
this.disableButton = this.disableButton.bind(this);
this.enableOTPButton = this.enableOTPButton.bind(this);
this.disableOTPButton = this.disableOTPButton.bind(this);
this.enableSignUPButton = this.enableSignUPButton.bind(this);
this.disableSignUPButton = this.disableSignUPButton.bind(this);
this.handleGuestRequest = this.handleGuestRequest.bind(this);
  }
  handleGuestRequest()
  {
  this.setState({guest:true});
  }
  handleSubmit()
  {
    let url =`/opinion/login`;
    Request
    .post(url)
    .send({email : this.state.email, password: this.state.password})
    .end((err, res) => {
      if(err) {
    this.setState({errMsg: 'Could not login !'});
  }

  else {
    let response=JSON.parse(res.text);
    if(response.msg==='success')
    {
    localStorage.setItem('token' , response.token);
    this.setState({errMsg: 'varified',token :response.token});
   }
   else {
   this.setState({errMsg: 'Invalid password !'});
   }
  }
});
  }

  handleSubmitSignUP()
  {
    let d = new Date();
    let t = d.getTime();
    let s=t.toString()
    t = Number(s.substring(7,13));
    let url =`/opinion/otp`;

    Request
    .post(url)
    .send({otp : t,email : this.state.email})
    .end((err, res) => {
      if(err) {
    //res.send(err);
    this.setState({errMsgSignUP: res.body});
  }

  else {
    console.log('Response on show in child: ', JSON.parse(res.text));
    //let domainList1=this.state.domainList;
    let response=JSON.parse(res.text);
    if(response.err)
    {
    this.setState({errMsgSignUP: 'Wrong Email Address'});
    }
    else {
    this.setState({otp : t,open : true });
    }
  }
});

  }

  handleOTPSubmit()
  {
    let url =`/opinion/signup`;
    Request
    .post(url)
    .send({email : this.state.email, name: this.state.name,
      password: this.state.password})
    .end((err, res) => {
      if(err) {
    this.setState({errMsgSignUP: 'Could not sign up !'});
  }

  else {
    let response=JSON.parse(res.text);
    localStorage.setItem('token' , response.token);
    this.setState({errMsgSignUP: 'OTP varified',token :response.token});

  }
});
  }

  emailFetch()
  {
    let url =`/opinion/`;
    Request
    .get(url)
    .end((err, res) => {
      if(err) {
    this.setState({errMsg: res.body});
  }

  else {
    console.log('Response on show in emailFetch: ', JSON.parse(res.text));
    let response=JSON.parse(res.text);
    if(response.length===0)
    {
      this.setState({emails : []});
    }
    else {
      let emails = [];
      	response.map((item,i) =>{
          emails.push(item.email);
        })
      this.setState({emails : emails});
    }
  }
  });
  }

  componentDidMount()
  {
    this.emailFetch();
  }
  componentWillMount(){
      document.body.style.overflow = "hidden";
  }
  handleChange = (value) => {
  this.setState({
    slideIndex: value,
  });
};

onChangeName(e)
{
  this.setState({name:e.target.value})
  console.log(this.state.name);
}

onChangeEmail(e)
{
  this.setState({email:e.target.value})
  console.log(this.state.email);
}

onChangePassword(e)
{
  this.setState({password:e.target.value})
  console.log(this.state.password);
}

enableButton() {
  this.setState({ canSubmit : true});
}
disableButton() {
  this.setState({ canSubmit : false});
}

enableOTPButton() {
  this.setState({ otpSubmit : true});
}
disableOTPButton() {
  this.setState({ otpSubmit : false});
}

enableSignUPButton() {
  this.setState({ canSignUP : true});
}
disableSignUPButton() {
  this.setState({ canSignUP : false});
}

handleClose = () => {
  this.setState({open: false});
};

logout()
  {
this.setState({errMsgSignUP : '',errMsg: '',guest: false});
document.body.style.overflow = "hidden";
  }

  render()
  {
    const otpActions = [
      <FlatButton
      label={'Cancel'} secondary={true} type='submit'
      onTouchTap={this.handleClose} style={{marginLeft : -5 , paddingTop : 5}}/>,
    <FlatButton
    label={'Submit'} primary={true} type='submit' disabled={!this.state.otpSubmit}
    onClick={this.handleOTPSubmit} onTouchTap={this.handleClose}
   style={{marginLeft : -5 , paddingTop : 5}}/>
    ];
    const actions = [
    <RaisedButton
    label={'LOGIN'} secondary={true} fullWidth={true}
    type='submit' disabled={!this.state.canSubmit}
    onClick={this.handleSubmit} style={{marginLeft : '20%' , marginTop : '4%',
    minWidth:'60%'}}/>
    ];
    const signUP = [
    <RaisedButton
    label={'SIGNUP'} secondary={true} fullWidth={true}
     type='submit' disabled={!this.state.canSignUP}
    style={{marginLeft : '20%' , marginTop : '2%',minWidth:'60%'}}/>
    ];
    let {passwordError, emailError} = errorMessages;
    let otpValidation = 'equals:'+this.state.otp
    let emailAr=this.state.emails;
    let emailArr=[];
    emailAr.forEach(function(email){
      emailArr.push(email);
    })

    console.log('The email arr'+emailArr);
    Formsy.addValidationRule('isIn', function (values, value) {
      return emailArr.indexOf(value) >= 0;
    });

    Formsy.addValidationRule('isNotIn', function (values, value) {
      return emailArr.indexOf(value) < 0;
    });
    if(this.state.errMsgSignUP==='OTP varified' || this.state.errMsg==='varified' )
    {
      return(<EntertainmentDashboard logout={this.logout.bind(this)}
        guest={this.state.guest}/>);
    }
    if(this.state.guest)
    {
      return(<EntertainmentDashboard logout={this.logout.bind(this)}
      guest={this.state.guest} />);
    }

    return(
    <div style={{backgroundImage: 'url(' + this.state.img + ')',
    backgroundSize: '1400px 662px',overflow: 'hidden',minHeight: '662px',
    backgroundRepeat: 'no-repeat'}}>
     <ScreenClassRender style={divStyle}>
     <div >
     <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >

          <Tab
          icon={<ActionLock />}
          label="LOGIN"
           value={0}
           style= {tabStyle}
          />
          <Tab
           icon={<ContentCreate />}
           label="SIGNUP"
            value={1}
            style= {tabStyle}
            />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
          <Formsy.Form
          ref='form'
          style={{'padding': '15px 15px'}}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          >
          <Row style={inputStyle}>
          <Col lg={2} style={Label}>
          <IconButton  iconStyle={{color:'grey',margin: '-18px 8px'}}
          >
            <ActionLock />
          </IconButton>
          </Col>
          <Col lg={10}>
          <FormsyText
          type='text'
          name='email'
          validations='isIn'
          validationError={emailError}
          fullWidth={true}
          updateImmediately
          required
          hintText='Enter Email'
          style={tfont} onChange={this.onChangeEmail.bind(this)}/></Col>
          </Row>

          <Row style={inputStyle}>
          <Col lg={2} style={Label}>
          <IconButton iconStyle={{color:'grey',margin: '-18px 8px'}}>
            <CommunicationEmail />
          </IconButton>
          </Col>
          <Col lg={10}><FormsyText
          type='password'
          name='description'
        //  validationError={passwordError}
          updateImmediately
          required
          hintText='Enter Password ..'
          style={tfont}
          fullWidth={true} onChange={this.onChangePassword.bind(this)}/></Col>
          </Row>
          <Row>
          {actions}
          <RaisedButton
          label={'GUEST'} primary={true} fullWidth={true}
          type='submit'
          onClick={this.handleGuestRequest}
          style={{marginLeft : '20%' , marginTop : '3%',
          minWidth:'60%'}}/>
          <h5 style={{color: 'grey',margin: '0.5% 32%',LetterSpacing: '2px'}}>
          You won't be able to like or comment as a guest</h5>
          </Row>
          <Row>
          <h3 style={styles.msgStyle}>{this.state.errMsg}</h3>
          </Row>
          </Formsy.Form>
          </div>
          <div style={styles.slide}>
          <Formsy.Form
          ref='form'
          style={{'padding': '0px 15px'}}
          onValid={this.enableSignUPButton}
          onInvalid={this.disableSignUPButton}
          onValidSubmit={this.handleSubmitSignUP}
          >
          <Row style={inputStyle}>
          <Col lg={2} style={Label}>
          <IconButton  iconStyle={{color:'grey',margin: '-18px 8px'}}
          >
            <ActionAccountBox />
          </IconButton>
          </Col>
          <Col lg={10}>
          <FormsyText
          type='text'
          name='name'
          validations="minLength:2"
          validationError="Min length can be two"
          fullWidth={true}
          updateImmediately
          required
          hintText='Enter Name'
          style={tfont} onChange={this.onChangeName.bind(this)}/></Col>
          </Row>

          <Row style={inputStyle}>
          <Col lg={2} style={Label}>
          <IconButton  iconStyle={{color:'grey',margin: '-18px 8px'}}
          >
            <CommunicationEmail />
          </IconButton>
          </Col>
          <Col lg={10}>
          <FormsyText
          type='text'
          name='email'
          validations={{
            isEmail: true,
            isNotIn: true
          }}
          validationErrors={{
            isEmail: 'You have to type valid email',
            isNotIn: 'email already in use'
          }}
          fullWidth={true}
          updateImmediately
          required
          hintText='Enter Email'
          style={tfont} onChange={this.onChangeEmail.bind(this)}/></Col>
          </Row>

          <Row style={inputStyle}>
          <Col lg={2} style={Label}>
          <IconButton  iconStyle={{color:'grey',margin: '-18px 8px'}}
          >
            <ActionLock />
          </IconButton>
          </Col>
          <Col lg={10}><FormsyText
          type='password'
          name='password'
        //  validationError={passwordError}
          updateImmediately
          required
          validations="minLength:6"
          validationError='password length should be more than 5'
          hintText='Enter Password ..'
          style={tfont}
          fullWidth={true} onChange={this.onChangePassword.bind(this)}/></Col>
          </Row>
          <Row style={inputStyle}>
          <Col lg={2} style={Label}>
          <IconButton  iconStyle={{color:'grey',margin: '-18px 8px'}}
          >
            <ActionLock />
          </IconButton>
          </Col>
          <Col lg={9}>
          <FormsyText
          type='password'
          name='Confirm'
          validations="equalsField:password"
          validationError='does not match password'
          fullWidth={true}
          updateImmediately
          required
          hintText='Confirm Password'
          style={tfont} /></Col>
          </Row>
          <Row>
          {signUP}
          </Row>
          <Row>
          <h3 style={styles.msgStyle}>{this.state.errMsgSignUP}</h3>
          </Row>
          </Formsy.Form>
          <Dialog
          title="Enter OTP"
          actions={otpActions}
          modal={true}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          open={this.state.open}
          >
          <Formsy.Form
          ref="form"
          style={{"padding": "50px 24px"}}
          onValid={this.enableOTPButton}
          onInvalid={this.disableOTPButton}
          onValidSubmit={this.handleOTPSubmit.bind(this)}
          >
          <Row>
          <Col lg={3} style={Label}>OTP</Col>
          <Col lg={9}>
          <FormsyText
          type="text"
          name="otp"
          validations={otpValidation}
          validationError='Invalid OTP'
          updateImmediately
          required
          hintText="Enter OTP"
          style={tfont} /></Col>
          </Row>
          </Formsy.Form>
          </Dialog>
          </div>
        </SwipeableViews>
       </div>
     </ScreenClassRender >
     </div>
     );
  }
}
