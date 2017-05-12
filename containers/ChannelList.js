import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { List, ListItem } from 'react-onsenui';
import * as Actions from '../actions';

const ChannelList = ({ channels, navigator }) => {
  if (channels.length === 0) {
    return null;
  }
  return (
    <List>
      <ListItem tappable>
        <div> New Channel </div>
      </ListItem>
    </List>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channels.data
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
