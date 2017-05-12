import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import {
  AlertDialog,
  Button,
  ProgressCircular
} from 'react-onsenui';

const styles = {
  button: {
    marginTop: '15px'
  }
};

const LoginDialog = ({ checking_login, actions }) => {
  const handleLoginClick = (evt) => {
    actions.login();
  };

  const checkingLogin = () => {
    if (checking_login) {
      return (<ProgressCircular intermediate />);
    } else {
      return (<Button style={styles.button} onClick={handleLoginClick}>Login</Button>);
    }
  };

  return (<AlertDialog isOpen={true} isCancelable={false}>
    <div className='alert-dialog-title'>Login with Google</div>
    <div className='alert-dialog-content' style={{ textAlign: 'center' }}>
      {checkingLogin()}
    </div>
  </AlertDialog>);
};

const mapStateToProps = (state) => ({
  checking_login: state.settings.checking_login
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
