import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { platform } from 'onsenui';
import * as Actions from '../actions';
import ErrorDialog from './ErrorDialog';
import {
  Fab,
  Icon,
  Button
} from 'react-onsenui';

const AddImage = ({ actions, navigator }) => {
  let button;

  if (platform.isAndroid()) {
    button = (
      <Fab
        onClick={actions.takeAndStorePicture}
        ripple
        position='bottom right'>
        <Icon icon='md-plus' />
      </Fab>
    );
  } else {
    button = (
      <Button onClick={actions.takeAndStorePicture} modifier='large quiet'>+ ADD IMAGE</Button>
    );
  }

  return (
    <div>
      {button}
      <ErrorDialog navigator={navigator} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddImage);
