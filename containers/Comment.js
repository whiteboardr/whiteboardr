import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import {ListItem} from 'react-onsenui';

const Comment = ({text, navigator}) => {
  return (
    <ListItem tappable>
      <div> {text} </div>
    </ListItem>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
