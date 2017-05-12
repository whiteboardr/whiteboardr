import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import { ListItem } from 'react-onsenui';

const Comment = ({ navigator, id, title, text }) => {
  return (
    <ListItem tappable>
      <div> {text} </div>
    </ListItem>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Comment);
