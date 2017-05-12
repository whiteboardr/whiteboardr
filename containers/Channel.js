import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import { ListItem } from 'react-onsenui';

const Channel = ({ navigator, id, title }) => {
  return (
    <ListItem tappable>
      <div> New Channel </div>
    </ListItem>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Channel);
