import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  AlertDialog
} from 'react-onsenui';

import * as Actions from '../actions';

const ErrorDialog = ({ isOpen, error, actions, navigator }) => {
  return (
    <AlertDialog isOpen={isOpen} isCancelable={true} onCancel={actions.closeDialog}>
      <div className='alert-dialog-title'>Error:</div>
      <div className='alert-dialog-content'>{error}</div>
      <div className='alert-dialog-footer'>
        <button onClick={actions.closeDialog} className='alert-dialog-button'>
          Close
				</button>
      </div>
    </AlertDialog>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.dialog.open,
  error: state.dialog.error
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDialog);
